import { Divider, Flex, Layout, Row, Switch, Table } from "antd";
import { PageHeader } from "@ant-design/pro-layout";
import React, { useState } from "react";
import type { Dayjs } from 'dayjs';
import CalendarView from './calendar'
const data:any = [
  {
    year: "2024",
    active: true,
    calender: [
      {
        key: 1,
        date: "01-02-2024",
        day1: 1,
        month:2,
        type: "HOLIDAY",
        day: "MONDAY",
        reason: "DIWALI",
        remarks: "",
      },
      {
        key: 2,
        date: "03-02-2024",
        day1: 3,
        month:2,
        type: "HOLIDAY",
        day: "MONDAY",
        reason: "HOLI",
        remarks: "",
      },
      {
        key: 3,
        date: "05-02-2024",
        day1: 5,
        month:2,
        type: "HOLIDAY",
        day: "MONDAY",
        reason: "GANDHI JAYANTI",
        remarks: "",
      },
      {
        key: 4,
        date: "07-02-2024",
        day1: 7,
        month:2,
        type: "HOLIDAY",
        day: "MONDAY",
        reason: "EID",
        remarks: "",
      },
      {
        key: 5,
        date: "08-02-2024",
        day1: 8,
        month:1,
        type: "HOLIDAY",
        day: "MONDAY",
        reason: "DIWALI",
        remarks: "",
      },
      {
        key: 6,
        date: "09-02-2024",
        day1 : 9,
        month:1,
        type: "HOLIDAY",
        day: "MONDAY",
        reason: "HOLI",
        remarks: "",
      },
      {
        key: 11,
        date: "11-02-2024",
        day1: 11,
        month:2,
        type: "HOLIDAY",
        day: "MONDAY",
        reason: "DIWALI",
        remarks: "",
      },
      {
        key: 12,
        date: "12-02-2024",
        day1: 12,
        month:2,
        type: "HOLIDAY",
        day: "MONDAY",
        reason: "HOLI",
        remarks: "",
      },
      {
        key: 13,
        date: "13-02-2024",
        day1: 13,
        month:2,
        type: "HOLIDAY",
        day: "MONDAY",
        reason: "GANDHI JAYANTI",
        remarks: "",
      },
      {
        key: 14,
        date: "14-02-2024",
        day1: 14,
        month:1,
        type: "HOLIDAY",
        day: "MONDAY",
        reason: "MAKAR SANKRANTI",
        remarks: "",
      }
    ],
  },
];
const dataArray = data[0].calender;
const HolidayList = () => {
  const [showCalendar, setShowCalendar] = useState(false)
  const column = [
    {
      title: "Holiday Name",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Day",
      dataIndex: "day",
      key: "day",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
  ];
  return (
    <Layout className="with-background">
      <div className="data-table">
        {/* <Divider orientation="left"> */}
        <Flex style={{width:"inherit", alignItems: "center"}} >
            <PageHeader title="Holiday List" style={{height: "fit-content"}} />
            <Divider style={{width: "80%", minWidth:"unset"}}/>
            <Switch onChange={(e)=>{setShowCalendar(e)}}  style={{marginLeft:"auto"}}/>
        </Flex>
        {/* <Table columns={column} dataSource={dataArray} /> */}
        {/* </Divider> */}
        {/* <h1>This is HOLIDAY LIST section</h1> */}

        {showCalendar?<CalendarView data={data} />:<Table columns={column} dataSource={dataArray} />}
      </div>
    </Layout>
  );
};

// function CalendarView(){
//   return(<>
//   <h1>Calendar View</h1>
//   </>)

// }

const getListData = (value: Dayjs) => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
      ];
      break;
    case 10:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
        { type: 'error', content: 'This is error event.' },
      ];
      break;
    case 15:
      listData = [
        { type: 'warning', content: 'This is warning event' },
        { type: 'success', content: 'This is very long usual event......' },
        { type: 'error', content: 'This is error event 1.' },
        { type: 'error', content: 'This is error event 2.' },
        { type: 'error', content: 'This is error event 3.' },
        { type: 'error', content: 'This is error event 4.' },
      ];
      break;
    default:
  }
  return listData || [];
};

const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
};

// const CalendarView: React.FC = () => {
  
//   const monthCellRender = (value: Dayjs) => {
//     const num = getMonthData(value);
//     return num ? (
//       <div className="notes-month">
//         <section>{num}</section>
//         <span>Backlog number</span>
//       </div>
//     ) : null;
//   };

//   const dateCellRender = (value: Dayjs) => {
//     const listData = getListData(value);
//     return (
//       <ul className="events">
//         {listData.map((item) => (
//           <li key={item.content}>
//             <Badge status={item.type as BadgeProps['status']} text={item.content} />
//           </li>
//         ))}
//       </ul>
//     );
//   };

//   const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
//     if (info.type === 'date') return dateCellRender(current);
//     if (info.type === 'month') return monthCellRender(current);
//     return info.originNode;
//   };

//   return <Calendar cellRender={cellRender} />;
// };

export default HolidayList;
