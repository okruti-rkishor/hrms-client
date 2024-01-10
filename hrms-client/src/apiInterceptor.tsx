
import React from "react";
import {Spin} from "antd";
import _ from "lodash";
import {toast} from "react-toastify";
import {hrms }  from "../src/services/http/api/rest";
import generateMessage from "./services/http/api/message";


//import {fm} from "../../componentsv2/shared/Internationalization/index";

class ApiInterceptor extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            loading: {},
            errorCode: 0
        };
    }


    componentDidMount() {
        // Bind axios interceptor
        this.axiosInterceptor(hrms);
    }

    axiosInterceptor = (rest:any) => {
        rest.http.interceptors.request.use(
            (config: any) => {
                this.showLoader(config.url);

                // if (storeState.userProfile && storeState.userProfile.accessToken){
                //     config.headers.Authorization =  "Bearer "+ storeState.userProfile.accessToken;
                // }
                return config;
            },
            (error: any) => {
                this.hideLoader(error.config.url);
                Promise.reject(error)
            });
        rest.http.interceptors.response.use((response: any) => {
            this.hideLoader(response.config.url);
            // Do something with response data
            return response;
        }, (error: any) => {
            this.logError(error);
            this.hideLoader(error.config.url);
            // Do something with response error
            return Promise.reject(error);
        });
    };

    showLoader = (url: string) => {
        if (this.state.loading[url]) {
            return;
        }
        this.setState({loading: {...this.state.loading, [url]: true}})
    };

    hideLoader = (url: string) => {
        if (!this.state.loading[url]) {
            return;
        }
        const loading = {...this.state.loading};
        delete loading[url];
        this.setState({loading})
    };

    logError = async (error: any) => {
        let message = _.get(error, "response.data.messages[0].message", "");
        if (message === ""){
            const code = _.get(error, "response.status", "");
            this.setState({
                errorCode: code
            });
            message = await generateMessage(code);
        }
        toast.error(message);
    };

    render() {
        return (
            <div>

                {!_.isEmpty(this.state.loading) ?
                    <div style={{
                        position: "absolute", top: 0, left: 200, right: 0, bottom: 0,
                        zIndex: 20000,
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <div className="loader" style={{}}>
                            <Spin tip="Loading..."/>
                        </div>
                    </div>: null}</div>
        )
    }
}

export default ApiInterceptor;