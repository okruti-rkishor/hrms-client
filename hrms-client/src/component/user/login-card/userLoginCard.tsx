import React, {useContext} from 'react';
import {Avatar, Button, Card, Popover, Tag} from 'antd';
import UserLoginContext from "../../../context/userLoginContext";
import rest from "../../../services/http/api";
import { useNavigate } from 'react-router-dom';
import {LogoutOutlined, UserOutlined} from "@ant-design/icons/lib";
import './userLoginCard.scss';


const { Meta } = Card;

const UserDataContent = () => {
    const {newUser, setNewUser} = useContext<any>(UserLoginContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await rest.userLogout(localStorage.getItem('loginToken'));
            localStorage.removeItem('loginToken');
            setNewUser({
                loginStatus: false,
                id: "",
                email: "",
                firstName: "",
                lastName: "",
                roles: "",
            });
            navigate('/login');
        } catch (error:any) {
            console.error('Unable to Logout the User:', error.message);
        }
    }

    return (
        <Card
            style={{ width: 300 }}
            className='user-login__card'
            actions={[
                <Button href={`/employee/detail/${newUser.id}`}
                        key="profile"
                        className="user-profile user-login__card-button"
                >
                    <span className="tooltip">Your Profile</span>
                    <UserOutlined/>
                </Button>,
                <Button type="primary"
                        key="logout"
                        onClick={handleLogout}
                        className="logout-button user-login__card-button"
                >
                    <span className="tooltip">Logout</span>
                    <LogoutOutlined/>
                </Button>
            ]}
        >
            <Meta
                avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                title = {`${newUser.firstName} ${newUser.lastName}`}
                description={[
                    <>
                        <h5 className='user-card-mail'>{newUser.email}</h5>
                        {newUser.roles?.map((tag:string) => {
                            return (
                                <Tag className={`user-tag ${tag.toLocaleLowerCase()}`} key={tag}>
                                    {tag.toUpperCase()}
                                </Tag>
                            );
                        })}
                    </>
                ]}
            />
        </Card>
    )
};


const UserLoginCard = () => {
    return (
        <Popover content={<UserDataContent />}  trigger="hover">
            <div className='user-login__avatar'>
                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=0" />
            </div>
        </Popover>
    );
}

export default UserLoginCard;