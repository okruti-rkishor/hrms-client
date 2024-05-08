import {useEffect, useState} from 'react';
import {removeUnderScore} from "../component/holiday/holidayList";
import rest from "../services/http/api";


const useFetchLeaveTableData = ({getAll,tableColumns,deleteById}: any) => {
    const [value, setValue] = useState<any>([]);

    const fetchDataInsideHook = async () => {
        try {
            const data = await getAll()
            const newData = data.map((record:any, index:number)=>{
                const newRow:any = {};
                tableColumns.map((column:any)=>{
                    newRow[column] = removeUnderScore(String(record[column]),"_");
                })
                newRow["key"] = `${index+1}`
                record.idArray?newRow["id"] =record.idArray:newRow["id"] =record.id;
                if(record.active === true || record.active === false) {
                    newRow["status"] = record.active;
                    newRow["active"] = record.active===true?"Active":"Inactive";
                }
                if(record.code)
                newRow["code"] = record.code;
                    return newRow;
            })
            setValue([...newData]);
            // return [...newData];
        } catch (e) {
            console.log("error", e)
        }
    };

    const deleteHandel = async (record: any) => {
        try {
            await deleteById(record.id);
            setValue((prevState:any)=>prevState.filter((item:any)=>item.id !== record.id));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(()=>{
        console.log("2222222222222222");
        fetchDataInsideHook();
    },[])

    return [value, setValue,deleteHandel];
};

export default useFetchLeaveTableData;
