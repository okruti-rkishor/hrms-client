import {
  AutoComplete,
  Button,
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
  SwapOutlined,
} from "@ant-design/icons";
import { FC, useContext, useEffect, useState } from "react";
import CalendarView from "./calendar";
import "./holiday-list.scss";
import rest from "../../services/http/api";
import UserLoginContext from "../../context/userLoginContext";
import { AudioOutlined } from "@ant-design/icons";
import { Input } from "antd";
import Search from "antd/es/input/Search";

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

const success = () => {
  message.success("Holiday Delete Successful!");
};

const mockVal = (str: string, repeat = 1) => ({
  value: str.repeat(repeat),
});

const HolidayList = ({ addData }: any) => {
  const [dataArray, setDataArray] = useState([{}]);
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
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: "17%",
      align: "center" as const,
      render: (tags: string[]) => (
        <span key={Math.random().toString(36).slice(2)}>
          {tags?.map((tag, index) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return index !== 1 ? (
              <>
                <Tag color={color} key={Math.random().toString(36).slice(2)}>
                  {tag.toUpperCase()}
                </Tag>
                {" "}
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
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",
    //   align: "center" as const,
    // },
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
      await rest.deleteHoliday(record.id);
      setDataArray(dataArray.filter((item: any) => item.id !== record.id));
      success();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchHolidayData = async () => {
    try {
      const response = await rest.getAllHoliday();
      const newResponse = await response.map((item: any, index: number) => {
        if (item.year == new Date().getFullYear()) {
          // const count1 =
          //   item.calender.endDate.split("-")[2] -
          //   item.calender.startDate.split("-")[2] +
          //   1;
          return {
            ...item.calender,
            id: item.id,
            name: capitalToSmall(item.name),
            date: item.calender.length===1?[item.calender[0].date]:[`${item.calender[0].date} ${"to"} ${item.calender[item.calender.length-1].date}`],
            day: item.calender.length===1?item.calender[0].day:`${item.calender[0].day} ${"to"} ${item.calender[item.calender.length-1].day}`,
            type: removeUnderScore(item.type, "_"),
            // status: removeUnderScore(item.status, "_"),
            // notify: item.calender.notify,
            count:item.calender.length,
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
  }, [addData]);

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
                onSearch={onSearch}
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
