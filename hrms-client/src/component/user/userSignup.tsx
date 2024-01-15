
import React, { useState, useContext } from 'react';
import { Button, Form, Input, Radio, Modal } from 'antd';
import { Checkbox, } from 'antd';
import "./userSignup.scss";
import axios from 'axios';
import restApi from "../../services/http/api/index"; 
import UserContext from '../../context/userContext';
import { UserInterface } from '../../context/userContext';

type LayoutType = Parameters<typeof Form>[0]['layout'];


const UserSignup = (props: any) => {
    const [passwordErrorMessage, setPasswordErrorMessage] = useState()
        const {newUser,setNewUser} = useContext<any>(UserContext)

    const  onFinish = async (values: any) => {
        //  const response = await restApi.userCreate(values);
        //  console.log('Success:', response);
        // if(response===201){
            props.setUserSignupModalStatus(false)
            // setNewUser({loginStatus:true, email:values.email, password:values.password});
            props.setInputValues(values.email,values.password);
        // }
        // else{
        //     setNewUser({'loginStatus':false, email:'', password:''});
        //     console.log(newUser);
        // }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    type FieldType = {
        username?: string;
        password?: string;
        remember?: string;
    };

    const handleOk = (e: React.MouseEvent<HTMLElement>) => {
        console.log(e);
        props.setUserSignupModalStatus(false);
    };

    const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
        console.log(e);
        props.setUserSignupModalStatus(false);
    };


    return (
        <>
            <Modal
                title="User Sign-Up"
                open={true}
                // onOk={handleOk} // submit button
                onCancel={handleCancel}
                // okButtonProps={{ disabled: true }}
                cancelButtonProps={{ disabled: true }}
            >
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className='user-signup-form'
                >
                    <Form.Item label="First Name" name={'firstName'} 
                    rules={[
                        { required: true, message: 'Please input your First Name!' },
                        {pattern: new RegExp("^[A-Za-z\\s]+$"), message: ""}
                    ]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Last Name" name={'lastName'}>
                        <Input />
                    </Form.Item>

                    <Form.Item 
                    label="Email Id" 
                    name={'email'}
                    rules={[{ required: true, message: 'Please input your Email id!' },
                        { pattern: new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/), message: "Not a valid mailId" },
                        ]}>
                        <Input />
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

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        {/* <div className='submit-button'> */}
                        <Button className='submit' type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );

};

export default UserSignup;

