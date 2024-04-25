import {Form, Input, Modal, Popconfirm, Select, Table, TableColumnsType} from "antd";
import React, {useEffect, useState} from "react";
import rest from "../../../services/http/api";
import {toast} from "react-toastify";
import {capitalToSmall, removeUnderScore} from "../../holiday/holidayList";
import {DeleteOutlined} from "@ant-design/icons/lib";
import CommonTableComponant from "../CommonTableComponant";
import {Leave_Type_Status, Week_Days} from "../../../constant/constant"

interface DataType {
    key: React.Key;
    day: string;
    status: string;
}

const WorkWeek = ({isModalOpen, setIsModalOpen}: any) => {
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
        formInputs: [
            {
                value:"day",
                type:"string",
                tagType:"select"
            },
            {
                value:"status",
                type:"string",
                tagType:"select"
            },
        ]

    }

    return (
        <div>
            <CommonTableComponant propsData={propsData}/>
        </div>
    )
}
export default WorkWeek;