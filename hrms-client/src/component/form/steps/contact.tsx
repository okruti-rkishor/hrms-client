import {DatePicker, Form, Input, Select} from "antd";
import React from "react";
import {Status} from "../../../constant/constant";

const Contact =()=>{
    return (
        <>
            <div style={{marginTop:"10px",display:"flex",flexDirection:"column",gap:"30px"}} className={"employee-create-inputs"}>
                <label>Personal Contact</label>
                <Form.Item label={"Status"}
                           required={true}
                           name={"status"}
                           rules={[{
                               required:true,
                               message:"select your status"
                           }]}
                           initialValue={Object.keys(Status)[0]}
                >

                    <Select style={{height:"40px"}} defaultValue={Object.keys(Status)[0]}>
                        {(Object.keys(Status) as Array<keyof typeof Status>).map((key) =>
                            <Select.Option value={key} key={key}
                                           style={{height:"40px",textAlign:"center"}}
                            >
                                {Status[key]}
                            </Select.Option>
                        )}
                    </Select>
                </Form.Item>
                <Form.Item label={"Personal Mail"}
                           name={"email"}
                           required={true}
                           rules={[
                               {
                                   type: 'email',
                                   message: 'The input is not valid E-mail!',
                               },
                               {
                                   required: true,
                                   message: 'Please input your E-mail!',
                               },
                           ]}
                >
                    <Input required={true}/>
                </Form.Item>
                <Form.Item label={"Company Mail"}
                           name={"officialEmail"}
                           required={true}
                           rules={[
                               {
                                   type: 'email',
                                   message: 'The input is not valid E-mail!',
                               },
                               {
                                   required: true,
                                   message: 'Please input your E-mail!',
                               },
                           ]}
                >
                    <Input required={true}/>
                </Form.Item>
                <Form.Item label={"Contact Number"}
                           name={"contact"}
                           required={true}
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
                           ]}
                >
                    <Input prefix={"+91"} style={{ width: '100%' }} required={true}/>
                </Form.Item>
                <Form.Item label={"Joining Date"}
                           name={"joiningDate"}
                           required={true}
                           rules={[{
                               required: true,
                               message: 'Please fill your DOB!',
                           },]}
                >
                    <DatePicker style={{width:"100%"}} format="YYYY-MM-DD"/>

                </Form.Item>
            </div>
        </>
    )
}
export default Contact;