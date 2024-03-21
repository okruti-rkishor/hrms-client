import { Button, Result } from "antd";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./error.scss";
import UserLoginContext from "../../context/userLoginContext";

const Error = () => {
  const { newUser } = useContext<any>(UserLoginContext);
  return (
    <>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
            <Link to={(newUser.roles.length<=1 && newUser.roles[0] === "EMPLOYEE") ?"/employee/detail/67c5b2d0-f84c-4240-b2ac-da3b478f948e":"/home"} className="back-home-button">
            Back Home
          </Link>
        }
      />
    </>
  );
};

export default Error;
