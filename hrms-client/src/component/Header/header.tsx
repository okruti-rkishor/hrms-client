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
                <Col span={2}>
                    <a href='/home'>
                        <Image width={100} height={100} src="./images/logos/HRMS-logos_white.png"/>
                    </a>
                </Col>
                <Col span={18}><h1 style={{color: 'white'}}>HRMS</h1></Col>
                <Col span={4}><Button>Log In</Button>
                    <Button>Sign In</Button></Col>

            </Row>

            {/*<h1>Header</h1>*/}
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