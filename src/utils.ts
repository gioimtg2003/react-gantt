import dayjs from 'dayjs';
import { DefaultRecordType, Gantt } from './types';

/**
 * 将树形数据向下递归为一维数组
 *
 * @param {any} arr 数据源
 */
export function flattenDeep(
  array: Gantt.Item[] = [],
  depth = 0,
  parent?: Gantt.Item | undefined,
): Gantt.Item[] {
  let index = 0;
  return array.reduce((flat: Gantt.Item[], item) => {
    item._depth = depth;
    item._parent = parent;
    item._index = index;
    index += 1;
    return [
      ...flat,
      item,
      ...(item.children && !item.collapsed
        ? flattenDeep(item.children, depth + 1, item)
        : []),
    ];
  }, []);
}

export function getMaxRange(bar: Gantt.Bar) {
  let minTranslateX = 0;
  let maxTranslateX = 0;
  const temporary: Gantt.Bar[] = [bar];

  while (temporary.length > 0) {
    const current = temporary.shift();
    if (current) {
      const { translateX = 0, width = 0 } = current;
      if (minTranslateX === 0) minTranslateX = translateX || 0;

      if (translateX) {
        minTranslateX = Math.min(translateX, minTranslateX);
        maxTranslateX = Math.max(translateX + width, maxTranslateX);
      }
      if (current.task.children && current.task.children.length > 0)
        for (const t of current.task.children)
          if (t._bar) temporary.push(t._bar);
    }
  }

  return {
    translateX: minTranslateX,
    width: maxTranslateX - minTranslateX,
  };
}
const genKey = (() => {
  let key = 0;
  return function () {
    return key++;
  };
})();
export function transverseData(
  data: Gantt.Record[] = [],
  startDateKey: string,
  endDateKey: string,
) {
  const result: Gantt.Item[] = [];

  for (const record of data) {
    const item: Gantt.Item = {
      key: genKey(),
      record,
      content: '',
      group: record.group,
      startDate: record[startDateKey] || '',
      endDate: record[endDateKey] || '',
      collapsed: record.collapsed || false,
      children: transverseData(record.children || [], startDateKey, endDateKey),
    };
    result.push(item);
  }
  return result;
}

export function handleGroupMapData(data: Gantt.Item<DefaultRecordType>[]) {
  const groupMap: Record<string, Gantt.Item[][]> = {};

  for (const task of data) {
    const group = task.group || 'default';
    if (!groupMap[group]) groupMap[group] = [];

    let placed = false;

    const lastRow = groupMap[group][groupMap[group].length - 1];
    if (lastRow) {
      const isOverlap = lastRow.some((existing) => {
        const start1 = dayjs(task.startDate).valueOf();
        const end1 = dayjs(task.endDate).valueOf();
        const start2 = dayjs(existing.startDate).valueOf();
        const end2 = dayjs(existing.endDate).valueOf();
        return !(end1 < start2 || start1 > end2);
      });

      if (!isOverlap) {
        lastRow.push(task);
        placed = true;
      }
    }

    if (!placed) {
      groupMap[group].push([task]);
    }
  }

  return groupMap;
}
