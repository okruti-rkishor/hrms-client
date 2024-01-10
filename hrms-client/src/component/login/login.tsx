import React from "react";
import "./login.scss";
import {useState,useCallback,useEffect} from "react";
import User from "../user/User";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";


export default function Login() {
    const [profile, setProfile] = useState('');
    const [user, setUser] = useState<any>({});

const login = useGoogleLogin({
    onSuccess: (codeResponse: any) => {setUser(codeResponse)
        console.log(codeResponse)
    },
    onError: (error) => console.log("Login Failed:", error)
});

    const onLogout = ()=>{
        setProfile('');
    }

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
                 console.log(res.data);
             })
             .catch((err) => console.log(err));
     }
 }, [user]);

    return(
        <>
            <div className={"login"}>
                <div className={"loginPage"}>
                    <div className={"loginPageDetail"}>
                        <div className={"left"}>
                            <div className={"login-here"}>
                                <div className={"login-here-detail"}>
                            <h2>Logo Here</h2>
                            <p>welcome back !!!</p>
                            <h1>Log In</h1>
                                </div>
                            <div className={"login-credentials"}>
                                <div>
                            <label>Email</label>
                            <input></input>
                                </div>
                                <div>

                            <label>password</label>
                            <input></input>
                                </div>
                            </div>
                                <div className={"link-button"}>
                                    <button>Login &#8640;</button>
                                    <p>or continue with</p>
                                    {profile? <User data={profile} onLogout={onLogout}/> : ""}
                                    <div className={"all-link"}>
                                        <button><img src="./images/google.png"/></button>
                                        <button><img src="./images/github.png"/></button>
                                    <button><img src="./images/facebook.png"/></button>
                                        <button><img src="./images/linkedin.png"/></button>
                                        <button><img src="./images/instagram.png"/></button>
                                    </div>

                                </div>
                                <div className={"account"}>
                                    <p>don't have an account yet?</p>
                                    <p>sign up for free</p>
                                </div>
                            </div>

                        </div>
                        <div className={"right"}>
                            <div className={"girl-cactus"}>
                            </div>
                            <div className={"girl"} style={{background:"url(./images/girl2.png)"}}>
                            </div>
                            <div className={"cactus"} style={{background:"url(./images/cactus2.png)"}}>
                            </div>
                        </div>
                    </div>
                    <div>
                    </div>
                </div>


            </div>

        </>


    )

}