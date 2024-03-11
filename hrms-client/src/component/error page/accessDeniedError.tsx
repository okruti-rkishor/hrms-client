import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

const AccessDenied = () => (
    // const [backToHomeSatatus, setBackToHomeStatus] = useState("")

  <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={<Link className='back-home-button' to='/'>Back Home</Link>}
  />
);

export default AccessDenied;