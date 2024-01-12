import React, {useRef, useState} from "react";
import {Input,Form,Select,Button,Radio,DatePicker,InputNumber,Row,Col,Cascader,Checkbox,Upload} from "antd";
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import {Simulate} from "react-dom/test-utils";
import submit = Simulate.submit;
import '../form/formComponent.scss';
import { Steps } from 'antd';
import restApi from "../../services/http/api/index";
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import {Designation, Gender, Type_Time, Status,Blood_Group} from "../../../src/constant/constant";


const FormComponent = () =>{
    const [current, setCurrent] = useState(0);
    const { RangePicker } = DatePicker;
    const [form] = Form.useForm();
    const [employeeData,setEmployeeData]=useState<any>({});



    const payload={
        "status": employeeData.status,
        "employeeCode": "ok12375",
        "designation": employeeData.designation,
        "joiningDate": employeeData.DOB,
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
        "dateOfBirth": "2023-09-10",
        "age": "20",
        "qualification":"BTech",
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
                    "startDate": "2023-09-10",
                    "endDate": "2023-09-20"
                },
                "totalExperience": employeeData.experience,
                "annualCTC": employeeData.CTC,
                "skills": [
                    employeeData.skills,
                    employeeData.skills,
                    employeeData.skills
                ],
                "reasonForLeaving": "Nothing"
            }
        ],
        "familyDetails": [
            {
                "name": employeeData.relationfirstName+employeeData.relationmiddleName+employeeData.relationlastName,
                "gender": employeeData.gender,
                "relationType": employeeData.relationDetail,
                "mobileNumber": employeeData.contact
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
            content: 'Last-content',
        },
    ];

    const onChange = (value: any) => {
        console.log(steps[current].fields,current);
         form.validateFields(steps[current].fields).then((result)=>{
             console.log(result,value);
             setCurrent(value);
         }).catch((error)=>{
             console.log("error",error,value);

         });

    };

    const onFinish = async (value:object) =>{
        console.log("1111",employeeData);
        console.log(payload);
        const response = await restApi.employeeCreate(payload);
        console.log(response);
    }

    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    const normFile = (e: any) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };


    return (
        <div className={"parent"}>
            <div style={{display:"flex",justifyContent:"space-around"}}>
        <Form onFinish={onFinish} style={{width:"50%"}} onValuesChange={(e)=>{
            setEmployeeData({...employeeData,...e});
        }} form={form}>
            {current === 0 && (<>
                <div style={{display:"flex",flexDirection:"column",marginTop:"35px",gap:"30px"}}>

                    <Form.Item label={"Title"} name={"title"} required={true} rules={[
                        {
                            required: true,
                            message: 'Please select your title!',
                        },
                    ]}>
                        <Select style={{height:"40px"}}>
                            <Select.Option value="">Mr</Select.Option>
                            <Select.Option value="Mrs">Mrs</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name={"firstName"} label={"First Name"} rules={[
                        {
                            required: true,
                            message: 'Please fill your name!',
                        },
                    ]}>
                        <Input required={true} style={{height:"40px"}}/>
                    </Form.Item>

                    <Form.Item name={"middleName"} label={"Middle Name"} >
                            <Input required={true} style={{height:"40px"}}/>
                        </Form.Item>

                    <Form.Item name={"lastName"} label={"Last Name"} rules={[
                        {
                            required: true,
                            message: 'Please fill your name!',
                        },
                    ]}>
                            <Input required={true} style={{height:"40px"}}/>
                        </Form.Item>

                    <Form.Item label={"Gender"} required={true} name={"gender"} rules={[
                        {
                            required: true,
                            message: 'Please select your gender!',
                        },
                    ]}>
                            <Select style={{height:"40px"}}>
                                <Select.Option value={Gender.MALE}>Male</Select.Option>
                                <Select.Option value={Gender.FEMALE}>Female</Select.Option>
                            </Select>
                        </Form.Item>

                    <Form.Item label="Date of Birth" name={"DOB"} rules={[
                        {
                            required: true,
                            message: 'Please fill your DOB!',
                        },
                    ]}>
                        <DatePicker style={{width:"100%"}}/>
                    </Form.Item>

                    <Form.Item label="Blood Group" name={"BG"}>
                        <Select style={{height:"40px"}}>
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

                </div>
            </>)}
            {current === 1 && (<>
                <div style={{marginTop:"10px",display:"flex",flexDirection:"column",gap:"30px"}}>
                    <label>Present Address</label>

                    <Form.Item label={"House number"} name={"houseNumber"} required={true} rules={[
                        {
                            required:true,
                            message:"please fill your House Number"
                        }

                    ]}>
                                <Input required={true}/>
                            </Form.Item>

                    <Form.Item label={"Street address"} name={"streetAddress"} required={true} rules={[
                        {
                            required:true,
                            message:"please fill your Street Address"
                        }

                    ]}>
                                <Input required={true}/>
                            </Form.Item>

                    <Form.Item label={"City"} name={"city"} required={true} rules={[
                        {
                            required:true,
                            message:"please fill your your city"
                        }

                    ]}>
                                <Input required={true}/>
                            </Form.Item>

                    <Form.Item label={"State"} name={"state"} required={true} rules={[
                        {
                            required:true,
                            message:"please fill your state"
                        }

                    ]}>
                        <Input required={true}/>
                    </Form.Item>

                    <Form.Item label={"Postcode"} name={"postcode"} required={true} rules={[
                        {
                            required:true,
                            message:"please fill your postcode"
                        }

                    ]}>
                                <Input required={true}/>
                            </Form.Item>
                </div>

            </>)}
            {current === 2 && (<>
                <div style={{marginTop:"10px",display:"flex",flexDirection:"column",gap:"30px"}}>
                    <label>Personal Contact</label>

                    <Form.Item label={"Status"} required={true} name={"status"} rules={[{
                        required:true,
                        message:"select your status"
                    }]}>
                        <Select style={{height:"40px"}}>
                            <Select.Option value="Active">{Status.Active}</Select.Option>
                            <Select.Option value="InActive">{Status.InActive}</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label={"Personal Mail"} name={"personalEmail"} required={true}  rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}>
                        <Input required={true}/>
                    </Form.Item>

                    <Form.Item label={"Company Mail"} name={"companyEmail"} required={true}  rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}>
                        <Input required={true}/>
                    </Form.Item>

                    <Form.Item label={"Contact Number"} name={"contact"} required={true}  rules={[{ required: true, message: 'Please input your phone number!'},{
                        max: 10,
                        message: "Value should be less than 10 character",
                    },]}>
                        <Input prefix={"+91"} style={{ width: '100%' }} required={true}/>
                    </Form.Item>


                </div>
            </>)}
            {current === 3 && (<>
                <div style={{marginTop:"10px",display:"flex",flexDirection:"column",gap:"30px"}} className={"Experience"}>
                    <label className={"Experience_detail"}>Fill the Experience Detail here</label>

                    <Form.Item label={"Company Name"} name={"companyName"} required={true} rules={[{
                        required:true,
                        message:"select your company name"
                    }]}>
                        <Input required={true}/>
                    </Form.Item>

                    <Form.Item label={"Designation"} name={"designation"} required={true} rules={[{
                        required:true,
                        message:"select your designation"
                    }]}>
                        <Select>
                            <Select.Option value={"JUNIOR_SOFTWARE_ENGINEER"}>{Designation.JUNIOR_SOFTWARE_ENGINEER}</Select.Option>
                            <Select.Option value={"TRAINEE"}>{Designation.TRAINEE}</Select.Option>
                            <Select.Option value={"JUNIOR_SOFTWARE_ENGINEER"}>{Designation.JUNIOR_SOFTWARE_ENGINEER}</Select.Option>
                            <Select.Option value={"SENIOR_SOFTWARE_ENGINEER"}>{Designation.SENIOR_SOFTWARE_ENGINEER}</Select.Option>
                            <Select.Option value={"TECHNICAL_LEAD"}>{Designation.TECHNICAL_LEAD}</Select.Option>

                        </Select>
                    </Form.Item>

                    <Form.Item label="Type" name={"type"} rules={[{
                        required:true,
                        message:"select your type"
                    }]}>
                        <Select style={{width:"100%"}}>
                            <Select.Option value={Type_Time.PARTTIME}>intern</Select.Option>
                            <Select.Option value={Type_Time.HYBRID}>part time</Select.Option>
                            <Select.Option value={Type_Time.FULLTIME}>full time</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label={"Total experience"} name={"experience"} required={true} rules={[{
                        required:true,
                        message:"select your experience"
                    }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label={"Skills"} name={"skills"} required={true}>
                        <Input />
                    </Form.Item>

                    <Form.Item label={"Total CTC"} name={"CTC"} required={true}>
                        <Input />
                    </Form.Item>

                    <Form.Item label={"Reason"} name={"Reason"} required={true}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="startendDate" label="start to end" >
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

                    <Form.Item name={"relationfirstName"} label={"First Name"} rules={[
                        {
                            type:"string",
                            message: 'Please fill only in characters',
                        },
                    ]}>
                        <Input required={true} style={{height:"40px"}}/>
                    </Form.Item>

                    <Form.Item name={"relationmiddleName"} label={"Middle Name"}>
                        <Input required={true} style={{height:"40px"}}/>
                    </Form.Item>

                    <Form.Item name={"relationlastName"} label={"Last Name"}>
                        <Input required={true} style={{height:"40px"}}/>
                    </Form.Item>

                    <Form.Item label={"Gender"} required={true}>
                        <Select style={{height:"40px"}}>
                            <Select.Option value={'MALE'}>{Gender.MALE}</Select.Option>
                            <Select.Option value={'FEMALE'}>{Gender.FEMALE}</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="Date of Birth" name={"dateofBirth"}>
                        <DatePicker style={{width:"100%"}} format={"YYYY-MM-DD"}/>
                    </Form.Item>

                </div>
            </>)}
            {current === 5 && (<>
                <div style={{display:"flex",flexDirection:"column",marginTop:"35px",gap:"30px"}}>

                    <Form.Item name={"accountholderName"} label={"Account Holder Name"}>
                        <Input required={true} style={{height:"40px"}}/>
                    </Form.Item>

                    <Form.Item name={"accountNumber"} label={"Account Number"}>
                        <Input required={true} style={{height:"40px"}}/>
                    </Form.Item>

                    <Form.Item name={"branchName"} label={"Branch Name"}>
                        <Input required={true} style={{height:"40px"}}/>
                    </Form.Item>

                    <Form.Item name={"ifscCode"} label={"IFSC Code"}>
                        <Input required={true} style={{height:"40px"}}/>
                    </Form.Item>

                    <Form.Item label="Document">
                        <Form.Item name="document" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                            <Upload.Dragger name="files" action="/upload.do">
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                            </Upload.Dragger>
                        </Form.Item>
                    </Form.Item>
                </div>
            </>)}
            {current===5 && (<>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
                </>)}
        </Form>
            <Steps current={current} items={items} direction="vertical" onChange={onChange} style={{width:"16%",marginTop: "35px"}}/>

            </div>












        </div>



    )


}
export default FormComponent;