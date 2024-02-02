import React, { useEffect, useState, useContext } from "react";
// import {  useNavigate } from "react-router-dom";
import { Divider, Layout, Row } from "antd";
import restApi from "../../services/http/api";
import { EventsCountCard, UserCountCard } from "./userCountCard";
import "./home.scss";
import { PageHeader } from "@ant-design/pro-layout";
import BirthdayContext from "../../context/birthdayContext";

const eventData = {
  birthDay: [
    { employeeName: "Anay", dateOfBirth: "2024-01-24" },
    { employeeName: "Abhishek", dateOfBirth: "2024-01-2" },
    { employeeName: "Raghu", dateOfBirth: "2024-01-28" },
    { employeeName: "Rahul Kumar", dateOfBirth: "2024-01-30" },
    { employeeName: "DJ", dateOfBirth: "2024-01-23" },
  ],
};

function Home() {
  const [countAdmin, setCountAdmin] = useState(0);
  const [countHR, setCountHR] = useState(0);
  const [countEmployee, setCountEmployee] = useState(0);
  const [events, setEvents] = useState(eventData);
  const {todayBirthday,pastBirthday,upcomingBirthday,setTodayBirthday,setPastBirthday,setUpcomingBirthday, myValue, updateValue } = useContext<any>(BirthdayContext);
 

  // const navigate = useNavigate();

  useEffect(() => {
    userCount();
    getAllBirthday();
  }, []);

  const getAllBirthday = async () => {
    const response = await restApi.allBirthday();
    console.log("getAllBirthday", response)
    setTodayBirthday(response.today);
    setUpcomingBirthday(response.upcoming);
    setPastBirthday(response.passed);
  };

  const userCount = async () => {
    const response = await restApi.userCount();
    // const birthdayResponse = await restApi.
    console.log(response);
    // updateValue(response);

    for (let i = 0; i < response.length; i++) {
      if (response[i].role === "ADMIN") {
        setCountAdmin(response[i].count);
      } else if (response[i].role === "HR") {
        setCountHR(response[i].count);
      } else if (response[i].role === "EMPLOYEE") {
        setCountEmployee(response[i].count);
      }
    }
  };

  const userCountCardProps = [
    {
      title: "Admin",
      count: countAdmin,
      className: "admin",
    },
    {
      title: "HR",
      count: countHR,
      className: "hr-user",
    },
    {
      title: "Employee",
      count: countEmployee,
      className: "employee",
    },
  ];

  const eventsCountCardProps = [
    {
      title: "Birthday",
      count: events.birthDay.length,
      className: "admin",
    },
    {
      title: "Work Anniversary",
      count: events.birthDay.length,
      className: "hr-user",
    },
    {
      title: "Work Anniversary",
      count: events.birthDay.length,
      className: "employee",
    },
  ];

  return (
    <Layout className="data-table home-page">
      <div className="user-count">
        <Divider orientation="left">
          <PageHeader className="" title="Users Detail" />
        </Divider>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="space-between">
          {userCountCardProps.map((card: any, index) => (
            <UserCountCard
              key={index}
              title={card.title}
              count={card.count}
              className={card.className}
            />
          ))}
        </Row>
      </div>

      <div className="events-section">
        <Divider orientation="left">
          <PageHeader className="" title="Events Detail" />
        </Divider>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="space-between">
          {eventsCountCardProps.map((card: any, index) => (
            <EventsCountCard
              key={index}
              title={card.title}
              count={card.count}
              eventType={events}
              className={card.className}
            />
          ))}
        </Row>
      </div>
    </Layout>
  );
}
export default Home;
