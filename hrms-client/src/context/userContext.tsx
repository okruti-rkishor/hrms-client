import React, { createContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';

export interface UserInterface {
  loginStatus: boolean;
  email: string;
  password: string;
}

export interface UserContextType {
  newUser?: UserInterface | null;
  setNewUser?: Dispatch<SetStateAction<UserInterface | null>>;
}

const UserContext = createContext<UserContextType>({});

export const UserContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [newUser, setNewUser] = useState<UserInterface | null>({loginStatus:false,email:'',password:''});
  const contextValue: UserContextType = {
    newUser,
    setNewUser,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
