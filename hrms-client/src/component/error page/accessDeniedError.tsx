import React, { useContext } from "react";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";
import UserLoginContext from "../../context/userLoginContext";

const AccessDenied = () => {
  const { newUser } = useContext<any>(UserLoginContext);

  return (
    <>
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Link to={(newUser.roles.length<=1 && newUser.roles[0] === "EMPLOYEE") ?"/employee/detail/67c5b2d0-f84c-4240-b2ac-da3b478f948e":"/home"} className="back-home-button">
            Back Home
          </Link>
        }
      />
    </>
  );
};
export default AccessDenied;
