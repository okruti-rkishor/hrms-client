import React, {useContext} from 'react';
import {Card, Divider, Flex, Layout} from "antd";
import {
    ApartmentOutlined,
    CalendarOutlined,
    CarryOutOutlined,
    ClockCircleOutlined,
    FileSearchOutlined,
    FileTextOutlined, FireOutlined, GiftOutlined,
    LineChartOutlined,
    PhoneOutlined,
    SolutionOutlined, StarOutlined,
    UserAddOutlined,
    UserOutlined
} from "@ant-design/icons/lib";
import './dashboard.scss';
import {useNavigate} from "react-router-dom";
import DashboardChart from "./dashboardChart/dashboardChart";
import Title from "antd/lib/typography/Title";
import HrmsLink from "../../utilities/links/hrmslink";
import UserLoginContext from "../../context/userLoginContext";


const dashboardQuickLinks = {
    user: {
        admin: [
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
        ],
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
    },
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

const dashboardCardItems = {
    admin: [
        {
            heading: "Employee Management",
            subheading: "Manage your employee data",
            icon: <UserOutlined />,
            links: [
                {
                    text: "View All Employees",
                    target: "/user/create",
                },
                {
                    text: "Add New Employee",
                    target: "/user/create",
                },
                {
                    text: "Invite Employees",
                    target: "/user/create",
                },
                {
                    text: "Employee Registration Requests",
                    target: "/user/create",
                },
            ]
        },
        {
            heading: "Attendance & Shift Management",
            subheading: "Attendance & Shift Management",
            icon: <CarryOutOutlined />,
            links: [
                {
                    text: "View Attendance Records",
                    target: "/user/create",
                },
                {
                    text: "View Regularization Requests",
                    target: "/user/create",
                },
                {
                    text: "Attendance Summary Report",
                    target: "/user/create",
                },
            ]
        },
        {
            heading: "Employee Documents",
            subheading: "Employee Documents",
            icon: <FileTextOutlined />,
            links: [
                {
                    text: "Manage Personal Documents",
                    target: "/user/create",
                },
                {
                    text: "Manage Dependants Documents",
                    target: "/user/create",
                },
            ]
        },
        {
            heading: "Leave Management",
            subheading: "Leave Management",
            icon: <CalendarOutlined />,
            links: [
                {
                    text: "View Leave Requests",
                    target: "/user/create",
                },
                {
                    text: "Assign Leave",
                    target: "/user/create",
                },
                {
                    text: "Manage Holidays",
                    target: "/user/create",
                },
                {
                    text: "Leave Entitlements and Usage Report",
                    target: "/user/create",
                },
            ]
        },
        {
            heading: "All Reports",
            subheading: "All Reports",
            icon: <LineChartOutlined />,
            links: [
                {
                    text: "Attendance and Leave Aggregated Report",
                    target: "/user/create",
                },
                {
                    text: "Employee Alerts Report",
                    target: "/user/create",
                },
                {
                    text: "Leave Entitlements and Usage Report",
                    target: "/user/create",
                },
                {
                    text: "Attendance Report",
                    target: "/user/create",
                },
                {
                    text: "Grouped Summary Report",
                    target: "/user/create",
                },
            ]
        },
        {
            heading: "Organization",
            subheading: "Organization",
            icon: <ApartmentOutlined />,
            links: [
                {
                    text: "Holidays",
                    target: "/",
                },
                {
                    text: "Directory",
                    target: "/",
                },
                {
                    text: "Announcements",
                    target: "/",
                },
            ]
        },
        {
            heading: "Support",
            subheading: "Support",
            icon: <PhoneOutlined />,
            links: [
                {
                    text: "About Us",
                    target: "/about",
                },
                {
                    text: "Privacy Policy",
                    target: "/privacy-policy",
                },
                {
                    text: "Contact Us",
                    target: "/contact-us",
                },
            ]
        },
    ],
}


const QuickLinks = () => {
    const navigate = useNavigate();
    const {userLoggedIn} = useContext<any>(UserLoginContext);

    const isEmployee = () => {
        return userLoggedIn.loginStatus && userLoggedIn.roles[0] === "EMPLOYEE" ? "employee" : "admin";
    }

    return (
        <>
            {/*{*/}
            {/*    isEmployee === "employee" ? <div></div> : <div></div>;*/}
            {/*}*/}
            <div className="hrms-dashboard__quick-links__section">
                <Title level={4} className='hrms-dashboard__page-header'>Bring Employees into your HRMS</Title>
                <div className='quick-links__section' style={{display:'flex', gap:'10px'}}>
                    {dashboardQuickLinks.user.admin.map((cards: any) => (
                        <Card className='hrms-card hrms-dashboard__card animated'
                              onClick={() => navigate(`${cards.target}`)}
                        >
                            <Flex vertical>
                                {cards.icon}
                                <Divider/>
                                {cards.heading}
                            </Flex>
                        </Card>
                    ))}
                </div>
            </div>
        </>

    );
}


const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <Layout className='hrms-dashboard'>
            <div className='hrms-dashboard__container'>
                <section className='hrms-dashboard__chart-and-links'>
                    <section className='hrms-dashboard__quick-links'>
                        <QuickLinks/>
                        <div className="hrms-dashboard__quick-links__section">
                            <Title level={4} className='hrms-dashboard__page-header'>Employees section of HRMS</Title>
                            <div style={{display:'flex', gap:'10px'}}>
                                {dashboardQuickLinks.user.employee.map((cards: any) => (
                                    <Card className='hrms-dashboard__card animated hrms-card'
                                          onClick={() => navigate(`${cards.target}`)}
                                    >
                                        <Flex vertical>
                                            {cards.icon}
                                            <Divider/>
                                            {cards.heading}
                                        </Flex>
                                    </Card>
                                ))}
                            </div>
                        </div>
                        <div className="hrms-dashboard__quick-links__section">
                            <Title level={4} className='hrms-dashboard__page-header'>All events of OKRUTI</Title>
                            <div style={{display:'flex', gap:'10px'}}>
                                {dashboardQuickLinks.events.map((cards: any) => (
                                    <Card className='hrms-dashboard__card animated hrms-card'
                                          onClick={() => navigate(`${cards.target}`)}
                                    >
                                        <Flex vertical>
                                            {cards.icon}
                                            <Divider/>
                                            {cards.heading}
                                        </Flex>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </section>
                    <section style={{display:'flex', gap:'10px'}}>
                        <DashboardChart/>
                    </section>
                </section>
                <br/>
                <div className='hrms-dashboard__report'>
                    <Title level={4} className='hrms-dashboard__page-header'>Administration & Reports</Title>
                    <div className='hrms-dashboard__report-links'>
                        {dashboardCardItems.admin.map((cards: any) => (
                            <Card className='hrms-dashboard__card hrms-card'>
                                <Flex justify='space-between' className='hrms-dashboard__card-header'>
                                    <Title level={5} className='hrms-dashboard__card-header-title'>{cards.heading}</Title>
                                    {cards.icon}
                                </Flex>
                                <ul className='hrms-dashboard__card-links'>
                                    {cards.links.map((link:any) =>
                                        <li className='hrms-dashboard__card-link'>
                                            <HrmsLink linkTarget={link.target} linkText={link.text}/>
                                        </li>
                                    )}
                                </ul>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Dashboard;