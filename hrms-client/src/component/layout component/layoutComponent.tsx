import { Outlet } from "react-router-dom";
import React from "react";
import { Layout, Flex } from 'antd';
import Navbar from "../side navbar/navbar";
import {Footer, Header} from "antd/es/layout/layout";
import HeaderComponent from "../Header/header";


// const { Header, Footer } = Layout;



const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#0958d9',
};

const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#4096ff',
};

const layoutStyle = {
    borderRadius: 8,
    overflow: 'hidden',
    width: 'calc(50% - 8px)',
    maxWidth: 'calc(50% - 8px)',
};

function LayoutComponent() {
    return (
        <Layout >
            <HeaderComponent />
            {/*style={{ minHeight: '100vh' }}*/}
            <Layout >
                <Navbar />
                <Outlet />
            </Layout>
            <Footer style={{ textAlign: 'center' }}>
                OKRUTI IT CONSULTING ©{new Date().getFullYear()}
            </Footer>
        </Layout>
    );
}

export default LayoutComponent;