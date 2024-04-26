import React, {useEffect, useState} from "react";


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

    const [employeeList, setEmployeeList] = useState<any[]>([]);
    const getEntitlementData = async () => {
        try {
            const allEmployees = await rest.getAllEmployee();
            const tempAllEmp = allEmployees.map((employee: any) => ({
                name: employee.name.firstName + " " + employee.name.lastName,
                id: employee.id
            }));
            setEmployeeList(tempAllEmp);
        } catch (e) {
            console.log(e);
        }
    };
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
        title: "Leave Application",
        create: rest.createLeave,
        getAll: rest.searchLeave,
        delete: rest.deleteDesignation,//todo
        update: rest.updateDesignationStatus,//todo
        isModalOpen: isModalOpen,
        setIsModalOpen: setIsModalOpen,
        columns: columns,//todo
        deleteById: rest.deleteDesignation,//todo
        showStatus: false,
        formFields: [
            <Form.Item
                label="Employee"
                name={"employee"}
                initialValue={"-Select-"}
                rules={[{ required: true, message: 'Please input Employee Id!' }]}>
                <Select style={{ height: 40, width: 272 }}>
                    {employeeList.map((employee: any) =>
                        <Select.Option value={employee.id} key={employee.id}>
                            {employee.name}
                        </Select.Option>)}
                </Select>
            </Form.Item>,
            <Form.Item
                label="leaveType"
                name="leaveType"
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
                label="Start Date"
                name="startDate"
                rules={[{required: true, message: 'Please input StartDate!'}]}>
                <DatePicker
                    name="startDate"
                    maxTagCount="responsive"
                    size="large"
                />
            </Form.Item>,
            <Form.Item
                label="End Date"
                name="endDate"
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
            </Form.Item>,
            <Form.Item
                label="IntitelmentId"
                name={"intitelmentId"}
                initialValue={"-Select-"}
                rules={[{ required: true, message: 'Please input Employee Id!' }]}>
                <Select style={{ height: 40, width: 272 }}>
                    {employeeList.map((employee: any) =>
                        <Select.Option value={employee.id} key={employee.id}>
                            {employee.name}
                        </Select.Option>)}
                </Select>
            </Form.Item>,
        ],
        formFieldsType:[{startDate:Date},{endDate:Date},{leaveType:String},{reason:String}]

    }

    useEffect(()=>{
        getEntitlementData();
    },[])

    return (
        <div>
            <CommonTableComponant propsData={propsData}/>
        </div>
    )
}
export default LeaveApplication;