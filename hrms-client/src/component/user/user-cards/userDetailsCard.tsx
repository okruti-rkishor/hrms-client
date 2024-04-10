import React, { useEffect, useState, useContext } from "react";
import { Divider, Layout, Row } from "antd";
import restApi from "../../../services/http/api";
import { EventsCountCard, UserCountCard } from "./userCountCard";
import "../../../styles/component/user/userDetailsCard.scss";
import { PageHeader } from "@ant-design/pro-layout";
import EventContext from "../../../context/eventContext";
import EventData from "../../../custom_hooks/eventData";

function UserDetailsCard() {
    EventData();
    const [countAdmin, setCountAdmin] = useState(0);
    const [countHR, setCountHR] = useState(0);
    const [countEmployee, setCountEmployee] = useState(0);
    const { birthdayData, anniversaryData } = useContext<any>(EventContext);
    let birthdayCount = 0;
    let anniversaryCount = 0;

    birthdayCount = (birthdayData.today && birthdayData.today.length) +
        (birthdayData.passed && birthdayData.passed.length) +
        (birthdayData.upcoming && birthdayData.upcoming.length);

    anniversaryCount = (anniversaryData.today && anniversaryData.today.length) +
        (anniversaryData.passed && anniversaryData.passed.length) +
        (anniversaryData.upcoming && anniversaryData.upcoming.length);

    const checkRole=(roles:string[],checkUser:string)=>{
        const match = roles.filter((role:string)=> checkUser===role)
        return match.length
    }

    useEffect(() => {
        userCount();
    }, []);

  const userCount = async () => {
    try {
        // const response = await restApi.getUsers("EMPLOYEE");
        const response = [
            {
                "id": "ca33514a-b497-4597-92cb-9fafd16d4363",
                "firstName": "Admin",
                "lastName": "Admin",
                "email": "admin@okruti.com",
                "roles": [
                    "ADMIN"
                ]
            },
            {
                "id": "ca33514a-b497-4597-92cb-9fafd16d4363",
                "firstName": "Admin",
                "lastName": "Admin",
                "email": "admin@okruti.com",
                "roles": [
                    "ADMIN", "HR"
                ]
            },
            {
                "id": "ca33514a-b497-4597-92cb-9fafd16d4363",
                "firstName": "Admin",
                "lastName": "Admin",
                "email": "admin@okruti.com",
                "roles": [
                    "EMPLOYEE"
                ]
            },
            {
                "id": "ca33514a-b497-4597-92cb-9fafd16d4363",
                "firstName": "Admin",
                "lastName": "Admin",
                "email": "admin@okruti.com",
                "roles": [
                    "ADMIN"
                ]
            },
            {
                "id": "ca33514a-b497-4597-92cb-9fafd16d4363",
                "firstName": "Admin",
                "lastName": "Admin",
                "email": "admin@okruti.com",
                "roles": [
                    "EMPLOYEE", "HR"
                ]
            },
            {
                "id": "ca33514a-b497-4597-92cb-9fafd16d4363",
                "firstName": "Admin",
                "lastName": "Admin",
                "email": "admin@okruti.com",
                "roles": [
                    "EMPLOYEE"
                ]
            },
            {
                "id": "ca33514a-b497-4597-92cb-9fafd16d4363",
                "firstName": "Admin",
                "lastName": "Admin",
                "email": "admin@okruti.com",
                "roles": [
                    "EMPLOYEE"
                ]
            },
        ];
        if(response.length>=1){
           const adminCount = (response.filter((item:any)=> item.roles&&checkRole(item.roles,"ADMIN")))
            setCountAdmin(adminCount.length);
           const hrCount = (response.filter((item:any)=> item.roles&&checkRole(item.roles,"HR")))
            setCountHR(hrCount.length);
           const employeeCount = (response.filter((item:any)=> item.roles&&checkRole(item.roles,"EMPLOYEE")))
           setCountEmployee(employeeCount.length);
        }
        //call api for for all user then
    } catch (error) {
        console.error(error);
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
      title: "Internal Events",
      count: {},
      className: "employee",
    },
  ];

  return (
    <Layout className="with-background">
      <div className="data-table user-detail-card">
        <div className="user-count">
          <Divider orientation="left">
            <PageHeader className="" title="Users Detail" />
          </Divider>
          <Row
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
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
          <Divider orientation="left">
            <PageHeader className="" title="Events Detail" />
          </Divider>
          <Row
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            justify="space-between"
          >
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
      </div>
    </Layout>
  );
}

export default UserDetailsCard;
