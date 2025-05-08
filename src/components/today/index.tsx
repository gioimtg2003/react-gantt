import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import Context from '../../context';
import './index.less';

const Today: React.FC = () => {
  const { store, prefixCls } = useContext(Context);
  console.log('prefixCls ===>', store.pxUnitAmp);
  return (
    <div
      className={`${prefixCls}-today`}
      style={{
        transform: `translate(${store.todayTranslateX}px)`,
      }}
    >
      <div
        className={`${prefixCls}-today_line`}
        style={{
          height: store.bodyScrollHeight,
        }}
      />
    </div>
  );
};
export default observer(Today);
