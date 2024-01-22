import React, {useEffect, useState} from "react";
// import {Link, Outlet} from "react-router-dom";
import {Layout, Card} from "antd";
import CountUp from "react-countup";
import { Col, Divider, Row } from 'antd';
import './home.scss'
import restApi from "../../services/http/api";


function Home() {
    const [countAdmin,setCountAdmin] = useState(0);
    const [countHR,setCountHR] = useState(0);
    const [countEmployee,setCountEmployee] = useState(0);
    const [countUser,setCountUser] = useState(0);


    useEffect(()=>{
        void userCount();
    },[]);

    const userCount = async () => {
        const response = await restApi.userCount();
        for (let i=0; i<response.length; i++) {
            if(response[i].role === 'ADMIN') {
                setCountAdmin(response[i].count);
            } else if(response[i].role === 'HR') {
                setCountHR(response[i].count);
            } else if(response[i].role === 'EMPLOYEE') {
                setCountEmployee(response[i].count);
            } else if(response[i].role === null) {
                setCountUser(response[i].count);
            }
        }
    };

    return (
        <div className='home-page'>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col className="gutter-row" span={6}>
                    <Card  title="Admin" className='admin' >
                        <CountUp
                            start={0}
                            end={countAdmin}
                            duration={2}
                            className='user-count'
                        />
                    </Card>
                </Col>
                <Col className="gutter-row" span={6}>
                    <Card title="HR" className='hr-user' >
                        <CountUp
                            start={0}
                            end={countHR}
                            duration={2}
                            className='user-count'
                        />
                    </Card>
                </Col>
                <Col className="gutter-row" span={6}>
                    <Card  title="Employee" className='employee' >
                        <CountUp
                            start={0}
                            end={countEmployee}
                            duration={2}
                            className='user-count'
                        />
                    </Card>
                </Col>
                <Col className="gutter-row" span={6}>
                    <Card  title="Guest Users" className='guest-users' >
                        <CountUp
                            start={0}
                            end={countUser}
                            duration={2}
                            className='user-count'
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
export default Home;