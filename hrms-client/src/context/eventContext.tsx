import React, {createContext, useState} from "react";

const EventContext = createContext({});

export const EventContextProvider = ({children}: any) => {
    const [birthdayData, setBirthdayData] = useState({});
    const [todayBirthday, setTodayBirthday] = useState([]);
    const [pastBirthday, setPastBirthday] = useState([]);
    const [upcomingBirthday, setUpcomingBirthday] = useState([]);
    const [anniversaryData, setAnniversaryData] = useState({});
    const [customEventData, setCustomEventData] = useState({});

    const updateBirthdayValue = (newValue: any) => {
        console.log("newValueBirthday", newValue);
        setBirthdayData(newValue);
    };
    const updateAnniversaryValue = (newValue: any) => {
        console.log("newValueAnniversary", newValue);
        setAnniversaryData(newValue);
    };
    const updateCustomEventValue = (newValue: any) => {
        console.log("newValueCustomEvent", newValue);
        setCustomEventData(newValue);
    };

    return (
        <EventContext.Provider
            value={{
                todayBirthday,
                pastBirthday,
                upcomingBirthday,
                setTodayBirthday,
                setPastBirthday,
                setUpcomingBirthday,
                birthdayData,
                customEventData,
                setCustomEventData,
                updateCustomEventValue,
                anniversaryData,
                setBirthdayData,
                setAnniversaryData,
                updateBirthdayValue,
                updateAnniversaryValue
            }}
        >
            {children}
        </EventContext.Provider>
    );
};

export default EventContext;
