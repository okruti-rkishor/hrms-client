import {hrms as rest} from "./rest";

const base = 'api/v1/';

export default {
    // allUsersData:() => rest.get(base + "user/all"),
    userCount:() => rest.get(base + "user/count-by-role"),
    getUsers:(user:string) => rest.get(base + `user/find?role-type=${user}`),
    getAllUsers:() => rest.get(base + `user`),
    userCreate:(data: any) => rest.post(base + "user", {}, data),
    userLogin:(data: any) => rest.post(base + "auth/login", {}, data),
    userLogout:(data:any) => rest.post(base + "auth/logout", {}, {},{},{"Authorization":data}),
    userEdit:(data: any, id: string) => rest.put(base + `user/${id}`, {}, data),
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
    getEnum:(id:string)=>rest.get(base+`${id}`),
    deleteEnum:(id:string)=>rest.del(base+`${id}`,{}),
    putEnum:(data:any,id:string)=>rest.put(base+`${id}`,{},data),
    activeEnum:(data:any,id:string)=>rest.put(base+`${id}`,{},data),
    //Holiday
    holidayCreate:(data:any)=>rest.post(base+"holiday",{},data),
    getAllHoliday:()=>rest.get(base+"holiday/search"),
    deleteHoliday:(data:string[])=>rest.del(base+`holiday/delete-multiples`,{},data,{}),
    //State-city
    getState:(data: object)=>rest.post("https://countriesnow.space/api/v0.1/countries/states",{},data,{}),
    getCity:(data: object)=>rest.post("https://countriesnow.space/api/v0.1/countries/state/cities",{},data,{}),
    //LeaveType
    leaveTypeCreate:(data: any) => rest.post(base + "leave_type", {}, data),
    getAllLeaveTypes:() => rest.get(base + "leave_type/all", {}, ),
    leaveTypeDelete:(data:string) => rest.del(base + `leave_type/${data}`, {}, ),
    //Work Week
    workWeekCreate:(data: any) => rest.post(base + "work_week", {}, data),
    getAllWorkWeek:() => rest.get(base + "work_week/all", {}, ),
    deleteWorkWeek:(data:string) => rest.del(base + `work_week/${data}`, {}, ),
    //leaveEntitlement
    leaveEntitlementCreate:(data: any) => rest.post(base + "leave-entitlement", {}, data),
    getAllLeaveEntitlement :() => rest.get(base + "leave-entitlement/search", {}, ),
    deleteLeaveEntitlement :(id:string) => rest.del(base + `leave-entitlement/${id}`, {}, ),
    //Designation
    createDesignation:(data:any)=>rest.post(base+"designation",{},data),
    getAllDesignation:()=>rest.get(base+"designation/all"),
    deleteDesignation:(id:string)=>rest.del(base+`designation/${id}`,{}),
    updateDesignation:(data:any,id:string)=>rest.put(base+`${id}`,{},data),
    updateDesignationStatus:(status:any,id:string)=>rest.put(base+`designation/${id}/${status}`,{},{}),
    //Qualification
    createQualification:(data:any)=>rest.post(base+"qualification",{},data),
    getAllQualification:()=>rest.get(base+"qualification/all"),
    deleteQualification:(id:string)=>rest.del(base+`qualification/${id}`,{}),
    updateQualification:(data:any,id:string)=>rest.put(base+`${id}`,{},data),
    updateQualificationStatus:(status:any,id:string)=>rest.put(base+`qualification/${id}/`,{active:status},{}),
    //Leave Application
    createLeave:(data:any,id:string)=>rest.post(base+"leaveRequest",{empId:id},data),

}