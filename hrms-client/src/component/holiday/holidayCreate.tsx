import {
    Divider,
    Layout,
    message, Tooltip,
} from "antd";
import {PageHeader} from "@ant-design/pro-layout";
import React, {useContext, useEffect, useState} from "react";
import {Button, Form, Input, Select, Tabs} from "antd";
import {DatePicker} from "antd";
import dayjs from "dayjs";
import "../../styles/component/holiday.scss";
import HolidayList from "./holidayList";
import UserLoginContext from "../../context/userLoginContext";
import restApi from "../../services/http/api/index";
import {Holiday_Status, Holiday_Type, Status} from "../../constant/constant";

interface Item {
    key: React.Key;
    year: any;
    date: string;
    day: string;
    holiday_type: string;
    holiday_name: string;
    reason: string;
    remarks: string;
}

const validateMessages = {
    required: "${label} is required!",
};

function convertDateFormat(str: any) {
    var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
}

const HolidayCreateForm = ({year, isFormDisabled,holidayData,setHolidayData,totalHoliday, setTotalHoliday}: any) => {
        const [form] = Form.useForm();
        let length = 0;

        const formatDate = (date: any) => {
            return dayjs(date).format("YYYY-MM-DD")
        }

        const onFinish = (values: any) => {
            let payload: any = {
                "year": year,
                "name": values.name,
                "type": values.type,
                "calender": {}
            }

            const tempCalender = values.date.map((item: any) => {
                let tempCal: any = {};
                tempCal["date"] = formatDate(item);
                tempCal["day"] = getDayOfWeek(item).toUpperCase();
                tempCal["status"] = values.status;
                return {...tempCal};
            });

            tempCalender.forEach((item: any) => setTotalHoliday((prev: any) => [...prev, formatDate(item.date)]))
            payload.calender = tempCalender;

            restApi.holidayCreate(payload).then((e) => {
                setHolidayData(payload);
                form.resetFields();
                message.success('New Holiday created successfully');
            }).catch((e) => {
                message.error("Holiday is not inserted");
            });
        };


        const getDayOfWeek = (date: any) => {
            const daysOfWeek = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
            ];
            const dayIndex = new Date(date).getDay();
            return daysOfWeek[dayIndex];
        };

        useEffect(() => {
            restApi.getAllHoliday().then((response) => {
                let values=Object.values(response);
                values.forEach((item:any)=>{
                    item.forEach((item:any)=>setTotalHoliday((prevState:any)=> [...prevState, item.date]));
                })

            }).catch((e) => console.log(e));


        }, [])

        return (
            <Form layout="inline"
                  name="holiday-create-form"
                  onFinish={onFinish}
                  disabled={isFormDisabled}
                  validateMessages={validateMessages}
                  className='holiday-create__form'
                  form={form}
            >
                <div style={{display: "flex", gap: "30px", flexDirection: "column"}}>
                    <div style={{display: "flex", gap: "30px"}}>
                        <Form.Item label={"Date"} name={"date"} rules={[
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
                                disabledDate={(current: any) => {
                                    return totalHoliday.findIndex((item: any) => dayjs(current).format("YYYY-MM-DD") === item) !== -1;
                                }}
                            />
                        </Form.Item>

                        <Form.Item label={"Name"} name={"name"} rules={[
                            {
                                required: true,
                                message: "Please enter First Name",
                            },
                            () => ({
                                validator(_, value) {
                                    if (!value) {
                                        return Promise.reject();
                                    }
                                    if (!isNaN(value)) {
                                        return Promise.reject("Name should be text.");
                                    }
                                    return Promise.resolve();
                                },
                            }),
                        ]}>
                            <Input placeholder={"Enter Holiday Name here"}/>
                        </Form.Item>

                        <Form.Item label={"Status"} name={"status"} initialValue={"FULL_DAY"}>
                            <Select placeholder={"Select Holiday Type here"}>
                                {(Object.keys(Holiday_Status) as Array<keyof typeof Holiday_Status>).map((key) =>
                                    <Select.Option value={key} key={key}>
                                        {Holiday_Status[key]}
                                    </Select.Option>
                                )}
                            </Select>
                        </Form.Item>
                    </div>

                    <div style={{display: "flex", gap: "30px"}}>
                        <Form.Item label={"Type"} name={"type"} rules={[
                            {
                                required: true,
                                message: "Please select type of Holiday",
                            }]}>
                            <Select placeholder={"Select Holiday Type here"}>
                                {(Object.keys(Holiday_Type) as Array<keyof typeof Holiday_Type>).map((key) =>
                                    <Select.Option value={key} key={key}>
                                        {Holiday_Type[key]}
                                    </Select.Option>
                                )}
                            </Select>
                        </Form.Item>
                    </div>

                    <div style={{marginLeft: "auto"}}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </div>
                </div>
            </Form>
        );
    }
;

const HolidayYearTab = ({holidayData, setHolidayData, totalHoliday, setTotalHoliday}: any) => {
    console.log("222222");
    const currentYear = new Date().getFullYear();
    const previousYear = new Date().getFullYear() - 1;
    const nextYear = new Date().getFullYear() + 1;

    const tabItems = [
        {
            label: previousYear,
            key: `${previousYear}`,
            children: (
                <HolidayCreateForm
                    year={previousYear}
                    isFormDisabled={true}
                    holidayData={holidayData}
                    setHolidayData={setHolidayData}
                    totalHoliday={totalHoliday}
                    setTotalHoliday={setTotalHoliday}
                />
            ),
        },
        {
            label: currentYear,
            key: `${currentYear}`,
            children: (
                <HolidayCreateForm
                    year={currentYear}
                    isFormDisabled={false}
                    holidayData={holidayData}
                    setHolidayData={setHolidayData}
                    totalHoliday={totalHoliday}
                    setTotalHoliday={setTotalHoliday}
                />
            ),
        },
        {
            label: nextYear,
            key: `${nextYear}`,
            children: (
                <HolidayCreateForm
                    year={nextYear}
                    isFormDisabled={true}
                    holidayData={holidayData}
                    setHolidayData={setHolidayData}
                    totalHoliday={totalHoliday}
                    setTotalHoliday={setTotalHoliday}
                />
            ),
        },
    ];

    return (
        <Tabs
            defaultActiveKey={`${currentYear}`}
            tabPosition="left"
            destroyInactiveTabPane={true}
            items={tabItems}
            className="holiday-create__tabs"
        />
    );
};

function HolidayCreate() {
    console.log("111");
    const [holidayData, setHolidayData] = useState<Item[]>([]);
    const [totalHoliday, setTotalHoliday] = useState<any>([]);
    const [showAddHolidayStatus, setShowAddHolidayStatus] = useState<boolean>(false);
    const {newUser} = useContext(UserLoginContext);

    useEffect(() => {
        if (
            newUser?.roles &&
            newUser.roles.length <= 1 &&
            newUser?.roles[0] === "EMPLOYEE"
        ) {
            setShowAddHolidayStatus(false);
        } else if (newUser && newUser.roles.length >= 1) {
            setShowAddHolidayStatus(true);
        }



    }, [newUser]);

    return (
        <Layout className="with-background">
            {showAddHolidayStatus && (
                <div className="data-table">
                    <Divider orientation="left">
                        <PageHeader className="" title="Holiday Create"/>
                    </Divider>
                    <HolidayYearTab holidayData={holidayData} setHolidayData={setHolidayData}
                                    totalHoliday={totalHoliday} setTotalHoliday={setTotalHoliday}/>
                </div>
            )}
            <div>
                <HolidayList holidayData={holidayData} setHolidayData={setHolidayData} totalHoliday={totalHoliday} setTotalHoliday={setTotalHoliday}/>
            </div>
        </Layout>
    );
}

export default HolidayCreate;
