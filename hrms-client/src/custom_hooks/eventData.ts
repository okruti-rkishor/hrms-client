import { useContext, useEffect, useState } from "react";
import EventContext from "../context/eventContext";
import rest from '../services/http/api'


const EventData=(type?:string)=>{
    const [birthdayTempData, setBirthdayTempData] = useState({})
    const [anniversaryTempData, setAnniversaryTempData] = useState({})
    const {updateBirthdayValue, updateAnniversaryValue} = useContext<any>(EventContext);

    const getBirthdayUser =async()=>{
                try {
                    const response = await rest.allBirthday();
                if(response){
                    const resp = {
                        today:response.today??[],
                        upcoming:response.upcoming??[],
                        passed:response.passed??[]
                    }
                    // console.log(resp, "Birthday")
                    setBirthdayTempData(resp)
                    updateBirthdayValue(resp)
                }
                } catch (error) {

                }
    }
    const getAnniversaryUser =async()=>{
                try {
                    const response = await rest.allAnniversary();
                if(response){
                    const resp = {
                        today:response.today??[],
                        upcoming:response.upcoming??[],
                        passed:response.passed??[]
                    }
                    // console.log( resp,"Anniversary");
                    setAnniversaryTempData(resp)
                    updateAnniversaryValue(resp)

                }
                } catch (error) {

                }
    }

    useEffect (()=>{
        if(type==='birthday'){
            void getBirthdayUser();
        }else if(type === 'anniversary'){
            void getAnniversaryUser()
        }else{
            void getBirthdayUser();
            void getAnniversaryUser()
        }
    },[])

   return [birthdayTempData, anniversaryTempData];
}

export default EventData;