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
import React, { useEffect, useState } from "react";
import type { Dayjs } from "dayjs";
import CalendarView from "./calendar";
import { CalendarTwoTone, ProfileTwoTone } from "@ant-design/icons";
import "./holiday-list.scss";
import rest from "../../services/http/api";
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
    ],
  },
];

export const capitalToSmall = (str: string) => {
  let tempStr = str.toLowerCase();
  let newString = tempStr.substring(0, 1).toLocaleUpperCase();
  newString += tempStr.substring(1);
  return newString;
};
export const removeUnderScore = (str: string = "", character: string = "-") => {
  let splitedStr: string[] = str.split(character);
  const firstLetterCapitalizeArray: string[] = splitedStr.map((str: string) => {
    return capitalToSmall(str);
  });
  let newString = "";
  firstLetterCapitalizeArray.forEach((str, index) => {
    newString += str;
    if (index <= firstLetterCapitalizeArray.length - 1) {
      newString += " ";
    }
  });
  return newString;
};

const HolidayList = () => {
  const [dataArray, setDataArray] = useState(
    []
    // data[0].calender.map((item: any) => ({
    //   ...item,
    //   day: capitalToSmall(item.day),
    //   type: capitalToSmall(item.type),
    //   reason: capitalToSmall(item.reason),
    // }))
  );
  const [showCalendar, setShowCalendar] = useState(false);
  const [holidayData, setHolidayData] = useState([]);
  const column = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    // {
    //   title: "Start Date",
    //   dataIndex: "startDate",
    //   key: "startDate",
    // },
    // {
    //   title: "End Date",
    //   dataIndex: "endDate",
    //   key: "endDate",
    // },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Count",
      dataIndex: "count",
      key: "count",
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
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
    },
  ];

  const fetchHolidayData = async () => {
    try {
      const response = await rest.getAllHoliday();
      // console.warn(response);
      setHolidayData(response);
      // setDataArray(response);
      const newResponse = response.map((item: any) => {
        if (item.year == new Date().getFullYear()) {
          return {
            ...item.calender,
            id: item.id,
            date: `${item.calender.startDate} to ${item.calender.endDate}`,
            // count:
            //   parseInt(item.calender.startDate.split()[2]) -
            //   parseInt(item.calender.endtDate.split()[2]),
          };
        }
      });
      setDataArray(newResponse);
      return response;
    } catch (error) {
      console.warn(error);
    }
  };
  useEffect(() => {
    fetchHolidayData();
  }, []);

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

// const getListData = (value: Dayjs) => {
//   let listData;
//   switch (value.date()) {
//     case 8:
//       listData = [
//         { type: "warning", content: "This is warning event." },
//         { type: "success", content: "This is usual event." },
//       ];
//       break;
//     case 10:
//       listData = [
//         { type: "warning", content: "This is warning event." },
//         { type: "success", content: "This is usual event." },
//         { type: "error", content: "This is error event." },
//       ];
//       break;
//     case 15:
//       listData = [
//         { type: "warning", content: "This is warning event" },
//         { type: "success", content: "This is very long usual event......" },
//         { type: "error", content: "This is error event 1." },
//         { type: "error", content: "This is error event 2." },
//         { type: "error", content: "This is error event 3." },
//         { type: "error", content: "This is error event 4." },
//       ];
//       break;
//     default:
//   }
//   return listData || [];
// };

const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
};

export default HolidayList;
