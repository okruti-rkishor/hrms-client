import React, {useEffect, useState} from "react";
import {Form, Input, Layout, Modal, Popconfirm, Select, Table, TableColumnsType} from "antd";
import {DeleteOutlined} from "@ant-design/icons/lib";
import {capitalToSmall, removeUnderScore} from "../../holiday/holidayList";
import rest from '../../../services/http/api'
import CommonTableComponant from "../CommonTableComponant";

function LeavesType({isModalOpen, setIsModalOpen}: any) {
    const [allData, setAllData] = useState<any>();
    const leavesRecords = {
        paidType: [
            {value: 'PAID', label: 'Paid'},
            {value: 'UN_PAID', label: 'Unpaid'},
        ],
    }
    const {TextArea} = Input;

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
        } catch (e) {

        }
    }

    const columns: TableColumnsType<any> = [
        {
            title: 'Name',
            dataIndex: 'type',
        },
        {
            title: 'Paid Type',
            dataIndex: 'paidType',
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },

    ];

    const propsData = {
        title: "Work Week",
        create: rest.leaveTypeCreate,
        getAll: rest.getAllLeaveTypes,
        delete: rest.leaveTypeDelete,
        isModalOpen: isModalOpen,
        setIsModalOpen: setIsModalOpen,
        columns: columns,
        allData: allData,
        setAllData: setAllData,
        // fetchData: fetchData,
        deleteById:rest.leaveTypeDelete,
        formFields: [
            <Form.Item
                key={"type"}
                label={capitalToSmall("type")}
                name={"type"}
                rules={[{required: true, message: `Please input ${capitalToSmall(String("type"))}!`}]}>
                <Input name={"type"}/>
            </Form.Item>,

            <Form.Item
                label="Paid Type"
                name={"paidType"}
                rules={[{required: true, message: 'Please input Paid Type!'}]}>
                <Select
                    style={{height: 40, width: 272}}>
                    {leavesRecords.paidType.map((leavesRecords: any) => (
                        <option key={leavesRecords.value} value={leavesRecords.value}>{leavesRecords.label}</option>))}
                </Select>
            </Form.Item>,

            <Form.Item
                label={capitalToSmall("description")}
                name={"description"}
                rules={[{required: true, message: `Please input ${capitalToSmall(String("description"))}!`}]}>
                <TextArea
                    name={"description"}
                    showCount
                    maxLength={50}
                    style={{height: 50}}
                    placeholder="Description"
                />
            </Form.Item>
        ],
    }

    return (
        <>
            <Layout className="with-background leaves-type">
                <CommonTableComponant propsData={propsData}/>
            </Layout>
        </>
    )
}

export default LeavesType;