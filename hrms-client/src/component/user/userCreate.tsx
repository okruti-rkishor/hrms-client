import {Button, Divider, Form, Input, Select} from "antd";
import {PageHeader} from "@ant-design/pro-layout";
import './userCreate.scss'
import restApi from "../../services/http/api/index";
import {  useNavigate } from "react-router-dom";
import React from "react";
import { User_type } from "../../constant/constant";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import success = toast.success;
import error = toast.error;

const UserCreate = (props: any) => {
    const userTypesEnum = Object.keys(User_type);
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        try {
            await restApi.userCreate(values);
            success("User created successfully");
            navigate('/');
        } catch (errInfo) {
            console.error('Validate Failed:', errInfo);
        }
    };

    const onFinishFailed = () => {
        error("Error in user creation");
    };

    return (
        <div className='user-create-section'>
            <div className='data-table' style={{width:"50%"}}>
                <Divider orientation="left">
                    <PageHeader
                        className="site-page-header"
                        title="User Create"
                    />
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
                    className= 'user-create-form'
                >
                    <div className='user-create-inputs'>
                        <Form.Item label="First Name"
                                   name={'firstName'}
                                   rules={[
                                       { required: true, message: 'Please input your First Name!' },
                                       {pattern: new RegExp("^[A-Za-z\\s]+$"), message: ""}
                                   ]}
                        >
                            <Input placeholder="Enter first name" />
                        </Form.Item>

                        <Form.Item label="Last Name"
                                   name={'lastName'}
                                   rules={[
                                       { required: true, message: 'Please input your Last Name!' },
                                       {pattern: new RegExp("^[A-Za-z\\s]+$"), message: ""}
                                   ]}
                        >
                            <Input placeholder="Enter last name" />
                        </Form.Item>

                        <Form.Item
                            label="Email Id"
                            name={'email'}
                            rules={[{ required: true, message: 'Please input your Email id!' },
                                { pattern: new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/), message: "Not a valid mailId" },
                            ]}
                        >
                            <Input placeholder="Enter email-id" />
                        </Form.Item>

                        <Form.Item label={"Role"}
                                   name={"role"}
                                   required={true}
                                   rules={[{
                                       required:true,
                                       message:"select the role"
                                   }]}
                        >
                            <Select placeholder="select the role">
                                {userTypesEnum.map(userType=>
                                    <Select.Option key={userType} value={userType}>
                                        {userType.toString().toUpperCase()}
                                    </Select.Option>)
                                }
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Password"
                            dependencies={['password']}
                            hasFeedback
                            rules={[{ pattern: new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/), message: "Minimum eight characters, at least one uppercase letter, one lowercase letter, one special character and one number are Required" },
                                { required: true, message: "Password name is required.", }]}
                        >
                            <Input.Password placeholder="enter password"/>
                        </Form.Item>

                        <Form.Item
                            name="confirmPassword"
                            label="Confirm Password"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {

                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The new password that you entered do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password placeholder="confirm password"/>
                        </Form.Item>
                    </div>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button className='submit' type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default UserCreate;
