import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useContext } from 'react';
import Context from '../../context';
import DragResize from '../drag-resize';

import './index.less';

const TimeAxis: React.FC = () => {
  const { store, prefixCls } = useContext(Context);
  const prefixClsTimeAxis = `${prefixCls}-time-axis`;
  const { sightConfig, isToday } = store;
  const majorList = store.getMajorList();
  const minorList = store.getMinorList();
  const handleResize = useCallback(
    ({ x }) => {
      store.handlePanMove(-x);
    },
    [store],
  );
  const handleLeftResizeEnd = useCallback(() => {
    store.handlePanEnd();
  }, [store]);

  const getIsToday = useCallback(
    (item) => {
      const { key } = item;
      const { type } = sightConfig;
      return type === 'day' && isToday(key);
    },
    [sightConfig, isToday],
  );

  return (
    <DragResize
      onResize={handleResize}
      onResizeEnd={handleLeftResizeEnd}
      defaultSize={{
        x: -store.translateX,
        width: 0,
      }}
      type="move"
    >
      <div
        className={prefixClsTimeAxis}
        style={{
          left: store.tableWidth,
          width: store.viewWidth,
          ...(sightConfig.type === 'day' && { height: '86px' }),
        }}
      >
        <div
          className={`${prefixClsTimeAxis}-render-chunk`}
          style={{
            transform: `translateX(-${store.translateX}px`,
          }}
        >
          {majorList.map((item) => (
            <div
              key={item.key}
              className={`${prefixClsTimeAxis}-major`}
              style={{ width: item.width, left: item.left }}
            >
              <div className={`${prefixClsTimeAxis}-major-label`}>
                {item.label}
              </div>
            </div>
          ))}
          {minorList.map((item) => (
            <div
              key={item.key}
              className={classNames(`${prefixClsTimeAxis}-minor`)}
              style={{
                width: item.width,
                left: item.left,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {sightConfig.type === 'day' && (
                <div
                  style={{
                    fontSize: 12,
                    color: '#999',
                  }}
                >
                  {item?.labelCurrentDay}
                </div>
              )}
              <div
                className={classNames(`${prefixClsTimeAxis}-minor-label`, {
                  [`${prefixClsTimeAxis}-today`]: getIsToday(item),
                })}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DragResize>
  );
};
export default observer(TimeAxis);
