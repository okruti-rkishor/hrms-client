import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import UserLoginContext from '../context/userLoginContext';
import Error from '../component/error page/error';

const PrivateRoutes = ({Componant}:any) => {
    const {newUser} = useContext<any>(UserLoginContext)
        if(!(newUser?.roles[0] === "ADMIN" ||  newUser?.roles[0] === "HR" )){
            return (<Error />);
        }
    return (Componant);
}

export default PrivateRoutes;