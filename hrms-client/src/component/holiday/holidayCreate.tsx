import {Divider, Layout, Table} from "antd";
import {PageHeader} from "@ant-design/pro-layout";
import React, {useState} from "react";
import {Button, DatePicker, Form, Input, Select} from 'antd';



const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

const onFinish = (values: any) => {
    console.log(values);
};




const HolidayCreate = () => {


    return (
        <Layout className="with-background">
            <div className="data-table">
                <Divider orientation="left">
                    <PageHeader
                        className=""
                        title="Holiday Create"
                    />
                </Divider>
                <Form
                    {...layout}
                    layout="horizontal"
                    name="nest-messages"
                    onFinish={onFinish}
                    style={{ maxWidth: 600 }}
                    validateMessages={validateMessages}
                >
                    <Form.Item label="DatePicker"
                               name="datepicker"
                               rules={[{
                                   required:true,
                                   message:"input select the date"
                               }]}
                    >
                        <DatePicker />
                    </Form.Item>
                    <Form.Item label="Type"
                               name="holiday type"
                               rules={[{
                                   required:true,
                                   message:"input select the date"
                               }]}
                    >
                        <Select placeholder="Please select holiday type">
                            <Select.Option value="national">National Holiday</Select.Option>
                            <Select.Option value="festival">Festival</Select.Option>
                            <Select.Option value="custom">Custom</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Day"
                               name={['day', 'day']}
                               rules={[{
                                   required:true,
                                   message:"input select the day"
                               }]}
                    >
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
                    <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Reason"
                               name={['reason', 'reason']}
                               rules={[{
                                   required:true,
                                   message:"input the reason"
                               }]}
                    >
                        <Input.TextArea placeholder="Please input reason of holiday"/>
                    </Form.Item>
                    <Form.Item label="Remarks"
                               name={['remarks', 'remarks']}
                               // rules={[{
                               //     required:true,
                               //     message:"input the remarks"
                               // }]}
                    >
                        <Input.TextArea placeholder="Please input additional remarks about holiday"/>
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>

                <section>
                    {/*<Table columns={columns} dataSource={data} pagination={{defaultPageSize: 4}} components={{*/}
                    {/*    body: {*/}
                    {/*        cell: EditableCell,*/}
                    {/*    },*/}
                    {/*}} size={"small"}/>*/}
                </section>
            </div>
        </Layout>
    );
}

export default HolidayCreate;