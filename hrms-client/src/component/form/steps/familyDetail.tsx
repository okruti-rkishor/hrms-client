import {Button, Card, Form, Input, Radio, Select, Space} from "antd";
import React from "react";
import {Designation, Gender, Type_Time} from "../../../constant/constant";
import {CloseOutlined} from "@ant-design/icons/lib";

const FamilyDetail = () => {
    return (
        <>
            <div style={{display:"flex",flexDirection:"column",marginTop:"35px",gap:"30px"}} className={"employee-create-inputs"}>


                <Form.List name="familyDetails">
                    {(fields, { add, remove }) => (
                        <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
                            {fields.map((field) => (
                                <Card
                                    size="small"
                                    title={`Family member`}
                                    key={field.key}
                                    extra={
                                        <CloseOutlined
                                            onClick={() => {
                                                remove(field.name);
                                            }}
                                        />
                                    }
                                >
                                    <Form.Item label={"Relation Detail"} name={[field.name, 'relationType']} required={true}>
                                        <Select style={{ height: "40px" }}>
                                            <Select.Option value="Father">Father</Select.Option>
                                            <Select.Option value="Mother">Mother</Select.Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item name={[field.name, 'name']}
                                               label={"Name"}
                                               rules={[
                                                   {
                                                       required: true,
                                                       message: "Please enter Name",
                                                   },
                                                   () => ({
                                                       validator(_, value) {
                                                           if (!value) {
                                                               return Promise.reject();
                                                           }
                                                           if (!isNaN(value)) {
                                                               return Promise.reject("Name has to be a text.");
                                                           }
                                                           return Promise.resolve();
                                                       },
                                                   }),
                                               ]}
                                    >
                                        <Input required={true} style={{height:"40px"}}/>
                                    </Form.Item>


                                    <Form.Item label={"Contact"} name={[field.name, 'mobileNumber']} required={true}
                                               rules={[
                                                   {
                                                       required: true,
                                                       message: "Please enter Contact Number",
                                                   },
                                                   () => ({
                                                       validator(_, value) {
                                                           if (!value) {
                                                               return Promise.reject();
                                                           }
                                                           if (isNaN(value)) {
                                                               return Promise.reject("Contact Number has to be a number.");
                                                           }
                                                           if (value.length < 10) {
                                                               return Promise.reject("Contact Number can't be less than 10 digits");
                                                           }
                                                           if (value.length > 10) {
                                                               return Promise.reject("Contact Number can't be more than 10 digits");
                                                           }
                                                           return Promise.resolve();
                                                       },
                                                   }),
                                               ]}>
                                        <Input prefix={"+91"} required={true} style={{width:"100%"}}/>
                                    </Form.Item>
                                    <Form.Item label={"Gender"} name={[field.name, 'gender']} required={true}>
                                        <Radio.Group style={{display:"flex"}}>
                                            {(Object.keys(Gender) as Array<keyof typeof Gender>).map((key) =>
                                                <Radio.Button value={key} key={key}
                                                              style={{height:"40px",textAlign:"center"}}

                                                >
                                                    {Gender[key]}
                                                </Radio.Button>

                                            )}

                                        </Radio.Group>
                                    </Form.Item>



                                </Card>
                            ))}

                            <Button type="dashed" onClick={() => add()} block>
                                + Add Item
                            </Button>
                        </div>
                    )}
                </Form.List>




            </div>
        </>
    )
}
export default FamilyDetail;