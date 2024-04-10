import React, {useState} from 'react';
import { Button, Flex, Layout} from 'antd';
import {PlusCircleOutlined} from '@ant-design/icons';
import '../../styles/component/leaves.scss'
import {
    BookOutlined,
    CalendarOutlined,
    ProfileOutlined,
    RightOutlined, UsergroupAddOutlined
} from "@ant-design/icons/lib";
import LeaveType from "./leaveTypeTable/leaveType";
import WorkWeek from "./leaveTypeTable/workWeek";
import Title from "antd/lib/typography/Title";


const leaveSidebarItems:any = [
    {
        key: '1',
        label: <div>Work Weeks</div>,
        leftIcon: <CalendarOutlined />,
        rightIcon: <RightOutlined />,
        className: "work-weeks",
    },
    {
        key: '2',
        label: <div>Leave Types</div>,
        leftIcon: <ProfileOutlined />,
        rightIcon: <RightOutlined />,
        className: "leave-types",
    },
    {
        key: '3',
        label: <div>Designation</div>,
        leftIcon: <UsergroupAddOutlined />,
        rightIcon: <RightOutlined />,
        className: "designation",
    },
    {
        key: '4',
        label: <div>Qualification</div>,
        leftIcon: <BookOutlined />,
        rightIcon: <RightOutlined />,
        className: "qualification",
    }
]


function Leaves() {
    const [leaveTypeTable,setLeaveTypeTable]=useState("leaveType");
    const [isModalOpen, setIsModalOpen] = useState(false);

    function leaveItemClickable(item:any){
        console.log(item);
    }

    const LeaveSidebar = () => {
        return (
            <ul>
                {
                    leaveSidebarItems.map((item:any, key:any) => {
                        return (
                            <li id={item.key}
                                className= {`hrms-settings__sidebar-item ${item.className}`}
                                onClick={()=>leaveItemClickable(item)}>
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


    return (
        <>
            <Layout className="with-background hrms-settings">
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
                            <h2>Leave Types</h2>
                            <p>The below table shows the list of leave types.</p>
                        </div>
                        <Button
                            type="primary"
                            icon={<PlusCircleOutlined/>}
                            onClick={() => setIsModalOpen(true)}
                        />
                    </Flex>

                        {leaveTypeTable==="leaveType"?<LeaveType isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>:<WorkWeek isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>}

                    </div>
                </div>
                {/*</div>*/}
            </Layout>
        </>
    );
}

export default Leaves;


