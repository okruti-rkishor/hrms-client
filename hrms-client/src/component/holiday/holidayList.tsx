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
  const [dataArray, setDataArray] = useState([]);
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
      setHolidayData(response);
      const newResponse = await response.map((item: any) => {
        if (item.year == new Date().getFullYear()) {
          const count1 =
            item.calender.endDate.split("-")[2] -
            item.calender.startDate.split("-")[2] +
            1;
          console.log(count1);
          return {
            ...item.calender,
            id: item.id,
            date: `${item.calender.startDate} to ${item.calender.endDate}`,
            day: capitalToSmall(item.calender.day),
            type: removeUnderScore(item.calender.type, "_"),
            status: removeUnderScore(item.calender.status, "_"),
            count: count1,
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


const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
};

export default HolidayList;
