import { Button, Divider, Flex, Form, Input, Layout, Select } from "antd";
import { PageHeader } from "@ant-design/pro-layout";
import "../../../styles/component/user/userCreate.scss";
import restApi from "../../../services/http/api/index";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { User_type } from "../../../constant/constant";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import success = toast.success;
import error = toast.error;
import { CheckCircleTwoTone } from "@ant-design/icons";

const UserCreate = (props: any) => {
  const [allEmployeesId, setAllEmployeesId] = useState<any>();
  // const [selectedEmployee, setSelectedEmployee] = useState<any>();
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
      if (!payload.employeeId) {
        payload.employeeId = null;
      }
      await restApi.userCreate(payload);
      success("User created successfully");
      navigate("/");
    } catch (errInfo) {
      console.error("Validate Failed:", errInfo);
    }
  };

  const onFinishFailed = () => {
    error("Error in user creation");
  };

  const checkEmployeeSelected = (e: string[]) => {
    const include = e.includes("EMPLOYEE");
    setIsCheckEmail(include);
    onChangeEmail({ currentTarget: { value: email } }, include);
  };

  const onChangeEmail = (e: any, isCheckEmail: boolean = true) => {
    setEmail(e.currentTarget.value);
    if (isCheckEmail) {
      const tempFinded = allEmployeesId.find(
        (item: any) => item.officialEmail === e.currentTarget.value
      );
      if (tempFinded) {
        SetIsFindEmployee(true);
        form.setFieldsValue({firstName:tempFinded.name.firstName,lastName:tempFinded.name.lastName,employeeId:tempFinded.id});
      } else {
        form.setFieldsValue({firstName:"",lastName:"",employeeId:""});
        SetIsFindEmployee(false);
      }
      // console.log("isCheckEmail", e.currentTarget.value);
    } else {
      form.setFieldsValue({firstName:"",lastName:"",employeeId:""});
      SetIsFindEmployee(false);
    }
  };

  const fetchAllEmoloyees = async () => {
    try {
      const data = await restApi.getAllEmployee();
      console.log(data);
      setAllEmployeesId(data);
      console.log(data);
    } catch (error) {}
  };

  useEffect(() => {
    //get all employees for employee id associate with this user
    fetchAllEmoloyees();
  }, []);

  return (
    <Layout className="with-background user-create-section">
      <div className="data-table" style={{ width: "50%" }}>
        <Divider orientation="left">
          <PageHeader className="site-page-header" title="Create User" />
        </Divider>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="user-create-form"
          form={form}
        >
          <div className="user-create-inputs">
            <Form.Item
              label={"Role"}
              name={"roles"}
              required={true}
              rules={[
                {
                  required: true,
                  message: "select the role",
                },
              ]}
            >
              <Select
                placeholder="select the role"
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
                  { required: true, message: "Please input your Email id!" },
                  {
                    pattern: new RegExp(
                      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    ),
                    message: "Not a valid mailId",
                  },
                ]}
              >
                <Input
                  placeholder="Enter email-id"
                  value={email}
                  onChange={onChangeEmail}
                />
              </Form.Item>
              {isFindEmployee && (
                <CheckCircleTwoTone
                  style={{ position: "absolute", top: 280, right: 520 }}
                />
              )}
            </div>

            <Form.Item
              label="First Name"
              name={"firstName"}
              rules={[
                { required: true, message: "Please input your First Name!" },
                { pattern: new RegExp("^[A-Za-z\\s]+$"), message: "" },
              ]}
            >
              <Input
                placeholder="Enter first name"
                value={isFindEmployee ? "New Value" : ""}
                disabled={isFindEmployee}
              />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name={"lastName"}
              rules={[
                { required: true, message: "Please input your Last Name!" },
                { pattern: new RegExp("^[A-Za-z\\s]+$"), message: "" },
              ]}
            >
              <Input placeholder="Enter last name" disabled={isFindEmployee} />
            </Form.Item>

            <Form.Item label="Employee" name={"employeeId"}>
              <Input
                placeholder="Enter Employee"
                disabled={isFindEmployee}
                value={isFindEmployee ? "New Value" : ""}
                // value={selectedEmployeeId?.employeeCode}
              />
            </Form.Item>
          </div>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button className="submit" type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
};

export default UserCreate;
