import React from 'react';
import './App.scss';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Login from "./component/login/login";
import LayoutComponent from './component/layoutComponent/layoutComponent';
import Home from "./component/home/home";
import Error from "./component/error page/error";
import EmployeeCreate from "./component/employee/employeeCreate"
import ApiInterceptor from "./apiInterceptor";
import UserCreate from "./component/user/userCreate";
import UserDataTable from "./component/user/userDataTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmployeeSearch from './component/employee/employeeSearch';
import ForgotPassword from './component/forgotPassword/forgotPassword';
import Birthday from './component/events/birthday/birthday';
import Anniversary from './component/events/anniversary/anniversary';
// import EmployeeDetail from './component/employee/employeeDetail/employeeDetail';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path='/' element={<LayoutComponent />}>
                <Route path='/' element={<Home/>}/>
                <Route path='/home' element={<Home/>}/>
                <Route path='/employee/create' element={<EmployeeCreate/>}/>
                <Route path='/user/detail' element={<UserDataTable/>}/>
                <Route path='/user/create' element={<UserCreate/>}/>
                <Route path='/employee/search' element={<EmployeeSearch />}/>
                <Route path='/event/birthday' element={<Birthday />}/>
                <Route path='/event/anniversary' element={<Anniversary />}/>
                <Route path='/event/birthday/:id' element={<Birthday />}/>
                <Route path={'/employee/create/:id'} element={<EmployeeCreate/>}/>
                {/*<Route path={'/employee/detail/:id'} element={<EmployeeDetail/>}/>*/}
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

