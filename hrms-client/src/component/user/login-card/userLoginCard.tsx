import React, {useContext} from 'react';
import {Avatar, Button, Card, Popover, Tag} from 'antd';
import UserLoginContext from "../../../context/userLoginContext";
import rest from "../../../services/http/api";
import {Link, useNavigate} from 'react-router-dom';
import { toast } from "react-toastify";
import {CalendarOutlined, LogoutOutlined, ToTopOutlined, UserOutlined} from "@ant-design/icons/lib";
import './userLoginCard.scss';


const { Meta } = Card;


const UserDataContent = () => {
  const {newUser, setNewUser} = useContext<any>(UserLoginContext);
  const role = newUser.role;
  const navigate = useNavigate();

  const userCardLinks = [
    {
      linkText: "Your Profile",
      icon: <UserOutlined/>,
      linkTarget: `/employee/detail/${newUser.id}`,
    },
    {
      linkText: "Your Events",
      icon: <CalendarOutlined />,
      linkTarget: "www.google.com",
    },
    {
      linkText: "Request Leave",
      icon: <ToTopOutlined />,
      linkTarget: "www.google.com",
    },
  ];

  const handleLogout = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("loginToken") as any);
      await rest.userLogout(token);
      localStorage.removeItem("loginToken");
      navigate("/login");
      setNewUser({
        loginStatus: false,
        id: "",
        email: "",
        firstName: "",
        lastName: "",
        role: "",
      });
      toast.success("Logout Success!!");
    } catch (error: any) {
      console.error("Unable to Logout the User:", error.message);
    }
  };

  return (
      <Card
          style={{ width: 300 }}
          className='user-login__card'
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
        <div className='user-login__card-links'>
          {userCardLinks.map((list: any) => (
              <Link to={list.linkTarget} className='user-login__card-link'>
                {list.icon}
                <p>{list.linkText}</p>
              </Link>
          ))}
        </div>
        <Button type="primary"
                key="logout"
                onClick={handleLogout}
                className="logout-button"
        >
          <LogoutOutlined/> Logout
        </Button>
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
