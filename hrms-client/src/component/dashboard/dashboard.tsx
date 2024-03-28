import React from 'react';
import {Layout} from "antd";
import './dashboard.scss';
import DashboardChart from "./chart/dashboardChart";
import QuickLinks from "./quickLinks/quickLinks";
import DashboardReport from "./report/dashboardReport";


const Dashboard = () => {

    return (
        <Layout className='hrms-dashboard'>
            <div className='hrms-dashboard__container'>
                <section className='hrms-dashboard__chart-and-links'>
                    <QuickLinks/>
                    <DashboardChart/>
                </section>
                <br/>
                <DashboardReport />
            </div>
        </Layout>
    );
}

export default Dashboard;