import {hrms as rest} from "./rest";
const base = 'v1/';
export default {
    // allUsersData:() => rest.get(base + "user/all"),
    userCount:() => rest.get(base + "user/count-by-role"),
    getUsers:(user:string|null) => rest.get(base + `user/find?role-type=${user}`),
    getAllUsers:() => rest.get(base + `user`),
    userCreate:(data: any) => rest.post(base + "user", {}, data),
    userLogin:(data: any) => rest.post(base + "auth/login", {}, data),
    userLogout:(data:any) => rest.post(base + "auth/logout", {}, {},{},{"Authorization":data}),
    userEdit:(data: any, id: string) => rest.put(base + `user/${id}`, {}, data),
    userDelete:(id: string) => rest.del(base + `user/${id}`,{}),
    resetUserPassword:(data: object,id:string) => rest.post(base + `user/${id}/change-password`,{},{}, {password:data}),
    employeeCreate:(data: any) => rest.post(base + "employee", {}, data),
    employeeSearch:(data: any) => rest.post(base + "employee/search", { }, data),
    getAllEmployee:() => rest.get(base + "employee/getAll", { }),
    employeeDelete:(id: string) => rest.del(base + `employee/${id}`,{}),
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
    postEmployeeDetailsByID:(data: object,id:any) => rest.put(base + `employee/${id}`,{},data, {}),
    postEnum:(data:any,id:string)=>rest.post(base+`${id}`,{},data),
    getEnum:(id:string)=>rest.get(base+`${id}/find`),
    deleteEnum:(id:string)=>rest.del(base+`${id}`,{}),
    putEnum:(data:any,id:string)=>rest.put(base+`${id}`,{},data),
    activeEnum:(data:any,id:string)=>rest.put(base+`${id}`,{},data),
    //Holiday
    holidayCreate:(data:any)=>rest.post(base+"holiday",{},data),
    getAllHoliday:()=>rest.get(base+"holiday/search"),
    deleteHoliday:(data:string[])=>rest.del(base+`holiday`,{},data,{}),//todo
    //single delete
    deletOneeHoliday:(id:string[])=>rest.del(base+`holiday/${id}`,{},{},{}),//todo
    //State-city
    getState:(data: object)=>rest.post("https://countriesnow.space/api/v0.1/countries/states",{},data,{}),
    getCity:(data: object)=>rest.post("https://countriesnow.space/api/v0.1/countries/state/cities",{},data,{}),
    //LeaveType
    leaveTypeCreate:(data: any) => rest.post(base + "leave-type", {}, data),
    getAllLeaveTypes:() => rest.get(base + "leave-type/all", {}, ),
    leaveTypeDelete:(data:string) => rest.del(base + `leave-type/${data}`, {}, ),
    //Work Week
    workWeekCreate:(data: any) => rest.post(base + "work-week", {}, data),
    getAllWorkWeek:() => rest.get(base + "work-week/all", {}, ),
    deleteWorkWeek:(data:string) => rest.del(base + `work-week/${data}`, {}, ),
    //leaveEntitlement
    leaveEntitlementCreate:(data: any) => rest.post(base + "leave-entitlement", {}, data),
    getAllLeaveEntitlement :() => rest.get(base + "leave-entitlement/search", {}, ),
    deleteLeaveEntitlement :(id:string) => rest.del(base + `leave-entitlement/${id}`, {}, ),
    //Designation
    createDesignation:(data:any)=>rest.post(base+"designation",{},data),
    getAllDesignation:()=>rest.get(base+"designation/find",{}),
    deleteDesignation:(id:string)=>rest.del(base+`designation/${id}`,{}),
    updateDesignation:(data:any,id:string)=>rest.put(base+`designation/${id}`,{},data),
    updateDesignationStatus:(status:boolean,id:string)=>rest.put(base+`designation/${id}`,{},undefined,{active:status}),//todo  => Done
    //Qualification
    createQualification:(data:any)=>rest.post(base+"qualification",{},data),
    getAllQualification:()=>rest.get(base+"qualification/find"),
    deleteQualification:(id:string)=>rest.del(base+`qualification/${id}`,{}),
    updateQualification:(data:any,id:string)=>rest.put(base+`qualification/${id}`,{},data),
    updateQualificationStatus:(status:boolean,id:string)=>rest.put(base+`qualification/${id}`,{},null,{active:status}),
    //Leave Application
    createLeave:(data:any,id:string)=>rest.post(base+"leave-request",{empId:id},data),
    getLeaveRequest:(id:string)=>rest.get(base+`leave-request/${id}`,{},),
    deleteLeaveRequest:(id:string)=>rest.del(base+`leave-request/${id}`,{}),
    updateLeaveRequest:(status:string,id:string)=>rest.put(base+`leave-request/${id}/update-status`,{},undefined,{status:status}),
    searchLeave:()=>rest.post(base+`leave-request/search`,{},{
        // "leaveStatus":"PENDING",
        "startDate":"2024-03-01",
        "endDate":"2024-07-06"}),
    getIntitlementByEmpLeaveType:(id:string,leaveType:string)=>rest.get(base+`leave-entitlement/employee-id/${id}/leave-type/${leaveType}`),
    getLeaveBalance:(id:string, leaveType?:string)=>rest.get(base+`leave-balance`,{},{"employee-id":id,"leave-type":leaveType}),
}