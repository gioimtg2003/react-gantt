import { observer } from 'mobx-react-lite';
import React, { useCallback, useContext } from 'react';
import { TOP_PADDING } from '../../constants';
import Context from '../../context';
import './index.less';

const TableRows = () => {
  const { store, prefixCls } = useContext(Context);
  const { columns, rowHeight } = store;
  const columnsWidth = store.getColumnsWidth;
  const barList = store.getBarList;
  const groups = store.groupMapData;

  const { count, start } = store.getVisibleRows;
  const prefixClsTableBody = `${prefixCls}-table-body`;
  if (barList.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          color: ' rgba(0,0,0,0.65)',
          marginTop: 30,
        }}
      >
        No Data
      </div>
    );
  }
  return (
    <>
      {Object.entries(groups).map(([group, bars], rowIndex) => {
        // If the parent element is the last child of its ancestor, hide the line of the previous level
        // const parent = bar._parent;
        // const parentItem = parent?._parent;
        // let isLastChild = false;
        // if (
        //   parentItem?.children &&
        //   parentItem.children[parentItem.children.length - 1] === bar._parent
        // )
        //   isLastChild = true;

        return (
          <div
            key={group}
            role="none"
            className={`${prefixClsTableBody}-row`}
            style={{
              height: rowHeight * (bars?.length || 1),
              top:
                (rowIndex + start) * (rowHeight * (bars?.length || 1)) +
                TOP_PADDING,
              borderBottom: '1px solid #f0f0f0',
            }}
          >
            {columns.map((column, index) => (
              <div
                key={column.name}
                className={`${prefixClsTableBody}-cell`}
                style={{
                  width: columnsWidth[index],
                  minWidth: column.minWidth,
                  maxWidth: column.maxWidth,
                  textAlign: column.align ? column.align : 'left',
                  ...column.style,
                }}
              >
                {/* {index === 0 &&
                  new Array(bar._depth).fill(0).map((_, i) => (
                    <div
                      key={i}
                      className={classNames(
                        `${prefixClsTableBody}-row-indentation`,
                        {
                          [`${prefixClsTableBody}-row-indentation-hidden`]:
                            isLastChild && i === bar._depth - 2,
                          [`${prefixClsTableBody}-row-indentation-both`]:
                            i === bar._depth - 1,
                        },
                      )}
                      style={{
                        top: -(rowHeight / 2) + 1,
                        left: tableIndent * i + 15,
                        width: tableIndent * 1.5 + 5,
                      }}
                    />
                  ))}
                {index === 0 && bar._childrenCount > 0 && (
                  <div
                    style={{
                      position: 'absolute',
                      left: tableIndent * 3 + 15,
                      background: 'white',
                      zIndex: 9,
                      transform: 'translateX(-52%)',
                      padding: 1,
                    }}
                  >
                    {expandIcon ? (
                      expandIcon({
                        level: bar._depth,
                        collapsed: bar._collapsed,
                        onClick: (event) => {
                          event.stopPropagation();
                          if (onExpand)
                            onExpand(bar.task.record, !bar._collapsed);
                          store.setRowCollapse(bar.task, !bar._collapsed);
                        },
                      })
                    ) : (
                      <RowToggler
                        prefixCls={prefixCls}
                        level={bar._depth}
                        collapsed={bar._collapsed}
                        onClick={(event) => {
                          event.stopPropagation();
                          if (onExpand)
                            onExpand(bar.task.record, !bar._collapsed);
                          store.setRowCollapse(bar.task, !bar._collapsed);
                        }}
                      />
                    )}
                  </div>
                )} */}
                <span
                  className={`${prefixClsTableBody}-ellipsis`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: rowHeight,
                    paddingLeft: index === 0 ? 0 : 10,
                  }}
                >
                  {column.render ? column.render(group) : group}
                </span>
              </div>
            ))}
          </div>
        );
      })}
    </>
  );
};
const ObserverTableRows = observer(TableRows);
const TableBorders = () => {
  const { store, prefixCls } = useContext(Context);
  const { columns } = store;
  const columnsWidth = store.getColumnsWidth;
  const barList = store.getBarList;
  if (barList.length === 0) return null;

  const prefixClsTableBody = `${prefixCls}-table-body`;
  return (
    <div role="none" className={`${prefixClsTableBody}-border_row`}>
      {columns.map((column, index) => (
        <div
          key={column.name}
          className={`${prefixClsTableBody}-cell`}
          style={{
            width: columnsWidth[index],
            minWidth: column.minWidth,
            maxWidth: column.maxWidth,
            textAlign: column.align ? column.align : 'left',
            ...column.style,
          }}
        />
      ))}
    </div>
  );
};
const ObserverTableBorders = observer(TableBorders);

const TableBody: React.FC = () => {
  const { store, prefixCls } = useContext(Context);
  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.persist();
      store.handleMouseMove(event);
    },
    [store],
  );
  const handleMouseLeave = useCallback(() => {
    store.handleMouseLeave();
  }, [store]);
  const prefixClsTableBody = `${prefixCls}-table-body`;
  return (
    <div
      className={prefixClsTableBody}
      style={{
        width: store.tableWidth,
        height: store.bodyScrollHeight,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <ObserverTableBorders />
      <ObserverTableRows />
    </div>
  );
};
export default observer(TableBody);
