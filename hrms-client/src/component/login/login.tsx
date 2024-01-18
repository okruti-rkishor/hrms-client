import React from "react";
import "./login.scss";
import { useState, useCallback, useEffect, useContext } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import UserSignup from "../user/userSignup";
import User from "../user/user";
// import UserContext from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input } from "antd";
import  rest from '../../services/http/api/index'

type emailInputValueType = {
    username?: string;
    password?: string;
};

type FieldType = {
  username?: string;
  password?: string;
};

export default function Login() {
  const [profile, setProfile] = useState("");
  const [user, setUser] = useState<any>({});
  const [userInputValues, setUserInputValues] = useState<emailInputValueType>({});
  const [userSignupModalStatus, setUserSignupModalStatus] = useState<boolean>(false);
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (codeResponse: any) => {
      setUser(codeResponse);
      console.log(codeResponse);
      // navigate("/");
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  const onLogout = () => {
    setProfile("");
  };

  const onFinish = async(values: any) => {
    console.log("Success:", values);
    //Api call
    console.log(userInputValues);
    const response = await rest.userLogin(userInputValues);
    console.log(response);

  };

  const setInputValues = useCallback((email: string, password: string) => {
    setUserInputValues({username:email,password:password});
  },[]);

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

   useEffect(() => {
     if (user) {
       axios
         .get(
           `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
           {
             headers: {
               Authorization: `Bearer ${user.access_token}`,
               Accept: "application/json",
             },
           }
         )
         .then((res) => {
           setProfile(res.data);
           navigate("/"); 
           console.log(res.data);
         })
         .catch((err) => console.log(err));
     }
   }, [user]);

  const onChangeHandel = (e: any) => {
    setUserInputValues((prev) => ({
      ...prev,
     [e.target.name]: e.target.value,
    }));

  };
  return (
    <>
      {userSignupModalStatus ? (
        <UserSignup
          setInputValues={setInputValues}
          setUserSignupModalStatus={setUserSignupModalStatus}
        />
      ) : (
        ""
      )}
      <div className={"login"}>
        <div className={"loginPage"}>
          <div className={"loginPageDetail"}>
            <div className={"left"}>
              <div className={"login-here"}>
                <div className={"login-here-detail"}>
                  {/*<h2>Logo Here</h2>*/}
                  <img src='./images/logos/hrms-favicon.png' className='hrms-logo'/>
                  <p className='login-title-text'>welcome back !!!</p>
                  <h1 className='login-title-heading'>Log In</h1>
                </div>
                <div className={"login-credentials"}>
                  <div>
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
                        name="username"
                        label="Email"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Email!",
                          },
                          {
                            pattern: new RegExp(
                              /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                            ),
                            message: "Enter a valid email",
                          },
                        ]}
                      >
                        <Input
                        name="username"
                          onChange={onChangeHandel}
                        //   value={emailInputValue}
                          value={userInputValues.username}
                        />
                      </Form.Item>
                      <Form.Item<FieldType>
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
                        />
                      </Form.Item>

                      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <div>
                          <div className="login-button">
                            <Button type="primary" htmlType="submit">
                              {" "}
                              Login &#8640;
                            </Button>
                            <Button
                              type="primary"
                              onClick={() => {
                                setUserSignupModalStatus(true);
                              }}
                            >
                              Sign Up &#8640;
                            </Button>
                          </div>
                        </div>
                      </Form.Item>
                    </Form>
                  </div>
                </div>
                <div className={"link-button"}>
                  <p>or continue with</p>
                  {profile ? <User data={profile} onLogout={onLogout} /> : ""}
                  <div className={"all-link"}>
                    <button onClick={()=>{login()}}>
                      <img src="./images/google.png" />
                    </button>
                    <button>
                      <img src="./images/github.png" />
                    </button>
                    <button>
                      <img src="./images/facebook.png" />
                    </button>
                    <button>
                      <img src="./images/linkedin.png" />
                    </button>
                    <button>
                      <img src="./images/instagram.png" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className={"right"}>
              <div className={"girl-cactus"}></div>
              <div className='right-images'>
                <div className={"girl"} style={{ backgroundImage: "url(./images/girl2.png)" }}></div>
                <div className={"cactus"} style={{ backgroundImage: "url(./images/cactus2.png)" }}></div>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}
