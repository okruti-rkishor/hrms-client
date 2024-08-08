import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import UserLoginContext from '../context/userLoginContext';
import AccessDenied from '../component/error page/accessDeniedError';
import { checkUserRole } from "../utility/utility";

const PrivateRoutes = ({Component}:any) => {
    const {newUser} = useContext<any>(UserLoginContext)
        if(!checkUserRole(newUser)
            // (newUser?.roles.includes("ADMIN") || newUser?.roles.includes("HR"))
        ){
            return (<AccessDenied />);

        }
    return (Component);
}

export default PrivateRoutes;