import "./login.scss";
import { useState, useContext } from "react";
import User from "../user/user";
import { Link, useNavigate } from "react-router-dom";
import {Button, Form, Input, Image} from "antd";
import rest from "../../services/http/api/index";
import {jwtDecode} from 'jwt-decode';
import UserLoginContext from "../../context/userLoginContext";

type emailInputValueType = {
  email?: string;
  password?: string;
};

export default function Login() {
  const [profile, setProfile] = useState("");
  const [user, setUser] = useState<any>({});
  const [userInputValues, setUserInputValues] = useState<emailInputValueType>({});
  const navigate = useNavigate();
  const [decodeToken, setDecodeToken] = useState({ });
  const { newUser, setNewUser,} = useContext<any>(UserLoginContext);

  const onLogout = () => {
    setProfile("");
  };

  const onFinish = async (values: any) => {
    const response = await rest.userLogin(userInputValues);
    const token = response.jsonToken;
    let decoded = null;

    if (response.jsonToken) {
      try {
        decoded = (jwtDecode(token));
        setDecodeToken(decoded);
      } catch (error:any) {
        console.error('Error decoding JWT:', error.message);
      }

      const userLoginData = await rest.userLoginDetail(values.email);
      const userCardData = {...userLoginData,loginStatus:true};
      setNewUser(userCardData);
      navigate("/");
    } else {
      navigate("/login");
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
                    onFinish={onFinish}
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
                            "Minimum eight characters, at least one uppercase letter, one lowercase letter, one special character and one number are Required",
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
                    <Form.Item style={{ textAlign: "right", marginBottom: 'none' }}>
                      <Link to={"/forgot-password"}
                            className='forgot-password'
                            style={{textAlign: "right" }}>
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
                      <div className="social-icons">
                        <p>or continue with</p>
                        {profile ? (
                          <User data={profile} onLogout={onLogout} />
                        ) : (
                          ""
                        )}
                        <div className="social-icons__buttons">
                          <button>
                            <img src="icons/google.svg" alt="google" />
                          </button>
                          <button>
                            <img src="icons/facebook.svg" alt="facebook" />
                          </button>
                          <button>
                            <img src="icons/instagram.svg" alt="instagram" />
                          </button>
                          <button>
                            <img src="icons/github.svg" alt="github" />
                          </button>
                          <button>
                            <img src="icons/linkedin.svg" alt="linkedin" />
                          </button>
                        </div>
                      </div>
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
          <div></div>
        </div>
      </div>
    </>
  );
}
