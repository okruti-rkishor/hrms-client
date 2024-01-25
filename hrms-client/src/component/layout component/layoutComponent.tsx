import { Outlet } from "react-router-dom";
import React from "react";
import { Layout } from 'antd';
import {Footer, Content} from "antd/es/layout/layout";
import Navbar from "../side navbar/navbar";
import HeaderComponent from "../header/header";


const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
};

const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    // backgroundColor: '#dbdbdb',
};

function LayoutComponent() {
    return (
        <>
            <Layout>
                <HeaderComponent />
                <Layout style={{background: '#f0f0f0'}}>
                    <Navbar />
                    <Content style={contentStyle}><Outlet /></Content>
                </Layout>
                <Footer style={footerStyle}>
                    OKRUTI IT CONSULTING ©{new Date().getFullYear()}
                </Footer>
            </Layout>
        </>
    );
}

export default LayoutComponent;