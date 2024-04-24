import {Form, Input, Select, TableColumnsType} from "antd";
import rest from "../../../services/http/api";
import CommonTableComponant from "../CommonTableComponant";
import React, {useEffect, useState} from "react";
import {Leave_Type} from "../../../constant/constant";

interface DataType {
    key: React.Key;
    type: string;
    unit: number;
    employee: string;
}

const LeaveEntitlement = ({isModalOpen, setIsModalOpen}: any) => {
    const [employees, setEmployees] = useState([]);
    const [employeeList, setEmployeeList] = useState([]);
    const columns: TableColumnsType<DataType> = [
        {
            title: 'Sr. No',
            dataIndex: 'key',
            align:"center",
            width: '7%',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            align:"center",
        },
        {
            title: 'Type',
            dataIndex: 'type',
            align:"center",
        },
        {
            title: 'Unit',
            dataIndex: 'unit',
            align:"center",
        },

    ];

    const getEntitlementData = async () => {
        try {
            const allEmployees = await rest.getAllEmployee();
            const tempLeaveEntitlement = await rest.getAllLeaveEntitlement();
            const newTempLeaveEntitlement = tempLeaveEntitlement.map((item: any) => {
                    const employee: any = allEmployees.find((employee: any) => (employee.id === item.employee));
                    const returnData = {
                        ...item,
                        name: employee?.name?.firstName + " " +  employee?.name?.lastName
                    }
                    console.log("returnData", returnData);
                    return returnData;
                }
            )
            console.log("newTempLeaveEntitlement", newTempLeaveEntitlement);
            return newTempLeaveEntitlement;
        } catch (e) {
            console.log(e)
        }
    }

    const getAllEmployee = async () => {
        try {
            const allEmployees = await rest.getAllEmployee();

            setEmployeeList(allEmployees.map((employee: any) => {
                    const temp = {
                        name: employee.name.firstName + " " + employee.name.lastName,
                        id: employee.id
                    }
                    console.log("temp leave entilment", temp)
                    return temp
                }
            ));
        } catch (e) {
            console.log(e)
        }

    }

    useEffect(() => {
        // fetch All employee
        getAllEmployee();
    }, [])

    const propsData = {
        title: "Leave Entitlement",
        create: rest.leaveEntitlementCreate,
        getAll: getEntitlementData,
        delete: rest.deleteLeaveEntitlement,
        isModalOpen: isModalOpen,
        setIsModalOpen: setIsModalOpen,
        columns: columns,
        deleteById: rest.deleteLeaveEntitlement,
        formFields: [
            <Form.Item
                label="Leave Type"
                name="type"
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
                label="Unit"
                name={"unit"}
                rules={[{required: true, message: 'Please input Unit!'}]}>
                <Input name={"unit"}/>
            </Form.Item>,
            <Form.Item
                label="Employee"
                name={"employee"}
                rules={[{required: true, message: 'Please input Employee Id!'}]}>
                <Select
                    style={{height: 40, width: 272}}>
                    {employeeList.map((employee: any) =>
                        <Select.Option value={employee.id} key={employee.id}>
                            {employee.name}
                        </Select.Option>)}
                </Select>
            </Form.Item>,],
    }

    return (
        <div>
            <CommonTableComponant propsData={propsData}/>
        </div>
    )
}
export default LeaveEntitlement;