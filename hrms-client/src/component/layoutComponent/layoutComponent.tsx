import React, {useEffect, useState} from 'react';
import { Layout } from 'antd';
import HeaderComponent from '../header/header';
import FooterComponent from '../footer/footer';
import { Content } from "antd/es/layout/layout";
import {Outlet} from "react-router-dom";
import './layoutComponent.scss';


function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    const backToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <>
            {isVisible && (
                <div onClick={backToTop} className="scroll-to-top">
                    <span className="progress-value">🠕</span>
                </div>
            )}
        </>
    );
}


function LayoutComponent() {
    return (
        <Layout className='hrms-layout'>
            <HeaderComponent />
            <Content className='main-section'><Outlet /></Content>
            <FooterComponent />
            <ScrollToTop/>
        </Layout>
    );
}

export default LayoutComponent;