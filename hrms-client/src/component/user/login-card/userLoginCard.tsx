import React, { useContext } from "react";
import { Avatar, Button, Card, Popover, Tag } from "antd";
import UserLoginContext from "../../../context/userLoginContext";
import rest from "../../../services/http/api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  CalendarOutlined,
  LogoutOutlined,
  SettingOutlined,
  ToTopOutlined,
  UserOutlined,
} from "@ant-design/icons/lib";
import "../../../styles/component/user/userLoginCard.scss";

const { Meta } = Card;

const UserDataContent = () => {
  const { newUser, setNewUser } = useContext<any>(UserLoginContext);
  const role = newUser.role;
  const navigate = useNavigate();

  const userCardLinks = [
    {
      linkText: "Your Profile",
      icon: <UserOutlined />,
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
    {
      linkText: "Change Password",
      icon: <SettingOutlined />,
      linkTarget: "www.google.com",
    },
  ];

  const handleLogout = async () => {
    let token = JSON.parse(localStorage.getItem("loginToken") as any);
    // if (new Date().getTime() > token.expiration) {
    //   localStorage.removeItem("loginToken");
    //   token = null;
    // }
    console.log(token);
    if (token?.loginToken && (new Date().getTime() < token.expiration) ) {
      try {
        const token = JSON.parse(localStorage.getItem("loginToken") as any);
        const resp = await rest.userLogout(token.loginToken);
        console.log(resp);
        localStorage.removeItem("loginToken");
        navigate("/login");
        toast.success("Logout Success!!", { autoClose: 2000 });
        setNewUser({
          loginStatus: false,
          id: "",
          email: "",
          firstName: "",
          lastName: "",
          roles: [],
        });
      } catch (error: any) {
        console.error("Unable to Logout the User:", error.message);
      }
    } else {
      // alert("Session Expire!");
      toast.success("Session Expired!!", { autoClose: 2000 });
      localStorage.removeItem("loginToken");
      navigate("/login");
    }
  };

  return (
    <Card style={{ width: 300 }} className="user-login__card">
      <Meta
        avatar={
          <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
        }
        title={`${newUser.firstName} ${newUser.lastName}`}
        description={[
          <>
            <h5 className="user-card-mail">{newUser.email}</h5>
            {
              newUser.roles?.map((tag: string) => {
              return (
                <Tag
                  className={`user-tag ${tag.toLocaleLowerCase()}`}
                  key={tag}
                >
                  {tag.toUpperCase()}
                </Tag>
              )})
            }
          </>,
        ]}
      />
      <div className="user-login__card-links">
        {userCardLinks.map((list: any) => (
          <Link to={list.linkTarget} className="user-login__card-link">
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
        <LogoutOutlined /> Logout
      </Button>
    </Card>
  );
};

const UserLoginCard = () => {
  return (
    <Popover content={<UserDataContent />} trigger="hover">
      <div className="user-login__avatar">
        {/*<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=0" />*/}
        <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
      </div>
    </Popover>
  );
};

export default UserLoginCard;
