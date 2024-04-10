import { Form, Input, Button, Image } from "antd";
import { useState } from "react";
import rest from "../../services/http/api";
import "../../styles/component/forgotPassword.scss";
import { Steps } from "antd";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const items = [
    {
      title: "OTP Generation",
    },
    {
      title: "OTP Verification",
    },
    {
      title: "Reset Password",
    },
  ];

  const onFinishSuccessToast = (errorInfo: any) => {
    toast.success(`${errorInfo}!`, {
      position: "bottom-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    console.log("Failed:", errorInfo);
  };

  const onFinishFailedToast = (errorInfo: any) => {
    toast.error(`${errorInfo}!`, {
      position: "bottom-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    console.log("Failed:", errorInfo);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const stepsOnChange = (currentStep: any) => {
    // Validate the form fields if moving to the next step
    setCurrent(currentStep);
  };

  const generateOtp = (currentStep: any) => {
    console.log(current);
    form
      .validateFields()
      .then(async () => {
        try {
          const error = await rest.sendOtp({ "to-email": email });
          if (!error) {
            setCurrent(current + 1);
            onFinishSuccessToast("OTP sent successfully");
          }
        } catch (error) {
          console.log(error);
        }
      })
      .catch((error) => {
        console.log("Validation error:", error);
        setCurrent(current - 1);
      });
  };

  const varifyOtp = async (otpData: any) => {
    console.log("otpData", otpData);
    let resp = false;
    form
      .validateFields()
      .then(async () => {
        try {
          resp = await rest.verifyOtp({ email: email, otp: otpData.otp });
          if (resp === true) {
            setCurrent(current + 1);
            onFinishSuccessToast("OTP verified successfully")
          } else {
            onFinishFailedToast("OTP is incorrect");
          }
        } catch (error) {
          console.log(error);
        }
      })
      .catch((error) => {});
  };

  const resetPassword = () => {
    form
      .validateFields()
      .then(async () => {
        try {
          await rest.resetPassword({
            email: email,
            password: newPassword,
            confirmPassword: newPassword,
          });
          onFinishSuccessToast("Password updated successfully");
          navigate("/login");
        } catch (error) {
          navigate("/forgot-password");
        }
      })
      .catch((error) => {});
  };

  return (
    <div className="forget-password">
      <div className="forget-password-section">
        <div className="forget-password-title">
          <Link to={"/"}>
            <Image
              preview={false}
              src="icons/hrms-favicon.png"
              alt="Hrms Logo"
              className="hrms-logo"
            />
          </Link>
          <h3 className="heading">Forgot Password?</h3>
        </div>
        <div className="forget-password-credentials">
          <Steps
            direction="vertical"
            size="small"
            current={current}
            items={items}
            // onChange={stepsOnChange}
          />
          {current === 0 && (
            <Form
              form={form}
              onFinish={() => generateOtp(current)}
              onFinishFailed={() => {
                onFinishFailedToast("Please input valid e-mail id");
              }}
              className="forget-password-form"
            >
              <Form.Item
                label="Email"
                name={"email"}
                rules={[
                  { required: true, message: "Please input your Email-id!" },
                  {
                    pattern: new RegExp(
                      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    ),
                    message: "Not a valid mailId",
                  },
                ]}
              >
                <Input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="enter your email-id"
                />
              </Form.Item>
              <div className='forget-password-button'>
                <Button htmlType="submit">Generate Otp</Button>
              </div>

            </Form>
          )}
          {current === 1 && (
            <Form
              name="basic"
              onFinish={varifyOtp}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="OTP"
                name="otp"
                rules={[
                  { required: true, message: "Please input your username!" },
                  {
                    pattern: new RegExp(/^\d{4}$/),
                    message: "Not a valid OTP",
                  },
                ]}
              >
                <Input placeholder="Please enter OTP" />
              </Form.Item>
              <div className='forget-password-button'>
                <Button type="primary" htmlType="submit">Submit</Button>
              </div>
            </Form>
          )}
          {current === 2 && (
            <Form
              form={form}
              className="forget-password-form"
            >
              <Form.Item
                name="password"
                label="New Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  { required: true, message: "Please enter new password!" },
                  {
                    pattern: new RegExp(
                      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
                    ),
                    message:
                      "Minimum eight characters, at least one uppercase letter, one lowercase letter, one special character and one number are Required",
                  },
                ]}
              >
                <Input.Password
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="enter new password"
                  className='forget-password-input'
                />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The new password that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="enter confirm password"
                                className='forget-password-input'
                />
              </Form.Item>

              <div className='forget-password-button'>
                <Button type="primary" htmlType="submit" onClick={() => resetPassword()}>
                  Reset Password
                </Button>
              </div>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
