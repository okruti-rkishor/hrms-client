import {AutoComplete, Button, Divider, Flex, Form, Input, Layout, Select} from "antd";
import {PageHeader} from "@ant-design/pro-layout";
import "../../../styles/component/user/userCreate.scss";
import restApi from "../../../services/http/api/index";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {User_type} from "../../../constant/constant";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import success = toast.success;
import error = toast.error;
import {CheckCircleTwoTone} from "@ant-design/icons";
interface Item {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    roles: string[];
    active:boolean;
    status:string;
}

interface UserCreateProps {
    initialData?: Item |null;
    mode: 'create' | 'view' | 'edit';
    onModalClose?: () => void;
}

const UserCreate: React.FC<UserCreateProps> = ({ initialData, mode, onModalClose },props: any) => {
    const [allEmployeesId, setAllEmployeesId] = useState<any>();
    const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
    const [isFindEmployee, SetIsFindEmployee] = useState<boolean>(false);
    const [email, setEmail] = useState<any>("");
    const [isCheckEmail, setIsCheckEmail] = useState<any>();
    const userTypesEnum = Object.keys(User_type);
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        try {
            let payload = { ...values };
            console.log(payload.employeeId);

            if (payload.employeeId !== selectedEmployee) {
                payload.employeeId = selectedEmployee;
            } else {
                payload.employeeId = null;
            }

            if (mode === "create") {
                await restApi.userCreate(payload);
                success("User created successfully");
            } else if (mode === "edit" && initialData?.id) {
                await restApi.userEdit({ ...payload, id: initialData.id }, initialData.id);
                success("User edited successfully");
            }

            navigate("/user/userNew");

            if (onModalClose) {
                onModalClose();
            }
        } catch (errInfo) {
            console.error("Error during submission:", errInfo);
            error("Failed to process the form");
        }
    };


    const onFinishFailed = () => {
        error("Error in user creation");
    };

    const checkEmployeeSelected = (e: string[]) => {
        const include = e.includes("EMPLOYEE");
        setIsCheckEmail(include);
        onChangeEmail({currentTarget: {value: email}}, include);
    };

    const onChangeEmail = (e: any, isCheckEmail: boolean = true) => {
        setEmail(e.currentTarget.value);
        if (isCheckEmail) {
            const tempFinded = allEmployeesId?.find(
                (item: any) => item.officialEmail === e.currentTarget.value
            );
            if (tempFinded) {
                SetIsFindEmployee(true);
                form.setFieldsValue({
                    firstName: tempFinded.name.firstName,
                    lastName: tempFinded.name.lastName,
                    // employeeId: tempFinded.id
                });
            } else {
                form.setFieldsValue({firstName: "", lastName: "", employeeId: ""});
                SetIsFindEmployee(false);
            }
            // console.log("isCheckEmail", e.currentTarget.value);
        } else {
            form.setFieldsValue({firstName: "", lastName: "", employeeId: ""});
            SetIsFindEmployee(false);
        }
    };

    const fetchAllEmoloyees = async () => {
        try {
            const data = await restApi.getAllEmployee();
            console.log(data);
            const optionData = data.map((employee: any) => {
                return {
                    ...employee, value: employee.name.firstName + " " + employee.name.lastName
                }
            })
            // setAllEmployeesId(data);
            setAllEmployeesId(optionData);
            console.log(data);
        } catch (error) {
        }
    };

    useEffect(() => {
        //get all employees for employee id associate with this user
        fetchAllEmoloyees();
    }, []);

    useEffect(() => {
        // Populate form with initial data when in 'view' or 'edit' mode
        if (initialData) {
            form.setFieldsValue(initialData);
        }
    }, [initialData, form]);

    const isViewMode = mode === 'view';
    const isEditMode = mode === 'edit';

    return (
        <Layout className="with-background user-create-section">
            <div className="data-table" >
                {/*<Divider orientation="left">*/}
                {/*    <PageHeader className="site-page-header" title="Create User"/>*/}
                {/*</Divider>*/}
                <Form
                    name="basic"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    style={{minWidth:"200px"}}
                  //  initialValues={{remember: true}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className="user-create-form"
                    form={form}
                    initialValues={initialData || undefined}
                    disabled={isViewMode}
                >
                    <div className="user-create-inputs">
                        <Form.Item
                            label={"Role"}
                            name={"roles"}
                            required={true}
                            rules={[
                                {
                                    required: true,
                                    message: "Select role",
                                },
                            ]}
                        >
                            <Select
                                placeholder="Select Role"
                                mode="multiple"
                                onChange={checkEmployeeSelected}
                            >
                                {userTypesEnum.map((userType) => (
                                    <Select.Option key={userType} value={userType}>
                                        {userType.toString().toUpperCase()}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <div>
                            <Form.Item
                                label="Email Id"
                                name={"email"}
                                rules={[
                                    {required: true, message: "Please input your Email id!"},
                                    {
                                        pattern: new RegExp(
                                            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                        ),
                                        message: "Not a valid mailId",
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="Please Enter Email"
                                    value={email}
                                    onChange={onChangeEmail}
                                />
                            </Form.Item>
                            {isFindEmployee && (
                                <CheckCircleTwoTone
                                    style={{position: "absolute", top: 271, right: 420}}
                                />
                            )}
                        </div>

                        <Form.Item
                            label="First Name"
                            name={"firstName"}
                            rules={[
                                {required: true, message: "Please input your First Name!"},
                                {pattern: new RegExp("^[A-Za-z\\s]+$"), message: ""},
                            ]}
                        >
                            <Input
                                placeholder="Please Enter First Name"
                                value={isFindEmployee ? "New Value" : ""}
                                disabled={isFindEmployee||isViewMode}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Last Name"
                            name={"lastName"}
                            rules={[
                                {required: true, message: "Please input your Last Name!"},
                                {pattern: new RegExp("^[A-Za-z\\s]+$"), message: ""},
                            ]}
                        >
                            <Input placeholder="Please Enter Last Name" disabled={isFindEmployee||isViewMode}/>
                        </Form.Item>
                        <Form.Item
                            label="Employee"
                            name={"employeeId" }
                            initialValue={null}>
                            {/*<AutoComplete*/}
                            {/*    style={{height: 45}}*/}
                            {/*    options={allEmployeesId}*/}
                            {/*    placeholder="Start Writing Employee Name"*/}
                            {/*    filterOption={(inputValue, option) => {*/}
                            {/*        const conditionStatement = String(option?.value).toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;*/}
                            {/*        if (conditionStatement) {*/}
                            {/*          const selectedEmployee = option?.filter((employee:any)=>(inputValue===employee.value))*/}
                            {/*          setSelectedEmployee(selectedEmployee)*/}
                            {/*        }*/}
                            {/*        return conditionStatement*/}
                            {/*    }*/}
                            {/*    }*/}
                            {/*/>*/}

                            <AutoComplete
                                style={{height: 40}}
                                options={allEmployeesId}
                                placeholder="Select Employee"
                                filterOption={(inputValue, option:any) => {
                                    const conditionStatement = option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    setSelectedEmployee(option.id)
                                    return conditionStatement;
                                }}
                            />
                        </Form.Item>
                    </div>

                    {/*<Form.Item wrapperCol={{offset: 1, span: 22}}>*/}
                    {/*    <Button className="submit" type="primary" htmlType="submit" >*/}
                    {/*        Submit*/}
                    {/*    </Button>*/}
                    {/*</Form.Item>*/}

                    {!isViewMode && (
                        <Form.Item wrapperCol={{ offset: 5, span: 4 }}>
                            <Button type="primary" htmlType="submit">
                                {mode === 'create' ? "Create" : "Update"}
                            </Button>
                        </Form.Item>
                    )}

                </Form>
            </div>
        </Layout>
    );
};

export default UserCreate;
