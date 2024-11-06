
import axios, {AxiosRequestConfig} from "axios";

const Mustache = require('mustache');
const Axios = axios;

function RestApi(base:any){
    const http = Axios.create({
        baseURL: base,
        timeout: 300000
    });


    const httpForTimeOut = Axios.create({
        baseURL: "",
        timeout: 300000
    });

    async function post(uriTemplate:string, pathArgs:any, body:any, queryArgs?:any,headers?:any,timeout?:number) {
        const uri = pathArgs ? Mustache.render(uriTemplate, pathArgs) : uriTemplate;
        console.log("POST " + uri, queryArgs ? queryArgs : "");
        console.log(JSON.stringify(body));

        const config:AxiosRequestConfig = { params: queryArgs || {} };
        if(headers){
            config.headers = headers;
        }
        if (timeout) {
            const response = await httpForTimeOut.get("/config.json");
            config.timeout = response.data.timeout;
        }
        return http.post(uri, body, config)
            .then((response:any) => {
                console.log(response.headers.toString());
                if (response.status === 201) {
                    const location = response.headers.location;
                    if (location) {
                        return location;
                        // const lastIndex = location.lastIndexOf("/");
                        // if (lastIndex !== -1) {
                        //     const id = location.substring(lastIndex + 1);
                        //     return id;
                        // }
                        // }else{
                        //     return response;
                        // }
                    }
                }  else if(response.status === 200){
                    return response.data;
                }
            }).catch((error:any) => {
                console.error(JSON.stringify(error.response.data));
              throw    new Error(error);
            });
    }

    async function put(uriTemplate:string, pathArgs:any, body?:any, queryArgs?:any) {
        const uri = pathArgs ? Mustache.render(uriTemplate, pathArgs) : uriTemplate;
        console.log("PUT " + uri, queryArgs ? queryArgs : "");
        console.log(JSON.stringify(body));
        return http.put(uri, body, { params: queryArgs || {} })
            .catch((error:any) => {
                console.error(JSON.stringify(error.response.data));
                throw error;
            });
    }

    async function get(uriTemplate:string, pathArgs?:any, queryArgs?:any) {
        const uri = pathArgs ? Mustache.render(uriTemplate, pathArgs) : uriTemplate;
        console.log("GET " + uri, queryArgs ? queryArgs : "");
        return http.get(uri, { params: queryArgs || {} })
            .then((response:any) => {
                if (response.status === 200) {
                    return response.data;
                }
                else {
                    let error =  { code: 'http.get.error', message: `Http GET [${uri}] failed with ${response.status}` };
                    throw error;
                }
            }).catch((error:any) => {
                console.error(JSON.stringify(error?.response?.data));
                throw error;
            });
    }

    async function fetchData(uriTemplate: string, pathArgs?: any, queryArgs?: any, headers?: any) {
        const uri = pathArgs ? Mustache.render(uriTemplate, pathArgs) : uriTemplate;
        const queryString = queryArgs
            ? '?' + new URLSearchParams(queryArgs).toString()
            : '';

        const completeUrl = base+`/${uri}${queryString}`;
        console.log("FETCH URL: ", completeUrl);

        let data: any = localStorage.getItem("loginToken");
        data = data ? JSON.parse(data) : '';

        const fetchHeaders = {
            ...headers,
            Authorization: data ? data.loginToken.replace(/['"]+/g, '') : '',
            'Content-Type': 'application/octet-stream',
        };

        const fetchConfig: RequestInit = {
            method: 'GET',
            headers: fetchHeaders
        };

        try {
            const response = await fetch(completeUrl, fetchConfig);
            console.log(response);

            if (response.ok) {
                return await response.blob();
            } else {
                const error = { code: 'http.fetch.error', message: `Http FETCH [${completeUrl}] failed with ${response.status}` };
                throw error;
            }
        } catch (error: any) {
            console.error(error);
            throw error;
        }
    }


    async function del(uriTemplate:string, pathArgs:any, body?:any, queryArgs?:any) {
        const uri = pathArgs ? Mustache.render(uriTemplate, pathArgs) : uriTemplate;
        console.log("DELETE " + uri, queryArgs ? queryArgs : "");
        if (body) {
            console.log(JSON.stringify(body))
        }
        return http.delete(uri, { data: body, params: queryArgs || {} })
            .catch((error:any) => {
                if(error.response.status===410)
                    return
                console.error(JSON.stringify(error.response.data));
                throw error;
            });
    }
    return {
        get,
        post,
        del,
        put,
        fetchData,
        http
    };
}

export const hrms = RestApi("http://localhost:8080/hrms");