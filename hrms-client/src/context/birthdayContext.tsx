import React, { createContext, useContext, useState } from 'react';
const BirthdayContext = createContext({});

export const BirthdayProvider = ({ children }:any) => {
    const [myValue, setMyValue] = useState('Initial Value');
    const [todayBirthday, setTodayBirthday] = useState([]);
    const [pastBirthday, setPastBirthday] = useState([]);
    const [upcomingBirthday, setUpcomingBirthday] = useState([]);

    const updateValue = (newValue:any) => {
        setMyValue(newValue);
      };
  
    return (
      <BirthdayContext.Provider value={{todayBirthday,pastBirthday,upcomingBirthday,setTodayBirthday,setPastBirthday,setUpcomingBirthday, myValue, updateValue }}>
        {children}
      </BirthdayContext.Provider>
    );
  };
  
export default BirthdayContext;
