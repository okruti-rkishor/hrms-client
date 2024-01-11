import React, {useRef, useState} from "react";
import {Input,Form,Select,Button,Radio,DatePicker,InputNumber,Row,Col,Cascader,Checkbox,Upload} from "antd";
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import {Simulate} from "react-dom/test-utils";
import submit = Simulate.submit;
import '../form/formComponent.scss';
import { Steps } from 'antd';
import restApi from "../../services/http/api/index";


const FormComponent = () =>{
    const [current, setCurrent] = useState(0);
    const { RangePicker } = DatePicker;
    const [form] = Form.useForm();
    const [employeeData,setEmployeeData]=useState<any>({});

    const payload={
        "status": employeeData.status,
        "employeeCode": "ok12375",
        "designation": employeeData.designation,
        "joiningDate": "10-9-2023",
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
        "dateOfBirth": "20-09-2023",
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
                    "startDate": "10-9-23",
                    "endDate": "10-9-2023"
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
        ],
        "documents": [
            {
                "id":"89ff94c1-5bcb-483a-bc4b-9a590e5c67de"
            }
        ]
    };

    const steps = [
        {
            title: 'Personal Details',
            content: 'First-content',
        },
        {
            title: 'Address',
            content: 'Second-content',
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
    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const onChange = (value: any) => {
        console.log(form.validateFields());

        console.log('onChange:', value);
        setCurrent(value);
    };

    const onFinish = async (value:object) =>{
        console.log("1111",employeeData);
        console.log(payload);
        const response = await restApi.employeeCreate(payload);
        console.log(response);
    }

    const items = steps.map((item) => ({ key: item.title, title: item.title }));


    return (
        <div className={"parent"}>
            <div style={{display:"flex",justifyContent:"space-around"}}>
        <Form onFinish={onFinish} style={{width:"50%"}} onValuesChange={(e)=>{
            setEmployeeData({...employeeData,...e});
            console.log("1111",employeeData);
        }} form={form}>
            {current === 0 && (<>
                <div style={{display:"flex",flexDirection:"column",marginTop:"35px",gap:"30px"}}>

                    <Form.Item label={"Title"} name={"title"} required={true}>
                        <Select style={{height:"40px"}}>
                            <Select.Option value="Mr">Mr</Select.Option>
                            <Select.Option value="Mrs">Mrs</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name={"firstName"} label={"First Name"}>
                        <Input required={true} style={{height:"40px"}}/>
                    </Form.Item>

                    <Form.Item name={"middleName"} label={"Middle Name"}>
                            <Input required={true} style={{height:"40px"}}/>
                        </Form.Item>

                    <Form.Item name={"lastName"} label={"Last Name"}>
                            <Input required={true} style={{height:"40px"}}/>
                        </Form.Item>

                    <Form.Item label={"Gender"} required={true} name={"gender"}>
                            <Select style={{height:"40px"}}>
                                <Select.Option value="Male">Male</Select.Option>
                                <Select.Option value="Female">Female</Select.Option>
                                <Select.Option value="Other">Other</Select.Option>
                            </Select>
                        </Form.Item>

                    <Form.Item label="Date of Birth" name={"DOB"}>
                        <DatePicker style={{width:"100%"}}/>
                    </Form.Item>

                </div>
            </>)}
            {current === 1 && (<>
                <div style={{marginTop:"10px",display:"flex",flexDirection:"column",gap:"30px"}}>
                    <label>Present Address</label>

                    <Form.Item label={"House number"} name={"houseNumber"} required={true} >
                                <Input required={true}/>
                            </Form.Item>

                    <Form.Item label={"Street address"} name={"streetAddress"} required={true} >
                                <Input required={true}/>
                            </Form.Item>

                    <Form.Item label={"City"} name={"city"} required={true} >
                                <Input required={true}/>
                            </Form.Item>

                    <Form.Item label={"State"} name={"state"} required={true} >
                        <Input required={true}/>
                    </Form.Item>

                    <Form.Item label={"Postcode"} name={"postcode"} required={true} >
                                <Input required={true}/>
                            </Form.Item>
                </div>

            </>)}
            {current === 2 && (<>
                <div style={{marginTop:"10px",display:"flex",flexDirection:"column",gap:"30px"}}>
                    <label>Personal Contact</label>

                    <Form.Item label={"Status"} required={true} name={"status"}>
                        <Select style={{height:"40px"}}>
                            <Select.Option value="Active">Active</Select.Option>
                            <Select.Option value="Not Active">Not Active</Select.Option>
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

                    <Form.Item label={"Contact Number"} name={"contact"} required={true}  rules={[{ required: true, message: 'Please input your phone number!' }]}>
                        <Input prefix={"+91"} style={{ width: '100%' }} required={true}/>
                    </Form.Item>


                </div>
            </>)}
            {current === 3 && (<>
                <div style={{marginTop:"10px",display:"flex",flexDirection:"column",gap:"30px"}} className={"Experience"}>
                    <label className={"Experience_detail"}>Fill the Experience Detail here</label>

                    <Form.Item label={"Company Name"} name={"companyName"} required={true}>
                        <Input required={true}/>
                    </Form.Item>

                    <Form.Item label={"Designation"} name={"designation"} required={true}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Type" name={"type"}>
                        <Select style={{width:"100%"}}>
                            <Select.Option value="intern">intern</Select.Option>
                            <Select.Option value="part time">part time</Select.Option>
                            <Select.Option value="full time">full time</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label={"Total experience"} name={"experience"} required={true}>
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

                    <Form.Item name={"relationfirstName"} label={"First Name"}>
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
                            <Select.Option value="Male">Male</Select.Option>
                            <Select.Option value="Female">Female</Select.Option>
                            <Select.Option value="Other">Other</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="Date of Birth" name={"dateofBirth"}>
                        <DatePicker style={{width:"100%"}}/>
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

                    {/*<Form.Item*/}
                    {/*    name="upload"*/}
                    {/*    label="Upload"*/}
                    {/*    valuePropName="fileList"*/}
                    {/*    // getValueFromEvent={normFile}*/}
                    {/*    // extra="longgggggggggggggggggggggggggggggggggg"*/}
                    {/*>*/}
                    {/*    <Upload name="logo" action="/upload.do" listType="picture">*/}
                    {/*        <Button icon={<UploadOutlined />}>Click to upload</Button>*/}
                    {/*    </Upload>*/}
                    {/*</Form.Item>*/}



                </div>
            </>)}

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>




        </Form>
            <Steps current={current} items={items} direction="vertical" onChange={onChange} style={{width:"16%",marginTop: "35px"}}/>

            </div>












        </div>



    )


}
export default FormComponent;