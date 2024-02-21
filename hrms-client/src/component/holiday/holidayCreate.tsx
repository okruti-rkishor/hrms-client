import {Divider, Layout, Popconfirm, Table, Tag, Typography, message} from "antd";
import {PageHeader} from "@ant-design/pro-layout";
import React, {useEffect, useState, createContext, useContext} from "react";
import {Button, Form, Input, Select, Tabs} from 'antd';
import {CloseOutlined, EditTwoTone, SaveTwoTone} from "@ant-design/icons/lib";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import './holiday.scss';
dayjs.extend(customParseFormat);


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
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
    //Microsoft: Power pages
    // Air table
};


function convertDateFormat(str: Date) {
    var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
}


const dateFormat = 'YYYY-MM-DD';

const tempData:any = [
    {
        year: 2023,
        date: '2000-01-04',
        day: 'Monday',
        reason: 'No reason',
        remarks: 'Nothing',
        holiday_name: 'Holi',
        holiday_type: 'Festival Holiday',
    },
    {
        year: 2024,
        date: '2000-03-08',
        day: 'Sunday',
        reason: 'No reason',
        remarks: 'Nothing',
        holiday_name: 'Shivratri',
        holiday_type: 'Festival Holiday',
    },
    {
        year: 2024,
        date: '2000-03-08',
        day: 'Wednesday',
        reason: 'National Holiday',
        remarks: 'National Holiday',
        holiday_name: 'Independance Day',
        holiday_type: 'National Holiday',
    }
]

export const HolidayDataContext = createContext(tempData);

const HolidayCreateForm = ({year, isFormDisabled}:any) => {
    const [holidayData, setHolidayData] = useState<Item[]>(tempData);

    const onFinish = (values: any) => {
        if (values.date) {
            values = {
                ...values,
                date: convertDateFormat(values.date),
            };
        }
        console.log('Entered field values: ', values);
        const tempArray = [...holidayData, values];
        setHolidayData(tempArray);
        console.log('All data with pev also: ', tempArray);
        message.success('New Holiday created successfully');
    };

    const onFinishFailed = () => {
        message.error('Error ');
    };

    // useEffect(() => {
    //
    // }, [holidayData])

    return (
        <HolidayDataContext.Provider value={{holidayData, setHolidayData}}>
            <Form layout="inline"
                  name="holiday-create-form"
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  disabled={isFormDisabled}
                  validateMessages={validateMessages}
                  className='holiday-create__form'
            >
                <Form.Item label="DatePicker" name="date">
                    <DatePicker
                        // defaultValue={dayjs('2019-09-03', dateFormat)}
                        minDate={dayjs(`${year}-01-01`, dateFormat)}
                        maxDate={dayjs(`${year}-12-31`, dateFormat)}
                    />
                </Form.Item>
                <Form.Item label="Type" name="holiday_type">
                    <Select placeholder="Please select holiday type">
                        <Select.Option value="national">National Holiday</Select.Option>
                        <Select.Option value="festival">Festival</Select.Option>
                        <Select.Option value="custom">Custom</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Day" name="day">
                    <Select placeholder="Please select holiday day">
                        <Select.Option value="sunday">Sunday</Select.Option>
                        <Select.Option value="monday">Monday</Select.Option>
                        <Select.Option value="tuesday">Tuesday</Select.Option>
                        <Select.Option value="wednesday">Wednesday</Select.Option>
                        <Select.Option value="thursday">Thursday</Select.Option>
                        <Select.Option value="friday">Friday</Select.Option>
                        <Select.Option value="saturday">Saturday</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Holiday Name" name="holiday_name">
                    <Input placeholder="Please type the holiday name"/>
                </Form.Item>
                <Form.Item label="Reason" name="reason">
                    <Input.TextArea placeholder="Please input reason of holiday"/>
                </Form.Item>
                <Form.Item label="Remarks" name="remarks">
                    <Input.TextArea placeholder="Please input remarks about holiday"/>
                </Form.Item>
                {/*<Form.Item wrapperCol={{ offset: 8 }}>*/}
                {/*    <Button type="primary" htmlType="submit">*/}
                {/*        Submit*/}
                {/*    </Button>*/}
                {/*</Form.Item>*/}
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form>
        </HolidayDataContext.Provider>
    )
}

const HolidayYearTab = () => {
    const currentYear = new Date().getFullYear();
    const previousYear = new Date().getFullYear() - 1;
    const nextYear = new Date().getFullYear() + 1;

    const tabItems = [
        {
            label: previousYear,
            key: `${previousYear}`,
            children: (
                <HolidayCreateForm year={previousYear} isFormDisabled={true}/>
            )
        },
        {
            label: currentYear,
            key: `${currentYear}`,
            children: (
                <HolidayCreateForm year={currentYear} isFormDisabled={false}/>
            )
        },
        {
            label: nextYear,
            key: `${nextYear}`,
            children: (
                <HolidayCreateForm year={nextYear} isFormDisabled={false}/>
            )
        },
    ];

    return (
        <Tabs
            defaultActiveKey={`${currentYear}`}
            tabPosition='left'
            destroyInactiveTabPane={true}
            items={tabItems}
            className='holiday-create__tabs'
        />
    )
}



const HolidayListTable = () => {
    const {holidayData, setHolidayData} = useContext(HolidayDataContext);


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
                        <EditTwoTone style={{ fontSize: '18px', marginLeft: '10px' }}/>
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
                dataSource={holidayData}
                columns={columns}
                rowClassName="editable-row"
            />
        </div>
    );
}




function HolidayCreate() {

    return (
        <Layout className="with-background">
            <div className="data-table">
                <Divider orientation="left">
                    <PageHeader
                        className=""
                        title="Holiday Create"
                    />
                </Divider>
                <HolidayYearTab/>
            </div>
            <HolidayListTable/>
        </Layout>
    );
}

export default HolidayCreate;