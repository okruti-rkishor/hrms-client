import React from "react";
// import {Spin} from "antd";
import _ from "lodash";
import {toast} from "react-toastify";
import {hrms }  from "../src/services/http/api/rest";
import generateMessage from "./services/http/api/message";
import './styles/loadingSpinner.scss'


//import {fm} from "../../componentsv2/shared/Internationalization/index";

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

    axiosInterceptor = (rest:any) => {
        rest.http.interceptors.request.use(
            (config: any) => {
                //his.showLoader(config.url);
                this.setState({...this.state,loading:true});

                // if (storeState.userProfile && storeState.userProfile.accessToken){
                //     config.headers.Authorization =  "Bearer "+ storeState.userProfile.accessToken;
                // }
                return config;
            },
            (error: any) => {
                //this.hideLoader(error.config.url);
                this.setState({...this.state,loading:false});
                Promise.reject(error)
            });
        rest.http.interceptors.response.use((response: any) => {
            //this.hideLoader(response.config.url);
            this.setState({...this.state,loading:false});
            // Do something with response data
            return response;
        }, (error: any) => {
            this.logError(error);
            //this.hideLoader(error.config.url);
            this.setState({...this.state,loading:false});
            // Do something with response error
            return Promise.reject(error);
        });
    };

    // showLoader = (url: string) => {
    //     if (this.state.loading[url]) {
    //         return;
    //     }
    //     this.setState({loading: {...this.state.loading, [url]: true}})
    // };

    // hideLoader = (url: string) => {
    //     if (!this.state.loading[url]) {
    //         return;
    //     }
    //     const loading = {...this.state.loading};
    //     delete loading[url];
    //     this.setState({loading})
    // };

    logError = async (error: any) => {
        let message = _.get(error, "response.data.message", "");
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
                {this.state.loading ?
                    <div style={{
                        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
                        zIndex: 20000,
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <div className="loader" style={{}}>
                            <span className="loading-spin"></span>
                        </div>
                    </div>: null}
            </div>
        )
    }
}

export default ApiInterceptor;