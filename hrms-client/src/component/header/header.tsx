import { Header } from "antd/es/layout/layout";
import { Button, Col, Row } from "antd";
import "./header.scss";
import { Link } from "react-router-dom";

const HeaderComponent = () => {
  return (
    <Header>
      <Row>
        <Col span={16}>
          <Link to={"/"}>
            <h1 style={{ color: "white", textAlign: 'left' }}>HR Management System</h1>
          </Link>
        </Col>
        <Col>
          <Button className={"login-button"} href={"/login"}>
            Log In
          </Button>
          {/*<Button className={'signup-button'} href={'/login'}>Sign Up</Button>*/}
        </Col>
      </Row>
    </Header>
  );
};

export default HeaderComponent;
