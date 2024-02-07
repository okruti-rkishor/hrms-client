import React, {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { jwtDecode } from "jwt-decode";
import rest from '../services/http/api'
// import { useNavigate } from "react-router-dom";


export interface UserLoginInterface {
  loginStatus: boolean;
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface UserContextType {
  newUser?: UserLoginInterface | null;
  setNewUser?: Dispatch<SetStateAction<UserLoginInterface | null>>;
}

const UserLoginContext = createContext<UserContextType>({});

export const UserLoginContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [newUser, setNewUser] = useState<any>({
    loginStatus: false,
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    role: "",
  });
  const contextValue: UserContextType = {
    newUser,
    setNewUser,
  };
  // const navigate = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem("loginToken")){
      const token:any = localStorage.getItem("loginToken");
      const decoded = jwtDecode(token);
        rest.userLoginDetail(decoded.sub).then((data:any)=>{
          data.loginStatus = true 
          setNewUser(data)
        }).catch((error):any=>{
          console.log(error)
        })
    }else{
      //navigate login
      setNewUser({
        loginStatus: false,
        id: "",
        email: "",
        firstName: "",
        lastName: "",
        role: "",
      })
      // navigate('/login')
    }
  },[])

  return (
    <UserLoginContext.Provider value={contextValue}>
      {children}
    </UserLoginContext.Provider>
  );
};

export default UserLoginContext;
