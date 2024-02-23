import {Divider, Layout, Popconfirm, Table, Tag, Typography, message, Row, Col} from "antd";
import {PageHeader} from "@ant-design/pro-layout";
import React, {useCallback, useEffect, useState} from "react";
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
};

function convertDateFormat(str:any) {
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

const HolidayCreateForm = ({year, isFormDisabled, newData}:any) => {
    const [form] = Form.useForm();
    const weekdays:string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const onFinish = (values: any) => {
        if (values.date) {
            values = {
                ...values,
                date: convertDateFormat(values.date),
                year: year,
            };
        }
        newData(values);
        message.success('New Holiday created successfully');
    };

    const onFinishFailed = () => {
        message.error('Error in holiday data creation');
    };

    const getDayOfWeek = (date:any) => {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayIndex = new Date(date).getDay();
        return daysOfWeek[dayIndex];
    };

    const onSecondCityChange = (value: any) => {
        console.log("value",value)
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
            <Col>
                <Form.Item label="Date"
                           name="date"
                           rules={[{ required: true, type: 'date' }]}
                >
                    <DatePicker
                        minDate={dayjs(`${year}-01-01`, dateFormat)}
                        maxDate={dayjs(`${year}-12-31`, dateFormat)}
                        onChange={(e) => {
                            const convertedDate = convertDateFormat(e);
                            const tempDay = getDayOfWeek(convertedDate);
                            form.setFieldValue('day', tempDay);
                        }}
                    />
                </Form.Item>
                <Form.Item label="Day"
                           name="day"
                           rules={[{ required: true}]}
                >
                    <Select placeholder="Select Holiday day"
                            options={weekdays.map((weekday:string) => (
                                { label: weekday, value: weekday })
                            )}
                    />
                </Form.Item>
            </Col>
            <Col>
                <Form.Item label="Holiday Name"
                           name="holiday_name"
                           rules={[{ required: true, type: 'string' }]}
                >
                    <Input placeholder="Enter Holiday name"/>
                </Form.Item>
                <Form.Item label="Type"
                           name="holiday_type"
                           rules={[{ required: true }]}
                >
                    <Select placeholder="Select Holiday type">
                        <Select.Option value="national">National Holiday</Select.Option>
                        <Select.Option value="festival">Festival</Select.Option>
                        <Select.Option value="custom">Custom</Select.Option>
                    </Select>
                </Form.Item>
            </Col>
            <Col>
                <Form.Item label="Reason"
                           name="reason"
                           rules={[{ required: true, type: 'string' }]}
                >
                    <Input.TextArea placeholder="Enter reason for Holiday"/>
                </Form.Item>
                <Form.Item label="Remarks"
                           name="remarks"
                           rules={[{ type: 'string' }]}
                >
                    <Input.TextArea placeholder="Enter remarks for Holiday"/>
                </Form.Item>
            </Col>
            <div className='holiday-create__form-submit'>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </div>
        </Form>
    )
}

const HolidayYearTab = ({newData}:any) => {
    const currentYear = new Date().getFullYear();
    const previousYear = new Date().getFullYear() - 1;
    const nextYear = new Date().getFullYear() + 1;

    const tabItems = [
        {
            label: previousYear,
            key: `${previousYear}`,
            children: (
                <HolidayCreateForm year={previousYear} isFormDisabled={true} newData={newData}/>
            )
        },
        {
            label: currentYear,
            key: `${currentYear}`,
            children: (
                <HolidayCreateForm year={currentYear} isFormDisabled={false} newData={newData}/>
            )
        },
        {
            label: nextYear,
            key: `${nextYear}`,
            children: (
                <HolidayCreateForm year={nextYear} isFormDisabled={false} newData={newData}/>
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


const HolidayListTable = ({data}:any) => {
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
                dataSource={data}
                columns={columns}

                rowClassName="editable-row"
            />
        </div>
    );
}


function HolidayCreate() {
    const [holidayData, setHolidayData] = useState<Item[]>(tempData);

    const newData = useCallback((values:any) => {
        const tempArray = [...holidayData, values];
        setHolidayData(tempArray);
    },[]);

    return (
        <Layout className="with-background">
            <div className="data-table">
                <Divider orientation="left">
                    <PageHeader
                        className=""
                        title="Holiday Create"
                    />
                </Divider>
                <HolidayYearTab newData={newData}/>
            </div>
            <HolidayListTable data={holidayData}/>
        </Layout>
    );
}

export default HolidayCreate;