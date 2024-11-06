import {useNavigate} from "react-router-dom";
import React, {useContext} from "react";
import UserLoginContext from "../../../context/userLoginContext";
import {
    CalendarOutlined, ClockCircleOutlined, DashboardOutlined, DiffOutlined,
    FileSearchOutlined, FireOutlined, GiftOutlined,
    SolutionOutlined, StarOutlined,
    UserAddOutlined,
    UserOutlined
} from "@ant-design/icons/lib";
import Title from "antd/lib/typography/Title";
import {Card, Divider, Flex} from "antd";
import "../../../styles/component/dashboard.scss";
import {UserDetailsCard} from "../../index";
import { checkUserRole } from "../../../utility/utility";


let dashboardQuickLinks: any = {
    employee: [
        // {
        //     heading: "Your Profile",
        //     subheading: "Employee self service portal",
        //     icon: <UserOutlined />,
        //     target: "/",
        // },
        {
            heading: "Add Employee",
            icon: <UserAddOutlined/>,
            target: "/employee/create",
        },
        {
            heading: "Employee Search",
            subheading: "Employee Search",
            icon: <FileSearchOutlined/>,
            target: "/employee/search",
        },
        {
            heading: "Documents",
            subheading: "Documents",
            icon: <DiffOutlined/>,
            target: "/employee/documentNew",
        },
        {
            heading: "Leave Request",
            subheading: "Leave Request",
            icon: <CalendarOutlined/>,
            target: "/employee/leaves",
        },
    ],
    events: [
        {
            heading: "Birthday",
            subheading: "Birthday",
            icon: <GiftOutlined/>,
            target: "/event/birthday",
        },
        {
            heading: "Work Anniversary",
            subheading: "Work Anniversary",
            icon: <FireOutlined/>,
            target: "/event/anniversary",
        },
        {
            heading: "Office Events",
            subheading: "Office Events",
            icon: <StarOutlined/>,
            target: "/event/customEvents",
        },
        {
            heading: "Holiday",
            subheading: "Holiday",
            icon: <ClockCircleOutlined/>,
            target: "/holiday/create",
        },
    ],
    // userDashboard: [
    //     // {
    //     //     heading: "Your Profile",
    //     //     subheading: "Employee self service portal",
    //     //     icon: <UserOutlined />,
    //     //     target: "/",
    //     // },
    //     {
    //         heading: "Add Employee",
    //         icon: <UserAddOutlined />,
    //         target: "/employee/create",
    //     },
    //     {
    //         heading: "Employee Search",
    //         subheading: "Employee Search",
    //         icon: <FileSearchOutlined />,
    //         target: "/employee/search",
    //     },
    //     {
    //         heading: "Leave Request",
    //         subheading: "Leave Request",
    //         icon: <CalendarOutlined />,
    //         target: "/employee/leaves",
    //     },
    // ],
}

const dashboardQuickLinksHeadings: any = {
    employee: 'Bring Employees into your HRMS',
    admin: 'User section of HRMS',
    events: 'All events of OKRUTI',
    // userDashboard:"User Dashboard"
}


const QuickLinks = () => {
    const navigate = useNavigate();
    const {newUser} = useContext<any>(UserLoginContext);
    if (newUser.loginStatus && checkUserRole(newUser)
        // (newUser.roles.includes("ADMIN") || newUser.roles.includes("HR"))
        )
    {
        dashboardQuickLinks = {
            admin: [
                {
                    heading: "Add User",
                    icon: <UserAddOutlined/>,
                    target: "/user/create",
                },
                {
                    heading: "User List",
                    icon: <SolutionOutlined/>,
                    target: "/user/list",
                },
                {
                    heading: "User Dashboard",
                    icon: <DashboardOutlined/>,
                    target: "/user/detail",
                },
            ], ...dashboardQuickLinks
        }
    } else {
        delete dashboardQuickLinks.admin;
    }

    return (<>
            {/*<Title className='hrms-dashboard__page-header'>*/}
            {/*    {"User Dashboard"}*/}
            {/*</Title>*/}
            <section className='hrms-dashboard__quick-links'>
                <Flex vertical>
                    <Title className='hrms-dashboard__page-header'>
                        {"User Dashboard"}
                    </Title>
                    <UserDetailsCard usersShow={true}/>
                </Flex>
            </section>
            <section className='hrms-dashboard__quick-links'>
                {
                    Object.keys(dashboardQuickLinks).map((cards: string, cardsIndex: number) =>
                        <div key={cardsIndex} className="hrms-dashboard__quick-links__section">
                            <Title level={4} className='hrms-dashboard__page-header'>
                                {dashboardQuickLinksHeadings[cards]}
                            </Title>
                            <div className='quick-links__section' style={{display: 'flex', gap: '10px'}}>
                                {
                                    dashboardQuickLinks[cards].map((card: any, index: number) =>
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
        </>
    );
}

export default QuickLinks;