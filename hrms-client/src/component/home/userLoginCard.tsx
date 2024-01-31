import React from 'react';
import {Avatar, Card, Popover,} from 'antd';
import './userLoginCard.scss';;

const { Meta } = Card;

const content = (
    <Card
        style={{ width: 300 }}
        cover={
            <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
        }
    >
        <Meta
            title="User Name"
            description="User Designation"
        />
    </Card>
);

const UserLoginCard = () => {
    return (
        <Popover content={content} trigger="click">
            <div className='user-login-popover'>
                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=0" />
            </div>
        </Popover>
    );
}

export default UserLoginCard;