import React from 'react';
import {Card, Divider, Flex, Layout} from "antd";
import {
    CalendarOutlined,
    CarryOutOutlined,
    FileOutlined, FileSearchOutlined, FileTextOutlined, LineChartOutlined, RightCircleFilled,
    SolutionOutlined, UnorderedListOutlined,
    UserAddOutlined,
    UserOutlined
} from "@ant-design/icons/lib";
import './dashboard.scss';
import {useNavigate} from "react-router-dom";
import DashboardChart from "./dashboardChart/dashboardChart";
import {PageHeader} from "@ant-design/pro-layout";
import Title from "antd/lib/typography/Title";
import HrmsLink from "../../utilities/links/hrmslink";


const Dashboard = () => {
    const navigate = useNavigate();

    const dashboardQuickLinks = {
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
                target: "www.google.com",
            },
        ],
        employee: [
            {
                heading: "Employee Search",
                subheading: "Employee self service portal",
                icon: <FileSearchOutlined />,
                target: "www.google.com",
            },
            {
                heading: "Employee Documents",
                subheading: "Employee self service portal",
                icon: <SolutionOutlined/>,
                target: "www.google.com",
            },
            {
                heading: "Organization",
                subheading: "Employee self service portal",
                icon: <UserOutlined />,
                target: "www.google.com",
            },
        ],
        events: [
            {
                heading: "Attendance Management",
                subheading: "Employee self service portal",
                icon: <CarryOutOutlined />,
                target: "www.google.com",
            },
            {
                heading: "Leave Management",
                subheading: "Employee self service portal",
                icon: <CalendarOutlined />,
                target: "www.google.com",
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
        ],
    }

    return (
        <Layout className='hrms-dashboard'>
            <div className='hrms-dashboard__container'>
                <section className='hrms-dashboard__chart-and-links'>
                    <section className='hrms-dashboard__quick-links'>
                        <Divider orientation="left">
                            <PageHeader className="hrms-dashboard__page-header" title="Bring Employees in to your HRMS" />
                        </Divider>
                        <div style={{display:'flex', gap:'16px'}}>
                            {dashboardQuickLinks.admin.map((cards: any) => (
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
                    </section>
                    <DashboardChart/>
                </section>
                <br/>
                <div className='hrms-dashboard__report'>
                    <Divider orientation="left">
                        <PageHeader className="hrms-dashboard__page-header" title="Administration & Reports" />
                    </Divider>
                    <div className='hrms-dashboard__report-links'>
                        {dashboardCardItems.admin.map((cards: any) => (
                            <Card className='hrms-dashboard__card hrms-card'>
                                <Flex justify='space-between'>
                                    <Title level={5} className='hrms-dashboard__card-title'>{cards.heading}</Title>
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