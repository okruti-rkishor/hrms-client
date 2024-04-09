import React, {useEffect, useState} from 'react';
import {Table, Button, Flex, Layout, Modal, Form, Input, Select, Popconfirm, Tooltip} from 'antd';
import type {TableColumnsType} from 'antd';
import './leaves.scss'
import {toast} from "react-toastify";
import rest from "../../../services/http/api"

import {
    BookOutlined,
    CalendarOutlined,
    DeleteOutlined,
    ProfileOutlined,
    RightOutlined,
    UsergroupAddOutlined,
    CloseCircleOutlined,

} from "@ant-design/icons/lib";
import {capitalToSmall, removeUnderScore} from "../../holiday/holidayList";

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}

function LeavesType() {
    // const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const [allData, setAllData] = useState<any>();
    // const [activationStatus, setActivationStatus] = useState(true);
    const leavesRecord = {
        paidType: [
            {value: 'PAID', label: 'Paid'},
            {value: 'UN_PAID', label: 'Unpaid'},
        ],


    }
    const {TextArea} = Input;

    const handleOk = async () => {
        console.log(formData);
        const keys = Object.keys(formData)
        if (keys.length === 3) {
            try {
                await rest.leaveTypeCreate(formData)
                fetchData();
                setIsModalOpen(false);
            } catch {

            }
        } else {
            toast("Fill All Fields")
        }
    };
    const onChangeFormData = (e: any) => {
        let tempData = {}
        if (e?.target?.name === "type") {
            tempData = {
                ...formData,
                [e?.target?.name]: String(e?.target?.value).toLocaleUpperCase().replace(" ", "_")
            }
        } else {
            tempData = {
                ...formData,
                [e?.target?.name]: String(e?.target?.value)
            }
        }
        setFormData({...tempData});
        console.log("tempData", tempData);
    }
    const fetchData = async () => {
        try {
            const leaveTypes = await rest.getAllLeaveTypes();
            setAllData(leaveTypes.map((item: any, index: number) => ({
                ...item,
                key: item.id,
                type: removeUnderScore(String(item.type), "_"),
                paidType: removeUnderScore(String(item.paidType), "_"),
                description: capitalToSmall(String(item.description))
            })))
            console.log(leaveTypes);
        } catch (e) {

        }
    }
    const deleteHandel = async (record: any) => {
        try {
            await rest.leaveTypeDelete(record.id);
            fetchData()
        } catch (error) {
            console.log(error);
        }
    };
    // const statusHandel = async (record: any) => {
    //     try {
    //         if (activationStatus) {
    //             await rest.updateLeaveType(false,record.id)
    //             console.log("DeActivate Done")
    //             setActivationStatus(prev => !prev);
    //         } else {
    //             await rest.updateLeaveType(true,record.id)
    //             console.log("Activate")
    //             setActivationStatus(prev => !prev);
    //         }
    //     }catch (e) {
    //
    //     }
    //
    // }
    const columns: TableColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'type',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: 'Paid Type',
            dataIndex: 'paidType',
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Action',
            render: (_: any, record: any) =>
                <>
                    <Popconfirm
                        title="Are you sure to delete?"
                        onConfirm={() => deleteHandel(record)}
                        onCancel={() => {
                            console.log("Cancel")
                        }}
                    >
                        {" "}
                        <DeleteOutlined className={"search-table delete-button"}/>
                    </Popconfirm>
                {/*    <Popconfirm*/}
                {/*        title={activationStatus ? "Are you sure to Deactivate?" : "Are you sure to activate?"}*/}
                {/*        onConfirm={() => statusHandel(record)}*/}
                {/*        onCancel={() => {*/}
                {/*            console.log("Cancel")*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        {" "}*/}
                {/*        {activationStatus ? <Tooltip title="DeActivate" color={"red"} key={"red"}>*/}
                {/*            <CloseCircleOutlined/>*/}
                {/*        </Tooltip> : <Tooltip title="Activate" color={"green"} key={"green"}>*/}
                {/*            <CheckCircleOutlined className={"search-table delete-button"}/>*/}
                {/*        </Tooltip>}*/}
                {/*    </Popconfirm>*/}
                {/**/}
                </>
        },
    ];
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
            <Layout className="with-background leaves-type">
                <div className="leave-list">
                    <div className="leave-list_item">
                        <ul>
                            <li>
                                <a>
                                    <CalendarOutlined/>
                                    <span>Work Weeks</span>
                                    <RightOutlined/>
                                </a>

                            </li>
                            <li>
                                <a>
                                    <ProfileOutlined/>
                                    <a>Leave Types</a>
                                    <RightOutlined/>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <UsergroupAddOutlined/>
                                    <a>Designation</a>
                                    <RightOutlined/>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <BookOutlined/>
                                    <a>Qualification</a>
                                    <RightOutlined/>
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
                                icon={<CloseCircleOutlined/>}
                                onClick={() => setIsModalOpen(true)}
                            />
                        </Flex>

                        <Modal title="Create Leave Type" open={isModalOpen} onCancel={handleCancel} onOk={handleOk}>
                            <Form
                                layout="horizontal"
                            >
                                <Form.Item
                                    label="Leave Type"
                                    name="type"
                                    rules={[{required: true, message: 'Please input Leave Type!'}]}>
                                    {/*<Input name="leaveType" onChange={onChangeFormData}/>*/}
                                    <Input
                                        placeholder={"Enter Leave Name"}
                                        name={"type"}
                                        onChange={onChangeFormData}
                                    />

                                </Form.Item>
                                <Form.Item
                                    label="Paid Type"
                                    name={"paidType"}
                                    rules={[{required: true, message: 'Please input Paid Type!'}]}>
                                    <Select
                                        style={{height: 40, width: 272}}

                                        onChange={(e) => {
                                            onChangeFormData({target: {name: "paidType", value: e}})
                                        }}
                                    >
                                        {leavesRecord.paidType.map((item: any) => (
                                            <option key={item.value} value={item.value}>{item.label}</option>))}
                                    </Select>
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
                                </Form.Item>

                            </Form>

                        </Modal>
                        <Table
                            // style={{textAlign:"left",width:800}}
                            size={"small"}
                            columns={columns}
                            dataSource={allData}
                        />
                    </div>
                </div>
                {/*</div>*/}
            </Layout>
        </>
    );
}

export default LeavesType;


