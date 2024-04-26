import React, {useEffect, useState} from "react";
import {Form, Input, Layout, Modal, Popconfirm, Select, Table, TableColumnsType, Tag} from "antd";
import {DeleteOutlined} from "@ant-design/icons/lib";
import {capitalToSmall, removeUnderScore} from "../../holiday/holidayList";
import rest from '../../../services/http/api'
import CommonTableComponant from "../CommonTableComponant";
import {Leave_Type} from "../../../constant/constant";

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
            title: 'Sr. No',
            dataIndex: 'key',
            align: "center",
            width: '7%',
        },
        {
            title: 'Name',
            dataIndex: 'type',
            align: "center",
        },
        {
            title: 'Paid Type',
            dataIndex: 'paidType',
            align: "center",
            render: (text) => {
                if (text.length > 5) return <Tag color={"blue"} key={text}>{text}</Tag>
                else return <Tag color={"green"} key={text}>{text}</Tag>
            }

        },
        {
            title: 'Description',
            dataIndex: 'description',
            align: "center",
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
        deleteById: rest.leaveTypeDelete,
        formFields: [
            <Form.Item
                label="Leave Type"
                name="type"
                initialValue={"-Select-"}
                rules={[{required: true, message: 'Please input Leave Type!'}]}>
                <Select
                    style={{height: 40, width: 272}}>
                    {(Object.keys(Leave_Type) as Array<keyof typeof Leave_Type>).map((key) =>
                        <Select.Option value={key} key={key}>
                            {Leave_Type[key]}
                        </Select.Option>
                    )}
                </Select>
            </Form.Item>,

            <Form.Item
                label="Paid Type"
                name={"paidType"}
                initialValue={"-Select-"}
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