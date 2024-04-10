import React, { useState } from "react";
import type { Dayjs } from "dayjs";
import type { BadgeProps, CalendarProps } from "antd";
import { Badge, Calendar } from "antd";
import "../../styles/component/calendar.scss";

export interface propsData {
  count: string;
  date: string[];
  day: string;
  endDate: string;
  id: string;
  name: string;
  notify: boolean;
  startDate: string;
  status: string;
  type: string;
  ddStart?:string;
  ddEnd?:string;
  mmStart?:string;
  mmEnd?:string;
}


const setDataForCalendar = (data: propsData[]) => {

  const newSetData:propsData[] = data.map((item: propsData) => {
    item.ddStart = item?.date[0].split("-")[2];
    item.mmStart = item?.date[0].split("-")[1];
    item.ddEnd = item?.date[1].split("-")[2];
    item.mmEnd = item?.date[1].split("-")[1];
    return item;
  });
  return newSetData||[];
};

const CalendarView = (props: any) => {

  const [propsData, setPropsData] = useState<propsData[]>(setDataForCalendar(props.data) || []);

  const getListData = (value: Dayjs) => {
    const tempDate = value.date();
    const tempMonth = value.month();
    const tempYear = value.year();
    let listData;
    const showData = propsData.find(
      (item: any) =>
        tempDate === item.date[0].split("-")[2] &&
        tempMonth === item.mm &&
        tempYear === item.yyyy
    );
    if (showData) {
      listData = [{ type: "success", content: showData.name }];
    }
    return listData || [];
  };

  const getMonthData = (value: Dayjs) => {
    if (value.month() === 8) {
      return 1394;
    }
  };

  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num
      ? ""
      : // <div className="notes-month">
        //   <section>{num}</section>
        //   <span>Backlog number</span>
        // </div>
        null;
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge
              status={item.type as BadgeProps["status"]}
              text={item.content}
            />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  return <Calendar cellRender={cellRender} />;
};

export default CalendarView;
