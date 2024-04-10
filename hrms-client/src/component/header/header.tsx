import {Header} from "antd/es/layout/layout";
import {Button} from "antd";
import {Link, useNavigate} from "react-router-dom";
import UserLoginCard from "../user/login-card/userLoginCard";
import UserLoginContext from "../../context/userLoginContext";
import {useContext} from "react";
import Navbar from '../navbar/navbar';
import '../../styles/component/header.scss';


const HeaderComponent = () => {
    const {newUser} = useContext<any>(UserLoginContext);
    const navigate = useNavigate();

    return (
        <Header>
            <div className='header-section'>
                {/*<Link to='/home'>*/}
                {/*    <h1 style={{color: "white", textAlign: 'left'}}>HRMS</h1>*/}
                {/*</Link>*/}
                {
                    newUser.loginStatus ? <UserLoginCard/> :
                        <Button className={"login-button"} onClick={() => navigate("/login")}>
                            Log In
                        </Button>
                }
            </div>
        </Header>
    );
};

export default HeaderComponent;
