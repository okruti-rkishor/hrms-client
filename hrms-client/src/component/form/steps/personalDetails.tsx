import {DatePicker, Form, Input, Radio, Select} from "antd";
import {Blood_Group, Gender} from "../../../constant/constant";
import React, {useState} from "react";
import dayjs from "dayjs";

const PersonalDetails =()=>{
    const [ageduration,setAgeDuration]=useState<any>(0);
    return (
        <>
            <div style={{display:"flex",flexDirection:"column",marginTop:"35px",gap:"30px"}}
                 className={"employee-create-inputs"}>
                <Form.Item label={"Title"}
                           name={"title"}
                           required={true}
                >
                    <Select style={{height:"40px"}}>
                        <Select.Option value="Mr">Mr</Select.Option>
                        <Select.Option value="Mrs">Mrs</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name={"firstName"}
                           label={"First Name"}
                           rules={[
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
                           ]}
                >
                    <Input required={true} style={{height:"40px"}}/>
                </Form.Item>
                <Form.Item name={"middleName"}
                           label={"Middle Name"} >
                    <Input required={true} style={{height:"40px"}}/>
                </Form.Item>
                <Form.Item name={"lastName"}
                           label={"Last Name"}
                           rules={[
                               {
                                   required: true,
                                   message: "Please enter Last Name",
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
                           ]}
                >
                    <Input required={true} style={{height:"40px"}}/>
                </Form.Item>
                <Form.Item label={"Gender"}
                           name={"gender"}
                >
                    <Radio.Group style={{display:"flex"}}>
                        {(Object.keys(Gender) as Array<keyof typeof Gender>).map((key) =>
                            <Radio.Button value={key} key={key}
                                          style={{height:"40px",textAlign:"center"}}
                                          defaultChecked = {true}
                            >
                                {Gender[key]}
                            </Radio.Button>
                        )}
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Date of Birth"
                           name={"dateOfBirth"}
                           rules={[{
                               required: true,
                               message: 'Please fill your DOB!',
                           },]}
                >
                    <DatePicker style={{width:"100%"}} format="YYYY-MM-DD" disabledDate={(current) => {
                    return current.isAfter(new Date());
                    }}
                    />

                </Form.Item>
                <Form.Item label="Blood Group"
                           name={"bloodGroup"}
                           initialValue={Object.keys(Blood_Group)[8]}>
                    <Select listItemHeight={9} listHeight={310}>
                        {(Object.keys(Blood_Group) as Array<keyof typeof Blood_Group>).map((key) =>
                            <Select.Option value={key} key={key}>
                                {Blood_Group[key]}
                            </Select.Option>
                        )}
                    </Select>
                </Form.Item>

                <Form.Item label="Age"
                           name={"age"}
                           rules={[
                               {
                                   required: true,
                                   message: "Please enter Age",
                               },
                               () => ({
                                   validator(_, value) {
                                       if (!value) {
                                           return Promise.reject();
                                       }
                                       if (isNaN(value)) {
                                           return Promise.reject("Age has to be a number.");
                                       }
                                       if (value< 18) {
                                           return Promise.reject("Age can't be less than 18");
                                       }
                                       if (value> 45) {
                                           return Promise.reject("Age can't be less than 45");
                                       }
                                       return Promise.resolve();
                                   },
                               }),
                           ]}
                >
                    <Input required={true} style={{height:"40px"}}/>
                </Form.Item>

                <Form.Item label="Qualification"
                           name={"qualification"}
                           rules={[
                               {
                                   required: true,
                                   message: "Please enter Qualification",
                               },
                               () => ({
                                   validator(_, value) {
                                       if (!value) {
                                           return Promise.reject();
                                       }
                                       if (!isNaN(value)) {
                                           return Promise.reject("Qulification should be text.");
                                       }
                                       return Promise.resolve();
                                   },
                               }),
                           ]}
                >
                    <Input required={true} style={{height:"40px"}}/>
                </Form.Item>


            </div>
            </>
    )
}
export default PersonalDetails;