import { Button, Result } from 'antd';
import React from 'react';
import {Link} from "react-router-dom";
import './error.scss'

const Error: React.FC = () => (
    <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Link to="/home" className='back-home-button'>Back Home</Link>}
    />
);

export default Error;