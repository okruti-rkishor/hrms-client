import React, { createContext, useContext, useState } from "react";
const BirthdayContext = createContext({});

export const BirthdayProvider = ({ children }: any) => {
  const [birthdayData, setBirthdayData] = useState({});
  const [todayBirthday, setTodayBirthday] = useState([]);
  const [pastBirthday, setPastBirthday] = useState([]);
  const [upcomingBirthday, setUpcomingBirthday] = useState([]);
  const [anniversaryData, setAnniversaryData] = useState({});

  const updateBirthdayValue = (newValue: any) => {
    console.log("newValueBirthday",newValue)
    setBirthdayData(newValue);
  };
  const updateAnniversaryValue = (newValue: any) => {
    console.log("newValueAnniversary",newValue)
    setAnniversaryData(newValue);
  };

  return (
    <BirthdayContext.Provider
      value={{
        todayBirthday,
        pastBirthday,
        upcomingBirthday,
        setTodayBirthday,
        setPastBirthday,
        setUpcomingBirthday,
        birthdayData,
        anniversaryData,
        setBirthdayData,
        setAnniversaryData,
        updateBirthdayValue,
        updateAnniversaryValue
      }}
    >
      {children}
    </BirthdayContext.Provider>
  );
};

export default BirthdayContext;
