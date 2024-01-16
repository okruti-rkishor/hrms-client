import React, {useContext, useState} from "react";
import {Gender} from "../../constant/constant";
import {Button, Form, Input, Select} from "antd";
import {PageHeader} from "@ant-design/pro-layout";
import './userCreate.scss'
// import UserContext from "../../context/userContext";
import restApi from "../../services/http/api/index";

const UserSignup = (props: any) => {

    const  onFinish = async (values: any) => {
        const response = await restApi.userCreate(values);

        if(response===201){
            console.log('Success:', response);
        } else{
            console.log('newUser not created');
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <div className='user-create-section'>
            <div style={{width:"50%"}}>
                <PageHeader
                    className="site-page-header"
                    title="User Create"
                    // breadcrumb={{ }}
                    subTitle="Process of users creation starts from here"
                />
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
                            <Input />
                        </Form.Item>

                        <Form.Item label="Last Name"
                                   name={'lastName'}
                                   rules={[
                                       { required: true, message: 'Please input your Last Name!' },
                                       {pattern: new RegExp("^[A-Za-z\\s]+$"), message: ""}
                                   ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Email Id"
                            name={'email'}
                            rules={[{ required: true, message: 'Please input your Email id!' },
                                { pattern: new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/), message: "Not a valid mailId" },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item label={"Role"}
                                   name={"role"}
                                   required={true}
                                   rules={[{
                                       required:true,
                                       message:"select the role"
                                   }]}
                        >
                            <Select>
                                <Select.Option value={'ADMIN'}>ADMIN</Select.Option>
                                <Select.Option value={'SUPER USER'}>SUPER USER</Select.Option>
                                <Select.Option value={'EMPLOYEE'}>EMPLOYEE</Select.Option>
                                <Select.Option value={'GUEST'}>GUEST</Select.Option>
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
                            <Input.Password />
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
                            <Input.Password />
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

export default UserSignup;
