import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import Context from '../../context';
import './index.less';

const TableHeader: React.FC = () => {
  const { store, prefixCls } = useContext(Context);
  const { columns, tableWidth, sightConfig } = store;
  const width = tableWidth;
  const columnsWidth = store.getColumnsWidth;
  const prefixClsTableHeader = `${prefixCls}-table-header`;

  return (
    <div
      className={prefixClsTableHeader}
      style={{ width, ...(sightConfig.type === 'day' && { height: '86px' }) }}
    >
      <div
        className={`${prefixClsTableHeader}-head`}
        style={{ width, height: '100%' }}
      >
        <div
          className={`${prefixClsTableHeader}-row`}
          style={{ height: '100%' }}
        >
          {columns.map((column, index) => (
            <div
              key={column.name}
              className={`${prefixClsTableHeader}-cell`}
              style={{
                width: columnsWidth[index],
                minWidth: column.minWidth,
                maxWidth: column.maxWidth,
                textAlign: column.align ? column.align : 'left',
                ...column.style,
              }}
            >
              <div className={`${prefixClsTableHeader}-head-cell`}>
                <span className={`${prefixClsTableHeader}-ellipsis`}>
                  {column.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default observer(TableHeader);
