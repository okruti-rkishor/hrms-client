import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import UserLoginContext from '../context/userLoginContext';
import AccessDenied from '../component/error page/accessDeniedError';

const PrivateRoutes = ({Component}:any) => {
    const {newUser} = useContext<any>(UserLoginContext)
        if(!(newUser?.roles.includes("ADMIN") || newUser?.roles.includes("HR") )){
            return (<AccessDenied />);

        }
    return (Component);
}

export default PrivateRoutes;