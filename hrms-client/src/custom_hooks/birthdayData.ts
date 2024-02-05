import { useContext, useEffect, useState } from "react";
import BirthdayContext from "../context/birthdayContext";
import rest from '../services/http/api'


const BirthdayData=()=>{
    const [birthdayTempData, setBirthdayTempData] = useState({})
    const [anniversaryTempData, setAnniversaryTempData] = useState({})
    const {updateBirthdayValue, updateAnniversaryValue} = useContext<any>(BirthdayContext);

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

    useEffect(()=>{
        getBirthdayUser();
        getAnniversaryUser()
    },[])

   return [birthdayTempData, anniversaryTempData];
}

export default BirthdayData;