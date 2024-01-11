// import {Outlet} from "react-router-dom";
import React from "react";
import {Link, Outlet} from "react-router-dom";
import HeaderComponent from "../header/header";
import {Content, Footer} from "antd/es/layout/layout";
import {Layout} from "antd";
import UserDataTable from '../user data table/userDataTable'

function Home() {
    return (
        <Layout style={{width: '100%'}}>
            {/*<h1>Hello World</h1>*/}
            {/*<Link to="/login">Login Us</Link>*/}
            <UserDataTable />
        </Layout>
        // <div style={{width: '100%'}}>
        //     <h1>Hello World</h1>
        //     <Link to="/login">Login Us</Link>
        // </div>
    );
}
export default Home;