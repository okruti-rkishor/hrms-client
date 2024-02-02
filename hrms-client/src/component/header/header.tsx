import { Header } from "antd/es/layout/layout";
import { Button, Col, Row } from "antd";
import "./header.scss";
import { Link } from "react-router-dom";
import UserLoginCard from "../home/userLoginCard";
import UserLoginContext from "../../context/userLoginContext";
import {useContext} from "react";


const HeaderComponent = () => {
  const {newUser} = useContext<any>(UserLoginContext);

  return (
    <Header>
      <Row>
        <Col span={16}>
          <Link to={"/"}>
            <h1 style={{ color: "white", textAlign: 'left' }}>HR Management System</h1>
          </Link>
        </Col>
        <Col>
          {
            newUser.loginStatus ? <UserLoginCard /> :
                <Button className={"login-button"} href={"/login"}>
                  Log In
                </Button>
          }
        </Col>
      </Row>
    </Header>
  );
};

export default HeaderComponent;
