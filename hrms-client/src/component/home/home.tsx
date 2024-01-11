import React from "react";
// import {Link, Outlet} from "react-router-dom";
import {Layout, Card} from "antd";
import { Col, Row } from 'antd';
import './home.scss'

function Home() {
    return (
        <div className='home-page'>
            <Row>
                <Col span={6}>
                    <Card loading title="Card title" >
                        Whatever content
                    </Card>
                </Col>
                <Col span={6}>
                    <Card loading title="Card title" >
                        Whatever content
                    </Card>
                </Col>
                <Col span={6}>
                    <Card loading title="Card title" >
                        Whatever content
                    </Card>
                </Col>
                <Col span={6}>
                    <Card loading title="Card title" >
                        Whatever content
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
export default Home;