import { ConfigProvider, Divider, Flex, Layout, Space, Table, Tag } from "antd";
import { PageHeader } from "@ant-design/pro-layout";
import {
  CalendarTwoTone,
  DeleteOutlined,
  ProfileTwoTone,
  SwapOutlined,
} from "@ant-design/icons";
import { FC, useEffect, useState } from "react";
import CalendarView from "./calendar";
import "./holiday-list.scss";
import rest from "../../services/http/api";
import { toast } from "react-toastify";
import { JsxElement } from "typescript";

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

const HolidayList = (props:any) => {
  const [dataArray, setDataArray] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);

  const column = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (tags: string[]) => (
        <span>
          {tags.map((tag, index) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return index !== 1 ? (
              <>
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
                <SwapOutlined />{" "}
              </>
            ) : (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: "Leaves",
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
      title: "Notify",
      dataIndex: "notify",
      key: "notify",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space style={{ width: "50px" }}>
          <DeleteOutlined onClick={() => deleteHandel(record)} />
        </Space>
      ),
      width: "10%",
    },
  ];

  const deleteHandel = async (record: any) => {
    console.log(record.id);
    try {
      await rest.deleteHoliday(record.id);
      toast("Holiday Delete Successful");
      setDataArray(dataArray.filter((item: any) => item.id !== record.id));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchHolidayData = async () => {
    try {
      const response = await rest.getAllHoliday();
      const newResponse = await response.map((item: any) => {
        if (item.year == new Date().getFullYear()) {
          const count1 =
            (item.calender.endDate.split("-")[2] -
            item.calender.startDate.split("-")[2] +
            1)+" days";
          console.log(count1);
          return {
            ...item.calender,
            id: item.id,
            date: [item.calender.startDate, item.calender.endDate],
            day: capitalToSmall(item.calender.day),
            type: removeUnderScore(item.calender.type, "_"),
            status: removeUnderScore(item.calender.status, "_"),
            notify: item.calender.notify,
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

  useEffect(() => {
    
  }, [props.dataProps]);


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
            <Table style={{textAlign:"center"}} bordered columns={column} dataSource={dataArray} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HolidayList;
