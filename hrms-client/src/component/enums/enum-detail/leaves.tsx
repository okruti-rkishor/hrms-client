import React, {useState} from 'react';
import {Divider, Radio, Table, Button, Flex, Layout, Card, Modal, Form, Input, Menu} from 'antd';
import type {TableColumnsType} from 'antd';
import {PlusCircleOutlined} from '@ant-design/icons';
import {Simulate} from "react-dom/test-utils";
import submit = Simulate.submit;
import './leaves.scss'
import {toast} from "react-toastify";
import rest from "../../../services/http/api"
import {
    BookOutlined,
    CalendarOutlined,
    ProfileOutlined,
    RightOutlined,
    ScheduleOutlined,
    UploadOutlined, UsergroupAddOutlined,
    UserOutlined,
    VideoCameraOutlined
} from "@ant-design/icons/lib";
import Sider from "antd/es/layout/Sider";

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}

interface FormData {
    leaveType: string;
    paidType: string;
    description: string;
}

const columns: TableColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'name',
        render: (text: string) => <a>{text}</a>,
    },
    {
        title: 'Age',
        dataIndex: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
];
const data: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'Disabled User',
        age: 99,
        address: 'Sydney No. 1 Lake Park',
    },
];

function LeavesType() {
    const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const [collapsed, setCollapsed] = useState(false);
    const {TextArea} = Input;
    const handleOk = async() => {
        console.log(formData);
        const keys = Object.keys(formData)
        if(keys.length===3){
            try{
                await rest.leaveTypeCreate(formData)
                setIsModalOpen(false);
            }catch{

            }
        }else{
            toast("Fill All Fields")
        }
    };

    const onChangeFormData = (e: any) => {
        const tempData = {...formData, [e.target.name]: e.target.value}
        setFormData(prev => ({...prev, ...tempData}));
        console.log("tempData", tempData);


    }

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    // const leaveTypeFormSubmit = (values: any) => {
    //     console.log(values)
    //     setIsModalOpen(false);
    // }

    return (
        <>
            <Layout className="with-background leaves-type">

                <div className="leave-list">
                    <div className="leave-list_item">
                        <ul>
                            <li>
                                <a>
                                    <CalendarOutlined />
                                    <span>Work Weeks</span>
                                    <RightOutlined />
                                </a>

                            </li>
                            <li>
                                <a>
                                    <ProfileOutlined />
                                    <a>Leave Types</a>
                                    <RightOutlined />
                                </a>
                            </li>
                            <li>
                                <a>
                                    <UsergroupAddOutlined />
                                    <a>Designation</a>
                                    <RightOutlined />
                                </a>
                            </li>
                            <li>
                                <a>
                                    <BookOutlined />
                                    <a>Qualification</a>
                                    <RightOutlined />
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="leave-list_table">
                    <Flex justify={"space-between"} align={"center"}>
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


                    <Modal title="Create Leave Type" open={isModalOpen} onCancel={handleCancel} onOk={handleOk}>
                        <Form
                            layout="horizontal"
                        >
                            <Form.Item
                                label="Leave Type"
                                name="leaveType"
                                rules={[{required: true, message: 'Please input Leave Type!'}]}>
                                <Input name="leaveType" onChange={onChangeFormData}/>
                            </Form.Item>
                            <Form.Item
                                label="Paid Type"
                                name={"paidType"}
                                rules={[{required: true, message: 'Please input Paid Type!'}]}>
                                <Input name={"paidType"} onChange={onChangeFormData}/>
                            </Form.Item>
                            <Form.Item label="Description" name={"description"}>
                                <TextArea
                                    name={"description"}
                                    showCount
                                    maxLength={50}
                                    style={{height: 50}}
                                    onChange={onChangeFormData}
                                    placeholder="Description"
                                />
                                {/*<Input/>*/}
                            </Form.Item>

                        </Form>

                    </Modal>
                    <Table
                        size={"middle"}
                        columns={columns}
                        dataSource={data}
                    />
                    </div>
                </div>
                {/*</div>*/}
            </Layout>
        </>
    );
}

export default LeavesType;


