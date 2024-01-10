
import React, { useState } from 'react';
import { Button, Form, Input, Radio, Modal } from 'antd';
import { Checkbox, } from 'antd';
import "./userSignup.scss";

type LayoutType = Parameters<typeof Form>[0]['layout'];

const UserSignup = (props: any) => {
    const [passwordErrorMessage, setPasswordErrorMessage] = useState()
    const onFinish = (values: any) => {
        console.log('Success:', values);
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
                onOk={handleOk} // submit button
                onCancel={handleCancel}
            // okButtonProps={{ disabled: true }}
            // cancelButtonProps={{ disabled: true }}
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
                    <Form.Item label="First Name" name={'firstName'} rules={[{ required: true, message: 'Please input your username!' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Last Name" name={'lastName'}>
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Email Id"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[{pattern: new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/), message: "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number"},
                        {required: true,message: "Account name is required.",},]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
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

