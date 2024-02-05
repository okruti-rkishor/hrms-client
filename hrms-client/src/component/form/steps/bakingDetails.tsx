import {Form, Input} from "antd";
import React from "react";

const BankingDeatils=()=>{
    return (
        <>
            <div style={{display:"flex",flexDirection:"column",marginTop:"35px",gap:"30px"}} className={"employee-create-inputs"}>
                <Form.Item name={"accountHolderName"} label={"Account Holder Name"} rules={[

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

                <Form.Item name={"accountNumber"} label={"Account Number"} rules={[

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

                <Form.Item name={"branchName"} label={"Branch Name"} rules={[

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

                <Form.Item name={"ifscCode"} label={"IFSC Code"} rules={[
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

            </div>
            </>
    )
}
export default BankingDeatils;

