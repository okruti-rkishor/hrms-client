import {DatePicker, Form, Input, Radio, Select} from "antd";
import {Blood_Group, Designation, Gender} from "../../../constant/constant";
import React from "react";


const PersonalDetails = (props: any) => {
    let age=props.age;
    let qualificationEnum=props.tempEnum.qualificationEnum;
    console.log(qualificationEnum.map((item:any)=>item));
    return (
        <>
            <div style={{display: "flex", flexDirection: "column", marginTop: "35px", gap: "30px"}}
                 className={"employee-create-inputs"}>
                <Form.Item label={"Title"}
                           name={"title"}
                           required={true}
                           initialValue={"Mr"}
                >
                    <Select style={{height: "40px"}}>
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
                    <Input required={true} style={{height: "40px"}}/>
                </Form.Item>
                <Form.Item name={"middleName"}
                           label={"Middle Name"}>
                    <Input required={true} style={{height: "40px"}}/>
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
                    <Input required={true} style={{height: "40px"}}/>
                </Form.Item>
                <Form.Item label={"Gender"}
                           name={"gender"}
                           initialValue={Object.keys(Gender)[0]}
                >
                    <Radio.Group style={{display: "flex"}}>
                        {(Object.keys(Gender) as Array<keyof typeof Gender>).map((key) =>
                            <Radio.Button value={key} style={{height: "40px", textAlign: "center"}} key={key}>
                                {Gender[key]}
                            </Radio.Button>
                        )}
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Date of Birth"
                           name={"dateOfBirth"}
                           rules={[
                               {
                                   required: true,
                                   message: 'Please fill your DOB!',
                               },
                               () => ({
                                   validator(_, value) {
                                       if (!value) {
                                           return Promise.reject();
                                       }
                                       if (isNaN(value)) {
                                           return Promise.reject("Age has to be a number.");
                                       }
                                       if (age < 18) {
                                           return Promise.reject("Age can't be less than 18");
                                       }
                                       if (age > 45) {
                                           return Promise.reject("Age can't be greater than 45");
                                       }
                                       return Promise.resolve();
                                   },
                               }),
                           ]}


                >
                    <DatePicker style={{width: "100%"}} format="YYYY-MM-DD"
                                disabledDate={(current) => current.isAfter(new Date())}
                    />

                </Form.Item>
                {age!==null ? <span style={{
                    marginTop: "-46px",
                    width: "fit-content",
                    marginLeft: "202px"
                }}>age:{age}</span> : <></>}

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

                <Form.Item label="Qualification"
                           name={"qualification"}
                >
                    <Select>
                            {qualificationEnum.map((item: any) =>
                                <Select.Option value={item.code} key={item.description}
                                               style={{height: "40px", textAlign: "center"}}
                                >
                                    {item.description}
                                </Select.Option>
                            )}
                        </Select>

                </Form.Item>
            </div>
        </>
    )
}
export default PersonalDetails;
