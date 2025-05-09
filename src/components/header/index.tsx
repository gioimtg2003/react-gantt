import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import Context from '../../context';
import TableHeader from '../table-header';
import TimeAxis from '../time-axis';
import './index.less';

const Header: React.FC<{ hideTable: boolean }> = ({ hideTable }) => {
  const { store } = useContext(Context);

  const { sightConfig } = store;
  return (
    <header
      style={{
        ...(sightConfig.type === 'day' && { height: '86px' }),
      }}
    >
      {!hideTable && <TableHeader />}
      <TimeAxis />
    </header>
  );
};

export default observer(Header);
