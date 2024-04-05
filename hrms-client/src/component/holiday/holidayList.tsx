import {
  ConfigProvider,
  Divider,
  Flex,
  Layout,
  Popconfirm,
  Space,
  Table,
  Tag,
  message,
} from "antd";
import { PageHeader } from "@ant-design/pro-layout";
import {
  CalendarTwoTone,
  DeleteOutlined,
  ProfileTwoTone,
} from "@ant-design/icons";
import { FC, useContext, useEffect, useState } from "react";
import CalendarView from "./calendar";
import "./holiday-list.scss";
import rest from "../../services/http/api";
import UserLoginContext from "../../context/userLoginContext";
import Search from "antd/es/input/Search";

export const capitalToSmall = (str: string="") => {
  str = String(str);
  let tempStr = str.toLowerCase();
  let newString = tempStr.substring(0, 1).toLocaleUpperCase();
  newString += tempStr.substring(1);
  return newString;
};

export const removeUnderScore = (str: string = "", character: string = "-") => {
  str = String(str);
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

const success = () => {
  message.success("Holiday Delete Successful!");
};

const HolidayList = ({
  holidayData,
  setHolidayData,
  totalHoliday,
  setTotalHoliday,
}: any) => {
  // console.log("1112222");
  const [dataArray, setDataArray] = useState<any>([{}]);
  const [showCalendar, setShowCalendar] = useState(false);
  const { newUser } = useContext(UserLoginContext);

  const column = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center" as const,
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      width: "17%",
      align: "center" as const,
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      width: "17%",
      align: "center" as const,
    },

    {
      title: "Leaves",
      dataIndex: "count",
      key: "count",
      align: "center" as const,
    },

    {
      title: "Day",
      dataIndex: "day",
      key: "day",
      align: "center" as const,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      align: "center" as const,
    },
    {
      title: "Action",
      key: "action",
      width: "10%",
      align: "center" as const,
      render: (_: any, record: any) => (
        <Space style={{ width: "50px" }}>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => {
              deleteHandel(record);
            }}
          >
            <DeleteOutlined style={{ color: "red" }} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (newUser?.roles.length === 1 && newUser?.roles[0] === "EMPLOYEE") {
    column.pop();
  }

  const deleteHandel = async (record: any) => {
    try {
      // const deleteSelected = dataArray.find((holiday:any)=>holiday.name===record.name);
      await rest.deleteHoliday(record.idArray);
      setDataArray(dataArray.filter((item: any) => item.id !== record.id));
      console.log(holidayData);
      console.log(record);
      success();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchHolidayData = async () => {
    try {
      const response = await rest.getAllHoliday();
      const holidayNameList = Object.keys(response);

      console.log(holidayNameList);

      const newResponse1 = holidayNameList.map((key: any, index: number) => {
        return {
          name: key,
          year: response[key][0]?.year,
          type: response[key][0]?.type,
          calendar: response[key].map((calendarItem: any) => ({
            date: calendarItem.date,
            day: calendarItem.day,
            id: calendarItem.id,
          })),
        };
      });
      console.log(newResponse1);

      const newResponse = newResponse1?.map((item: any, index: number) => {
        if (item.year == new Date().getFullYear()) {
          return {
            id: index,
            name: capitalToSmall(item.name),
            startDate: item.calendar[0].date,
            endDate: item.calendar[item.calendar.length - 1].date,
            day:
              item?.calendar?.length === 1
                ? item.calendar[0].day
                : `${item.calendar[0].day} ${"to"} ${
                    item.calendar[item.calendar.length - 1].day
                  }`,
            type: removeUnderScore(item.type, "_"),
            count: item?.calendar?.length,
            idArray:(item.calendar).map((item1:any)=>item1.id)
          };
        }
      });

      setDataArray(newResponse);
      return response;
    } catch (error) {
      console.log("error console", error);
    }
  };

  useEffect(() => {
    fetchHolidayData();
  }, [holidayData]);

  // const handleSearch = (value: string) => {
  //   setOptions(() => {
  //     if (!value) {
  //       return [];
  //     }
  //     return dataArray.map<any>((item: any) => item.name.includes(value));
  //   });
  // };
  const onSearch = (e: any) => {
    const searchedKeyword = e.currentTarget.value as string;
    if (searchedKeyword === "") {
      fetchHolidayData();
    } else {
      setDataArray(
        dataArray.filter((item: any) =>
          item.name.toLowerCase().includes(searchedKeyword.toLowerCase())
        )
      );
    }
  };

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
            <Flex style={{ marginLeft: "auto" }}>
              <Search
                placeholder="input search text"
                onChange={onSearch}
                // onSearch={onSearch}
                style={{ width: 200, padding: "5px 10px" }}
              />
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
            </Flex>
          </Flex>
          {showCalendar ? (
            <CalendarView data={dataArray} mode={"month"} />
          ) : (
            <Table
              style={{ textAlign: "center" }}
              rowKey={(record: any) => record.id}
              bordered
              columns={column}
              dataSource={dataArray}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HolidayList;
