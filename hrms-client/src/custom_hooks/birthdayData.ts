import { useContext, useEffect, useState } from "react";
import BirthdayContext from "../context/birthdayContext";
import rest from '../services/http/api'


const BirthdayData=()=>{
    const [value, setValue] = useState('')
    const {todayBirthday,pastBirthday,upcomingBirthday,setTodayBirthday,setPastBirthday,setUpcomingBirthday} = useContext<any>(BirthdayContext);

    useEffect(()=>{
        getAllUser();
    },[])
    const getAllUser =async()=>{
        if(!(todayBirthday.length||pastBirthday.length||upcomingBirthday.length)){

                const response = await rest.allBirthday();
                if(response){
                    setValue(response)
                    setTodayBirthday(response.today??[]);
                    setUpcomingBirthday(response.upcoming??[]);
                    setPastBirthday(response.passed??[]);
                }
        }
    }
   return [value];
}

export default BirthdayData;