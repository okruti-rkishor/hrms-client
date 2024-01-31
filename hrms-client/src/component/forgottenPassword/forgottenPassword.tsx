import { Form, Input, Button, Flex } from "antd";
import { useState } from "react";
import rest from "../../services/http/api";
import "./forgottenPassword.scss";
// import Password from "antd/es/input/Password";
// import Column from "antd/es/table/Column";
import { Steps } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {  useNavigate } from "react-router-dom";

function ForgottenPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [disableStatus, setDisableStatus] = useState(false);
  const [newPasswordShowSatatus, setNewPasswordShowSatatus] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const notifySendOtp = () => toast("Send Otp your registerd email!");
  const notifyVariedyOtp = () => toast("Otp varified successfully!");
  const notifyVariedyOtpFaild = () => toast("try again with correct Otp!");
  const notifyChangePassword = () => toast("Update Password Successfully!");
  const description = "This is a description.";
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const items = [
    {
      title: "OTP Generation",
      description,
      content: <h1>Content for Step 1</h1>,
    },
    {
      title: "OTP Verification",
      description,
      content: <h1>Content for Step 2</h1>,
    },
    {
      title: "Reset Password",
      description,
      content: <h1>Content for Step 3</h1>,
    },
  ];

  const stepsOnChange = (currentStep: any) => {
    // Validate the form fields if moving to the next step
    setCurrent(currentStep);
  };

  const generateOtp = (currentStep: any) => {
    console.log(current);
    form
      .validateFields()
      .then(async () => {
        // rest.sendOtp({ email: email });
        await rest.sendOtp({ "to-email": email });
        setCurrent(current + 1);
        notifySendOtp();
      })
      .catch((error) => {
        console.log("Validation error:", error);
      });
  };

  const varifyOtp = () => {
    console.log({ email: email, otp: otp });
    form
      .validateFields()
      .then(async () => {
        const resp  = await rest.verifyOtp({ email: email, otp: otp });
        if(resp){
          notifyVariedyOtp()
          setCurrent(current+1);
        }
        else{
          notifyVariedyOtpFaild()
        }
      })
      .catch((error) => {
        notifyVariedyOtpFaild();
      });

    setNewPasswordShowSatatus(true);
  };

    const resetPassword = async () => {
    console.log({
      email: email,
      password: newPassword,
      confirmPassword: newPassword,
    });
    try {
      await rest.resetPassword({
        email: email,
        password: newPassword,
        confirmPassword: newPassword,
    });
    notifyChangePassword()
    navigate('/login')
    } catch (error) {
      
    }
    
  };

  return (
    <>
      <Steps
        direction="vertical"
        size="small"
        current={current}
        items={items}
        // onChange={stepsOnChange}
      />
      {current === 0 && (
        <Form form={form} onFinish={() => stepsOnChange(current + 1)}>
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
          <Button onClick={() => generateOtp(current)}>Generate Otp</Button>
        </Form>
      )}
      {current === 1 && (
        <div style={{display:'flex'}}>
          <Form.Item
            label="0TP"
            name={"otp"}
            style={{ display: "flex" }}
            rules={[
              { required: true, message: "Please input OTP!" },
              {
                pattern: new RegExp(/^\d{4}$/),
                message: "Otp should be a number and only 4 digit",
              },
            ]}
          >
            <Input
              placeholder="Enter OTP"
              onChange={(e) => {
                setOtp(e.target.value);
              }}
              value={otp}
            /><br />
          </Form.Item>
          <Button onClick={() => varifyOtp()}>Varify Otp</Button>
        </div>
      )}
      {current === 2 && <div style={{display:'flex'}}>
                  <Form.Item
                    name="password"
                    label="Password"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                      {
                        pattern: new RegExp(
                          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
                        ),
                        message:
                          "Minimum eight characters, at least one uppercase letter, one lowercase letter, one special character and one number are Required",
                      },
                      { required: true, message: "Password name is required." },
                    ]}
                  >
                    <Input.Password
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="enter password"
                    />
                  </Form.Item><br />

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
                      className={showOtpField ? "" : "display-none"}
                      onClick={() => {
                        resetPassword();
                      }}
                    >
                      {"Reset Password"}
                    </Button>
                  </Form.Item>
                </div>}
    </>
  );
}

export default ForgottenPassword;
