import {Button, Card, DatePicker, Form, Input, Select, SelectProps, Space} from "antd";
import {Designation, Type_Time} from "../../../constant/constant";
import React from "react";
import {CloseOutlined} from "@ant-design/icons/lib";

const Experience = ({tempEnum}: any) => {
    const {RangePicker} = DatePicker;
    const options: SelectProps['options'] = [
        {
            label: 'Javascript',
            value: 'javascript',
            desc: 'Javascript',
        },
        {
            label: 'React JS',
            value: 'react js',
            desc: 'React JS',
        },
        {
            label: 'Java',
            value: 'java',
            desc: 'Java',
        },
        {
            label: 'HTML',
            value: 'html',
            desc: 'HTML',
        },
        {
            label: 'CSS',
            value: 'css',
            desc: 'CSS',
        },
        {
            label: 'Spring Boot',
            value: 'spring boot',
            desc: 'Spring Boot',
        },
    ];


    return (
        <>
            <div style={{marginTop: "10px", display: "flex", flexDirection: "column", gap: "30px"}}
                 className={"Experience employee-create-inputs"}>
                <label className={"Experience_detail"}>Fill the Current Detail here</label>

                <Form.Item label="Type"
                           name={"type"}
                           rules={[{
                               required: true,
                               message: "select your type"
                           }]}
                >
                    <Select style={{width: "100%"}}>
                        {(Object.keys(Type_Time) as Array<keyof typeof Type_Time>).map((key) =>
                            <Select.Option value={key} key={key}
                                           style={{height: "40px", textAlign: "center"}}
                            >
                                {Type_Time[key]}
                            </Select.Option>
                        )}
                    </Select>
                </Form.Item>

                <Form.Item label={"Designation"}
                           name={'designation'}
                           required={true}
                           rules={[{
                               required: true,
                               message: "select your designation"
                           }]}
                >
                    <Select>
                        {tempEnum.designationEnum.map((item: any) =>
                            <Select.Option value={item.code} key={item.description}
                                           style={{height: "40px", textAlign: "center"}}
                            >
                                {item.description}
                            </Select.Option>
                        )}
                    </Select>
                </Form.Item>


                <Form.List name="experiences">
                    {(fields, {add, remove}) => (
                        <div style={{display: 'flex', rowGap: 16, flexDirection: 'column'}}>
                            {fields.map((field) => (
                                <Card
                                    size="small"
                                    title={`Please fill your previous company experience`}
                                    key={field.key}
                                    extra={
                                        <CloseOutlined
                                            onClick={() => {
                                                remove(field.name);
                                            }}
                                        />
                                    }
                                >
                                    <Form.Item label={"Company Name"}
                                               name={[field.name, 'employerName']}
                                               required={true}
                                               rules={[{
                                                   required: true,
                                                   message: "select your company name"
                                               }]}
                                    >
                                        <Input required={true}/>
                                    </Form.Item>
                                    <Form.Item label={"Designation"}
                                               name={[field.name, 'designation']}
                                               required={true}
                                               rules={[{
                                                   required: true,
                                                   message: "select your designation"
                                               }]}
                                    >
                                        <Select>
                                            {(Object.keys(Designation) as Array<keyof typeof Designation>).map((key) =>
                                                <Select.Option value={key} key={key}
                                                               style={{height: "40px", textAlign: "center"}}
                                                >
                                                    {Designation[key]}
                                                </Select.Option>
                                            )}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item label={"Total experience"}
                                               name={[field.name, 'totalExperience']}
                                               required={true}
                                               rules={[{
                                                   required: true,
                                                   message: "select your experience"
                                               }, () => ({
                                                   validator(_, value) {
                                                       if (!value) {
                                                           return Promise.reject();
                                                       }
                                                       if (isNaN(value)) {
                                                           return Promise.reject("Experience has to be a number.");
                                                       }
                                                       if (value.length < 0) {
                                                           return Promise.reject("Experience can't be negative");
                                                       }
                                                       if (value.length > 45) {
                                                           return Promise.reject("Experience can't be more than 45 digits");
                                                       }
                                                       return Promise.resolve();
                                                   },
                                               })]}

                                    >
                                        <Input/>
                                    </Form.Item>

                                    <Form.Item label={"Skills"} name={[field.name, 'skills']} required={true}>
                                        <Select
                                            mode="multiple"
                                            style={{width: '100%'}}
                                            placeholder="select your skills"
                                            optionLabelProp="label"
                                            options={options}
                                            optionRender={(option) => (
                                                <Space>
        <span role="img" aria-label={option.data.label}>
          {option.data.emoji}
        </span>
                                                    {option.data.desc}
                                                </Space>
                                            )}
                                        />
                                    </Form.Item>
                                    <Form.Item label={"Total CTC"} name={[field.name, 'annualCTC']} required={true}
                                               rules={[
                                                   () => ({
                                                       validator(_, value) {
                                                           if (!value) {
                                                               return Promise.reject();
                                                           }
                                                           if (isNaN(value)) {
                                                               return Promise.reject("CTC has to be a number.");
                                                           }
                                                           if (value.length < 0) {
                                                               return Promise.reject("CTC can't be negative");
                                                           }
                                                           return Promise.resolve();
                                                       },
                                                   })]}>
                                        <Input/>
                                    </Form.Item>
                                    <Form.Item label={"Reason for Leaving"} name={[field.name, 'reasonForLeaving']}
                                               required={true}>
                                        <Input/>
                                    </Form.Item>
                                    <Form.Item name={[field.name, 'duration']} label="start to end" required={true}>
                                        <RangePicker style={{width: "100%"}} disabledDate={(current) => {
                                            return current.isAfter(new Date());
                                        }}/>
                                    </Form.Item>
                                </Card>
                            ))}

                            <Button type="dashed" onClick={() => add()} block>
                                + Previous Experience
                            </Button>
                        </div>
                    )}
                </Form.List>
            </div>
        </>
    )
}
export default Experience;