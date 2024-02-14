import React from 'react';
import { Layout } from 'antd';
import HeaderComponent from '../header/header';
import {Footer, Content} from "antd/es/layout/layout";
import {Outlet} from "react-router-dom";
import './layoutComponent.scss';


function LayoutComponent() {
    return (
        <Layout className='hrms-layout'>
            <HeaderComponent />
            <Layout>
                <Content className='main-section'><Outlet /></Content>
            </Layout>
            <Footer className='footer-section'>
                © OKRUTI IT CONSULTING {new Date().getFullYear()}
            </Footer>
        </Layout>
    );
}

export default LayoutComponent;