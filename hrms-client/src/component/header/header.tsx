import { Header } from "antd/es/layout/layout";
import { Button } from "antd";
import { Link } from "react-router-dom";
import UserLoginCard from "../user/login-card/userLoginCard";
import UserLoginContext from "../../context/userLoginContext";
import {useContext} from "react";
import Navbar from '../navbar/navbar';
import './header.scss';


const HeaderComponent = () => {
  const {newUser} = useContext<any>(UserLoginContext);

  return (
      <Header>
          <div className='header-section'>
              <Link to='/'>
                  <h1 style={{ color: "white", textAlign: 'left' }}>HRMS</h1>
              </Link>
              <Navbar/>
              {
                  newUser.loginStatus ? <UserLoginCard /> :
                      <Button className={"login-button"} href={"/login"}>
                          Log In
                      </Button>
              }
          </div>
      </Header>
  );
};

export default HeaderComponent;
