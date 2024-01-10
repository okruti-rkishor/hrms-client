import React from 'react';
import './App.css';
import {createBrowserRouter, createRoutesFromElements, Link, Route, RouterProvider} from "react-router-dom";
import Login from "./component/login/login";
import LayoutComponent from './component/layout component/layoutComponent';
import Home from "./component/home/home";
import Error from "./component/error page/error";


const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path='/' element={<LayoutComponent />}>
                <Route path='/home' element={<Home/>}/>
            </Route>
            <Route path='*' element={<Error/>}/>
            <Route path='/login' element={<Login/>}/>
            {/*<Route path='/signup' element={<Login/>}/>*/}
        </>
    )
);


const App: React.FC = () => (
    <div className="App">
        <RouterProvider router={router} />
    </div>
);

export default App;

