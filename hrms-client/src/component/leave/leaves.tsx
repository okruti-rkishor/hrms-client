import React, {useEffect, useState} from 'react';
import {Button, Flex, Layout, Spin, Tooltip} from 'antd';
import {PlusCircleOutlined} from '@ant-design/icons';
import '../../styles/component/leaves.scss'
import {
    BookOutlined,
    CalendarOutlined, CaretLeftOutlined, LeftOutlined,
    ProfileOutlined,
    RightOutlined, UsergroupAddOutlined
} from "@ant-design/icons/lib";
import LeaveType from "./leaveTypeTable/leaveType";
import WorkWeek from "./leaveTypeTable/workWeek";
import Title from "antd/lib/typography/Title";
import {useNavigate} from "react-router-dom"
import LeaveEntitlement from "./leaveTypeTable/leaveEntitlement";
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
        leftIcon: <CalendarOutlined />,
        rightIcon: <RightOutlined/>,
        className: "designation",
    },


]

function Leaves() {
    const [leaveTypeTable, setLeaveTypeTable] = useState({
        key: 2,
        label: "Leave Types",
        leftIcon: <ProfileOutlined/>,
        rightIcon: <RightOutlined/>,
        className: "leave-types",
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
            return <WorkWeek isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
        }else if(leaveTypeTable.key === 2) {
            return <LeaveType isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
        }else if(leaveTypeTable.key === 3) {
            return <Designation isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
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
                {/*<a onClick={() => navigate(-1)} className={"with-background hrms-settings__icon"}>*/}
                {/*    <CaretLeftOutlined/>*/}
                {/*    <span>Back</span>*/}
                {/*</a>*/}
                <Title level={4} className='hrms-settings__page-header'>
                    Attendance & Leave Setup
                </Title>
                <div className="leave-list">
                    <div className="leave-list_item">
                        <LeaveSidebar/>
                    </div>
                    <div className="leave-list_table">
                        <Flex justify={"space-between"} align={"center"} className={"leave-list_table_flex"}>
                            <div className={"devider"}>
                                <h2>{leaveTypeTable.label}</h2>
                                {/*<p>The below table shows the list of {leaveTypeTable.label}.</p>*/}
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
                {/*</div>*/}
            </Layout>
        </>
    );
}

export default Leaves;


