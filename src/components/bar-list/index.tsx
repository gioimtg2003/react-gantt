/* eslint-disable no-underscore-dangle */
import dayjs from 'dayjs';
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import Context from '../../context';
import TaskBar from '../task-bar';

const BarList: React.FC = () => {
  const { store } = useContext(Context);
  const { viewWidth, pxUnitAmp, translateAmp } = store;
  const barList = store.getBarList;

  const rangeStart = translateAmp - 1;
  const rangeEnd = translateAmp + pxUnitAmp * viewWidth + 1;

  return (
    <>
      {barList.map((bar) => {
        const currentStartDate = dayjs(bar?.task?.startDate);
        const currentEndDate = dayjs(bar?.task?.endDate);
        const isOverlap =
          currentEndDate.isAfter(rangeStart) &&
          currentStartDate.isBefore(rangeEnd);

        if (isOverlap) {
          return <TaskBar key={bar.key} data={bar} />;
        }
        return null;
      })}
    </>
  );
};
export default observer(BarList);
