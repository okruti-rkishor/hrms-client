import {Route, Routes} from "react-router-dom";
import {
    AboutUs,
    Anniversary,
    Birthday,
    ContactUs,
    EmployeeCreate,
    EmployeeDetailComponent02,
    EmployeeSearch,
    EnumCards,
    Error,
    ForgotPassword,
    HolidayCalendar,
    HolidayCreate,
    LayoutComponent,
    Login,
    PrivacyPolicy,
    PrivateRoutes,
    UserCreate,
    UserDataTable,
    UserDetailsCard,
    Setting
} from "./component/index";
import "./App.scss";
import "react-toastify/dist/ReactToastify.css";
import ApiInterceptor from "./apiInterceptor";
import {toast, ToastContainer} from "react-toastify";
import UserLoginContext from "./context/userLoginContext";
import React, {useContext, useEffect} from "react";
import LeaveIndex from "./component/leaves/leaveIndex";
import LeaveRequest from "./component/leaves/leaveStatus/leaveRequest";
import Dashboard from "./component/dashboard/dashboard";
import ChangePassword from "./component/user/change-password/changePassword";

const App = () => {
    const {newUser} = useContext(UserLoginContext);


    return (
        <div className="App">
            <ApiInterceptor/>
            <ToastContainer autoClose={8000} position={toast.POSITION.BOTTOM_RIGHT}/>
            <Routes>
                {/* for employee newUser?.roles.length===1&&newUser?.roles[0]==="EMPLOYEE" this condition */}
                {newUser?.roles.length === 0 && <Route path="/" element={<Login/>}/>}
                <Route path="/" element={<LayoutComponent/>}>
                    {newUser?.roles.length !== 0 && <Route index element={<Dashboard/>}/>}
                    <Route path="home" element={<Dashboard/>}/>
                    <Route path="user/list"
                           element={<PrivateRoutes Component={<UserDataTable/>}/>}
                    />
                    <Route path="user/detail"
                           element={<PrivateRoutes Component={<UserDetailsCard/>}/>}
                    />
                    <Route path="user/create"
                           element={<PrivateRoutes Component={<UserCreate/>}/>}
                    />
                    <Route path="user/change-password"
                           element={<ChangePassword/>}
                    />
                    <Route path="employee/search"
                           element={<EmployeeSearch/>}
                           // element={<PrivateRoutes Component={<EmployeeSearch/>}
                    />
                    <Route path="employee/create" element={<PrivateRoutes Component={<EmployeeCreate/>}/>}/>
                    <Route path="event/birthday" element={<Birthday/>}/>
                    <Route path="event/anniversary" element={<Anniversary/>}/>
                    <Route path="event/birthday/:id" element={<Birthday/>}/>
                    <Route path="employee/create/:id"
                           element={<PrivateRoutes Component={<EmployeeCreate/>}/>}
                    />
                    <Route path="employee/detail/:id"
                           element={<EmployeeDetailComponent02/>}
                    />
                    <Route path="enum"
                           element={<PrivateRoutes Component={<EnumCards/>}/>}
                    />
                    <Route path="setting"
                           element={<PrivateRoutes Component={<Setting/>}/>}
                    />
                    <Route path="employee/leaves"
                           element={<LeaveRequest/>}
                    />
                    <Route path="about-us" element={<AboutUs/>}/>
                    <Route path="privacy-policy" element={<PrivacyPolicy/>}/>
                    <Route path="contact-us" element={<ContactUs/>}/>
                    {/*<Route path="holiday" element={<HolidayList/>}/>*/}
                    <Route path="leave" element={<LeaveIndex/>}/>
                    <Route path="holiday/create" element={<PrivateRoutes Component={<HolidayCreate/>}/>}/>
                    <Route path="holiday/calendar" element={<HolidayCalendar/>}/>
                </Route>
                <Route path="/login" element={<Login/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                <Route path="*" element={<Error/>}/>
            </Routes>
        </div>
    )
}

export default App;
