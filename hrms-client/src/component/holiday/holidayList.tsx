import {
  ConfigProvider,
  Divider,
  Flex,
  Layout,
  Row,
  Switch,
  Table,
  theme,
} from "antd";
import { PageHeader } from "@ant-design/pro-layout";
import React, { useState } from "react";
import type { Dayjs } from "dayjs";
import CalendarView from "./calendar";
import { CalendarTwoTone, ProfileTwoTone } from "@ant-design/icons";
import "./holiday-list.scss";

const data: any = [
  {
    year: "2024",
    active: true,
    calender: [
      {
        key: 1,
        date: "01-02-2024",
        dd: 1,
        mm: 2,
        yyyy: 2024,
        type: "HOLIDAY",
        day: "MONDAY",
        reason: "DIWALI",
        remarks: "",
      },
      {
        key: 2,
        date: "03-02-2024",
        dd: 3,
        mm: 2,
        yyyy: 2024,
        type: "HOLIDAY",
        day: "MONDAY",
        reason: "HOLI",
        remarks: "",
      },
      {
        key: 3,
        date: "05-02-2024",
        dd: 5,
        mm: 2,
        yyyy: 2024,
        type: "HOLIDAY",
        day: "MONDAY",
        reason: "GANDHI JAYANTI",
        remarks: "",
      },
      {
        key: 4,
        date: "07-02-2024",
        dd: 7,
        mm: 2,
        yyyy: 2024,
        type: "HOLIDAY",
        day: "MONDAY",
        reason: "EID",
        remarks: "",
      },
      {
        key: 5,
        date: "08-02-2024",
        dd: 8,
        mm: 1,
        yyyy: 2024,
        type: "HOLIDAY",
        day: "MONDAY",
        reason: "DIWALI",
        remarks: "",
      },
      {
        key: 6,
        date: "09-02-2024",
        dd: 9,
        mm: 1,
        yyyy: 2024,
        type: "HOLIDAY",
        day: "MONDAY",
        reason: "HOLI",
        remarks: "",
      },
      {
        key: 11,
        date: "11-02-2024",
        dd: 11,
        mm: 2,
        yyyy: 2024,
        type: "HOLIDAY",
        day: "MONDAY",
        reason: "DIWALI",
        remarks: "",
      },
      {
        key: 12,
        date: "12-02-2024",
        dd: 12,
        mm: 2,
        yyyy: 2024,
        type: "HOLIDAY",
        day: "MONDAY",
        reason: "HOLI",
        remarks: "",
      },
      {
        key: 13,
        date: "13-02-2024",
        dd: 13,
        mm: 2,
        yyyy: 2024,
        type: "HOLIDAY",
        day: "MONDAY",
        reason: "GANDHI JAYANTI",
        remarks: "",
      },
      {
        key: 14,
        date: "14-02-2024",
        dd: 14,
        mm: 1,
        yyyy: 2024,
        type: "HOLIDAY",
        day: "MONDAY",
        reason: "MAKAR SANKRANTI",
        remarks: "",
      },
    ],
  },
];

export const capitalToSmaill = (str: string) => {
  let tempStr = str.toLowerCase();
  let newString = tempStr.substring(0, 1).toLocaleUpperCase();
  newString += tempStr.substring(1);
  console.log(newString);
  return newString;
}; 
export const removeUnderScore = (str: string='', character:string='-') => {
  let splitedStr:string[] = str.split(character);
  console.log(splitedStr)
  const firstLetterCapitalizeArray:string[] = splitedStr.map((str:string)=>{
    return capitalToSmaill(str)

  });
  let newString = "";
  firstLetterCapitalizeArray.forEach((str, index) => {
    newString += str;
    if(index<=firstLetterCapitalizeArray.length-1){
      newString += " ";
    }
  });
  return newString;
};

const HolidayList = () => {
  const [dataArray, setDataArray] = useState(
    data[0].calender.map((item: any) => ({
      ...item,
      day: capitalToSmaill(item.day),
      type: capitalToSmaill(item.type),
      reason: capitalToSmaill(item.reason),
    }))
  );
  const [showCalendar, setShowCalendar] = useState(false);
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
      <div className="holiday-list">
        <div className="data-table">
          <Flex style={{ width: "inherit", alignItems: "center" }}>
            <PageHeader
              title="Holiday View"
              style={{ height: "fit-content" }}
            />
            <Divider style={{ width: "80%", minWidth: "unset" }} />
            <div style={{ marginLeft: "auto" }}>
              {showCalendar ? (
                <div style={{ fontSize: "25px" }}>
                  <ConfigProvider
                    theme={{
                      token: {
                        colorPrimary: "#ffffff",
                      },
                    }}
                  >
                    <ProfileTwoTone
                      onClick={() => {
                        setShowCalendar(false);
                      }}
                    />
                  </ConfigProvider>
                </div>
              ) : (
                <div style={{ fontSize: "25px" }}>
                  <CalendarTwoTone
                    onClick={() => {
                      setShowCalendar(true);
                    }}
                  />
                </div>
              )}
            </div>
          </Flex>

          {showCalendar ? (
            <CalendarView data={dataArray} mode={"month"} />
          ) : (
            <Table columns={column} dataSource={dataArray} />
          )}
        </div>
      </div>
    </Layout>
  );
};

const getListData = (value: Dayjs) => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: "warning", content: "This is warning event." },
        { type: "success", content: "This is usual event." },
      ];
      break;
    case 10:
      listData = [
        { type: "warning", content: "This is warning event." },
        { type: "success", content: "This is usual event." },
        { type: "error", content: "This is error event." },
      ];
      break;
    case 15:
      listData = [
        { type: "warning", content: "This is warning event" },
        { type: "success", content: "This is very long usual event......" },
        { type: "error", content: "This is error event 1." },
        { type: "error", content: "This is error event 2." },
        { type: "error", content: "This is error event 3." },
        { type: "error", content: "This is error event 4." },
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

export default HolidayList;
