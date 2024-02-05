import React, {useEffect, useState,} from "react";
import {
    Form,
    Button, message,

} from "antd";
import '../form/formComponent.scss';
import { Steps } from 'antd';
import restApi from "../../services/http/api/index";
import {useParams} from "react-router-dom";
import dayjs from 'dayjs'
import PersonalDetails from "./steps/personalDetails";
import Address from "./steps/address";
import Contact from "./steps/contact";
import FamilyDetail from "./steps/familyDetail";
import BankingDeatils from "./steps/bakingDetails";
import Document from "./steps/document";
import Experience from "./steps/experience";
import {Gender} from "../../constant/constant";




const FormComponent = () =>{
    const [current, setCurrent] = useState(0);
    const [form] = Form.useForm();
    const [employeeData,setEmployeeData]=useState<any>({gender:Object.keys(Gender)[0],title:"Mr",bloodGroup:"NONE",status:"ACTIVE",documents:{}});
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
    const [isEditing,setIsEditing]=useState<any>(false);
    let {id}=useParams();

    const randomIdGenerator = () => {
        return "ok"+Math.random().toString(36).slice(2);
    }



    const onChange = (value: any) => {
        setCurrent(value);
        form.validateFields().then((result)=>{
            setCurrent(value);
            console.log("result",result);
            console.log("employee",employeeData);
            if(current===4)setEmployeeData({...employeeData,familyDetails:result.familyDetails})
            if(current===3){
                const duration = result.previousExperiences.map((item:any)=>{
                    const duration = {
                        "startDate":item.duration[0],
                        "endDate":item.duration[1]
                    }
                    return duration;
                });
                setEmployeeData({...result,duration:duration})
                // console.log("updatedExperience",updatedExperience);



                setEmployeeData({...employeeData,previousExperiences:result.previousExperiences})
            }



        }).catch((error)=>{
            console.log("error",error,value);
        });

    };
    const onFinish = async (value:object) =>{
        console.log("eeeeee");
        const payload={
            "status": employeeData.status,
            "employeeCode": isEditing ? employeeData.employeeCode : randomIdGenerator(),
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
            "previousExperiences": employeeData.previousExperiences,
            "familyDetails": employeeData.familyDetails,
            "bankDetails": [
                {
                    "accountHolderName": employeeData.accountHolderName,
                    "accountNumber": employeeData.accountNumber,
                    "branchName": employeeData.branchName,
                    "branchCode": employeeData.ifscCode,
                    "ifscCode": employeeData.ifscCode
                }
            ],
            "documents": Object.keys(employeeData.documents).map((item:any)=>{return {id:employeeData.documents[item].id}})
        };
        if(isEditing===false){
            restApi.employeeCreate(payload).then((e)=>{message.success("data successfully inserted")}).catch(((e)=>{message.error("data not inserted")}));

        }else{
            restApi.postEmployeeDetailsByID(payload,id).then((e)=>message.success("data successfully inserted")).catch((e)=>message.error("data is not inserted"));
        }

        
    }



    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    useEffect(()=>{
        if(id!=null){
            restApi.employeeDetailsByID(`${id}`).then((response)=> {
                console.log(response);
                let docObj:any = {};
                response.documents.map((item:any)=>{
                    let customKey=item.documentType;
                    const newDocument:any = {
                        customKey:item.documentType,
                        file: item.originalFileName,
                        id:item.id
                    }
                    if(item.documentType==="AADHAAR_CARD" || item.documentType==="PAN_CARD"){
                        newDocument.documentNumber=item.documentNumber;
                    }
                    docObj[customKey]=newDocument;

                });
                console.log(docObj);
                    setEmployeeData({
                        ...employeeData,
                        documents: docObj

                    })
                    console.log(employeeData);
                    setIsEditing(true);

                    const { name,presentAddress,permanentAddress,...withoutKeyToBeRemoved  } = response;
                    const after = { ...name,...presentAddress,...permanentAddress,...response.bankDetails[0],...withoutKeyToBeRemoved };

                    form.setFieldsValue({...after,dateOfBirth:dayjs(response.dateOfBirth),joiningDate:dayjs(response.joiningDate),duration:[dayjs(response.previousExperiences[0].duration.startDate),dayjs(response.previousExperiences[0].duration.endDate)]});

                    // const beforeUpload=response.documents.map((item:any)=>{
                    //    return {
                    //        uuid:item.id,
                    //        name:item.fileName,
                    //        status:"done"
                    //    }
                    // });
                    // setDefaultFileList(beforeUpload);
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
                          if(current<=2){
                              setEmployeeData({...employeeData,...e})
                          }
                      }}
                      form={form}
                      className= 'employee-create-form'
                      initialValues={{ gender:Object.keys(Gender)[0],title:"Mr"}}
                >
                    {current === 0 && (<>
                        <PersonalDetails/>
                    </>)}
                    {current === 1 && (<>
                        <Address/>
                    </>)}
                    {current === 2 && (<>
                        <Contact/>
                    </>)}
                    {current === 3 && (<>
                        <Experience/>
                    </>)}
                    {current === 4 && (<>
                       <FamilyDetail/>
                    </>)}
                    {current === 5 && (<>
                        <BankingDeatils/>
                    </>)}
                    {current===6 && (<>
                        <Document employeeData={employeeData} setEmployeeData={setEmployeeData} isEditing={isEditing}/>
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