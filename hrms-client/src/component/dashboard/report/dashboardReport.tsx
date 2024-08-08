import Title from "antd/lib/typography/Title";
import {Card, Flex} from "antd";
import HrmsLink from "../../links/hrmslink";
import React from "react";
import {
    ApartmentOutlined,
    CalendarOutlined,
    CarryOutOutlined,
    FileTextOutlined,
    LineChartOutlined, PhoneOutlined,
    UserOutlined
} from "@ant-design/icons/lib";



const dashboardCardItems:any = {
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
                    text: "Apply Leave Requests",
                    target: "/employee/leaves",
                },
                {
                    text: "Review Leave Request",
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


const DashboardReport = () => {

    return (
        <div className='hrms-dashboard__report'>
            <Title level={4} className='hrms-dashboard__page-header'>Administration & Reports</Title>
            <div className='hrms-dashboard__report-links'>
                {dashboardCardItems.admin.map((cards: any, index:number) => (
                    <Card key={index} className='hrms-dashboard__card hrms-card'>
                        <Flex justify='space-between' className='hrms-dashboard__card-header'>
                            <Title level={5} className='hrms-dashboard__card-header-title'>{cards.heading}</Title>
                            {cards.icon}
                        </Flex>
                        <ul className='hrms-dashboard__card-links'>
                            {cards.links.map((link:any) =>
                                <li key={link.text} className='hrms-dashboard__card-link'>
                                    <HrmsLink linkTarget={link.target} linkText={link.text}/>
                                </li>
                            )}
                        </ul>
                    </Card>
                ))}
            </div>
        </div>
    )
}


export default DashboardReport;