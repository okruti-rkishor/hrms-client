import React, {useRef, useState} from "react";
import {
    Input,
    Form,
    Select,
    Button,
    Radio,
    DatePicker,
    InputNumber,
    Row,
    Col,
    Cascader,
    Checkbox,
    Upload,
    Space,
    message
} from "antd";
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import {Simulate} from "react-dom/test-utils";
import submit = Simulate.submit;
import '../form/formComponent.scss';
import { Steps } from 'antd';
import restApi from "../../services/http/api/index";
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined,MinusCircleOutlined } from '@ant-design/icons';
import {Designation, Gender, Type_Time, Status,Blood_Group,Documents} from "../../../src/constant/constant";
import { Tabs } from 'antd';
import type { TabsProps,UploadProps } from 'antd';
import axios from "axios";


const FormComponent = () =>{
    const [current, setCurrent] = useState(0);
    const { RangePicker } = DatePicker;
    const [form] = Form.useForm();
    const [employeeData,setEmployeeData]=useState<any>({title:"Mr",bloodGroup:"AB_POSITIVE",gender:"MALE",familyDetails:[{gender:"MALE"}]});
    const steps = [
        {
            title: 'Personal Details',
            content: 'First-content',
            fields:["title","firstName","middleName","lastName","gender","DOB"],
        },
        {
            title: 'Address',
            content: 'Second-content',
            fields:["houseNumber","streetAddress","city","state","postcode"]
        },
        {
            title: 'Contact',
            content: 'Third-content',
        },
        {
            title: 'Experience',
            content: 'Fourth-content',
        },
        {
            title: 'Family Details',
            content: 'Fifth-content',
        },
        {
            title: 'Banking Details',
            content: 'Fifth-content',
        },
        {
            title: 'Document',
            content: 'Last-content',
        },
    ];
    const [document,setDocument]=useState<any>();
    const onChange = (value: any) => {
        console.log(employeeData);
        setCurrent(value);
        // form.validateFields(steps[current].fields).then((result)=>{
        //     console.log(result,value);
        //     setCurrent(value);
        // }).catch((error)=>{
        //     console.log("error",error,value);
        //
        // });
    };
    const onFinish = async (value:object) =>{
        console.log("1111",value,employeeData);
        const payload={
            "status": employeeData.status,
            "employeeCode": "ok12375",
            "designation": employeeData.designation,
            "joiningDate": employeeData.joiningDate,
            "exitDate": null,
            "officialEmail": employeeData.companyEmail,
            "totalExperience": employeeData.experience,
            "type": employeeData.type,
            "name": {
                "title": employeeData.title,
                "firstName": employeeData.firstName,
                "middleName": employeeData.middleName,
                "lastName": employeeData.lastName
            },
            "gender": employeeData.gender,
            "dateOfBirth": employeeData.dateofBirth,
            "age": employeeData.age,
            "qualification":employeeData.qualification,
            "email": employeeData.personalEmail,
            "contact": employeeData.contact,
            "bloodGroup":employeeData.blood_group,
            "presentAddress": {
                "line1": employeeData.houseNumber,
                "line2": employeeData.streetAddress,
                "city": employeeData.city,
                "state": employeeData.state,
                "zipCode": employeeData.postcode
            },
            "permanentAddress": {
                "line1": employeeData.houseNumber,
                "line2": null,
                "city": employeeData.city,
                "state": employeeData.state,
                "zipCode": employeeData.postcode
            },
            "previousExperiences": [
                {
                    "employerName": employeeData.companyName,
                    "designation": employeeData.designation,
                    "duration": {
                        "startDate": employeeData.experiencePicker[0],
                        "endDate":  employeeData.experiencePicker[1]
                    },
                    "totalExperience": employeeData.experience,
                    "annualCTC": employeeData.CTC,
                    "skills": [
                        employeeData.skills,
                        employeeData.skills,
                        employeeData.skills
                    ],
                    "reasonForLeaving": employeeData.reason
                }
            ],
            "familyDetails": [
                {
                    "name": employeeData.relationfirstName+employeeData.relationmiddleName+employeeData.relationlastName,
                    "gender": employeeData.gender,
                    "relationType": employeeData.relationDetail,
                    "mobileNumber": employeeData.relationContact
                }
            ],
            "bankDetails": [
                {
                    "accountHolderName": employeeData.accountholderName,
                    "accountNumber": employeeData.accountNumber,
                    "branchName": employeeData.branchName,
                    "branchCode": employeeData.ifscCode,
                    "ifscCode": employeeData.ifscCode
                }
            ]
            // "documents": [
            //     {
            //         "id":""
            //     }
            // ]
        };
        console.log(payload);
        const response = await restApi.employeeCreate(payload);
        console.log(response);
    }
    const [fileUpload,setFileUpload]=useState<any>();


    const items = steps.map((item) => ({ key: item.title, title: item.title }));
    const fileProps: UploadProps = {
        onChange(info) {
            console.log(info);
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }

        },
    };

    const onChangeTabs =(key:string) =>{
        console.log(key);
    }

    const customRequest = async ({ file, onSuccess, onError}:any)=> {
        let documentPayload = {"document-type": Object.keys(document)[0], "file": file}
        const response = await restApi.documentUpload(documentPayload).then((info)=> onSuccess("done")).catch((info)=>onError("error"));
    }

    return (
        <div className='parent employee-create-section'>
            <div className="forms-steps">
                <Steps current={current}
                       items={items}
                       direction="vertical"
                       onChange={onChange}
                       style={{width:"19%"}}
                />
                <Form onFinish={onFinish}
                      style={{width:"74%"}}
                      onValuesChange={(e)=>{
                          console.log(e,current);
                          current<=5?setEmployeeData({...employeeData,...e}):setDocument({...document,...e});

                      }}
                      form={form}
                      className= 'employee-create-form'
                >
                    {current === 0 && (<>
                        <div style={{display:"flex",flexDirection:"column",marginTop:"35px",gap:"30px"}}
                             className={"employee-create-inputs"}>
                            <Form.Item label={"Title"}
                                       name={"title"}
                                       required={true}
                            >
                                <Select style={{height:"40px"}} defaultValue="Mr">
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
                                <Radio.Group style={{display:"flex"}} defaultValue={Object.keys(Gender)[0]}>
                                    {(Object.keys(Gender) as Array<keyof typeof Gender>).map((key) =>
                                        <Radio.Button value={key}
                                                      style={{height:"40px",textAlign:"center"}}
                                                      defaultChecked = {true}
                                        >
                                            {Gender[key]}
                                        </Radio.Button>
                                    )}
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item label="Date of Birth"
                                       name={"dateofBirth"}
                                       rules={[{
                                           required: true,
                                           message: 'Please fill your DOB!',
                                       },]}
                            >
                                <DatePicker style={{width:"100%"}} disabledDate={(current) => current.isAfter(new Date())}/>
                            </Form.Item>
                            <Form.Item label="Blood Group"
                                       name={"blood_group"}
                                       initialValue={"AB_POSITIVE"}>
                                <Select style={{height:"40px"}} defaultValue={Object.keys(Blood_Group)[0]}>
                                    {(Object.keys(Blood_Group) as Array<keyof typeof Blood_Group>).map((key) =>
                                        <Select.Option value={key}
                                                      style={{height:"40px",textAlign:"center"}}
                                                      defaultChecked = {true}
                                        >
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
                    </>)}
                    {current === 1 && (<>
                        <div style={{marginTop:"10px",display:"flex",flexDirection:"column",gap:"30px"}}>
                            <label>Present Address</label>
                            <Form.Item label={"House number"}
                                       name={"houseNumber"}
                                       required={true}
                                       rules={[
                                           {
                                               required: true,
                                               message: "Please enter House Number",
                                           },
                                           () => ({
                                               validator(_, value) {
                                                   if (!value) {
                                                       return Promise.reject();
                                                   }
                                                   if (isNaN(value)) {
                                                       return Promise.reject("House Number should be number.");
                                                   }
                                                   return Promise.resolve();
                                               },
                                           }),
                                       ]}
                            >
                                <Input required={true}/>
                            </Form.Item>
                            <Form.Item label={"Street address"}
                                       name={"streetAddress"}
                                       required={true}
                                       rules={[{
                                           required:true,
                                           message:"please fill your Street Address"
                                       }]}
                            >
                                <Input required={true}/>
                            </Form.Item>
                            <Form.Item label={"City"}
                                       name={"city"}
                                       required={true}
                                       rules={[
                                           {
                                               required: true,
                                               message: "Please enter City",
                                           },
                                           () => ({
                                               validator(_, value) {
                                                   if (!value) {
                                                       return Promise.reject();
                                                   }
                                                   if (!isNaN(value)) {
                                                       return Promise.reject("City should be text.");
                                                   }
                                                   return Promise.resolve();
                                               },
                                           }),
                                       ]}
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
                                           () => ({
                                               validator(_, value) {
                                                   if (!value) {
                                                       return Promise.reject();
                                                   }
                                                   if (!isNaN(value)) {
                                                       return Promise.reject("State should be text.");
                                                   }
                                                   return Promise.resolve();
                                               },
                                           }),
                                       ]}

                            >
                                <Input required={true}/>
                            </Form.Item>
                            <Form.Item label={"Postcode"}
                                       name={"postcode"}
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
                                                   if (value.length < 5) {
                                                       return Promise.reject("Post code can't be less than 5 digits");
                                                   }
                                                   if (value.length > 5) {
                                                       return Promise.reject("Post code can't be more than 5 digits");
                                                   }
                                                   return Promise.resolve();
                                               },
                                           }),
                                       ]}
                            >
                                <Input required={true}/>
                            </Form.Item>
                        </div>
                    </>)}
                    {current === 2 && (<>
                        <div style={{marginTop:"10px",display:"flex",flexDirection:"column",gap:"30px"}}>
                            <label>Personal Contact</label>
                            <Form.Item label={"Status"}
                                       required={true}
                                       name={"status"}
                                       rules={[{
                                           required:true,
                                           message:"select your status"
                                       }]}
                            >

                                <Select style={{height:"40px"}} defaultValue={Object.keys(Status)[0]}>
                                {(Object.keys(Status) as Array<keyof typeof Status>).map((key) =>
                                    <Select.Option value={key}
                                                   style={{height:"40px",textAlign:"center"}}
                                    >
                                        {Status[key]}
                                    </Select.Option>
                                )}
                                </Select>
                            </Form.Item>
                            <Form.Item label={"Personal Mail"}
                                       name={"personalEmail"}
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
                                       name={"companyEmail"}
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
                            >
                                <DatePicker style={{width:"100%"}} format={"YYYY-MM-DD"}/>

                            </Form.Item>
                        </div>
                    </>)}
                    {current === 3 && (<>
                        <div style={{marginTop:"10px",display:"flex",flexDirection:"column",gap:"30px"}} className={"Experience employee-create-inputs"}>
                            <label className={"Experience_detail"}>Fill the Experience Detail here</label>
                            <Form.Item label={"Company Name"}
                                       name={"companyName"}
                                       required={true}
                                       rules={[{
                                           required:true,
                                           message:"select your company name"
                                       }]}
                            >
                                <Input required={true}/>
                            </Form.Item>
                            <Form.Item label={"Designation"}
                                       name={"designation"}
                                       required={true}
                                       rules={[{
                                           required:true,
                                           message:"select your designation"
                                       }]}
                            >
                                <Select>
                                    {(Object.keys(Designation) as Array<keyof typeof Designation>).map((key) =>
                                        <Select.Option value={key}
                                                       style={{height:"40px",textAlign:"center"}}
                                        >
                                            {Designation[key]}
                                        </Select.Option>
                                    )}
                                </Select>
                            </Form.Item>
                            <Form.Item label="Type"
                                       name={"type"}
                                       rules={[{
                                           required:true,
                                           message:"select your type"
                                       }]}
                            >
                                <Select style={{width:"100%"}}>
                                    {(Object.keys(Type_Time) as Array<keyof typeof Type_Time>).map((key) =>
                                        <Select.Option value={key}
                                                       style={{height:"40px",textAlign:"center"}}
                                        >
                                            {Type_Time[key]}
                                        </Select.Option>
                                    )}
                                </Select>
                            </Form.Item>
                            <Form.Item label={"Total experience"}
                                       name={"experience"}
                                       required={true}
                                       rules={[{
                                           required:true,
                                           message:"select your experience"
                                       }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item label={"Skills"} name={"skills"} required={true}>
                                <Input />
                            </Form.Item>
                            <Form.Item label={"Total CTC"} name={"CTC"} required={true}>
                                <Input />
                            </Form.Item>
                            <Form.Item label={"Reason for Leaving"} name={"reason"} required={true}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="experiencePicker" label="start to end" required={true}>
                                <RangePicker style={{width:"100%"}}/>
                            </Form.Item>
                        </div>
                    </>)}
                    {current === 4 && (<>
                        <div style={{display:"flex",flexDirection:"column",marginTop:"35px",gap:"30px"}}>
                            <Form.Item label={"Relation Detail"} name={"relationDetail"} required={true}>
                                <Select style={{ height: "40px" }}>
                                    <Select.Option value="Father">Father</Select.Option>
                                    <Select.Option value="Mother">Mother</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item name={"relationfirstName"}
                                       label={"First Name"}
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

                            <Form.Item name={"relationmiddleName"} label={"Middle Name"}>
                                <Input required={true} style={{height:"40px"}}/>
                            </Form.Item>

                            <Form.Item name={"relationlastName"} label={"Last Name"} rules={[
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
                            ]}>
                                <Input required={true} style={{height:"40px"}}/>
                            </Form.Item>

                            <Form.Item label={"Gender"} name={"relationGender"}>
                                <Radio.Group style={{display:"flex"}} defaultValue={Object.keys(Gender)[0]}>
                                    {(Object.keys(Gender) as Array<keyof typeof Gender>).map((key) =>
                                        <Radio.Button value={key}
                                                      style={{height:"40px",textAlign:"center"}}
                                                      defaultChecked = {true}
                                        >
                                            {Gender[key]}
                                        </Radio.Button>

                                    )}

                                </Radio.Group>
                            </Form.Item>
                            <Form.Item label={"Contact Number"} name={"relationContact"} required={true}
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
                                <Input prefix={+91} required={true} style={{width:"100%"}}/>
                            </Form.Item>

                        </div>
                    </>)}
                    {current === 5 && (<>
                        <div style={{display:"flex",flexDirection:"column",marginTop:"35px",gap:"30px"}} className={"employee-create-inputs"}>
                            <Form.Item name={"accountholderName"} label={"Account Holder Name"} rules={[

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
                    </>)}
                    {current===6 && (<>
                        <div style={{display:"flex",flexDirection:"column",marginTop:"35px",gap:"30px"}}>
                            {(Object.keys(Documents) as Array<keyof typeof Documents>).map((key) =>
                                <Form.Item name={key} label={Documents[key]}>
                                    <Upload {...fileProps} customRequest={customRequest} maxCount={1}>
                                        <Button icon={<UploadOutlined />}>Upload</Button>
                                    </Upload>
                                </Form.Item>

                            )}
                        </div>
                    </>)}
                    {current===6 && (<>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </>)}
                </Form>


            </div>
        </div>
    )
}

export default FormComponent;