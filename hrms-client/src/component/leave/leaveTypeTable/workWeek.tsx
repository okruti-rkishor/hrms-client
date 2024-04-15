import {Form, Input, Modal, Popconfirm, Table, TableColumnsType} from "antd";
import React, {useEffect, useState} from "react";
import rest from "../../../services/http/api";
import {toast} from "react-toastify";
import {capitalToSmall, removeUnderScore} from "../../holiday/holidayList";
import {DeleteOutlined} from "@ant-design/icons/lib";
import CommonTableComponant from "../CommonTableComponant";

interface DataType {
    key: React.Key;
    day: string;
    status: string;
}

const WorkWeek = ({isModalOpen, setIsModalOpen}: any) => {

    // const [allData, setAllData] = useState<any>([]);
    // const fetchData = async () => {
    //     try {
    //         const leaveTypes = await rest.getAllWorkWeek();
    //         setAllData(leaveTypes.map((item: any, index: number) => ({
    //             ...item,
    //             key: item.id,
    //             day: removeUnderScore(String(item.day), "_"),
    //             status: removeUnderScore(String(item.status), "_"),
    //         })))
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

    const columns: TableColumnsType<DataType> = [
        {
            title: 'Id',
            dataIndex: 'key',
        },
        {
            title: 'Day',
            dataIndex: 'day',
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
    ];

    const propsData = {
        title: "Work Week",
        create: rest.workWeekCreate,
        getAll: rest.getAllWorkWeek,
        delete: rest.deleteWorkWeek,
        isModalOpen: isModalOpen,
        setIsModalOpen: setIsModalOpen,
        columns: columns,
        deleteById:rest.deleteWorkWeek,
        formFields: [<Form.Item
            label="Day"
            name="day"
            rules={[{required: true, message: 'Please input Day!'}]}>
            <Input name="day"/>
        </Form.Item>,
            <Form.Item
                label="Status"
                name={"status"}
                rules={[{required: true, message: 'Please input Status!'}]}>
                <Input name={"status"}/>
            </Form.Item>],
        // allData: allData,
        // setAllData: setAllData,
        // fetchData: fetchData,

    }

    // useEffect(() => {
    //     fetchData();
    // }, [])

    return (
        <div>
            <CommonTableComponant propsData={propsData}/>
        </div>
    )
}
export default WorkWeek;