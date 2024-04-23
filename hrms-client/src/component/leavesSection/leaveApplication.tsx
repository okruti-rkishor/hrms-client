import React from "react";


import {DatePicker, Form, Input, Select, TableColumnsType} from "antd";
import rest from "../../services/http/api";
import CommonTableComponant from "../leave/CommonTableComponant";
import {Holiday_Type, Leave_Type} from "../../constant/constant"

interface DataType {
    key: React.Key;
    description: string;
    code: string;
    status: string;
}

const LeaveApplication = ({isModalOpen, setIsModalOpen}: any) => {
    const columns: TableColumnsType<DataType> = [
        {
            title: 'Leave Type',
            dataIndex: 'leaveType',
        },
        {
            title: 'Start Date',
            dataIndex: 'startDate',
        },{
            title: 'End Date',
            dataIndex: 'endDate',
        },
        {
            title: 'Reason',
            dataIndex: 'reason',
        },
    ];
    const propsData = {
        title: "Designation",
        create: rest.createLeave,
        getAll: rest.getAllDesignation,//todo
        delete: rest.deleteDesignation,//todo
        update: rest.updateDesignationStatus,//todo
        isModalOpen: isModalOpen,
        setIsModalOpen: setIsModalOpen,
        columns: columns,//todo
        deleteById: rest.deleteDesignation,//todo
        showStatus: false,
        formFields: [
            <Form.Item
                label="leaveType"
                name="leaveType"
                initialValue={"SICK_LEAVE"}
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
                label="Start Date"
                name="startDate"
                // initialValue={"SICK_LEAVE"}
                rules={[{required: true, message: 'Please input StartDate!'}]}>
                <DatePicker
                    name="startDate"
                    maxTagCount="responsive"
                    size="large"
                />
            </Form.Item>,<Form.Item
                label="End Date"
                name="endDate"
                // initialValue={"SICK_LEAVE"}
                rules={[{required: true, message: 'Please input End Date!'}]}>
                <DatePicker
                    name="endtDate"
                    maxTagCount="responsive"
                    size="large"
                />
            </Form.Item>,


            <Form.Item
                label="Reason"
                name={"reason"}
                rules={[{required: true, message: 'Please input Reason!'}]}>
                <Input name={"reason"}/>
            </Form.Item>,],
        formFieldsType:[{startDate:Date},{endDate:Date},{leaveType:String},{reason:String}]

    }

    return (
        <div>
            <CommonTableComponant propsData={propsData}/>
        </div>
    )
}
export default LeaveApplication;