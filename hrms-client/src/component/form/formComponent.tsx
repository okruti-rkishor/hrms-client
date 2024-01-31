import React, {useEffect, useRef, useState,} from "react";
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
import {useParams} from "react-router-dom";
import dayjs from 'dayjs'


const FormComponent = () =>{
    const [current, setCurrent] = useState(0);
    const { RangePicker } = DatePicker;
    const [form] = Form.useForm();
    const [employeeData,setEmployeeData]=useState<any>({title:"Mr",blood_group:"NONE",gender:"MALE",status:"ACTIVE",
        familyDetails:[{gender:"MALE"}]});
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
            content: 'Fifth-content',
        },
        {
            title: 'Document',
            content: 'Last-content',
        },
    ];
    const [document,setDocument]=useState<any>({});
    const [fileUpload,setFileUpload]=useState<any>([]);
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const onChange = (value: any) => {
        setCurrent(value);
        form.validateFields().then((result)=>{
            setCurrent(value);
        }).catch((error)=>{
            console.log("error",error,value);
        });

    };
    const onFinish = async (value:object) =>{
        const payload={
            "status": employeeData.status,
            "employeeCode": "ok12371",
            "designation": employeeData.designation,
            "joiningDate": employeeData.joiningDate,
            "exitDate": null,
            "officialEmail": employeeData.officialEmail,
            "totalExperience": employeeData.totalExperience,
            "type": employeeData.type,
            "name": {
                "title": employeeData.title,
                "firstName": employeeData.firstName,
                "middleName": employeeData.middleName,
                "lastName": employeeData.lastName
            },
            "gender": employeeData.gender,
            "dateOfBirth": employeeData.dateOfBirth,
            "age": employeeData.age,
            "qualification":employeeData.qualification,
            "email": employeeData.email,
            "contact": employeeData.contact,
            "bloodGroup":employeeData.bloodGroup,
            "presentAddress": {
                "line1": employeeData.line1,
                "line2": employeeData.line2,
                "city": employeeData.city,
                "state": employeeData.state,
                "zipCode": employeeData.zipCode
            },
            "permanentAddress": {
                "line1": employeeData.line1,
                "line2": employeeData.line2,
                "city": employeeData.city,
                "state": employeeData.state,
                "zipCode": employeeData.zipCode
            },
            "previousExperiences": [
                {
                    "employerName": employeeData.employerName,
                    "designation": employeeData.designation,
                    "duration": {
                        "startDate": employeeData.duration[0],
                        "endDate":  employeeData.duration[1]
                    },
                    "totalExperience": employeeData.totalExperience,
                    "annualCTC": employeeData.annualCTC,
                    "skills": [
                        employeeData.skills,
                        employeeData.skills,
                        employeeData.skills
                    ],
                    "reasonForLeaving": employeeData.reasonForLeaving
                }
            ],
            "familyDetails": [
                {
                    "name": employeeData.relationfirstName+" "+employeeData.relationmiddleName+" "+employeeData.relationlastName,
                    "gender": employeeData.gender,
                    "relationType": employeeData.relationType,
                    "mobileNumber": employeeData.mobileNumber
                }
            ],
            "bankDetails": [
                {
                    "accountHolderName": employeeData.accountHolderName,
                    "accountNumber": employeeData.accountNumber,
                    "branchName": employeeData.branchName,
                    "branchCode": employeeData.ifscCode,
                    "ifscCode": employeeData.ifscCode
                }
            ],
            "documents": fileUpload
        };
        const response = await restApi.employeeCreate(payload);
    }
    let {id}=useParams();


    const items = steps.map((item) => ({ key: item.title, title: item.title }));
    const fileProps: UploadProps = {
        onChange(info) {
            //console.log(info);
            if (info.file.status !== 'uploading') {
                //console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }

        },
    };


    const customRequest = async ({ file, onSuccess, onError}:any)=> {
        let documentstype=Object.keys(document);
        let documentKey = Object.keys(document);
        let documentPayload:any = {"document-type": documentKey.length===1?Object.keys(document)[0]:Object.keys(document)[1], "file": file};
        if(documentKey.length>1){
            documentPayload["document-number"] = Object.values(document)[0];
        }

        const response = await restApi.documentUpload(documentPayload).then((info)=>{
            onSuccess("done");
                setFileUpload([...fileUpload, {"id": info.id,"documentType":info.documentType}]);
                setButtonDisabled(true);
                setDocument({});

        }).catch((info)=>{
            onError("error")
        });
    }

    const onRemoveFile = async (key:any) => {
        console.log("key",key);
        let response=fileUpload.find((item:any)=>{
            if(item.documentType===key) {
                return item.id;
            }
            else return "";
        });
        console.log("response",response);
        if(response){
            await restApi.documentDelete(`${response.id}`).then((info)=>{
                const newValue= {...employeeData};
                delete newValue[key];
                setButtonDisabled(false);
                if(document.length>1)delete newValue[key+"number"];
                setEmployeeData(newValue);
                const newFile=[...fileUpload];
                newFile.splice(newFile.findIndex(fileResponse=>fileResponse.id===response.id),1);
                setFileUpload(newFile);



            }).catch((info)=>{
                console.log(info);
            });
        }
    }
    useEffect(()=>{
        if(id!=null){
            restApi.employeeDetailsByID(`${id}`).then((response)=> {
                    const { name,presentAddress,permanentAddress,...withoutKeyToBeRemoved  } = response;
                    const after = { ...name,...presentAddress,...permanentAddress,...response.bankDetails[0],...response.familyDetails[0],...response.previousExperiences[0],...withoutKeyToBeRemoved };
                    form.setFieldsValue({...after,dateOfBirth:dayjs(response.dateOfBirth),joiningDate:dayjs(response.joiningDate),duration:[dayjs(response.previousExperiences[0].duration.startDate),dayjs(response.previousExperiences[0].duration.endDate)]});
            }

            ).catch((error)=>console.log(error));
        }
        },[]);





    return (
        <div className='parent employee-create-section data-table'>
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
                          if(current>5){
                              setDocument({...document,...e});
                              const key=Object.keys(e)[0];
                              if(employeeData[key]){
                                  onRemoveFile(key)
                              }else{
                                  setEmployeeData({...employeeData,...e});
                              }
                          }else{
                              setEmployeeData({...employeeData,...e});
                          }
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
                                        <Radio.Button value={key} key={key}
                                                      style={{height:"40px",textAlign:"center"}}
                                                      defaultChecked = {true}
                                        >
                                            {Gender[key]}
                                        </Radio.Button>
                                    )}
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item label="Date of Birth"
                                       name={"dateOfBirth"}
                                       rules={[{
                                           required: true,
                                           message: 'Please fill your DOB!',
                                       },]}
                            >
                                <DatePicker style={{width:"100%"}} format="YYYY-MM-DD"/>
                            </Form.Item>
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
                        <div style={{marginTop:"10px",display:"flex",flexDirection:"column",gap:"30px"}} className={"employee-create-inputs"}>
                            <label>Present Address</label>
                            <Form.Item label={"House number"}
                                       name={"line1"}
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
                                       name={"line2"}
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
                            >
                                <DatePicker style={{width:"100%"}} format="YYYY-MM-DD"/>

                            </Form.Item>
                        </div>
                    </>)}
                    {current === 3 && (<>
                        <div style={{marginTop:"10px",display:"flex",flexDirection:"column",gap:"30px"}} className={"Experience employee-create-inputs"}>
                            <label className={"Experience_detail"}>Fill the Experience Detail here</label>
                            <Form.Item label={"Company Name"}
                                       name={"employerName"}
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
                                        <Select.Option value={key} key={key}
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
                                        <Select.Option value={key} key={key}
                                                       style={{height:"40px",textAlign:"center"}}
                                        >
                                            {Type_Time[key]}
                                        </Select.Option>
                                    )}
                                </Select>
                            </Form.Item>
                            <Form.Item label={"Total experience"}
                                       name={"totalExperience"}
                                       required={true}
                                       rules={[{
                                           required:true,
                                           message:"select your experience"
                                       },() => ({
                                           validator(_, value) {
                                               if (!value) {
                                                   return Promise.reject();
                                               }
                                               if (isNaN(value)) {
                                                   return Promise.reject("Experience has to be a number.");
                                               }
                                               if (value.length < 0) {
                                                   return Promise.reject("Experience can't be negative");
                                               }
                                               if (value.length > 45) {
                                                   return Promise.reject("Experience can't be more than 45 digits");
                                               }
                                               return Promise.resolve();
                                           },
                                       })]}

                            >
                                <Input />
                            </Form.Item>
                            <Form.Item label={"Skills"} name={"skills"} required={true}>
                                <Input />
                            </Form.Item>
                            <Form.Item label={"Total CTC"} name={"annualCTC"} required={true} rules={[
                                () => ({
                                validator(_, value) {
                                    if (!value) {
                                        return Promise.reject();
                                    }
                                    if (isNaN(value)) {
                                        return Promise.reject("CTC has to be a number.");
                                    }
                                    if (value.length < 0) {
                                        return Promise.reject("CTC can't be negative");
                                    }
                                    return Promise.resolve();
                                },
                            })]}>
                                <Input />
                            </Form.Item>
                            <Form.Item label={"Reason for Leaving"} name={"reasonForLeaving"} required={true}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="duration" label="start to end" required={true}>
                                <RangePicker style={{width:"100%"}}/>
                            </Form.Item>
                        </div>
                    </>)}
                    {current === 4 && (<>
                        <div style={{display:"flex",flexDirection:"column",marginTop:"35px",gap:"30px"}} className={"employee-create-inputs"}>
                            <Form.Item label={"Relation Detail"} name={"relationType"} required={true}>
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
                                        <Radio.Button value={key} key={key}
                                                      style={{height:"40px",textAlign:"center"}}
                                                      defaultChecked = {true}
                                        >
                                            {Gender[key]}
                                        </Radio.Button>

                                    )}

                                </Radio.Group>
                            </Form.Item>
                            <Form.Item label={"Contact Number"} name={"mobileNumber"} required={true}
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
                    </>)}
                    {current===6 && (<>
                        <div style={{display:"flex",flexDirection:"column",marginTop:"35px",gap:"30px"}} className={"employee-create-inputs"}>

                            {(Object.keys(Documents) as Array<keyof typeof Documents>).map((key) => {
                                return (key==="AADHAAR_CARD" || key==="PAN_CARD") ? <div className={"uploadDocument"} key={key}>
                                    <div>
                                    <label style={{textWrap:"nowrap"}}>{key} :</label>
                                    </div>
                                    <div className={"uploadDocument_withNumber"}>
                                        <Form.Item name={key} key={key}>
                                            <Upload {...fileProps} customRequest={customRequest} maxCount={1} key={key}>
                                                <Button icon={<UploadOutlined />} disabled={!!employeeData[key]}>Upload</Button>
                                            </Upload>
                                    </Form.Item>
                                    <Form.Item name={key+"number"} rules={[
                                        () => ({
                                                validator(_, value) {
                                                    if (isNaN(value)) {
                                                        return Promise.reject("number has to be a number.");
                                                    }
                                                    if(value<0){
                                                        return Promise.reject("number cannot be negative.");
                                                    }

                                                    if(value.length>12){
                                                        return Promise.reject("number cannot be greater than 12.");
                                                    }

                                                    if(value.length===12){
                                                        return Promise.resolve();
                                                    }else if(value.length<12){
                                                        return Promise.reject("number cannot be less than 12.");

                                                    }
                                                    return Promise.resolve();
                                                },
                                            }
                                        ),
                                    ]} key={key}>
                                        <Input style={{height:"32px",maxWidth:"150px"}} disabled={isButtonDisabled && !!(employeeData[key])} key={key}/>
                                    </Form.Item>
                                    </div>

                                            </div>: <Form.Item name={key} label={Documents[key]}>
                                    <Upload {...fileProps} customRequest={customRequest} maxCount={1} >
                                                <Button icon={<UploadOutlined />} disabled={!!(employeeData[key])}>Upload</Button>
                                            </Upload>
                                    </Form.Item>
                                        }
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