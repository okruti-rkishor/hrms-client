import React, {useEffect, useState, useContext} from "react";
import {Divider, Layout, Row} from "antd";
import restApi from "../../../services/http/api";
import {EventsCountCard, UserCountCard} from "./userCountCard";
import "../../../styles/component/user/userDetailsCard.scss";
import {PageHeader} from "@ant-design/pro-layout";
import EventContext from "../../../context/eventContext";
import EventData from "../../../custom_hooks/eventData";

function UserDetailsCard({usersShow = false}) {
    EventData();
    const [count, setCount] = useState({countAdmin: 0, countHR: 0, countEmployee: 0})
    const [all, setAll] = useState(0);
    const {birthdayData, anniversaryData} = useContext<any>(EventContext);
    let birthdayCount = 0;
    let anniversaryCount = 0;

    birthdayCount = (birthdayData.today && birthdayData.today.length) +
        (birthdayData.passed && birthdayData.passed.length) +
        (birthdayData.upcoming && birthdayData.upcoming.length);

    anniversaryCount = (anniversaryData.today && anniversaryData.today.length) +
        (anniversaryData.passed && anniversaryData.passed.length) +
        (anniversaryData.upcoming && anniversaryData.upcoming.length);

    const checkRole = (roles: string[], checkUser: string) => {
        const match = roles.filter((role: string) => checkUser === role)
        return match.length
    }

    useEffect(() => {
        userCount();
    }, []);

    const userCount = async () => {
        try {
            // const response = await restApi.getUsers("EMPLOYEE");
            const response = await restApi.getUsers("")
            setAll(response.length)
            if (response.length >= 1) {
                const adminCount = (response.filter((item: any) => item.roles && checkRole(item.roles, "ADMIN")))
                setCount((prev: any) => ({...prev, countAdmin: adminCount.length,}));
                const hrCount = (response.filter((item: any) => item.roles && checkRole(item.roles, "HR")))
                setCount((prev: any) => ({...prev, countHR: hrCount.length}));
                const employeeCount = (response.filter((item: any) => item.roles && checkRole(item.roles, "EMPLOYEE")))
                setCount((prev: any) => ({...prev, countEmployee: employeeCount.length}));

            }
            //call api for for all user then
        } catch (error) {
            console.error(error);
        }
    };
    const userCountCardProps = [
        {
            title: "Admin",
            count: count.countAdmin,
            className: "admin",
        },
        {
            title: "HR",
            count: count.countHR,
            className: "hr-user",
        },
        {
            title: "Employee",
            count: count.countEmployee,
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

    return (<>
            {usersShow !== true && <Layout className="with-background">
                <div className="data-table user-detail-card">
                    <div className="user-count">
                        <Divider orientation="left">
                            <PageHeader className="" title="Users Dashboard"/>
                        </Divider> {/*consition only for hide in home page */}
                        <Row
                            gutter={{xs: 8, sm: 16, md: 24, lg: 32}}
                            justify="space-between">
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
                        <>     <Divider orientation="left">
                            <PageHeader className="" title="Events Detail"/>
                        </Divider>
                            <Row
                                gutter={{xs: 8, sm: 16, md: 24, lg: 32}}
                                justify="space-between">
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
                            </Row> </>
                    </div>
                </div>
            </Layout>}

         <div style={{display:"flex", gap:12}}>
             {usersShow === true && userCountCardProps.push({
                 title: "All",
                 count: all,
                 className: "employee",
             },) && userCountCardProps.map((card: any, index) => (
                 <UserCountCard
                     key={index}
                     title={card.title}
                     count={card.count}
                     className={"small-user-card"}
                 />
             ))}

         </div>

        </>
    );
}

export default UserDetailsCard;