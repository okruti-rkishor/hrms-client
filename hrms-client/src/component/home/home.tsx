import React, { useEffect, useState } from "react";
import { Row } from "antd";
import "./home.scss";
import restApi from "../../services/http/api";
import UserCountCard from "./userCountCard";
import EventCounter from './eventCounter';

function Home() {
  const [countAdmin, setCountAdmin] = useState(0);
  const [countHR, setCountHR] = useState(0);
  const [countEmployee, setCountEmployee] = useState(0);
  const [countUser, setCountUser] = useState(0);

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
      <div className='user-cards'>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          {userCountCardProps.map((card: any,index) => (
              <UserCountCard
                  key={index}
                  title={card.title}
                  count={card.count}
                  className={card.className + ' user-card'}
              />
          ))}
        </Row>
      </div>

      <div className='events-section'>
        <EventCounter />
      </div>
    </div>
  );
}

export default Home;