import React, { useEffect, useState } from "react";
import { Row } from "antd";
import "./home.scss";
import restApi from "../../services/http/api";
import UserCountCard from "./userCountCard";
import {  useNavigate } from "react-router-dom";
const data = {
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
  const [countUser, setCountUser] = useState(0);
  const [events, setEvents] = useState(data);
  const navigate = useNavigate();

  useEffect(() => {
    void userCount();
  }, []);

  const userCount = async () => {
    const response = await restApi.userCount();
    console.log(response);
    for (let i = 0; i < response.length; i++) {
      if (response[i].role === "ADMIN") {
        setCountAdmin(response[i].count);
      } else if (response[i].role === "HR") {
        setCountHR(response[i].count);
      } else if (response[i].role === "EMPLOYEE") {
        setCountEmployee(response[i].count);
      } else if (response[i].role === null) {
        setCountUser(response[i].count);
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
    {
      title: "Guest Users",
      count: countUser,
      className: "guest-users",
    },
  ];

  return (
    <div className="home-page">
      <div className="user-count">
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
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

      <div className="events">
        <Row onClick={()=>{navigate(`/employee/birthday/${{birthData:events.birthDay}}`)}} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <UserCountCard
            key={1}
            title={"Birthday"}
            count={events.birthDay.length}
            className={userCountCardProps[0].className}
          />
          <UserCountCard
            key={1}
            title={"Work Anniversary"}
            count={events.birthDay.length}
            className={userCountCardProps[0].className}
          />
        </Row>
      </div>
    </div>
  );
}
export default Home;
