import "../../styles/component/login.scss";
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, Image } from "antd";
import rest from "../../services/http/api/index";
import { jwtDecode } from "jwt-decode";
import UserLoginContext from "../../context/userLoginContext";

export type emailInputValueType = {
  email?: string;
  password?: string;
};
export type SaveToken = {
  loginToken: string;
  expiration: number;
};

const Login=() => {
  const [userInputValues, setUserInputValues] = useState<emailInputValueType>({});
  const navigate = useNavigate();
  // const [decodeToken, setDecodeToken] = useState({});
  const { setNewUser } = useContext<any>(UserLoginContext);

  const onFinishLogin = async (values: any) => {
    let decoded = null;
    try {
      const response = await rest.userLogin(userInputValues);
      const token = response.jsonToken;
      if (token) {
        try {
          const userLoginData = await rest.userLoginDetail(values.email);
          const userCardData = { ...userLoginData, loginStatus: true };
          setNewUser(userCardData);
          navigate("/");
          decoded = jwtDecode(token);
          console.log("Error decoding JWT:", decoded);
          const saveToken:SaveToken = {
            loginToken:(token),
            expiration: (new Date().getTime() + 15 * 60 * 1000)
          }
          localStorage.setItem("loginToken", JSON.stringify(saveToken));
        } catch (error: any) {
          console.log("Error decoding JWT:", error.message);
        }
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onChangeHandel = (e: any) => {
    setUserInputValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(()=>{
    if(localStorage.getItem("loginToken")){
      navigate('/');
    }else{
      navigate('/login');
    }
  },[])

  return (
    <>
      <div className="login">
        <div className="loginPage">
          <div className="loginPageDetail">
            <div className="left">
              <div className="login-here">
                <div className="login-here-detail">
                  <Link to={"/"}>
                    <Image
                      preview={false}
                      src="icons/hrms-favicon.png"
                      alt="Hrms Logo"
                      className="hrms-logo"
                    />
                  </Link>
                  <p className="login-title-text">welcome back !!!</p>
                  <h1 className="login-title-heading">Log In</h1>
                </div>
                <div className="login-credentials">
                  <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 18 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinishLogin}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout="vertical"
                  >
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Email!",
                        },
                        {
                          pattern: new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
                          message: "Enter a valid email",
                        },
                      ]}
                    >
                      <Input
                        name="email"
                        onChange={onChangeHandel}
                        value={userInputValues.email}
                        placeholder="enter your email"
                      />
                    </Form.Item>

                    <Form.Item
                      label="Password"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                        {
                          pattern: new RegExp(
                            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
                          ),
                          message:
                            "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
                        },
                      ]}
                    >
                      <Input.Password
                        name="password"
                        onChange={onChangeHandel}
                        value={userInputValues.password}
                        placeholder="enter your password"
                      />
                    </Form.Item>
                    <Form.Item
                      style={{ textAlign: "right", marginBottom: "none" }}
                    >
                      <Link
                        to={"/forgot-password"}
                        className="forgot-password"
                        style={{ textAlign: "right" }}
                      >
                        Forgot Password?
                      </Link>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 18 }}>
                      <div className="login-button">
                        <Button type="primary" htmlType="submit">
                          {" "}
                          Login &#8640;
                        </Button>
                      </div>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 18 }}>
                      <div className="social-icons"></div>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </div>
            <div className="right">
              <div className="right-section-bg"></div>
              <div className="right-images">
                <div
                  className="girl"
                  style={{ backgroundImage: "url(./images/girl2.png)" }}
                ></div>
                <div
                  className="cactus"
                  style={{ backgroundImage: "url(./images/cactus2.png)" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default  Login;