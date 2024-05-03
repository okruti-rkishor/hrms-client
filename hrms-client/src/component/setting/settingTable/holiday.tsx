import {
    Button,
    DatePicker,
    Form,
    Input, Layout,
    message,
    Modal,
    Popconfirm,
    Select,
    Table,
    TableColumnsType,
    Tooltip
} from "antd";
import rest from "../../../services/http/api";
import CommonTableComponant from "../CommonTableComponant";
import {Holiday_Status, Holiday_Type, Leave_Type_Status, Week_Days} from "../../../constant/constant"
import dayjs from "dayjs";
import {capitalToSmall, removeUnderScore} from "../../holiday/holidayList";
import {toast} from "react-toastify";
import {PlusCircleOutlined} from "@ant-design/icons/lib";
import React, {useState} from "react";

interface DataType {
    key: React.Key;
    day: string;
    status: string;
}

const Holiday = () => {
    const [isModalOpen,setIsModalOpen]=useState(false);

    const columns: TableColumnsType<DataType> = [
        // {
        //     title: 'Sr. No',
        //     dataIndex: 'key',
        //     align:"center",
        //     width: '7%',
        // },
        {
            title: 'Name',
            dataIndex: 'name',
            align:"center",
        },
        {
            title: 'Start',
            dataIndex: 'startDate',
            align:"center",
        },
        {
            title: 'End',
            dataIndex: 'endDate',
            align:"center",
        },
        {
            title: "Leaves",
            dataIndex: "count",
            align:"center",
        },

        {
            title: "Day",
            dataIndex: "day",
            align:"center",
        }

    ];
    const success = () => {
        message.success("Holiday Delete Successful!");
    };
    const deleteHandel = async (record: any) => {
        try {
            // const deleteSelected = dataArray.find((holiday:any)=>holiday.name===record.name);
            await rest.deleteHoliday(record);
            let date:any=[];
            for(let startDate=new Date(record.startDate),endDate=new Date(record.endDate);startDate<=endDate;startDate.setDate(startDate.getDate()+1)){
                let newStartDate=new Date(startDate);
                date.push(dayjs(newStartDate).format("YYYY-MM-DD"));
            }
            success();
        } catch (error) {
            console.log(error);
        }
    };
    const fetchHolidayData = async () => {
        try {
            const response = await rest.getAllHoliday();
            const holidayNameList = Object.keys(response);
            const newResponse1 = holidayNameList.map((key: any, index: number) => {
                return {
                    key:index+1,
                    name: key,
                    year: response[key][0]?.year,
                    type: response[key][0]?.type,
                    id:response[key][0]?.id,
                    calendar: response[key].map((calendarItem: any) => ({
                        date: calendarItem.date,
                        day: calendarItem.day,
                        id: calendarItem.id,
                    })),
                };
            });
            console.log(newResponse1);

            const newResponse = newResponse1?.map((item: any, index: number) => {
                if (item.year == new Date().getFullYear()) {
                    return {
                        id: item.id,
                        name: capitalToSmall(item.name),
                        startDate: item.calendar[0].date,
                        endDate: item.calendar[item.calendar.length - 1].date,
                        day:
                            item?.calendar?.length === 1
                                ? item.calendar[0].day
                                : `${item.calendar[0].day} ${"to"} ${
                                    item.calendar[item.calendar.length - 1].day
                                }`,
                        type: removeUnderScore(item.type, "_"),
                        count: item?.calendar?.length,
                        idArray: (item.calendar).map((item1: any) => item1.id)
                    };
                }
            });
            return newResponse;
        } catch (error) {
            console.log("error console", error);
        }
    };
    const workWeekStatusOptations = () => {
        const keys = Object.keys(Holiday_Status) as Array<keyof typeof Holiday_Status>;
        // const keys = Object.keys(Leave_Type_Status)
        const optations = keys.map((status: keyof typeof Holiday_Status) => {
            return {
                value: status, label: Holiday_Status[status]
            }
        })
        return optations;
    }

    const propsData = {
        title: "Holiday",
        create: rest.holidayCreate,
        getAll: fetchHolidayData,
        delete: deleteHandel,
        isModalOpen: isModalOpen,
        setIsModalOpen: setIsModalOpen,
        columns: columns,
        deleteById: deleteHandel,
        formFields: [
            <Form.Item
                label="Name"
                name="name"
                rules={[{required: true, message: 'Please input Name!'}]}
            >
                <Input name={"name"}/>
            </Form.Item>,
            <Form.Item
                label="Status"
                name={"status"}
                rules={[{required: true, message: 'Please input Status!'}]}
                initialValue={"-Select-"}>
                <Select>
                    {workWeekStatusOptations().map((optation: any) => <option key={optation.label}
                                                                              value={optation.value}>{optation.label}</option>)}
                </Select>
            </Form.Item>,
            <Form.Item
                label={"Date"}
                name={"date"}
                rules={[
                    {
                        required: true,
                        message: "Please select date of Holiday",
                    }]}>
                <DatePicker
                    multiple
                    maxTagCount="responsive"
                    placeholder={"Enter Holiday Date here"}
                    minDate={dayjs(new Date(new Date().getFullYear(), 0, 1).toString(), "YYYY-MM-DD")}
                    maxDate={dayjs(new Date(new Date().getFullYear(), 12, 1).toString(), "YYYY-MM-DD")}
                    // disabledDate={(current: any) => {
                    //     return totalHoliday.findIndex((item: any) => dayjs(current).format("YYYY-MM-DD") === item) !== -1;
                    // }}
                />
            </Form.Item>,
            <Form.Item label={"Type"} name={"type"} rules={[
                {
                    required: true,
                    message: "Please select type of Holiday",
                }]}
                       initialValue={"-Select-"}
            >
                <Select placeholder={"Select Holiday Type here"}>
                    {(Object.keys(Holiday_Type) as Array<keyof typeof Holiday_Type>).map((key) =>
                        <Select.Option value={key} key={key}>
                            {Holiday_Type[key]}
                        </Select.Option>
                    )}
                </Select>
            </Form.Item>

        ],
        formFieldsType:[{name:String},{status:Date},{date:Date},{type:String}]
    }

    return (
        <div className={"leave-list_table_data"}>
            <Tooltip title="Add" color={"blue"} key={"blue"}>
                <Button
                    type="primary"
                    icon={<PlusCircleOutlined/>}
                    onClick={() => setIsModalOpen(true)}
                    className={"leave-list_table_data_button"}
                />
            </Tooltip>
            <Layout className="with-background leaves-type">
                <CommonTableComponant propsData={propsData}/>
            </Layout>
        </div>
    )
}
export default Holiday;