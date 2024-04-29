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
    TableColumnsType,
    Tooltip
} from "antd";
import React, {useContext, useEffect, useRef, useState} from "react";
import rest from "../../services/http/api";
import {toast} from "react-toastify";
import useFetchLeaveTableData from "../../custom_hooks/useFetchLeaveTableData";
import {CheckCircleOutlined, CheckOutlined, CloseCircleOutlined, DeleteOutlined} from "@ant-design/icons/lib";
import dayjs from "dayjs";
import {Leave_Type} from "../../constant/constant";
import UserLoginContext from "../../context/userLoginContext";


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


function LeaveRequest() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [allNewData, setAllNewData] = useState([]);
    const [employeeList, setEmployeeList] = useState([]);
    const [empId, setEmpId] = useState("");
    const [requestLeaves, setRequestLeaves] = useState([]);
    const [applicant, setApplicant] = useState<IApplicant>({
        id: "",
        leaveType: "",
        emtitlementId: ""
    });
    const {newUser,setNewUser} = useContext(UserLoginContext);
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
        },{
            title: 'Requested Days',
            dataIndex: 'requestedDays',
        },{
            title: 'reason',
            dataIndex: 'reason',
        },{
            title: 'Leave Status',
            dataIndex: 'leaveStatus',
        },
    ];
    const title = "Holiday";
    const EntitlementId = useRef();
    const [form] = Form.useForm();
    const handleOk = async () => {
        console.log(form.getFieldError);
        let values = form.getFieldsValue();
        if(empId){
            values.employeeId = empId
        }
        let startDateTemp=dayjs(values.startDate)
        let endDateTemp=dayjs(values.endDate)
        const startDate = startDateTemp.format("YYYY-MM-DD")
        const endDate = endDateTemp.format("YYYY-MM-DD")
        values.startDate = startDate
        values.endDate = endDate
        console.log(values);
        try {
            const tempEntId = await rest.getIntitlementByEmpLeaveType(empId, values?.leaveType);
            values.entitlementId =tempEntId.id
            await rest.createLeave(values,values.employeeId)
            setIsModalOpen(false)
        }catch (e) {
            console.log(e)
        }

    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    // const setIntitalMentId = async () => {
    //     try {
    //         const tempEntId = await rest.getIntitlementByEmpLeaveType(applicant?.id, applicant?.leaveType);
    //         console.log("tempEntId", tempEntId);
    //         setApplicant((prev: any) => ({...prev, emtitlementId: tempEntId.id}))
    //         EntitlementId.current = tempEntId.id
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }
    const getEntitlementData = async () => {
        try {
            const allEmployees = await rest.getAllEmployee();
            const tempAllEmp = allEmployees.map((employee: any) => ({
                name: employee.name.firstName + " " + employee.name.lastName,
                id: employee.id
            }));
            setEmployeeList(tempAllEmp);
            //find logedin employee if employee available otherwise empty object
                const tempFinded = allEmployees.find((item: any) => item?.officialEmail === newUser?.email)||{};
            setEmpId(tempFinded.id);
            console.log(tempFinded);
            //find all leaves for particilar employee no provide leaveType
            const remainingLeaves = await rest.getLeaveBalance(tempFinded.id);
            setAllNewData(remainingLeaves)
            const requestedLeavesTemp = await rest.getLeaveRequest(tempFinded.id);
            setRequestLeaves(requestedLeavesTemp);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        console.log("newUser UseEffect", newUser);
        getEntitlementData();
    }, []);

    return (<>
        <div style={{width: "90%", margin: "40px auto"}}>
            <Modal title={`Add Leave`} open={isModalOpen} onCancel={handleCancel} onOk={handleOk}>
                <Card>
                    <Form
                        form={form}
                        layout="horizontal">
                        {!(empId)&&<Form.Item
                            label="Employee"
                            name={"employeeId"}
                            initialValue={"-Select-"}
                            rules={[{required: true, message: 'Please input Employee Id!'}]}>
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
                            label="Start Date"
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
            <Card>
                <div style={{display: "flex", justifyContent: "space-around", width: 1050, gap: 35}}>

                    <Divider orientation="left">Leave Balance</Divider>
                    <Button onClick={() => setIsModalOpen(true)}>
                        New Leave
                    </Button>
                </div>
                <Table
                    bordered
                    size={"middle"}
                    columns={leaveRequestColumn}
                    dataSource={requestLeaves}
                />
                <Table
                    bordered
                    size={"middle"}
                    columns={newColumns}
                    dataSource={allNewData}
                />
            </Card>
        </div>
    </>)
}

export default LeaveRequest;