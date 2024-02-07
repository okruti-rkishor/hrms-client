import {Button, Card, Form, Input, Select} from "antd";
import React from "react";
import {CloseOutlined} from "@ant-design/icons/lib";
import {Designation, Type_Time} from "../../../constant/constant";

const BankingDeatils=()=>{
    return (
        <>
            <div style={{display:"flex",flexDirection:"column",marginTop:"35px",gap:"30px"}} className={"employee-create-inputs"}>
                <Form.List name="bankDetails">
                    {(fields, { add, remove }) => (
                        <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
                            {fields.map((field) => (
                                <Card
                                    size="small"
                                    title={`${field.name}`}
                                    key={field.key}
                                    extra={
                                        <CloseOutlined
                                            onClick={() => {
                                                remove(field.name);
                                            }}
                                        />
                                    }
                                >
                                    <Form.Item name={[field.name, 'accountHolderName']} label={"Account Holder Name"} rules={[

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

                                    <Form.Item name={[field.name, 'ifscCode']} label={"IFSC Code"} rules={[
                                        () => ({
                                            validator(_, value) {
                                                if (!value) {
                                                    return Promise.reject();
                                                }
                                                if (isNaN(value)) {
                                                    return Promise.reject("ifsc code has to be a number.");
                                                }
                                                return Promise.resolve();
                                            },
                                        }),
                                    ]}>
                                        <Input required={true} style={{height:"40px"}}/>
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
export default BankingDeatils;

