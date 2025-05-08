/**
 * compact: true
 */

import dayjs from 'dayjs';
import RcGantt, { enUS } from 'rc-gantt';
import React, { useState } from 'react';

interface Data {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  group: string;
}

function createData(len: number): Data[] {
  const result: Data[] = [];
  const today = new Date();

  for (let i = 0; i < len; i++) {
    const overlapGroup = i % 5 === 0;

    const offset = overlapGroup ? Math.floor(i / 5) * 2 : i;
    const start = new Date(today);
    start.setDate(start.getDate() + offset);

    const end = new Date(start);
    end.setDate(
      end.getDate() + (overlapGroup ? 3 : Math.floor(Math.random() * 5) + 1),
    );

    result.push({
      id: i,
      name: 'Task ' + i,
      group: 'Group ' + (i % 3),
      startDate: start.toISOString().slice(0, 10),
      endDate: end.toISOString().slice(0, 10),
    });
  }

  return result;
}
const App = () => {
  const [data, setData] = useState(createData(20));
  console.log('data >>>> ', data);
  return (
    <div style={{ width: '100%', height: 500 }}>
      <RcGantt<Data>
        data={data}
        columns={[
          {
            name: 'name',
            label: 'Custom Title',
            width: 100,
          },
        ]}
        locale={enUS}
        onUpdate={async (row, startDate, endDate) => {
          console.log('update', row, startDate, endDate);
          setData((prev) => {
            const newList = [...prev];
            const index = newList.findIndex((val) => val.id === row.id);
            newList[index] = {
              ...row,
              startDate: dayjs(startDate).format('YYYY-MM-DD'),
              endDate: dayjs(endDate).format('YYYY-MM-DD'),
            };
            return newList;
          });
          return true;
        }}
      />
    </div>
  );
};

export default App;
