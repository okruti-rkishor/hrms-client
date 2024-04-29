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
    HolidayList,
    Home,
    LayoutComponent,
    Login,
    PrivacyPolicy,
    PrivateRoutes,
    UserCreate,
    UserDataTable,
    UserDetailsCard,
    Leaves
} from "./component/index";
import "./App.scss";
import "react-toastify/dist/ReactToastify.css";
import ApiInterceptor from "./apiInterceptor";
import {toast, ToastContainer} from "react-toastify";
import UserLoginContext from "./context/userLoginContext";
import React, {useContext, useEffect} from "react";
import LeaveIndex from "./component/leavesSection/leaveIndex";
import LeaveRequest from "./component/leavesSection/leaveRequest";

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
                    {newUser?.roles.length !== 0 && <Route index element={<Home/>}/>}
                    <Route path="home" element={<Home/>}/>
                    <Route path="user/list"
                           element={<PrivateRoutes Componant={<UserDataTable/>}/>}
                    />
                    <Route path="user/detail"
                           element={<PrivateRoutes Componant={<UserDetailsCard/>}/>}
                    />
                    <Route path="user/create"
                           element={<PrivateRoutes Componant={<UserCreate/>}/>}
                    />
                    <Route path="employee/search"
                           element={<PrivateRoutes Componant={<EmployeeSearch/>}/>}
                    />
                    <Route path="employee/create" element={<EmployeeCreate/>}/>
                    <Route path="event/birthday" element={<Birthday/>}/>
                    <Route path="event/anniversary" element={<Anniversary/>}/>
                    <Route path="event/birthday/:id" element={<Birthday/>}/>
                    <Route path="employee/create/:id"
                           element={<PrivateRoutes Componant={<EmployeeCreate/>}/>}
                    />
                    <Route path="employee/detail/:id"
                           element={<EmployeeDetailComponent02/>}
                    />
                    <Route path="enum"
                           element={<PrivateRoutes Componant={<EnumCards/>}/>}
                    />
                    <Route path="setting/leaves"
                           element={<PrivateRoutes Componant={<Leaves/>}/>}
                    />
                    <Route path="home/leaves"
                           element={<PrivateRoutes Componant={<LeaveRequest/>}/>}
                    />
                    <Route path="about-us" element={<AboutUs/>}/>
                    <Route path="privacy-policy" element={<PrivacyPolicy/>}/>
                    <Route path="contact-us" element={<ContactUs/>}/>
                    {/*<Route path="holiday" element={<HolidayList/>}/>*/}
                    <Route path="leave" element={<LeaveIndex />}/>
                    <Route path="holiday/create" element={<HolidayCreate/>}/>
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
