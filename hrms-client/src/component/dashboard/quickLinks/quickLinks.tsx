import {useNavigate} from "react-router-dom";
import React, {useContext} from "react";
import UserLoginContext from "../../../context/userLoginContext";
import {
    CalendarOutlined, ClockCircleOutlined,
    FileSearchOutlined, FireOutlined, GiftOutlined,
    SolutionOutlined, StarOutlined,
    UserAddOutlined,
    UserOutlined
} from "@ant-design/icons/lib";
import Title from "antd/lib/typography/Title";
import {Card, Divider, Flex} from "antd";
import "../dashboard.scss";


const dashboardQuickLinks:any = {
    employee: [
        {
            heading: "Your Profile",
            subheading: "Employee self service portal",
            icon: <UserOutlined />,
            target: "/",
        },
        {
            heading: "Employee Search",
            subheading: "Employee Search",
            icon: <FileSearchOutlined />,
            target: "/employee/search",
        },
        {
            heading: "Leave Request",
            subheading: "Leave Request",
            icon: <CalendarOutlined />,
            target: "/",
        },
    ],
    events: [
        {
            heading: "Birthday",
            subheading: "Birthday",
            icon: <GiftOutlined />,
            target: "/event/birthday",
        },
        {
            heading: "Work Anniversary",
            subheading: "Work Anniversary",
            icon: <FireOutlined />,
            target: "/event/anniversary",
        },
        {
            heading: "Office Events",
            subheading: "Office Events",
            icon: <StarOutlined />,
            target: "/event/office",
        },
        {
            heading: "Holiday",
            subheading: "Holiday",
            icon: <ClockCircleOutlined />,
            target: "/holiday",
        },
    ]
}

const dashboardQuickLinksHeadings:any = {
    employee:'Bring Employees into your HRMS',
    admin:'Employees section of HRMS',
    events: 'All events of OKRUTI',
}


const QuickLinks = () => {
    const navigate = useNavigate();
    const {newUser} = useContext<any>(UserLoginContext);

    if(newUser.loginStatus && (newUser.roles.includes("ADMIN") || newUser.roles.includes("HR"))) {
        dashboardQuickLinks.admin =  [
            {
                heading: "Add User",
                icon: <UserAddOutlined />,
                target: "/user/create",
            },
            {
                heading: "User List",
                icon: <SolutionOutlined />,
                target: "/user/list",
            },
            {
                heading: "Search User",
                icon: <FileSearchOutlined />,
                target: "/",
            },
        ]
    }
    else {
        delete dashboardQuickLinks.admin;
    }

    return (
        <section className='hrms-dashboard__quick-links'>
            {
                Object.keys(dashboardQuickLinks).map((cards:string, cardsIndex:number) =>
                    <div key={cardsIndex} className="hrms-dashboard__quick-links__section">
                        <Title level={4} className='hrms-dashboard__page-header'>
                            {dashboardQuickLinksHeadings[cards]}
                        </Title>
                        <div className='quick-links__section' style={{display:'flex', gap:'10px'}}>
                            {
                                dashboardQuickLinks[cards].map((card: any, index:number) =>
                                    <Card key={index}
                                          className='hrms-card hrms-dashboard__card animated'
                                          onClick={() => navigate(`${card.target}`)}
                                    >
                                        <Flex vertical>
                                            {card.icon}
                                            <Divider/>
                                            {card.heading}
                                        </Flex>
                                    </Card>
                                )
                            }
                        </div>
                    </div>
                )
            }
        </section>
    );
}

export default QuickLinks;