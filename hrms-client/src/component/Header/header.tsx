import React, {useEffect} from "react";
import {Header} from "antd/es/layout/layout";
import {Button, Col, Row, Image} from 'antd';
import './header.scss'
import restApi from "../../services/http/api/index";

const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: '#001529',
};


const HeaderComponent = () => {
    useEffect(() => {
        // getData();
    }, []);
    // const getData = async () => {
    //     const data ={
    //             "firstName": "sursssesh",
    //             "lastName": "ssssss",
    //              "username":"jk",
    //             "email": "sureshji@gmail.com",
    //             "password": "Ashiss@12345"
    //         };
    //
    //     await restApi.userCreate(data);
    // }

    return (
        <Header>
            <Row>
                {/*<Col span={2}>*/}
                {/*    <a href='/home'>*/}
                {/*        <img src="./images/logos/HRMS-logos_white.png" />*/}
                {/*        <Image width={100} height={100} src="./images/logos/HRMS-logos_white.png"/>*/}
                {/*    </a>*/}
                {/*</Col>*/}
                {/*<Col span={16}><h1 style={{color: 'white'}}>HRMS</h1></Col>*/}
                <Col >
                    <Button className={'login-button'} href={'/login'}>Log In</Button>
                    <Button className={'signup-button'} href={'/login'}>Sign Up</Button>
                </Col>

            </Row>

            {/*<h1>header</h1>*/}
            {/*<div className='header-buttons'>*/}
            {/*    <Button>Log In</Button>*/}
            {/*    <Button>Sign In</Button>*/}
            {/*    /!*<button className='login-button'></button>*!/*/}
            {/*    /!*<button className='signin-button'></button>*!/*/}
            {/*</div>*/}
        </Header>
    );
}

export default HeaderComponent;