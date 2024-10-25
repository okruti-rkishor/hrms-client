import { useEffect, useState } from 'react';
import { removeUnderScore } from "../component/holiday/holidayList";
import rest from "../services/http/api";

const useFetchLeaveTableData = (
    { getAll, tableColumns, deleteById }: any,
    requestParams?: object
) => {
    const [value, setValue] = useState<any>([]);

    const fetchDataInsideHook = async () => {
        try {
            const data = await getAll(requestParams);
            console.log("Fetched Data:", data);

            let newData: any = [];

            if (!Array.isArray(data)) {
                newData = [data];
            } else {
                newData = data;
            }

            newData = newData.map((record: any, index: number) => {
                const newRow: any = {};
                tableColumns.forEach((column: any) => {
                    // Safeguard against undefined
                    newRow[column] = record[column] ? removeUnderScore(String(record[column]), "_") : 'N/A';
                });
                newRow["key"] = `${index + 1}`;
                newRow["id"] = record.idArray || record.id || `id-${index + 1}`;

                if (typeof record.active === "boolean") {
                    newRow["status"] = record.active;
                    newRow["active"] = record.active ? "Active" : "Inactive";
                }

                if (record.code) {
                    newRow["code"] = record.code;
                }

                return newRow;
            });

            console.log("Mapped Data for Table:", newData);
            setValue([...newData]);
        } catch (e) {
            console.log("Error fetching data:", e);
        }
    };

    const deleteHandle = async (record: any) => {
        try {
            await deleteById(record.id);
            setValue((prevState: any) => prevState.filter((item: any) => item.id !== record.id));
        } catch (error) {
            console.log("Error deleting record:", error);
        }
    };

    useEffect(() => {
        fetchDataInsideHook();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getAll, JSON.stringify(requestParams)]); // Add dependencies

    return [value, setValue, deleteHandle];
};

export default useFetchLeaveTableData;
