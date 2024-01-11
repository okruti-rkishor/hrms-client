import { Outlet } from "react-router-dom";
import React from "react";
import { Layout, Flex } from 'antd';
import Navbar from "../side navbar/navbar";
import {Header, Footer, Content} from "antd/es/layout/layout";
import HeaderComponent from "../header/header";

// const { Header, Footer, Sider, Content } = Layout;

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
    // backgroundColor: '#0958d9',
};

const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    // color: '#fff',
    backgroundColor: '#dbdbdb',
};

const layoutStyle = {
    borderRadius: 8,
    overflow: 'hidden',
    width: 'calc(50% - 8px)',
    maxWidth: 'calc(50% - 8px)',
};

function LayoutComponent() {
    return (
        <>
        {/*<Layout >*/}
        {/*    <HeaderComponent />*/}
        {/*    /!*style={{ minHeight: '100vh' }}*!/*/}
        {/*    <Layout >*/}
        {/*        */}
        {/*        <Outlet />*/}
        {/*    </Layout>*/}
        {/*    <Footer style={{ textAlign: 'center' }}>*/}
        {/*        OKRUTI IT CONSULTING ©{new Date().getFullYear()}*/}
        {/*    </Footer>*/}
        {/*</Layout>*/}

        <Layout>
            <Navbar />
            {/*<Sider width="25%">*/}
            {/*    */}
            {/*</Sider>*/}
            <Layout>
                <HeaderComponent />
                <Content style={contentStyle}><Outlet /></Content>

                <Footer style={footerStyle}>
                    OKRUTI IT CONSULTING ©{new Date().getFullYear()}
                </Footer>
            </Layout>
        </Layout>
            </>
    );
}

export default LayoutComponent;