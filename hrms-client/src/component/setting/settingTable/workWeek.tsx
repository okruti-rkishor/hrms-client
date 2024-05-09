import {Button, Flex, Form, Input, Layout, Modal, Popconfirm, Select, Table, TableColumnsType, Tooltip} from "antd";
import React, {useEffect, useState} from "react";
import rest from "../../../services/http/api";
import {toast} from "react-toastify";
import {capitalToSmall, removeUnderScore} from "../../holiday/holidayList";
import {DeleteOutlined, PlusCircleOutlined} from "@ant-design/icons/lib";
import CommonTableComponant from "../CommonTableComponant";
import {Leave_Type_Status, Week_Days} from "../../../constant/constant"

interface DataType {
    key: React.Key;
    day: string;
    status: string;
}

const WorkWeek = () => {
    const [isModalOpen,setIsModalOpen]=useState(false);
    //console.log("1111111");
    const columns: TableColumnsType<DataType> = [
        {
            title: 'Sr. No',
            dataIndex: 'key',
            align:"center",
            width: '7%',
        },
        {
            title: 'Day',
            dataIndex: 'day',
            align:"center",
        },
        {
            title: 'Status',
            dataIndex: 'status',
            align:"center",
        },
    ];

    const workWeekDayOptations = () => {
        const keys = Object.keys(Week_Days) as Array<keyof typeof Week_Days>;
        // const keys = Object.keys(Leave_Type_Status)
        const optations = keys.map((status: keyof typeof Week_Days) => {
            return {
                value: status, label: Week_Days[status]
            }
        })
        return optations;
    }

    const workWeekStatusOptations = () => {
        const keys = Object.keys(Leave_Type_Status) as Array<keyof typeof Leave_Type_Status>;
        // const keys = Object.keys(Leave_Type_Status)
        const optations = keys.map((status: keyof typeof Leave_Type_Status) => {
            return {
                value: status, label: Leave_Type_Status[status]
            }
        })
        return optations;
    }

    const propsData = {
        title: "Work Week",
        create: rest.workWeekCreate,
        getAll: rest.getAllWorkWeek,
        delete: rest.deleteWorkWeek,
        isModalOpen: isModalOpen,
        setIsModalOpen: setIsModalOpen,
        columns: columns,
        deleteById: rest.deleteWorkWeek,
        formFields: [<Form.Item
            label="Day"
            name="day"
            rules={[{required: true, message: 'Please input Day!'}]}
            initialValue={"-Select-"}>
            <Select
            >
                {workWeekDayOptations().map((optation: any) => <option key={optation.label} defaultValue={"MONDAY"}
                                                                       value={optation.value}>{optation.label}</option>)}
            </Select>
        </Form.Item>,
            <Form.Item
                label="Status"
                name={"status"}
                rules={[{required: true, message: 'Please input Status!'}]}
                initialValue={"-Select-"}>
                <Select>
                    {workWeekStatusOptations().map((optation: any) => <option key={optation.label}
                                                                              value={optation.value}>{optation.label}</option>)}
                </Select>
            </Form.Item>],
        formFieldsType: [
            {name: "day", type: "string"},
            {name: "status", type: "string"}
        ]
    }

    return (
        <div className={"leave-list_table_data"}>
            <Tooltip title="Add" color={"blue"} key={"blue"}>
                <Button
                    type="primary"
                    icon={<PlusCircleOutlined/>}
                    onClick={() => setIsModalOpen(true)}
                    className={"leave-list_table_data_button"}
                />
            </Tooltip>
            <Layout className="with-background leaves-type">
                <CommonTableComponant propsData={propsData}/>
            </Layout>
        </div>

    )
}
export default WorkWeek;