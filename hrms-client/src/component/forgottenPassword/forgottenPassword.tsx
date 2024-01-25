import { Form, Input, Button } from "antd";
import { useState } from "react";
import rest from "../../services/http/api";
import "../forgottenPassword/forgottenPassword.scss";

function ForgottenPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [disableStatus, setDisableStatus] = useState(false);

  const generateOtp = async () => {
    try {
      const response = await rest.sendOtp(email);
      setShowOtpField(true);
      setDisableStatus(true);
    } catch (error) {
      setShowOtpField(false);
    }
  };
  const varifyOtp = async () => {
    console.log({ email: email, otp: otp });
    await rest.verifyOtp({ email: email, otp: otp });
  };

  return (
    <>
      <div className="forgotten-password-container">
        <div className="titel-heading">
          <h1 style={{ fontWeight: 900 }}>Forgotten Password</h1>
          <h3 style={{ margin: "20px 0px" }}>Verify your email address</h3>
        </div>
        <div className="form-field">
          <Form>
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
                disabled={disableStatus}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Item>
            {showOtpField && (
              <Form.Item
                label="0TP"
                name={"otp"}
                rules={[
                  { required: true, message: "Please input OTP!" },
                  { pattern: new RegExp("^[A-Za-z\\s]+$"), message: "" },
                ]}
              >
                <Input
                  placeholder="Enter OTP"
                  onChange={(e) => {
                    setOtp(e.target.value);
                  }}
                  value={otp}
                />
              </Form.Item>
            )}
            <Form.Item>
              <Button
                className={showOtpField ? "display-none" : ""}
                onClick={() => {
                  generateOtp();
                }}
              >
                {"Send Varification Code"}
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className={showOtpField ? "" : "display-none"}
                onClick={() => {
                  varifyOtp();
                }}
              >
                {"Generate Password"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}
export default ForgottenPassword;

// import React from 'react';
// import { Button, Checkbox, Form, Input } from 'antd';

// const onFinish = (values: any) => {
//   console.log('Success:', values);
// };

// const onFinishFailed = (errorInfo: any) => {
//   console.log('Failed:', errorInfo);
// };

// type FieldType = {
//   username?: string;
//   password?: string;

// };

// const ForgottenPassword: React.FC = () => (

//   <Form
//     name="basic"
//     labelCol={{ span: 8 }}
//     wrapperCol={{ span: 16 }}
//     style={{ maxWidth: 600 }}
//     initialValues={{ remember: true }}
//     onFinish={onFinish}
//     onFinishFailed={onFinishFailed}
//     autoComplete="off"
//   >
//     <Form.Item
//       label="Email"
//       name="email"
//       rules={[{ required: true, message: 'Please input your Email!' }]}
//     >
//       <Input />
//     </Form.Item>
//     <Form.Item
//       label="otp"
//       name="otp"
//       rules={[{ required: true, message: 'Please input OTP!' }]}
//     >
//       <Input />
//     </Form.Item>

//     <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
//       <Button type="primary" htmlType="submit">
//         Submit
//       </Button>
//     </Form.Item>
//   </Form>
// );

// export default ForgottenPassword;
