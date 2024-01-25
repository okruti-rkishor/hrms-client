import React, { useEffect, useState } from "react";
// import {  useNavigate } from "react-router-dom";
import {Layout, Row} from "antd";
import restApi from "../../services/http/api";
import {EventsCountCard, UserCountCard} from "./userCountCard";
import "./home.scss";
import {PageHeader} from "@ant-design/pro-layout";


const eventData = {
  birthDay: [
    { employeeName: "Gaurav Joshi", dateOfBirth: "2024-01-24" },
    { employeeName: "Gaurav Joshi", dateOfBirth: "2024-01-2" },
    { employeeName: "Gaurav Joshi", dateOfBirth: "2024-01-28" },
    { employeeName: "Gaurav Joshi", dateOfBirth: "2024-01-30" },
    { employeeName: "Gaurav Joshi", dateOfBirth: "2024-01-23" },
  ],
};

function Home() {
  const [countAdmin, setCountAdmin] = useState(0);
  const [countHR, setCountHR] = useState(0);
  const [countEmployee, setCountEmployee] = useState(0);
  const [events, setEvents] = useState(eventData);
  // const navigate = useNavigate();

  useEffect(() => {
    void userCount();
  }, []);

  const userCount = async () => {
    const response = await restApi.userCount();

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
        <PageHeader
            className=""
            title="Users Detail"
            subTitle="All registered users"
        />
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
             justify="space-between"
        >
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
        <PageHeader
            className=""
            title="Events Detail"
            subTitle="All upcoming events"
        />
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
             justify="space-between"
        >
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
