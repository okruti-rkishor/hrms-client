import {Form, Input, TableColumnsType} from "antd";
import rest from "../../../services/http/api";
import CommonTableComponant from "../CommonTableComponant";
import {useEffect, useState} from "react";

interface DataType {
    key: React.Key;
    type: string;
    unit: number;
    employee: string;
}

const LeaveEntitlement = ({isModalOpen, setIsModalOpen}: any) => {
    const [employees, setEmployees] = useState([]);
    const columns: TableColumnsType<DataType> = [
        {
            title: 'Sr. No',
            dataIndex: 'key',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Type',
            dataIndex: 'type',
        },
        {
            title: 'Unit',
            dataIndex: 'unit',
        },

    ];
    const getEntitlementData = async ()=>{
        try {
            const allEmployees = await rest.getAllEmployee();
            const tempLeaveEntitlement = await rest.getAllLeaveEntitlement();
            const newTempLeaveEntitlement = tempLeaveEntitlement.map((item:any)=>{
                const employee:any = allEmployees.find((employee:any)=>(employee.id===item.employee));
                const returnData = {
                    ...item,
                    name:employee?.name?.firstName+" "+employee?.name?.middleName+" "+employee?.name?.lastName
                }
                console.log("returnData", returnData);
                    return returnData;
            }
            )
            console.log("newTempLeaveEntitlement", newTempLeaveEntitlement);
            return newTempLeaveEntitlement;
        }catch (e) {
            console.log(e)
        }
    }

    const propsData = {
        title: "Leave Entitlement",
        create: rest.leaveEntitlementCreate,
        getAll: getEntitlementData,
        delete: rest.deleteLeaveEntitlement,
        isModalOpen: isModalOpen,
        setIsModalOpen: setIsModalOpen,
        columns: columns,
        deleteById: rest.deleteLeaveEntitlement,
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