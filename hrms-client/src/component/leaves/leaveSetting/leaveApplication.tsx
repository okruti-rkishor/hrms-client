import React, {useEffect, useRef, useState} from "react";
import {Button, DatePicker, Form, Input, Layout, Select, TableColumnsType, Tag, Tooltip} from "antd";
import rest from "../../../services/http/api";
import CommonTableComponent from "../../setting/CommonTableComponent";
import {Holiday_Type, Leave_Type} from "../../../constant/constant"
import {PlusCircleOutlined} from "@ant-design/icons/lib";
import "../../../styles/component/leaveApplication.scss";

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

    const setIntitalMentId = async ()=>{
        try {
            const tempEntId = await rest.getEntitlementByEmpLeaveType(applicant?.id, applicant?.leaveType);
            console.log("tempEntId", tempEntId);
            setApplicant((prev:any)=>({...prev,emtitlementId:tempEntId.id}))
            EntitlementId.current = tempEntId.id
        }catch (e) {
            console.log(e);
        }
    }

    const fetchAllLeaveRequests = async()=>{
        try {
            const allEmp = await rest.getAllEmployee();
            const response = await rest.searchLeave();
            const fullLeaveRequests = response.map((leaveRequest:any,index:number)=>{
                const found = allEmp.find((employee:any)=>leaveRequest.employeeId===employee.id)
                return{
                    ...leaveRequest,name:found?.name?.firstName+" "+ found?.name?.lastName,reason:leaveRequest.reason.length>7?leaveRequest.reason.substring(0,7)+ "...":leaveRequest.reason
                }
            })
            console.log(fullLeaveRequests);
            return(fullLeaveRequests);

        }catch (e) {
           console.log(e)
        }
    }
    // fetchAllLeaveRequests();

    useEffect(()=>{
        fetchAllLeaveRequests()
    },[])

    const columns: TableColumnsType<DataType> = [
        {
            title: 'Sr. No',
            dataIndex: 'key',
        },
        {
            title: 'Emp Name',
            dataIndex: 'name',
        },{
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
            title: 'Days',
            dataIndex: 'requestedDays',
        },
        {
            title: 'Leave Status',
            dataIndex: 'leaveStatus',
            render: (_) => (
                <>
                    {
                        <Tag color={_ === "Pending " ? 'red' : _ === "Approved " ?'green':"blue"}>
                            {`${_.toUpperCase()}`}
                        </Tag>
                    }
                </>
            ),
        },
        {
            title: 'Reason',
            dataIndex: 'reason',
        },
    ];
    const propsData = {
        title: "Leave Application",
        create: rest.createLeave,
        getAll: fetchAllLeaveRequests,
        delete: rest.deleteLeaveRequest,
        update: rest.updateDesignationStatus,//todo
        isModalOpen: isModalOpen,
        setIsModalOpen: setIsModalOpen,
        columns: columns,
        deleteById: rest.deleteLeaveRequest,
        showStatus: true,
        formFields: [
            <Form.Item
                label="Employee"
                name={"employeeId"}
                initialValue={"-Select-"}
                rules={[{ required: true, message: 'Please input Employee Id!' }]}>
                <Select
                    onChange={(e)=>setApplicant((prev:any)=>({...prev,id:e}))}
                >
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
                    onChange={(e)=>setApplicant((prev:any)=>({...prev,leaveType:e}))}>
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


    return (
        <div className={"leave-list_table_data leave-application"}>
            <Tooltip title="Add" color={"blue"} key={"blue"}>
                <Button
                    type="primary"
                    icon={<PlusCircleOutlined/>}
                    onClick={() => setIsModalOpen(true)}
                    className={"leave-list_table_data_button"}
                    style={{display:"none"}}
                />
            </Tooltip>
            <Layout className="with-background leaves-type">
                <CommonTableComponent propsData={propsData}/>
            </Layout>
        </div>
    )
}
export default LeaveApplication;