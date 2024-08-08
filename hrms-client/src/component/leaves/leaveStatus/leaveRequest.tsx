import {
    Button,
    Card,
    DatePicker,
    Divider,
    Form,
    Input,
    Modal,
    Select,
    Table,
    TableColumnsType, Tag,
} from "antd";
import React, {useContext, useEffect, useRef, useState} from "react";
import rest from "../../../services/http/api";
import {
    PlusCircleOutlined
} from "@ant-design/icons/lib";
import dayjs from "dayjs";
import {Leave_Type,Leave_Duration} from "../../../constant/constant";
import UserLoginContext from "../../../context/userLoginContext";
import "../../../styles/component/leaves.scss";


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
    leaveDuration:string;
}

function LeaveRequest() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [isBalModalOpen, setIsBalModalOpen] = useState(false);
    const [allNewData, setAllNewData] = useState([]);
    const [employeeList, setEmployeeList] = useState([]);
    const [empId, setEmpId] = useState("");
    const [requestLeaves, setRequestLeaves] = useState<any[]>([]);
    const [applicant, setApplicant] = useState<IApplicant>({
        id: "",
        leaveType: "",
        emtitlementId: "",
        leaveDuration:""
    });
    const {newUser, setNewUser} = useContext(UserLoginContext);
    console.log("newUser", newUser);
    const newColumns: TableColumnsType<DataType> = [
        {
            title: 'Leave Type',
            dataIndex: 'type',
        },
        {
            title: 'Entitlement Unit',
            dataIndex: 'entitlementUnit',
        }, {
            title: 'Balance',
            dataIndex: 'balance',
        },
        {
            title: 'Used',
            dataIndex: 'used',
        },
    ];
    const leaveRequestColumn: TableColumnsType<DataType> = [
        {
            title: 'Sr. No',
            dataIndex: 'key',
            align:"center"
        },
        {
            title: 'Leave Type',
            dataIndex: 'leaveType',
            align:"center"
        },
        {
            title:'Leave Duration',
            dataIndex:'session',
            align:"center"
        },
        {
            title: 'Start Date',
            dataIndex: 'startDate',
            align:"center"
        },
        {
            title: 'End Date',
            dataIndex: 'endDate',
            align:"center"
        },
        {
            title: 'Days',
            dataIndex: 'requestedDays',
            width:"5%",
            align:"center"
        },
        {
            title: 'Reason',
            dataIndex: 'reason',
            align:"center",
        },
        {
            title: 'Leave Status',
            dataIndex: 'leaveStatus',
            align:"center",
            render: (_) => (
                <>
                    {
                        <Tag color={_ === "PENDING" ? 'red' : _ === "APPROVED" ?'green':"blue"}>
                            {`${_}`}
                        </Tag>
                    }
                </>
            ),
        },
    ];
    const title = "Holiday";
    const EntitlementId = useRef();
    const [form] = Form.useForm();

    const handleOk = async () => {
        console.log(form.getFieldError);
        let values = form.getFieldsValue();
        if (empId) {
            values.employeeId = empId
        }
        let startDateTemp = dayjs(values.startDate)
        let endDateTemp = dayjs(values.endDate)
        const startDate = startDateTemp.format("YYYY-MM-DD")
        const endDate = endDateTemp.format("YYYY-MM-DD")
        values.startDate = startDate
        values.endDate = endDate
        console.log(values);
        try {
           const tempEntId = await rest.getEntitlementByEmpLeaveType(values.employeeId, values?.leaveType);
           const id= (tempEntId.find((item:any)=>item.leaveType==applicant.leaveType)).id;
           values.entitlementId =id;
            await rest.createLeave(values, values.employeeId)
            setIsModalOpen(false)
            const tempAppliedLeaveObj: object = {
                ...values,
                leaveStatus: "PENDING",
                key:requestLeaves.length+1,
                requestedDays: parseInt(endDate.split("-")[2]) - parseInt(startDate.split("-")[2])
            }
            console.log("Start Here-", tempAppliedLeaveObj);
            console.log(requestLeaves);
            // const addRequestTemp = [...requestLeaves, values];
            setRequestLeaves([...requestLeaves, tempAppliedLeaveObj]);

        } catch (e) {
            console.log(e)
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const getEntitlementData = async () => {
        try {
            const allEmployees = await rest.getAllEmployee();
            const tempAllEmp = allEmployees.map((employee: any) => ({
                name: employee.name.firstName + " " + employee.name.lastName,
                id: employee.id
            }));
            setEmployeeList(tempAllEmp);
            //find logedin employee if employee available otherwise empty object
            const tempFinded = allEmployees.find((item: any) => item?.officialEmail === newUser?.email) || {};
            setEmpId(tempFinded.id);
            console.log(tempFinded);
            //find all leaves for particilar employee no provide leaveType
            if(tempFinded.id){
                let remainingLeaves = await rest.getLeaveBalance(tempFinded.id);
                // remainingLeaves = remainingLeaves.map((leaveRequestItem:any)=>{
                //     return {
                //         ...leaveRequestItem,reason:leaveRequestItem.reason.length>10?leaveRequestItem.reason.substring(0,7)+ "...":leaveRequestItem.reason
                //     }
                // })
                setAllNewData(remainingLeaves)
                let requestedLeavesTemp = await rest.getLeaveRequest(tempFinded.id);
                requestedLeavesTemp = requestedLeavesTemp.map((leave:any,index:number)=>({...leave,key:index+1}))
                setRequestLeaves(requestedLeavesTemp);
            }else{

            }

        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        console.log("newUser UseEffect", newUser);
        if(newUser?.email){
            getEntitlementData();
        }
    }, [newUser?.email]);

    return (<>
        <div className="hrms__leave-request" style={{width: "90%", margin: "40px auto"}}>
            <Modal
                title={`Add Leave`}
                open={isModalOpen}
                onCancel={handleCancel}
                onOk={handleOk}
                okButtonProps={{disabled: buttonDisabled}}
                className="leave-modal"
            >
                <Card>
                    <Form
                        form={form}
                        layout="horizontal"
                        onFieldsChange={() =>
                            setButtonDisabled(
                                !form.isFieldsTouched(true) ||
                                !!form.getFieldsError().filter(({errors}) => errors.length).length
                            )
                        }>
                        {!(empId) && <Form.Item
                            label="Employee"
                            name={"employeeId"}
                            initialValue={"-Select-"}
                            rules={[{required: true, message: 'Please input Employee Id!'}]}
                            >
                            <Select
                                onChange={(e) => setApplicant((prev: any) => ({...prev, id: e}))}
                                style={{height: 40, width: 272}}>
                                {employeeList.map((employee: any) =>
                                    <Select.Option value={employee.id} key={employee.id}>
                                        {employee.name}
                                    </Select.Option>)}
                            </Select>
                        </Form.Item>}
                        <Form.Item
                            label="leaveType"
                            name="leaveType"
                            initialValue={"-Select-"}
                            rules={[{required: true, message: 'Please input Leave Type!'}]}>
                            <Select
                                onChange={(e) => setApplicant((prev: any) => ({...prev, leaveType: e}))}
                                style={{height: 40, width: 272}}>
                                {(Object.keys(Leave_Type) as Array<keyof typeof Leave_Type>).map((key) =>
                                    <Select.Option value={key} key={key}>
                                        {Leave_Type[key]}
                                    </Select.Option>
                                )}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="leave Duration"
                            name="session"
                            initialValue={"-Select-"}
                            rules={[{required: true, message: 'Please input Leave Duration!'}]}>
                            <Select
                                onChange={(e) => setApplicant((prev: any) => ({...prev, leaveDuration: e}))}
                                style={{height: 40, width: 272}}>
                                {(Object.keys(Leave_Duration) as Array<keyof typeof Leave_Duration>).map((key) =>
                                    <Select.Option value={key} key={key}>
                                        {Leave_Duration[key]}
                                    </Select.Option>
                                )}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Start Date"
                            //style={{height: 40, width: 700}}
                            name="startDate"
                            rules={[{required: true, message: 'Please input StartDate!'}]}>
                            <DatePicker
                                // onChange={(e) => {
                                //     setIntitalMentId()
                                // }}
                                name="startDate"
                                maxTagCount="responsive"
                                size="large"
                            />
                        </Form.Item>
                        <Form.Item
                            label="End Date"
                            name="endDate"
                            rules={[{required: true, message: 'Please input End Date!'}]}>
                            <DatePicker
                                name="endtDate"
                                maxTagCount="responsive"
                                size="large"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Reason"
                            name={"reason"}
                            rules={[{required: true, message: 'Please input Reason!'}]}>
                            <Input name={"reason"}/>
                        </Form.Item>
                    </Form>
                </Card>
            </Modal>
            <Modal title={`Leave Balance`} open={isBalModalOpen} onCancel={() => setIsBalModalOpen(false)}
                   onOk={() => setIsBalModalOpen(false)}>
                <Card>
                    {/*<h2>*/}
                    {/*    Leave Balance*/}
                    {/*</h2>*/}
                    <Table
                        bordered
                        size={"middle"}
                        columns={newColumns}
                        dataSource={allNewData}
                        pagination={false}
                    />
                </Card>
            </Modal>
            <Card>
                <div style={{display: "flex", justifyContent: "space-around", width: 950, gap: 15}}>
                    <Divider orientation="left">Leave Requests</Divider>
                    <Button type={"primary"} onClick={() => setIsModalOpen(true)}>
                        <PlusCircleOutlined/> Add
                    </Button>
                    <Button onClick={() => setIsBalModalOpen(true)}>
                        Balance
                    </Button>
                </div>
                <Table
                    bordered
                    size={"middle"}
                    columns={leaveRequestColumn}
                    dataSource={requestLeaves}
                />
            </Card>
        </div>
    </>)
}

export default LeaveRequest;