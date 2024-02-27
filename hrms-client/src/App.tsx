import React from 'react';
import './App.scss';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Login from "./component/login/login";
import LayoutComponent from './component/layoutComponent/layoutComponent';
import Home from "./component/home/home";
import Error from "./component/error page/error";
import EmployeeCreate from "./component/employee/employeeCreate";
import ApiInterceptor from "./apiInterceptor";
import UserCreate from "./component/user/user-create/userCreate";
import UserDataTable from "./component/user/user-list/userDataTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmployeeSearch from './component/employee/employeeSearch';
import ForgotPassword from './component/forgotPassword/forgotPassword';
import Birthday from './component/events/birthday/birthday';
import Anniversary from './component/events/anniversary/anniversary';
import UserDetailsCard from "./component/user/user-cards/userDetailsCard";
import EmployeeDetail from './component/employee/employeeDetail/employeeDetail';
import EnumCards from "./component/enums/enum-detail/enum-cards";
import PrivateRoutes from './privateRoutes/privateRoutes';
import AboutUs from "./component/company/aboutUs";
import FAQComponent from "./component/company/faq";
import PrivacyPolicy from "./component/company/privacyPolicy";
import ContactUs from "./component/company/contactUs";
import HolidayCreate from './component/holiday/holidayCreate';
import HolidayList from './component/holiday/holidayList';
import HolidayCalendar from './component/holiday/calendar';


const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path='/' element={<LayoutComponent />}>
                <Route path='/' element={<Home/>}/>
                <Route path='/home' element={<Home/>}/>
                <Route path="/user/list" element={<PrivateRoutes Componant={<UserDataTable/>} />} />
                <Route path="/user/detail" element={<PrivateRoutes Componant={<UserDetailsCard />} />} />
                <Route path='/user/create' element={<PrivateRoutes Componant={<UserCreate/>}/>}/>
                <Route path='/employee/search' element={<PrivateRoutes Componant={<EmployeeSearch/>}/>}/>
                <Route path='/employee/create' element={<EmployeeCreate/>}/>
                <Route path='/event/birthday' element={<Birthday />}/>
                <Route path='/event/anniversary' element={<Anniversary />}/>
                <Route path='/event/birthday/:id' element={<Birthday />}/>
                <Route path='/employee/create/:id' element={ <PrivateRoutes Componant={<EmployeeCreate/>}/>}/>
                <Route path='/employee/detail/:id' element={ <PrivateRoutes Componant={<EmployeeDetail/>}/>}/>
                <Route path='/enum' element={  <PrivateRoutes Componant={<EnumCards/>}/> }/>
                <Route path='/about-us' element={<AboutUs/>}/>
                <Route path='/faqs' element={<FAQComponent/>}/>
                <Route path='/privacy-policy' element={<PrivacyPolicy/>}/>
                <Route path='/contact-us' element={<ContactUs/>}/>
                <Route path='/holiday' element={<HolidayList/>}/>
                <Route path='/holiday/create' element={<HolidayCreate/>}/>
                <Route path='/holiday/calendar' element={<HolidayCalendar />}/>
            </Route>
            <Route path='/login' element={<Login/>}/>
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='*' element={<Error/>}/>
        </>
    )
);


const App: React.FC = () => (
    <div className="App">
        <ApiInterceptor/>
        <ToastContainer autoClose={8000} position={toast.POSITION.BOTTOM_RIGHT} />
        <RouterProvider router={router} />
    </div>
);

export default App;

