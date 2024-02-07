import {hrms as rest} from "./rest";

const base = 'api/v1/';

export default {
    // list: (le_id: string, lec_id: string) => rest.get(base, { le_id, lec_id }),
    // get: (le_id: string, lec_id: string, id: string) => rest.get(base + "/{{id}}", { le_id, lec_id, id }),
    // update: (le_id: string, lec_id: string, id: string, data: any) => rest.put(base + "/{{id}}", { le_id, lec_id, id }, data),
    // create: (le_id: string, lec_id: string, data: any) => rest.post(base, { le_id, lec_id }, data),
    // remove: (le_id: string, lec_id: string, id: string) => rest.del(base + "/{{id}}", { le_id, lec_id, id }, {}),
    // activate: (le_id: string, lec_id: string, id: string) => rest.put(base + "/{{id}}/active", { le_id, lec_id, id }, {}),
    // deactivate: (le_id: string, lec_id: string, id: string) => rest.put(base + "/{{id}}/inactive", { le_id, lec_id, id }, {}),
    // isCodeExist: (le_id: string, lec_id: string, code:string) => rest.get(base + "/code/{{code}}/exists", { le_id, lec_id, code }),
    // isNameExist: (le_id: string, lec_id: string, name: string) => rest.get(base + "/name/{{name}}/exists", { le_id, lec_id, name }),
    // assignToCustomer:(le_id: string, lec_id: string, id: string, data: any) => rest.post(base + "/{{id}}/customer", { le_id, lec_id, id }, data),


    allUsersData:() => rest.get(base + "user/all"),
    userCount:() => rest.get(base + "user/count-by-role"),
    userCreate:(data: any) => rest.post(base + "user/register", {}, data),
    userLogin:(data: any) => rest.post(base + "auth/login", {}, data),
    userLogout:(data:any) => rest.post(base + "auth/logout", {}, {},{},{"Authorization":data}),
    userEdit:(data: any, id: string) => rest.put(base + `user/${id}`, {}, data),
    employeeCreate:(data: any) => rest.post(base + "employee", {}, data),
    employeeSearch:(data: any) => rest.post(base + "employee/search", { }, data),
    employeeDelete:(id: string) => rest.del(base + `employee/${id}`,{}),
    // documentUpload:(data:any) => rest.post(base+ "document/upload",{}, data,'',0,{'Content-Type': 'multipart/form-data'}),
    documentUpload:(data:any) => rest.post(base+ "document/upload",{}, data,'',{'Content-Type': 'multipart/form-data'}),
    documentDelete:(id: string) => rest.del(base + `document/${id}`, {}, id),
    sendOtp:(data: any) => rest.post(base + `auth/send-otp`, {},{},data),
    verifyOtp:(data: any) => rest.post(base + `auth/verify-otp`,{},{}, data),
    resetPassword:(data: any) => rest.post(base + `auth/reset`,{},data, {}),
    generatePassword:(data: any) => rest.post(base + `auth/reset`,{},data, {}),
    employeeDetailsByID:(id: any) => rest.get(base + `employee/${id}`),

    userLoginDetail:(mail: any) => rest.get(base + `user?email=${mail}`),
    allBirthday:() => rest.get(base + "event/birthday"),
    allAnniversary:() => rest.get(base + "event/work"),


    postEmployeeDetailsByID:(data: object,id:any) => rest.put(base + `employee/${id}`,{},data, {})



    // assignedCustomers:(le_id: string, lec_id: string, id: string) => rest.get(base + "/{{id}}/customer", { le_id, lec_id, id }),
    // unAssigned:(le_id: string, lec_id: string) => rest.get(base + "/assigned?assigned=false", { le_id, lec_id}),
    // updateEndDate: (le_id: string, lec_id: string, end_date : any, data: any) => rest.put(base+ "/end-date/{{end_date}}", { le_id, lec_id,end_date},data),
    // updateStartDate: (le_id: string, lec_id: string, start_date : string, data: any) => rest.put(base+ "/start-date/{{start_date}}", { le_id, lec_id, start_date},data),
    // expire: (le_id: string, lec_id: string, data: any) => rest.put(base+ "/expire", { le_id, lec_id},data),
    // sequence: (le_id: string, lec_id: string, data: any) => rest.put(base+ "/sequence", { le_id, lec_id},data),
    // updateRank: (le_id: string, lec_id: string, id: string,rank: number) => rest.put(base + "/{{id}}/rank/{{rank}}", { le_id, lec_id, id,rank }, {}),
}