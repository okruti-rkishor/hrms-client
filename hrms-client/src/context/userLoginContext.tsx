import React, {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

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

  return (
    <UserLoginContext.Provider value={contextValue}>
      {children}
    </UserLoginContext.Provider>
  );
};

export default UserLoginContext;
