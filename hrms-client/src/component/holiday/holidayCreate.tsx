import {
    Divider,
    Layout,
    Table,
    Typography,
    message,
    Col,
} from "antd";
import {PageHeader} from "@ant-design/pro-layout";
import React, {useCallback, useContext, useEffect, useState} from "react";
import {Button, Form, Input, Select, Tabs} from "antd";
import {EditTwoTone} from "@ant-design/icons/lib";
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

const dateFormat = "YYYY-MM-DD";

const tempData: any = [
    {
        year: 2023,
        date: "2000-01-04",
        day: "Monday",
        reason: "No reason",
        remarks: "Nothing",
        holiday_name: "Holi",
        holiday_type: "Festival Holiday",
    },
    {
        year: 2024,
        date: "2000-03-08",
        day: "Sunday",
        reason: "No reason",
        remarks: "Nothing",
        holiday_name: "Shivratri",
        holiday_type: "Festival Holiday",
    },
    {
        year: 2024,
        date: "2000-03-08",
        day: "Wednesday",
        reason: "National Holiday",
        remarks: "National Holiday",
        holiday_name: "Independance Day",
        holiday_type: "National Holiday",
    },
];


const HolidayCreateForm = ({year, isFormDisabled, newData}: any) => {
    console.log("111");
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log("78687");
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
        console.log(values);
        // if (values.date) {
        //     values = {
        //         ...values,
        //         date: convertDateFormat(values.date),
        //         year: year,
        //     };
        // }
        // newData(values);
        // console.log(values);
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
            console.log(calender);
            tempData.push(calender);


            message.success('New Holiday created successfully');
        }).catch((e) => console.log(e));
    };


    const onFinishFailed = () => {
        message.error("Error in holiday data creation");
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

    const onSecondCityChange = (value: any) => {
        console.log("value", value);
    };
    return (
        <Form layout="inline"
              name="holiday-create-form"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
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
                        />
                    </Form.Item>

                    <Form.Item label={"Name"} name={"name"}>
                        <Input placeholder={"Enter Holiday Name heree"}/>
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

const getDayOfWeek = (date: any) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayIndex = new Date(date).getDay();
    return daysOfWeek[dayIndex];
};

const onSecondCityChange = (value: any) => {
    console.log("value", value)
};


const HolidayYearTab = ({newData}: any) => {
    console.log("2222");
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
                    newData={newData}
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
                    newData={newData}
                />
            ),
        },
        {
            label: nextYear,
            key: `${nextYear}`,
            children: (
                <HolidayCreateForm
                    year={nextYear}
                    isFormDisabled={false}
                    newData={newData}
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

const HolidayListTable = ({data}: any) => {
    console.log("3333");
    const columns = [
        {
            title: 'Year',
            dataIndex: 'year',
            width: '15%',
            editable: true,
            filters: [
                {
                    text: 2023,
                    value: 2023,
                },
                {
                    text: 2024,
                    value: 2024,
                },
                {
                    text: 2025,
                    value: 2025,
                },
            ],
            // onFilter: (value: any, record: any) => {
            //     return record.roles.includes(value);
            // },
        },
        {
            title: 'Date',
            dataIndex: 'date',
            width: '15%',
            editable: true,
        },
        {
            title: 'Name',
            dataIndex: 'holiday_name',
            width: '15%',
            editable: true,
        },
        {
            title: 'Type',
            dataIndex: 'holiday_type',
            width: '15%',
            editable: true,
            filters: [
                {
                    text: 'National Holiday',
                    value: 'National Holiday',
                },
                {
                    text: 'Festival Holiday',
                    value: 'Festival Holiday',
                },
                {
                    text: 'Custom',
                    value: 'Custom Holiday',
                },
            ],
            // onFilter: (value: any, record: any) => {
            //     return record.roles.includes(value);
            // },
        },
        {
            title: 'Day',
            dataIndex: 'day',
            width: '15%',
            editable: true,
            filters: [
                {
                    text: 'Weekdays',
                    value: 'weekdays',
                },
                {
                    text: 'Weekend',
                    value: 'weekend',
                }
            ],
            // onFilter: (value: any, record: any) => {
            //     return record.roles.includes(value);
            // },
        },
        {
            title: 'Actions',
            dataIndex: 'operation',
            width: '15%',
            render: (_: any, record: Item) => {
                return (
                    <Typography.Link>
                        <EditTwoTone style={{fontSize: '18px', marginLeft: '10px'}}/>
                    </Typography.Link>
                )
            },
        },
    ];

    return (
        <div className="data-table holiday-list">
            <Table
                rowKey="key"
                bordered
                dataSource={data}
                columns={columns}

                rowClassName="editable-row"
            />

        </div>
    );
}

function HolidayCreate() {
    const [holidayData, setHolidayData] = useState<Item[]>(tempData);
    const [showAddHolidayStatus, setShowAddHolidayStatus] = useState<boolean>(false);
    const {newUser} = useContext(UserLoginContext);

    const newData = useCallback((values: any) => {
        const tempArray = [...holidayData, values];
        setHolidayData(tempArray);
    }, []);

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
    }, []);

    console.log("444");


    return (
        <Layout className="with-background">
            {showAddHolidayStatus && (
                <div className="data-table">
                    <Divider orientation="left">
                        <PageHeader className="" title="Holiday Create"/>
                    </Divider>
                    <HolidayYearTab newData={newData}/>
                </div>
            )}
            <div>
                <HolidayList/>
            </div>
        </Layout>
    );
}

export default HolidayCreate;
