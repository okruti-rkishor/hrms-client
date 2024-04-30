import React, {useEffect, useState} from 'react';
import {Button, Flex, Layout, Spin, Tooltip} from 'antd';
import {PlusCircleOutlined} from '@ant-design/icons';
import '../../styles/component/leaves.scss'
import {
    BookOutlined,
    CalendarOutlined, CaretLeftOutlined, LeftOutlined,
    ProfileOutlined,
    RightOutlined, SolutionOutlined, UsergroupAddOutlined
} from "@ant-design/icons/lib";
import LeaveType from "./leaveTypeTable/leaveType";
import WorkWeek from "./leaveTypeTable/workWeek";
import Title from "antd/lib/typography/Title";
import {useNavigate} from "react-router-dom"
// import LeaveEntitlement from "./leaveTypeTable/leaveEntitlement";
import Designation from "./leaveTypeTable/desigation";
import Qualification from "./leaveTypeTable/qualification";
import Holiday from "./leaveTypeTable/holiday";

const leaveSidebarItems: any = [
    {
        key: 1,
        label: "Work Weeks",
        leftIcon: <CalendarOutlined/>,
        rightIcon: <RightOutlined/>,
        className: "work-weeks",
    },
    {
        key: 2,
        label: "Leave Types",
        leftIcon: <ProfileOutlined/>,
        rightIcon: <RightOutlined/>,
        className: "leave-types",
    },
    {
        key: 3,
        label: "Designation",
        leftIcon: <UsergroupAddOutlined/>,
        rightIcon: <RightOutlined/>,
        className: "designation",
    },
    {
        key: 4,
        label: "Qualification",
        leftIcon: <BookOutlined/>,
        rightIcon: <RightOutlined/>,
        className: "qualification",
    },
    {
        key: 5,
        label: "Holiday",
        leftIcon: <CalendarOutlined/>,
        rightIcon: <RightOutlined/>,
        className: "designation",
    },
    // {
    //     key: 6,
    //     label: "Leave Entitlement",
    //     leftIcon: <SolutionOutlined/>,
    //     rightIcon: <RightOutlined/>,
    //     className: "leave-entitlement",
    // }
]

function Leaves() {
    const [leaveTypeTable, setLeaveTypeTable] = useState({
        key: 2,
        label: "Leave Types",
        leftIcon: <ProfileOutlined/>,
        rightIcon: <RightOutlined/>,
        className: "leave-types",
    });
    const navigate = useNavigate();

    const LeaveSidebar = () => {
        return (
            <ul>
                {
                    leaveSidebarItems.map((item: any, key: any) => {
                        return (
                            <li id={item.key}
                                className={`hrms-settings__sidebar-item ${item.className}` + ((item.label === leaveTypeTable.label) ? " active" : "")}
                                onClick={() => {
                                    console.log(item);
                                    setLeaveTypeTable(item);
                                }}>
                                <a>
                                    {item.leftIcon}
                                    <a>{item.label}</a>
                                    {item.rightIcon}
                                </a>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }

    const LeaveComponentRender = () => {
        switch (leaveTypeTable.key) {
            case 1:
                return <WorkWeek/>;
            case 2:
                return <LeaveType/>;
            case 3:
                return <Designation/>;
            case 4:
                return <Qualification/>;
            case 5:
                return <Holiday/>;
            default:
                return <Holiday/>;
        }
    }


    return (
        <>
            <Layout className="with-background hrms-settings">

                <Title level={4} className='hrms-settings__page-header'>
                    Setting & Leave Setup
                </Title>
                <div className="leave-list">
                    <div className="leave-list_item">
                        <LeaveSidebar/>
                    </div>
                    <div className="leave-list_table">
                        <div className={"leave-list_table_title"}>
                            <div className={"devider"}>
                                <h2>{leaveTypeTable.label}</h2>
                            </div>

                        </div>
                        <LeaveComponentRender/>

                    </div>
                </div>
                {/*</div>*/}
            </Layout>
        </>
    );
}

export default Leaves;


