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
import { useNavigate } from "react-router-dom";



export interface UserLoginInterface {
  loginStatus: boolean;
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
}


export interface UserContextType {
  newUser?: UserLoginInterface | null;
  setNewUser?: Dispatch<SetStateAction<UserLoginInterface | null>>;
}
export interface ProviderDataType extends UserContextType {
  tokenToUserData: () => void;
}

const UserLoginContext = createContext<UserContextType>({});

export const UserLoginContextProvider: React.FC<{ children: ReactNode }> = ({children,}) => {
  const [newUser, setNewUser] = useState<any>({
    loginStatus: false,
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    roles: [],
  });
  const navigate  = useNavigate();
  const contextValue: ProviderDataType = {
    newUser,
    setNewUser,
    tokenToUserData,
  };
  // const navigate = useNavigate();

  function tokenToUserData(){
    const tempToken:any = localStorage.getItem("loginToken");
    if(localStorage.getItem("loginToken")){
      const token:any = JSON.parse(tempToken);
      const decoded = jwtDecode(token.loginToken);
        rest.userLoginDetail(decoded.sub).then((data:any)=>{
          data.loginStatus = true 
          setNewUser(data)
        }).catch((error):any=>{
          console.log(error)
        })
    }else{
      //navigate login
      navigate('/login');
      setNewUser({
        loginStatus: false,
        id: "",
        email: "",
        firstName: "",
        lastName: "",
        roles: [],
      })
      // navigate('/login')
    }
    
  }

  useEffect(()=>{
    tokenToUserData();
  },[])

  return (
    <UserLoginContext.Provider value={contextValue}>
      {children}
    </UserLoginContext.Provider>
  );
};

export default UserLoginContext;
