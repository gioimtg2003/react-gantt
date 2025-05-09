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
  return (
    <div style={{ width: '100%', height: 500 }}>
      <RcGantt<Data>
        data={data}
        columns={[
          {
            name: 'name',
            label: 'Custom Title',
            width: 100,
            align: 'center',
          },
        ]}
        locale={enUS}
        rowHeight={80}
        renderBar={(record, { width, height }) => {
          return (
            <div
              style={{
                width: width,
                height,
                backgroundColor: '#e6f0ff',
                borderRadius: '8px',
                padding: '16px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                fontFamily: 'Arial, sans-serif',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    color: '#3366cc',
                    fontWeight: 500,
                    fontSize: '16px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  Title-bar value
                </div>
                <button
                  type="button"
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '18px',
                    color: '#666',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  ⋮
                </button>
              </div>
              <div
                style={{
                  marginTop: '8px',
                  color: '#333',
                  fontSize: '14px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                1st description value
              </div>
            </div>
          );
        }}
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
const a = {
  rowKey: '_id2',
  headerTitle: 'Candidates',
  timeline: {
    start_date: 'earliest_start_date_1190',
    end_date: 'end_date_1191',
  },
  renders: [
    {
      title: 'Group1',
      dataIndex: 'candidate_1187',
      meta_key: 'groups',
    },
    {
      title: 'Group2',
      dataIndex: 'flagged_1195',
      meta_key: 'groups',
    },
    {
      key: 'candidate_1187',
      meta_key: 'description',
      title: 'Candidate',
      dataIndex: 'candidate_1187',
    },
    {
      key: 'candidate_1187',
      meta_key: 'title-bar',
      title: 'Gender',
      display: '[$gender_1148]',
      component: 'tags',
      mapping_component: [
        {
          value: '1',
          color: 'magenta',
          case: 'capital',
        },
        {
          value: '0',
          color: 'geekblue',
          case: 'capital',
        },
        {
          value: '2',
          color: 'purple',
          case: 'capital',
        },
      ],
      dataIndex: 'candidate_1187',
    },
    {
      key: 'candidate_1187',
      meta_key: 'description',
      title: "Candidate's Location",
      display: '[$location_1151]',
      dataIndex: 'candidate_1187',
    },
    {
      key: 'flagged',
      meta_key: 'description',
      title: 'Flagged',
      dataIndex: 'flagged_1195',
    },
    {
      key: 'action',
      title: 'Actions',
      meta_key: 'actions',
      actions: [
        {
          icon: {
            name: 'EyeTwoTone',
          },
          type: 'text',
          tooltip: 'View Candidate',
          href: '/workplaces/{workplace_id}/codes/156',
        },
        {
          icon: {
            name: 'SwapOutlined',
            color: '#1677ff',
          },
          type: 'text',
          tooltip: 'Status Quick Update',
          onClick: {
            event_ui: ['open_modal:Modal|PJRLV|'],
          },
        },
        {
          icon: {
            name: 'MoreOutlined',
          },
          type: 'text',
          tooltip: 'More',
          groups: [
            {
              icon: {
                name: 'EditTwoTone',
              },
              text: 'Edit Candidate (Full)',
              type: 'text',
              onClick: {
                event_ui: ['open_drawer:Drawer|KxIEu|'],
              },
            },
            {
              icon: {
                name: 'DeleteOutlined',
              },
              danger: true,
              type: 'text',
              tooltip: 'Delete',
              action_sys: ['action_515'],
            },
          ],
        },
      ],
    },
  ],
};
export default App;
