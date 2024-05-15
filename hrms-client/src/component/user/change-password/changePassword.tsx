import React, {useContext, useState} from 'react';
import './changePassword.scss'
import {Button, Form, Input} from "antd";
import {Image} from "antd";
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
            await rest.resetUserPassword(e.password, newUser?.id || "");
        } catch (e) {

        }


    }
    const onFinishFailed = () => {

    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setMessage('An email has been sent with instructions to reset your password.');
    };

    return (<>
            <h1 style={{padding: 20}}>
                Reset Password
            </h1>

            <div style={{display: "flex"}} className="reset-password-container">
                <div>
                    <div>
                        <img className={"workplace-image"} src={"/images/Girl_Workplace.png"} alt={"..."}/>
                    </div>

                </div>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                    <h3 style={{padding: 20}}>
                        {`Welcome ${newUser?.firstName} ${newUser?.lastName}!!`}
                    </h3>
                    <Form
                        name="basic"
                        className={"reset-password-form"}
                        onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        layout="vertical"
                    >

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    pattern: new RegExp("^(?=.*\\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-\\#\\$\\@\\!\\.\\%\\&\\*])(?=.*[a-zA-Z]).{8,16}$"),
                                    message: "Password must contain atlest 8 character 1 uppercase 1 lowercase 1 number and 1 special character"
                                },
                                {required: true, message: 'Please input your password!'},

                            ]}
                        >
                            <Input.Password/>
                        </Form.Item>
                        <Form.Item
                            label="Confirm Password"
                            name="confirmPassword"
                            rules={[
                                {required: true, message: 'Please input Confirm Password!'},
                                {
                                    pattern: new RegExp("^(?=.*\\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-\\#\\$\\@\\!\\.\\%\\&\\*])(?=.*[a-zA-Z]).{8,16}$"),
                                    message: "Password must contain atlest 8 character 1 uppercase 1 lowercase 1 number and 1 special character"
                                },
                                // {pattern :new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$"), message:"Password and confirm password must be Same!!"}
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
            </div>
        </>
    );

}

export default ChangePassword;






