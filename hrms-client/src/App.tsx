import React from 'react';
import './App.css';
import {createBrowserRouter, createRoutesFromElements, Link, Route, RouterProvider} from "react-router-dom";
import Login from "./component/login/login";
import LayoutComponent from './component/layout component/layoutComponent';
import Home from "./component/home/home";
import Error from "./component/error page/error";
import FormComponent from "./component/form/formComponent";
import ApiInterceptor from "./apiInterceptor";
import UserCreate from "./component/user/userCreate";
// import TempFile from "./component/Practice/tempFile";
import UserDataTable from "./component/user data table/userDataTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmployeeSearch from './component/employee/employeeSearch';
import ForgottenPassword from './component/forgottenPassword/forgottenPassword';
import Birthday from './component/birthday/birthday';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path='/' element={<LayoutComponent />}>
                <Route path='/' element={<Home/>}/>
                <Route path='/home' element={<Home/>}/>
                <Route path='/employee/create' element={<FormComponent/>}/>
                <Route path='/user/detail' element={<UserDataTable/>}/>
                <Route path='/user/create' element={<UserCreate/>}/>
                <Route path='/employee/search' element={<EmployeeSearch />}/>
                <Route path='/employee/birthday/:id' element={<Birthday />}/>
                {/*<Route path='/temp' element={<TempFile />}/>*/}
            </Route>

            <Route path='/login' element={<Login/>}/>
            <Route path='/login/user/forgotten-password' element={<ForgottenPassword />} />
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

