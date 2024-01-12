import React, {useEffect, useState} from "react";
// import {Link, Outlet} from "react-router-dom";
import {Layout, Card} from "antd";
import CountUp from "react-countup";
import { Col, Divider, Row } from 'antd';
import './home.scss'
import restApi from "../../services/http/api";




// userCount

function Home() {
    const [count,setCount] = useState(0);
    useEffect(()=>{
        void userCount();

    },[]);
    const userCount = async () => {
        const response = await restApi.userCount();
        setCount(response[0].count)
        //console.log('Success:', response[0].count);
    };
    return (
        <div className='home-page'>
            {/*<Divider orientation="left">Responsive</Divider>*/}
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col className="gutter-row" span={6}>
                    <Card  title="Super User" className='super-user' >
                        <CountUp
                            start={0}
                            end={1000}
                            duration={4}
                            className='user-count'
                        />
                    </Card>
                </Col>
                <Col className="gutter-row" span={6}>
                    <Card  title="Employee" className='employee' >
                        <CountUp
                            start={0}
                            end={1000}
                            duration={4}
                            className='user-count'
                        />
                    </Card>
                </Col>
                <Col className="gutter-row" span={6}>
                    <Card  title="Users" className='users' >
                        <CountUp
                            start={0}
                            end={count}
                            duration={4}
                            className='user-count'
                        />
                    </Card>
                </Col>
                <Col className="gutter-row" span={6}>
                    <Card title="Guest User" className='guest-user' >
                        <CountUp
                            start={0}
                            end={1000}
                            duration={4}
                            className='user-count'
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
export default Home;