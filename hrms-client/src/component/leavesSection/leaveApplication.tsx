import React, {useEffect, useRef, useState} from "react";


import {Button, DatePicker, Form, Input, Layout, Select, TableColumnsType, Tooltip} from "antd";
import rest from "../../services/http/api";
import CommonTableComponant from "../setting/CommonTableComponant";
import {Holiday_Type, Leave_Type} from "../../constant/constant"
import {PlusCircleOutlined} from "@ant-design/icons/lib";

interface DataType {
    key: React.Key;
    description: string;
    code: string;
    status: string;
}
interface IApplicant {
    id: string;
    leaveType: string;
    emtitlementId: string;
}


const LeaveApplication = () => {
    const [employeeList, setEmployeeList] = useState<any[]>([]);
    const [applicant, setApplicant] = useState<IApplicant>({
        id:"",
        leaveType:"",
        emtitlementId:""
    });
    const EntitlementId = useRef();

    const [isModalOpen,setIsModalOpen]=useState(false);

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
    const setIntitalMentId = async ()=>{
        try {
            const tempEntId = await rest.getIntitlementByEmpLeaveType(applicant?.id, applicant?.leaveType);
            console.log("tempEntId", tempEntId);
            setApplicant((prev:any)=>({...prev,emtitlementId:tempEntId.id}))
            EntitlementId.current = tempEntId.id
        }catch (e) {
            console.log(e);
        }
    }
    const columns: TableColumnsType<DataType> = [
        {
            title: 'Sr. No',
            dataIndex: 'key',
        },
        {
            title: 'Leave Type',
            dataIndex: 'leaveType',
        },
        {
            title: 'Start Date',
            dataIndex: 'startDate',
        },
        {
            title: 'End Date',
            dataIndex: 'endDate',
        },
        {
            title: 'Requested Days',
            dataIndex: 'requestedDays',
        },
        {
            title: 'Leave Status',
            dataIndex: 'leaveStatus',
        },
        {
            title: 'Reason',
            dataIndex: 'reason',
        },
        // {
        //     title: 'Reason',
        //     dataIndex: 'reason',
        // },
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
                name={"employeeId"}
                initialValue={"-Select-"}
                rules={[{ required: true, message: 'Please input Employee Id!' }]}>
                <Select
                    onChange={(e)=>setApplicant((prev:any)=>({...prev,id:e}))}
                    style={{ height: 40, width: 272 }}>
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
                    onChange={(e)=>setApplicant((prev:any)=>({...prev,leaveType:e}))}
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
                    onChange={(e)=>{
                        setIntitalMentId()
                    }}
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
                // ref={EntitlementId}
                label="EntitlementId Id"
                name={"entitlementId"}
                initialValue={EntitlementId.current}
                rules={[{ required: true, message: 'Please input Employee Id!' }]}>
                <Input name={"intitelmentId"}  />
            </Form.Item>,
        ],
        formFieldsType:[{startDate:Date},{endDate:Date},{leaveType:String},{reason:String}]

    }

    useEffect(()=>{
        getEntitlementData();
    },[])

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
export default LeaveApplication;