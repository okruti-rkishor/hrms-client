import {
    BookOutlined,
    CalendarOutlined, PlusCircleOutlined,
    ProfileOutlined,
    RightOutlined,
    UsergroupAddOutlined
} from "@ant-design/icons/lib";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import LeaveEntitlement from "./leaveSetting/leaveEntitlement";
import {Button, Flex, Layout, Spin, Tooltip} from "antd";
import Title from "antd/lib/typography/Title";
import LeaveApplication from "./leaveSetting/leaveApplication";
import "../../styles/component/leaveIndex.scss";

const leaveSidebarItems: any = [
    {
        key: 1,
        label: "Leave Entitlement",
        leftIcon: <BookOutlined/>,
        rightIcon: <RightOutlined/>,
        className: "leave-entitlement",
    },
    {
        key: 2,
        label: "Leave Requests",
        leftIcon: <BookOutlined/>,
        rightIcon: <RightOutlined/>,
        className: "leaveApplication",
    }
]


function LeaveIndex() {
    const [leaveTypeTable, setLeaveTypeTable] = useState({
        key: 1,
        label: "Leave Entitlement",
        leftIcon: <BookOutlined/>,
        rightIcon: <RightOutlined/>,
        className: "leave-entitlement",
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                                }} key={item.key}>
                                <a>
                                    {item.leftIcon}
                                    {item.label}
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
        if (leaveTypeTable.key === 1) {
            return <LeaveEntitlement/>
        }else if(leaveTypeTable.key === 2) {
            return <LeaveApplication/>
        }else {
            return <LeaveApplication/>
        }
    }



    return (
        <>
            <Layout className="with-background hrms-settings">
                <Title level={4} className='hrms-settings__page-header'>
                    Leaves Setup
                </Title>


                <div className="leave-list">
                    <div className="leave-list_item">
                        <LeaveSidebar/>
                    </div>
                    <div className="leave-list_table">
                        <Flex justify={"space-between"} align={"center"} className={"leave-list_table_flex"}>
                            <div className={"devider"}>
                                <h2>{leaveTypeTable.label}</h2>
                            </div>
                        </Flex>
                        {<LeaveComponentRender/>}
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default LeaveIndex;
