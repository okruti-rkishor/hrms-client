import {Cascader, Form, Input, Select} from "antd";
import React, {useState} from "react";
import restApi from "../../../services/http/api";
import {DesignationEnum} from "../employeeSearch";

const Address = ({state, setState,city,setCity}: any) => {



    return (
        <>
            <div style={{marginTop: "10px", display: "flex", flexDirection: "column", gap: "30px"}}
                 className={"employee-create-inputs"}>
                <label>Present Address</label>
                <Form.Item label={"House number"}
                           name={"line1"}
                           required={true}
                           rules={[
                               {
                                   required: true,
                                   message: "Please enter House Number",
                               },
                           ]}
                >
                    <Input required={true}/>
                </Form.Item>
                <Form.Item label={"Street address"}
                           name={"line2"}
                           required={true}
                           rules={[{
                               required: true,
                               message: "please fill your Street Address"
                           }]}
                >
                    <Input required={true}/>
                </Form.Item>

                <Form.Item label={"State"}
                           name={"state"}
                           required={true}
                           rules={[
                               {
                                   required: true,
                                   message: "Please enter State",
                               },
                           ]}

                >
                    <Select options={state} />
                </Form.Item>

                <Form.Item label={"City"}
                           name={"city"}
                           required={true}
                           rules={[
                               {
                                   required: true,
                                   message: "Please enter City",
                               },
                           ]}

                >
                    <Select options={city}/>
                </Form.Item>

                <Form.Item label={"Postcode"}
                           name={"zipCode"}
                           required={true}
                           rules={[
                               {
                                   required: true,
                                   message: "Please enter zip code",
                               },
                               () => ({
                                   validator(_, value) {
                                       if (!value) {
                                           return Promise.reject();
                                       }
                                       if (isNaN(value)) {
                                           return Promise.reject("Post code has to be a number.");
                                       }
                                       if (value.length < 6) {
                                           return Promise.reject("Post code can't be less than 6 digits");
                                       }
                                       if (value.length > 6) {
                                           return Promise.reject("Post code can't be more than 6 digits");
                                       }
                                       return Promise.resolve();
                                   },
                               }),
                           ]}
                >
                    <Input required={true}/>
                </Form.Item>
            </div>
        </>
    )
}
export default Address;