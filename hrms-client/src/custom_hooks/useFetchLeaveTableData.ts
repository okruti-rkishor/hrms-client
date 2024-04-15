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
                newRow["key"] = `${index}`
                newRow["id"] =record.id;
                    return newRow;
            })
            await setValue(newData);
        } catch (e) {
            console.log("error", e)
        }
    };
    const deleteHandel = async (record: any) => {
        try {
            await deleteById(record.id);
            await fetchDataInsideHook();
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(()=>{
        fetchDataInsideHook();
    },[])
    return [value,deleteHandel];
};

export default useFetchLeaveTableData;
