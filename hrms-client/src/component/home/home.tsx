import React, { useEffect, useState, useContext } from "react";
// import {  useNavigate } from "react-router-dom";
import { Divider, Layout, Row } from "antd";
import restApi from "../../services/http/api";
import { EventsCountCard, UserCountCard } from "./userCountCard";
import "./home.scss";
import { PageHeader } from "@ant-design/pro-layout";
import BirthdayContext from "../../context/birthdayContext";
import BirthdayData from "../../custom_hooks/birthdayData";
import { useNavigate } from "react-router-dom";

function Home() {
  BirthdayData();
  const [countAdmin, setCountAdmin] = useState(0);
  const [countHR, setCountHR] = useState(0);
  const [countEmployee, setCountEmployee] = useState(0);
  const { birthdayData, anniversaryData } = useContext<any>(BirthdayContext);
  let birthdayCount = 0;
  let anniversaryCount = 0;
  {birthdayCount =((birthdayData.today&&birthdayData.today.length) + (birthdayData.passed&&birthdayData.passed.length) + (birthdayData.upcoming&&birthdayData.upcoming.length))}
   {anniversaryCount = ((anniversaryData.today&&anniversaryData.today.length) + (anniversaryData.passed&&anniversaryData.passed.length) + (anniversaryData.upcoming&&anniversaryData.upcoming.length))}

  useEffect(() => {
    userCount();
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
      count: birthdayCount,
      className: "admin",
    },
    {
      title: "Work Anniversary",
      count: anniversaryCount,
      className: "hr-user",
    },
    {
      title: "Work Anniversary",
      count: birthdayCount,
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
              // eventType={events}
              className={card.className}
              onClickCard={card.onclickCard}
            />
          ))}
        </Row>
      </div>
    </Layout>
  );
}
export default Home;
