import React from 'react';
import { Layout } from 'antd';
import HeaderComponent from '../header/header';
import FooterComponent from '../footer/footer';
import { Content } from "antd/es/layout/layout";
import {Outlet} from "react-router-dom";
import './layoutComponent.scss';


function LayoutComponent() {
    return (
        <Layout className='hrms-layout'>
            <HeaderComponent />
            <Layout>
                <Content className='main-section'><Outlet /></Content>
            </Layout>
            <FooterComponent />
        </Layout>
    );
}

export default LayoutComponent;