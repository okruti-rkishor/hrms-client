import {Card, Form, Input} from "antd";
import React from "react";


const BankingDeatils=()=>{
    console.log("55555")
    return (
        <>
            <div style={{display:"flex",flexDirection:"column",marginTop:"35px",gap:"30px"}} className={"employee-create-inputs"}>
                <Form.List name="bankDetail" initialValue={[{}]}>
                    {(fields) => (
                        <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
                            {fields.map((field) => (
                                <Card
                                    size="small"
                                    title={"Account Detail"}
                                    key={field.key}
                                >
                                    <Form.Item name={[field.name, 'accountHolderName']} label={"Account Holder Name"} rules={[
                                        {
                                                required:true,
                                                message:"please enter your account name"
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
                                    ]}>
                                        <Input required={true} style={{height:"40px"}}/>
                                    </Form.Item>

                                    <Form.Item name={[field.name, 'accountNumber']} label={"Account Number"} rules={[
                                        {
                                            required:true,
                                            message:"please enter your account number"
                                        },

                                        () => ({
                                            validator(_, value) {
                                                if (!value) {
                                                    return Promise.reject();
                                                }
                                                if (isNaN(value)) {
                                                    return Promise.reject("Account Number has to be a Number.");
                                                }
                                                return Promise.resolve();
                                            },
                                        }),
                                    ]}>
                                        <Input required={true} style={{height:"40px"}}/>
                                    </Form.Item>

                                    <Form.Item name={[field.name, 'branchName']} label={"Branch Name"} rules={[
                                        {
                                            required:true,
                                            message:"please enter your branch name"
                                        },

                                        () => ({
                                            validator(_, value) {
                                                if (!value) {
                                                    return Promise.reject();
                                                }
                                                if (!isNaN(value)) {
                                                    return Promise.reject("Branch Name has to be a text.");
                                                }
                                                return Promise.resolve();
                                            },
                                        }),
                                    ]}>
                                        <Input required={true} style={{height:"40px"}}/>
                                    </Form.Item>

                                    <Form.Item name={[field.name, 'branchCode']} label={"Branch Code"} rules={[
                                        {
                                            required:true,
                                            message:"please enter your branch code"
                                        },

                                        () => ({
                                            validator(_, value) {
                                                if (!value) {
                                                    return Promise.reject();
                                                }
                                                if (!isNaN(value)) {
                                                    return Promise.reject("Branch Name has to be a text.");
                                                }
                                                return Promise.resolve();
                                            },
                                        }),
                                    ]}>
                                        <Input required={true} style={{height:"40px"}}/>
                                    </Form.Item>

                                    <Form.Item name={[field.name, 'ifscCode']} label={"IFSC Code"}>
                                        <Input required={true} style={{height:"40px"}}/>
                                    </Form.Item>
                                </Card>
                            ))}
                        </div>
                    )}
                </Form.List>

            </div>
            </>
    )
}
export default BankingDeatils;

