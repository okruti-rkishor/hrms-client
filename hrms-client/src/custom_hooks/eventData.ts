import { useContext, useEffect, useState } from "react";
import EventContext from "../context/eventContext";
import rest from '../services/http/api';
import dayjs from "dayjs";


const EventData = (type?: string) => {
    const [birthdayTempData, setBirthdayTempData] = useState({});
    const [anniversaryTempData, setAnniversaryTempData] = useState({});
    const [customEventTempData, setCustomEventTempData] = useState({});
    const {updateBirthdayValue, updateAnniversaryValue, updateCustomEventValue} = useContext<any>(EventContext);

    const getBirthdayUser = async () => {
        try {
            const response = await rest.allBirthday();
            if (response) {
                const resp = {
                    today: response.TODAY ?? [],
                    upcoming: response.UPCOMING ?? [],
                    passed: response.PASSED ?? [],
                };
                console.log(resp, "Birthday");
                setBirthdayTempData(resp);
                updateBirthdayValue(resp);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getAnniversaryUser = async () => {
        try {
            const response = await rest.allAnniversary();
            if (response) {
                const resp = {
                    today: response.TODAY ?? [],
                    upcoming: response.UPCOMING ?? [],
                    passed: response.PASSED ?? [],
                };
                console.log(resp, "Anniversary");
                setAnniversaryTempData(resp);
                updateAnniversaryValue(resp);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getCustomEvent = async () => {
        try {
            const response = await rest.getAllEvent();
            if (response) {
                const events = response.map((event: any) => ({
                    id: event.id,
                    name: event.name,
                    date: event.date,
                    description: event.description,
                    startTime: event.startTime,
                    endTime: event.endTime,
                    state: event.state,
                    venue: event.venue,
                    hostBy: event.hostBy,
                }));

                const today = dayjs().startOf('day');

                const passed = events.filter((event: any) =>
                    dayjs(event.date).startOf('day').isBefore(today)
                );

                const upcoming = events.filter((event: any) =>
                    dayjs(event.date).startOf('day').isAfter(today)
                );

                const todayEvents = events.filter((event: any) =>
                    dayjs(event.date).startOf('day').isSame(today)
                );


                const resp = { today: todayEvents, upcoming, passed };
                setCustomEventTempData(resp)
                updateCustomEventValue(resp);
            }
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };


    useEffect(() => {
        if (type === 'birthday') {
            void getBirthdayUser();
        } else if (type === 'anniversary') {
            void getAnniversaryUser();
        } else if (type === 'custom') {
            void getCustomEvent();
        } else {
            void getBirthdayUser();
            void getAnniversaryUser();
            void getCustomEvent();
        }
    },[])

    return [birthdayTempData, anniversaryTempData, customEventTempData];
};

export default EventData;
