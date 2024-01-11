import React from 'react';
import './App.css';
import {createBrowserRouter, createRoutesFromElements, Link, Route, RouterProvider} from "react-router-dom";
import Login from "./component/login/login";
import LayoutComponent from './component/layout component/layoutComponent';
import Home from "./component/home/home";
import Error from "./component/error page/error";
import FormComponent from "./component/form/formComponent";
import ApiInterceptor from "./apiInterceptor";
import TempFile from "./component/Practice/tempFile";
import UserDataTable from "./component/user data table/userDataTable";


const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path='/' element={<LayoutComponent />}>
                <Route path='/home' element={<Home/>}/>
                <Route path='/employee/create' element={<FormComponent/>}/>
                <Route path='/user-detail' element={<UserDataTable/>}/>
                {/*<Route path='/temp' element={<TempFile />}/>*/}
            </Route>

            <Route path='/login' element={<Login/>}/>
            <Route path='*' element={<Error/>}/>


            {/*<Route path='/signup' element={<Login/>}/>*/}
        </>
    )
);


const App: React.FC = () => (
    <div className="App">
        <ApiInterceptor/>
        <RouterProvider router={router} />
    </div>
);

export default App;

