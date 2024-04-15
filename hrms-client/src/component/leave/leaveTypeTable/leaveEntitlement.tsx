import {Form, Input, Modal, Popconfirm, Table, TableColumnsType} from "antd";
import React, {useEffect, useState} from "react";
import rest from "../../../services/http/api";
import {toast} from "react-toastify";
import {capitalToSmall, removeUnderScore} from "../../holiday/holidayList";
import {DeleteOutlined} from "@ant-design/icons/lib";
import CommonTableComponant from "../CommonTableComponant";

interface DataType {
    key: React.Key;
    type: string;
    unit: number;
    employee: string;
}

const LeaveEntitlement = ({isModalOpen, setIsModalOpen}: any) => {
    const columns: TableColumnsType<DataType> = [
        {
            title: 'Type',
            dataIndex: 'type',
        },
        {
            title: 'Unit',
            dataIndex: 'unit',
        },
        {
            title: 'Employee',
            dataIndex: 'employee',
        },
    ];

    const propsData = {
        title: "Leave Entitlement",
        create: rest.leaveEntitlementCreate,
        getAll: rest.getAllLeaveEntitlement,
        delete: rest.deleteLeaveEntitlement,
        isModalOpen: isModalOpen,
        setIsModalOpen: setIsModalOpen,
        columns: columns,
        formFields: [<Form.Item
            label="Type"
            name="type"
            rules={[{required: true, message: 'Please input Type!'}]}>
            <Input name="type"/>
        </Form.Item>,
            <Form.Item
                label="Unit"
                name={"unit"}
                rules={[{required: true, message: 'Please input Unit!'}]}>
                <Input name={"unit"}/>
            </Form.Item>,
            <Form.Item
                label="Employee Id"
                name={"employee"}
                rules={[{required: true, message: 'Please input Employee Id!'}]}>
                <Input name={"employee"}/>
            </Form.Item>],

    }

    return (
        <div>
            <CommonTableComponant propsData={propsData}/>
        </div>
    )
}
export default LeaveEntitlement;