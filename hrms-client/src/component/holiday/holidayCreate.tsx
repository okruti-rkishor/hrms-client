import {
    Divider,
    Layout,
    message,
} from "antd";
import {PageHeader} from "@ant-design/pro-layout";
import React, {useContext, useEffect, useState} from "react";
import {Button, Form, Input, Select, Tabs} from "antd";
import {DatePicker} from "antd";
import dayjs from "dayjs";
import "./holiday.scss";
import HolidayList from "./holidayList";
import UserLoginContext from "../../context/userLoginContext";
import restApi from "../../services/http/api/index";

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

const HolidayCreateForm = ({year, isFormDisabled, holidayData, setHolidayData}: any) => {
    const [totalHoliday, setTotalHoliday] = useState<any>([]);
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        let payload: any = {
            "year": year,
            "calender": {
                "name": values.name,
                "type": values.type,
                "startDate": "",
                "endDate": "",
                "day": "MONDAY",
                "status": values.status
            }
        }

        values.date.forEach((item: any) => {
            setHolidayData([...totalHoliday, dayjs(item).format("YYYY-MM-DD")]);
        });

        if (values.date.length > 1) {
            payload.calender.startDate = dayjs(values.date[0]).format("YYYY-MM-DD");
            payload.calender.endDate = dayjs(values.date[values.date.length - 1]).format("YYYY-MM-DD");
        } else {
            payload.calender.startDate = dayjs(values.date[0]).format("YYYY-MM-DD");
            payload.calender.endDate = dayjs(values.date[0]).format("YYYY-MM-DD");
        }
        restApi.holidayCreate(payload).then((e) => {
            const {calender} = payload;
            calender["year"] = payload.year;
            setHolidayData([...holidayData, calender]);
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
                    <Form.Item label={"Date"} name={"date"}>
                        <DatePicker
                            multiple
                            maxTagCount="responsive"
                            placeholder={"Enter Holiday Date here"}
                            minDate={dayjs(new Date(new Date().getFullYear(), 0, 1).toString(), "YYYY-MM-DD")}
                            maxDate={dayjs(new Date(new Date().getFullYear(), 12, 1).toString(), "YYYY-MM-DD")}
                            disabledDate={(current: any) => {
                                return totalHoliday.map((item: any) => {
                                    if(item === dayjs(current).format("YYYY-MM-DD"))return true;
                                    else return false;
                                });
                            }}
                        />
                    </Form.Item>

                    <Form.Item label={"Name"} name={"name"}>
                        <Input placeholder={"Enter Holiday Name here"}/>
                    </Form.Item>

                    <Form.Item label={"Status"} name={"status"} initialValue={"FULL_DAY"}>
                        <Select>
                            <Select.Option value={"HALF_DAY"}>Half Day</Select.Option>
                            <Select.Option value={"FULL_DAY"}>Full Day</Select.Option>
                        </Select>
                    </Form.Item>
                </div>

                <div style={{display: "flex", gap: "30px"}}>
                    <Form.Item label={"Type"} name={"type"}>
                        <Select placeholder={"Select the type of Holiday"}>
                            <Select.Option value={"NATIONAL_HOLIDAY"}>National Holiday</Select.Option>
                            <Select.Option value={"CUSTOM_DAY"}>Custom Day</Select.Option>
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
};

const HolidayYearTab = ({holidayData, setHolidayData}: any) => {
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
    const [holidayData, setHolidayData] = useState<Item[]>([]);
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
                    <HolidayYearTab holidayData={holidayData} setHolidayData={setHolidayData}/>
                </div>
            )}
            <div>
                <HolidayList addData={holidayData}/>
            </div>
        </Layout>
    );
}

export default HolidayCreate;
