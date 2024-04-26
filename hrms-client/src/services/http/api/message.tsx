const generateMessage = async (code: number) => {
    // const code = parseInt(pcode, 10);
    // console.log(code, pcode, "codeee");

    switch (true) {
        case code === 503:
            return "Back-end server is at capacity";
        case code === 504: // 2xx Successfuls
            return "Not connected";
        case code < 300: // 2xx Successfuls
            return "OK";
        case code === 401: // 2xx Successfuls
            return "Invalid Session. Please re-login to continue!";
        case code < 400: // 3xx Redirection
            return "NOT AVAILABLE";
        case code === 404: // 4xx Client Error
            return "NOT FOUND";
        case code === 409: // 4xx Client Error
            return "DATA CONFLICT";
        case code === 410: // 4xx Client Error
            return "DELETE SUCCESS";
            case code < 500: // 4xx Client Error
            return "CLIENT ERROR";

        default:
            // 5xx Server Errors
            return "SERVER ERROR";
    }
};

export default generateMessage;