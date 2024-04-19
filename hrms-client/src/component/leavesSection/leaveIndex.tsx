import {
    BookOutlined,
    CalendarOutlined, PlusCircleOutlined,
    ProfileOutlined,
    RightOutlined,
    UsergroupAddOutlined
} from "@ant-design/icons/lib";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import WorkWeek from "../leave/leaveTypeTable/workWeek";
import LeaveType from "../leave/leaveTypeTable/leaveType";
import Designation from "../leave/leaveTypeTable/desigation";
import Qualification from "../leave/leaveTypeTable/qualification";
import Holiday from "../leave/leaveTypeTable/holiday";
import LeaveEntitlement from "../leave/leaveTypeTable/leaveEntitlement";
import {Button, Flex, Layout, Spin, Tooltip} from "antd";
import Title from "antd/lib/typography/Title";
import LeaveApplication from "./leaveApplication";
import LeaveBalance from "./leaveBalance";



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
        label: "Leave Application",
        leftIcon: <BookOutlined/>,
        rightIcon: <RightOutlined/>,
        className: "leaveApplication",
    },{
        key: 3,
        label: "Leave Balance",
        leftIcon: <BookOutlined/>,
        rightIcon: <RightOutlined/>,
        className: "leaveBalance",
    },

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
    const [spinning, setSpinning] = React.useState<boolean>(true);
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
        if (leaveTypeTable.key === 1) {
            return <LeaveEntitlement isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
        }else if(leaveTypeTable.key === 2) {
            return <LeaveApplication isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
        }else if(leaveTypeTable.key === 3) {
            return <LeaveBalance isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
        }else if(leaveTypeTable.key === 4){
            return <Qualification isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
        }else if(leaveTypeTable.key === 5){
            return <Holiday isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
        }else {
            return <LeaveEntitlement isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
        }
    }

    useEffect(() => {
        setSpinning(true);
        setTimeout(() => {
            setSpinning(false);
        }, 500);
    }, [leaveTypeTable]);

    return (
        <>
            <Spin spinning={spinning} fullscreen tip="Loading" size="large"/>
            <Layout className="with-background hrms-settings">
                <Title level={4} className='hrms-settings__page-header'>
                    Leave Setup & Request
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
                            <Tooltip title="Add" color={"blue"} key={"blue"}>
                                <Button
                                    type="primary"
                                    icon={<PlusCircleOutlined/>}
                                    onClick={() => setIsModalOpen(true)}
                                />
                            </Tooltip>
                        </Flex>
                        {<LeaveComponentRender/>}
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default LeaveIndex;
