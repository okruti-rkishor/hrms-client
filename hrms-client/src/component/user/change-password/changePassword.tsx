import React, {useContext, useState} from 'react';
import './changePassword.scss'
import {Button, Form, Input} from "antd";
import rest from '../../../services/http/api'
import UserLoginContext from "../../../context/userLoginContext";

function ChangePassword() {

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const {newUser} = useContext(UserLoginContext);

    const onFinish = async (e: any) => {
        console.log(e);
        console.log(newUser);
        try {
            await rest.resetUserPassword(e.password,newUser?.id||"");
        }catch (e) {

        }


    }
    const onFinishFailed = () => {

    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setMessage('An email has been sent with instructions to reset your password.');
    };

    return (<>
            <h1>
                Reset Password
            </h1>
            <div className="reset-password-container">
                <Form
                    name="basic"
                    labelCol={{span: 8}}
                    style={{maxWidth: 600, marginTop: 20}}
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {required: true, message: 'Please input your password!'},
                            // {pattern :new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"), message:"Password must contain atlest 8 character 1 uppercase 1 lowercase 1 number and 1 special character"}

                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item
                        label="Confirm"
                        name="confirmPassword"
                        rules={[
                            {required: true, message: 'Please input Confirm Password!'},
                            // {pattern :new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"), message:"Password must contain atlest 8 character 1 uppercase 1 lowercase 1 number and 1 special character"}
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 8, span: 16}}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>

        </>
    );

}

export default ChangePassword;






