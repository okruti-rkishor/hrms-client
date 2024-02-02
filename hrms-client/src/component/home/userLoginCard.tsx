import React, {useContext} from 'react';
import {Avatar, Button, Card, Popover, Tag,} from 'antd';
import UserLoginContext from "../../context/userLoginContext";
import rest from "../../services/http/api";
import './userLoginCard.scss';

const { Meta } = Card;

const UserDataContent = () => {
    const {newUser, setNewUser} = useContext<any>(UserLoginContext);
    const role = newUser.role;

    let color;
    if (role === 'ADMIN') {
        color = 'geekblue';
    } else if(role === 'HR') {
        color = 'pink';
    } else if(role === 'EMPLOYEE') {
        color = 'green';
    }

    const handleLogout = async () => {
        try {
            await rest.userLogout();
            setNewUser({
                loginStatus: false,
                id: "",
                email: "",
                firstName: "",
                lastName: "",
                role: "",
            });
        } catch (error:any) {
            console.error('Unable to Logout the User:', error.message);
        }
    }

    return (
        <Card
            style={{ width: 300 }}
            className='user-login-card'
            cover={
                <img
                    alt="example cover"
                    src="https://picsum.photos/id/1/300/180?blur=3"
                />
            }
        >
            <Meta
                title = {`${newUser.firstName} ${newUser.lastName}`}
                description={[
                    <>
                        <h5 className='user-card-mail'>{newUser.email}</h5>
                        {role &&
                            <Tag color={color} key={role} className='user-card-role'>
                                {role.toUpperCase()}
                            </Tag>
                        }
                    </>
                ]}
            />
            <div className="logout-button">
                <Button type="primary" onClick={handleLogout}>Logout &#8640;</Button>
            </div>
        </Card>
    )
};


const UserLoginCard = () => {
    return (
        <Popover content={<UserDataContent />}  trigger="click">
            <div className='user-login-avatar'>
                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=0" />
            </div>
        </Popover>
    );
}

export default UserLoginCard;