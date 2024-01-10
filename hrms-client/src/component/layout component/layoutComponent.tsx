import { Outlet } from "react-router-dom";
import React from "react";
import { Layout, Flex } from 'antd';
import Navbar from "../side navbar/navbar";
import {Footer, Header} from "antd/es/layout/layout";


// const { Header, Footer } = Layout;

const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: '#001529',
};

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
            <Header style={headerStyle}>
                <h1>Header</h1>
            </Header>
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