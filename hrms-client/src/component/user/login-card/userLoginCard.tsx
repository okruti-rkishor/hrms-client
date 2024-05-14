import React, {useContext, useState} from "react";
import {Avatar, Badge, Button, Card, Popover, Skeleton, Tag} from "antd";
import UserLoginContext from "../../../context/userLoginContext";
import rest from "../../../services/http/api";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {
    BellOutlined,
    CalendarOutlined,
    LogoutOutlined,
    SettingOutlined,
    ToTopOutlined,
    UserOutlined,
} from "@ant-design/icons/lib";
import "../../../styles/component/user/userLoginCard.scss";

const {Meta} = Card;

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
            icon: <CalendarOutlined/>,
            linkTarget: "www.google.com",
        },
        {
            linkText: "Request Leave",
            icon: <ToTopOutlined/>,
            linkTarget: "employee/leaves",
        },
        {
            linkText: "Change Password",
            icon: <SettingOutlined/>,
            linkTarget: "user/change-password",
        },
    ];

    const handleLogout = async () => {
        let token = JSON.parse(localStorage.getItem("loginToken") as any);
        // if (new Date().getTime() > token.expiration) {
        //   localStorage.removeItem("loginToken");
        //   token = null;
        // }
        console.log(token);
        if (token?.loginToken && (new Date().getTime() < token.expiration)) {
            try {
                const token = JSON.parse(localStorage.getItem("loginToken") as any);
                const resp = await rest.userLogout(token.loginToken);
                console.log(resp);
                localStorage.removeItem("loginToken");
                navigate("/login");
                toast.success("Logout Success!!", {autoClose: 1500});
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
            toast.success("Logout Success!!", {autoClose: 2000});
            localStorage.removeItem("loginToken");
            navigate("/login");
        }
    };

    return (
        <Card style={{width: 300}} className="user-login__card">
            <Meta
                avatar={
                    <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8"/>
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
                                )
                            })
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
                <LogoutOutlined/> Logout
            </Button>
        </Card>
    );
};

const UserNotification = ({loading}: any) => {
    const [notification, setNotification] = useState("Unread");

    return (
        <Card style={{width: 300}} className="user-login__card" loading={loading}>
            <div className="notification-detail-view">
                <p>Notifications</p>
                <div className="notification-detail-view_switch">
                    <Button className={(notification === "Unread") ? "active" : ""}
                            onClick={() => setNotification("Unread")}>Unread</Button>
                    <Button className={(notification === "Read") ? "active" : ""}
                            onClick={() => setNotification("Read")}>Read</Button>
                </div>
            </div>
            <div className="notification-detail-image">
                <img src={"../../../../images/notifications_empty_state.png"} width={150} height={150}/>
                <p>No Notification</p>
            </div>
        </Card>
    )
}

const UserLoginCard = () => {
    const [loading, setLoading] = useState(true);

    const onOpenChange = () => {
        if(loading){
            setTimeout(() => {
                setLoading(false)
            }, 1000);
        }else setLoading(true);
    }

    return (
        <>

            <Popover content={<UserNotification loading={loading}/>} trigger="click" onOpenChange={onOpenChange}>

                <Badge count={5} className="user-login__avatar">
                    <BellOutlined className={"user-login__avatar__bell-outlined"}/>
                </Badge>

            </Popover>


            <Popover content={<UserDataContent/>} trigger="hover">

                <div className="user-login__avatar">
                    {/*<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=0" />*/}
                    <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8"/>
                </div>
            </Popover>
        </>
    );
};

export default UserLoginCard;
