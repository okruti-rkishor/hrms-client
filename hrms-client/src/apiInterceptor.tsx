import React from "react";
import {Alert, Spin} from "antd";
import _ from "lodash";
import {toast} from "react-toastify";
import {hrms}  from "../src/services/http/api/rest";
import generateMessage from "./services/http/api/message";
import './styles/component/loadingSpinner.scss';
import axios from 'axios';
import {jwtDecode} from "jwt-decode";

export type SaveToken = {
    loginToken: string;
    expiration: number;
};

class ApiInterceptor extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            loading: false,
            errorCode: 0
        };
    }

    componentDidMount() {
        // Bind axios interceptor
        this.axiosInterceptor(hrms);
    }

    axiosInterceptor = (rest: any) => {
        rest.http.interceptors.request.use(
            async (config: any) => {
                this.setState({loading: true});

                const data = localStorage.getItem("loginToken");
                const token = data ? JSON.parse(data).loginToken : '';
                if (token) {
                    config.headers.Authorization = `${token.replace(/['"]+/g, '')}`;
                }
                const id = localStorage.getItem("id");
                if (id) {
                    const isExpired = await this.isMaxTokenExpired(id.replace(/['"]+/g, ''));
                    if (isExpired) {
                        this.redirectToLogin();
                        return Promise.reject("Max token expired");
                    }
                }

                return config;
            },
            (error: any) => {
                this.setState({loading: false});
                return Promise.reject(error);
            }
        );

        rest.http.interceptors.response.use(
            (response: any) => {
                this.setState({loading: false});
                return response;
            },
            async (error: any) => {
                const originalRequest = error.config;
                this.setState({loading: false});

                if (error.response?.status === 403 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        let id = localStorage.getItem("id");
                        id = id ? id.replace(/['"]+/g, '') : '';

                        if (id) {
                            const response = await axios.post(`http://localhost:8080/hrms/v1/auth/${id}/refresh-token`);
                            const {jsonToken} = response.data;
                            const decodedToken: any = jwtDecode(jsonToken);
                            const expirationTimeInSeconds = decodedToken.exp;
                            const expirationTimeInMillis = expirationTimeInSeconds * 1000;


                            const saveToken: SaveToken = {
                                loginToken: jsonToken,
                                expiration: expirationTimeInMillis
                            };
                            localStorage.setItem("loginToken", JSON.stringify(saveToken));

                            originalRequest.headers.Authorization = `${jsonToken}`;
                            return axios(originalRequest);
                        }
                    } catch (error) {
                        console.error("Failed to max token", error);
                        this.redirectToLogin();
                    }
                }

                this.logError(error);
                return Promise.reject(error);
            }
        );
    };

    isMaxTokenExpired = async (id: string) => {
        try {
            const response = await axios.get(`http://localhost:8080/hrms/v1/auth/${id}/is-expired`);
            return response.data;
        } catch (error) {
            console.error("Error checking token expiration", error);
            return true;
        }
    };

    redirectToLogin = () => {
        window.location.href = "/login";
        localStorage.removeItem("id");
    };

    logError = async (error: any) => {
        let message = _.get(error, "response.data.message", "");
        if (message === "") {
            const code = _.get(error, "response.status", "");
            this.setState({errorCode: code});
            message = await generateMessage(code);
        }
        toast.error(message);
    };

    render() {
        return (
            <div>
                {this.state.loading ?
                    <div style={{
                        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
                        zIndex: 20000,
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <Spin tip="Loading..." fullscreen size={"large"}/>
                    </div> : null}
            </div>
        )
    }
}

export default ApiInterceptor;