import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import Context from '../../context';
import './index.less';

/**
 * 鼠标hover效果模拟
 */
const SelectionIndicator: React.FC = () => {
  const { store, prefixCls } = useContext(Context);
  const {
    showSelectionIndicator,
    selectionIndicatorTop,
    rowHeight,
    totalColumnWidth,
  } = store;
  const prefixClsSelectionIndicator = `${prefixCls}-selection-indicator`;
  return showSelectionIndicator ? (
    <div
      className={prefixClsSelectionIndicator}
      style={{
        height: rowHeight,
        top: selectionIndicatorTop,
        width: `100%`,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          height: rowHeight,
          top: selectionIndicatorTop,
          background: 'rgba(0, 0, 0, 0.04)',
          width: `calc(100% - ${store.tableWidth}px)`,
          right: 0,
        }}
      />
    </div>
  ) : null;
};
export default observer(SelectionIndicator);
