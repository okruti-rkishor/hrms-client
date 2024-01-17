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
import {Designation, Gender, Type_Time, Status,Blood_Group} from "../../../src/constant/constant";
import { Tabs } from 'antd';
import type { TabsProps,UploadProps } from 'antd';


const FormComponent = () =>{
    const [current, setCurrent] = useState(0);
    const { RangePicker } = DatePicker;
    const [form] = Form.useForm();
    const [employeeData,setEmployeeData]=useState<any>({"title":"Mr"});

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

    const onChange = (value: any) => {
        console.log(steps[current].fields,current);
        // setCurrent(value);
        console.log(steps[current]);
         form.validateFields(steps[current].fields).then((result)=>{
             console.log(result,value);
             setCurrent(value);
         }).catch((error)=>{
             console.log("error",error,value);

         });
    };

    const onFinish = async (value:object) =>{
        console.log("1111",employeeData);
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
            "bloodGroup":"O-",
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
                    "mobileNumber": employeeData.relationGender
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


    const items = steps.map((item) => ({ key: item.title, title: item.title }));
    const fileProps: UploadProps = {
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
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

    const normFile = (e: any) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };
    const onChangeTabs =(key:string) =>{
        console.log(key);
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
                          setEmployeeData({...employeeData,...e});
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
                                {/*<Select style={{height:"40px"}} defaultValue={Gender.MALE}>*/}
                                {/*    <Select.Option value={Gender.MALE}>Male</Select.Option>*/}
                                {/*    <Select.Option value={Gender.FEMALE}>Female</Select.Option>*/}
                                {/*</Select>*/}
                                <Radio.Group style={{display:"flex"}} defaultValue={Gender.MALE}>
                                    <Radio.Button value={Gender.MALE} style={{height:"40px",textAlign:"center"}}>Male</Radio.Button>
                                    <Radio.Button value={Gender.FEMALE} style={{height:"40px",textAlign:"center"}}>Female</Radio.Button>

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
                                       name={"BG"}>
                                <Select style={{height:"40px"}} defaultValue={Blood_Group.AB_POSITIVE}>
                                    <Select.Option value={"AB_POSITIVE"}>{Blood_Group.AB_POSITIVE}</Select.Option>
                                    <Select.Option value={"AB_NEGATIVE"}>{Blood_Group.AB_NEGATIVE}</Select.Option>
                                    <Select.Option value={"A_POSITIVE"}>{Blood_Group.A_POSITIVE}</Select.Option>
                                    <Select.Option value={"A_NEGATIVE"}>{Blood_Group.A_NEGATIVE}</Select.Option>
                                    <Select.Option value={"B_POSITIVE"}>{Blood_Group.B_POSITIVE}</Select.Option>
                                    <Select.Option value={"B_NEGATIVE"}>{Blood_Group.B_NEGATIVE}</Select.Option>
                                    <Select.Option value={"O_POSITIVE"}>{Blood_Group.O_NEGATIVE}</Select.Option>
                                    <Select.Option value={"O_NEGATIVE"}>{Blood_Group.O_POSITIVE}</Select.Option>
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
                                <Select style={{height:"40px"}} defaultValue={Status.Active}>
                                    <Select.Option value="Active">{Status.Active}</Select.Option>
                                    <Select.Option value="InActive">{Status.InActive}</Select.Option>
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
                                    <Select.Option value={"JUNIOR_SOFTWARE_ENGINEER"}>
                                        {Designation.JUNIOR_SOFTWARE_ENGINEER}
                                    </Select.Option>
                                    <Select.Option value={"TRAINEE"}>
                                        {Designation.TRAINEE}
                                    </Select.Option>
                                    <Select.Option value={"JUNIOR_SOFTWARE_ENGINEER"}>
                                        {Designation.JUNIOR_SOFTWARE_ENGINEER}
                                    </Select.Option>
                                    <Select.Option value={"SENIOR_SOFTWARE_ENGINEER"}>
                                        {Designation.SENIOR_SOFTWARE_ENGINEER}
                                    </Select.Option>
                                    <Select.Option value={"TECHNICAL_LEAD"}>
                                        {Designation.TECHNICAL_LEAD}
                                    </Select.Option>
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
                                    <Select.Option value={Type_Time.PARTTIME}>intern</Select.Option>
                                    <Select.Option value={Type_Time.HYBRID}>part time</Select.Option>
                                    <Select.Option value={Type_Time.FULLTIME}>full time</Select.Option>
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
                                <Select style={{height:"40px"}}>
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
                                <Radio.Group style={{display:"flex"}} defaultValue={Gender.MALE}>
                                    <Radio.Button value={Gender.MALE} style={{height:"40px",textAlign:"center"}}>Male</Radio.Button>
                                    <Radio.Button value={Gender.FEMALE} style={{height:"40px",textAlign:"center"}}>Female</Radio.Button>

                                </Radio.Group>
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


                            {/*<Form.Item label={"Document"}>*/}
                            {/*    /!*<Tabs*!/*/}
                            {/*    /!*    defaultActiveKey="1"*!/*/}
                            {/*    /!*    items={itemsTabs}*!/*/}
                            {/*    /!*    onChange={onChangeTabs}*!/*/}
                            {/*    /!*    // indicator={{ size: (origin) => origin - 20, align: alignValue }}*!/*/}
                            {/*    /!*>*!/*/}


                            {/*    /!*</Tabs>*!/*/}
                            {/*</Form.Item>*/}
                        </div>
                    </>)}
                    {current===6 && (<>
                    <div style={{display:"flex",flexDirection:"column",marginTop:"35px",gap:"30px"}}>
                        <Form.Item name={"10th"} label={"10th"}>
                            <Upload {...fileProps}>
                                <Button icon={<UploadOutlined />}>Upload</Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item name={"12th"} label={"12th"}>
                            <Upload {...fileProps}>
                                <Button icon={<UploadOutlined />}>Upload</Button>
                            </Upload>
                        </Form.Item>
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