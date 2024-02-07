import { Form, Input, Button, Image } from "antd";
import { useState } from "react";
import rest from "../../services/http/api";
import "./forgotPassword.scss";
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
      // content: <h1>Content for Step 1</h1>,
    },
    {
      title: "OTP Verification",
      // content: <h1>Content for Step 2</h1>,
    },
    {
      title: "Reset Password",
      // content: <h1>Content for Step 3</h1>,
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
            onFinishSuccessToast("OTP Send Successfully!");
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
            onFinishSuccessToast("OTP Verify Successful!")
          } else {
            onFinishFailedToast("OTP is Incorrect");
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
          onFinishSuccessToast("Password Update Successful!");
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
                onFinishFailedToast("Please Input Valid E-Mail");
              }}
              className="forget-password-form"
            >
              <Form.Item
                label="Email"
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
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Enter email-id"
                />
              </Form.Item>
              <Button htmlType="submit">Generate Otp</Button>
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
                label="Otp"
                name="otp"
                rules={[
                  { required: true, message: "Please input your username!" },
                  {
                    pattern: new RegExp(/^\d{4}$/),
                    message: "Not a valid Otp",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          )}
          {current === 2 && (
            <Form
              form={form}
              // onFinish={() => stepsOnChange(current + 1)}
              className="forget-password-form"
            >
              <Form.Item
                name="password"
                label="Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  { required: true, message: "Password is required." },
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
                  placeholder="enter password"
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
                <Input.Password placeholder="confirm password" />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => {
                    resetPassword();
                  }}
                >
                  {"Reset Password"}
                </Button>
              </Form.Item>
            </Form>
          )}
        </div>
      </div>
      <div>
        {/*<Image*/}
        {/*    width={90}*/}
        {/*    height={300}*/}
        {/*    preview = {false}*/}
        {/*    src="Images/forgot-password-bg.png"*/}
        {/*/>*/}
      </div>
    </div>
  );
}

export default ForgotPassword;
