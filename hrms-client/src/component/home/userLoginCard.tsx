import React, {useContext} from 'react';
import {Avatar, Button, Card, Form, Popover, Tag,} from 'antd';
import './userLoginCard.scss';
import UserLoginContext from "../../context/userLoginContext";

const { Meta } = Card;

const UserDataContent = () => {
    const {newUser} = useContext<any>(UserLoginContext);
    console.log(newUser);
    const role = newUser.role;

    let color;
    if (role === 'ADMIN') {
        color = 'geekblue';
    } else if(role === 'HR') {
        color = 'pink';
    } else if(role === 'EMPLOYEE') {
        color = 'green';
    }

    return (
        <Card
            style={{ width: 300 }}
            className='user-login-card'
            cover={
                <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
            }
        >
            <Meta
                title = {`${newUser.firstName} ${newUser.lastName}`}
                description={[
                    <div>
                        <p>{newUser.email}</p>
                        {role &&
                            <Tag color={color} key={role}>
                                {role.toUpperCase()}
                            </Tag>
                        }
                    </div>
                ]}
            />
            <div className="logout-button">
                <Button type="primary" danger htmlType="submit">Logout &#8640;</Button>
            </div>
        </Card>
    )
};

const UserLoginCard = () => {
    // const {newUser} = useContext<any>(UserLoginContext);

    return (
        <Popover content={<UserDataContent />}  trigger="click">
            <div className='user-login-avatar'>
                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=0" />
            </div>
        </Popover>
    );
}

export default UserLoginCard;