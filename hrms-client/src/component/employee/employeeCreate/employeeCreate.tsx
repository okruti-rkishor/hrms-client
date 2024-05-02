import React, {useEffect, useState,} from "react";
import {Form, Button, message, Steps, Divider, Layout} from "antd";
import '../../../styles/component/employeeCreate.scss';
import restApi from "../../../services/http/api/index";
import {useNavigate, useParams} from "react-router-dom";
import dayjs from 'dayjs'
import PersonalDetails from "../steps/personalDetails";
import Address from "../steps/address";
import Contact from "../steps/contact";
import FamilyDetail from "../steps/familyDetail";
import BankingDeatils from "../steps/bankingDetails";
import Document from "../steps/document";
import Experience from "../steps/experience";
import {Gender} from "../../../constant/constant";
import {PageHeader} from "@ant-design/pro-layout";
import PrevNext from "../prevNext";


const EmployeeCreate = () => {
    console.log("111111111111111111111111");
    const [current, setCurrent] = useState(0);
    const [form] = Form.useForm();
    const [employeeData, setEmployeeData] = useState<any>({
        gender: Object.keys(Gender)[0],
        status: "ACTIVE",
        title: "Mr",
        documents: {}
    });
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
    const [isEditing, setIsEditing] = useState<any>(false);
    const [age, setAge] = useState<any>(null);
    let {id} = useParams();
    const navigate = useNavigate();
    const [tempEnum, setTempEnum] = useState<any>({
        designationEnum: [],
        qualificationEnum: []
    });
    const [state, setState] = useState<any>([]);
    const [city, setCity] = useState<any>([]);

    const randomIdGenerator = () => {
        return "ok" + Math.random().toString(36).slice(2);
    }

    const convertExperienceToObject = (result: any) => {
        const duration = result.experiences.map((item: any) => {
            const duration = {
                "startDate": item.duration[0],
                "endDate": item.duration[1]
            }
            item.duration = duration;
            return duration;
        });
        for (let e = 0; e < result.experiences.length; e++) {
            result.experiences[e].duration = duration[e];
        }
    }

    const convertExperienceToArray = (response: any) => {
        let durationResponse = response.experiences.map((item: any) => {
            let duration = [];
            duration.push(dayjs(item.duration.startDate));
            duration.push(dayjs(item.duration.endDate));
            return duration;
        })
        for (let e = 0; e < response.experiences.length; e++) {
            response.experiences[e].duration = durationResponse[e];
        }
    }

    const onChange = (value: any) => {
        // setCurrent(value);
        form.validateFields().then((result: any) => {
            setCurrent(value);
            if (current === 0 && isEditing === false) localStorage.setItem('personalDetail', JSON.stringify(result));
            if (current === 1 && isEditing === false) localStorage.setItem('address', JSON.stringify(result));
            if (current === 2 && isEditing === false) localStorage.setItem('contact', JSON.stringify(result));
            if (current === 4) {
                if (isEditing === false) localStorage.setItem('familyDetails', JSON.stringify(result));
                setEmployeeData({...employeeData, familyDetails: result.familyDetails});
            }
            if (current === 3) {
                setEmployeeData({...employeeData, ...result})
                if (isEditing === false) localStorage.setItem('previousExperiences', JSON.stringify(result));
            }
            if (current === 5) {
                if (isEditing === false) localStorage.setItem('bankDetail', JSON.stringify(result));
                setEmployeeData({...employeeData, bankDetail: result.bankDetail});
            }
        }).catch((error: any) => {
            if (current > value) {
                setCurrent(value);
            }
        });
    };

    const onFinish = async (value: object) => {
        console.log(employeeData);
        const payload:any = {
            "employeeCode": isEditing ? employeeData.employeeCode : randomIdGenerator(),
            "designation": {
                "id":tempEnum.designationEnum.find((item:any)=> item.code===employeeData.designation).id,
                "code":employeeData.designation
            },
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
            "qualification": {
                "id":tempEnum.qualificationEnum.find((item:any)=> item.code===employeeData.qualification).id,
                "code": employeeData.qualification
            },
            "email": employeeData.email,
            "contact": employeeData.contact,
            "bloodGroup": employeeData.bloodGroup,
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
            "experiences": employeeData.experiences,
            "familyDetails": employeeData.familyDetails,
            "bankDetail": employeeData.bankDetail && employeeData.bankDetail[0],
            "documents": Object.keys(employeeData.documents).map((item: any) => {
                return {id: employeeData.documents[item].id}
            }),
            "active": "true",
        };
        if (employeeData.experiences) convertExperienceToObject(employeeData);
        if(!employeeData.documents.hasOwnProperty("AADHARD_CARD") && !employeeData.documents.hasOwnProperty("PAN_CARD")){
            message.error("please upload file");
            return;
        }
        if (isEditing === false) {
            restApi.employeeCreate(payload).then((e) => {
                message.success("data successfully inserted");
                if (localStorage.length) localStorage.clear();
                navigate(`/employee/search`)
            }).catch(((e) => {
                message.error("data not inserted")
            }));
        } else {
            payload["id"]=employeeData.id;
            restApi.postEmployeeDetailsByID(payload, id).then((e) => message.success("data successfully inserted")).catch((e) => message.error("data is not inserted"));
            navigate(`/employee/search`)
        }
    }

    const items = steps.map((item) => ({key: item.title, title: item.title}));

    useEffect(() => {
        if (id != null) {
            restApi.employeeDetailsByID(id).then((response) => {
                let docObj: any = {};
                response.documents.map((item: any) => {
                    let customKey = item.documentType;
                    const newDocument: any = {
                        customKey: item.documentType,
                        file: item.originalFileName,
                        id: item.id
                    }
                    if (item.documentType === "AADHAAR_CARD" || item.documentType === "PAN_CARD") {
                        newDocument.documentNumber = item.documentNumber;
                    }
                    docObj[customKey] = newDocument;

                });
                setEmployeeData({
                    ...employeeData,
                    documents: docObj
                })
                setIsEditing(true);
                setAge(response.age);
                const {name, presentAddress, permanentAddress, bankDetail, ...withoutKeyToBeRemoved} = response;
                const after = {...name, ...presentAddress, ...permanentAddress, ...bankDetail, ...withoutKeyToBeRemoved};
                convertExperienceToArray(response);

                form.setFieldsValue({
                    ...after,
                    dateOfBirth: dayjs(response.dateOfBirth),
                    joiningDate: dayjs(response.joiningDate),
                    qualification: response.qualification.code,
                    designation: response.designation.code,
                    bankDetail: [response.bankDetail]
                });

                setEmployeeData({
                    ...after,
                    dateOfBirth: dayjs(response.dateOfBirth),
                    documents: docObj,
                    joiningDate: dayjs(response.joiningDate),
                    qualification: response.qualification.code,
                    designation: response.designation.code
                });
            }).catch((error) => console.log(error));
        }
        if (localStorage.length) {
            const localStorageData = Object.keys(localStorage).map((items) => {
                let storage: any = items === "loginToken" ? "" : localStorage.getItem(items);
                let storageDetails: any = items === "loginToken" ? "" : JSON.parse(storage);
                if (items === "personalDetail") {
                    let currentYear = new Date().getFullYear();
                    let selectedYear = dayjs(storageDetails.dateOfBirth).year();
                    let final = currentYear - selectedYear;
                    setAge(final);
                    form.setFieldsValue({
                        ...storageDetails,
                        dateOfBirth: dayjs(storageDetails.dateOfBirth),
                        age: final
                    });
                    storageDetails.dateOfBirth = dayjs(storageDetails.dateOfBirth);
                    storageDetails["age"] = final;
                } else if (items === "contact") {
                    form.setFieldsValue({...storageDetails, joiningDate: dayjs(storageDetails.joiningDate)});
                    storageDetails.joiningDate = dayjs(storageDetails.joiningDate);
                } else if (items === "previousExperiences") {
                    storageDetails.experiences?.forEach((item: any) => {
                        item.duration[0] = dayjs(item.duration[0]);
                        item.duration[1] = dayjs(item.duration[1]);
                    })
                    form.setFieldsValue({...storageDetails});
                } else {
                    form.setFieldsValue({...storageDetails});
                }
                return storageDetails;
            });
            let localStorageMerge = Object.assign({}, ...localStorageData);
            setEmployeeData({...employeeData, ...localStorageMerge})
        }
        restApi.getEnum(`designation`).then((e: any) => {
            e.forEach((item: any) => {
                let tempObj: any = {};
                tempObj["code"] = item.code;
                tempObj["description"] = item.description;
                tempObj["id"]=item.id;
                setTempEnum((prevState: any) => {
                    prevState.designationEnum.push(tempObj);
                    return {...prevState};
                })
            })
        }).catch((e: any) => message.error("enum is not inserted"));
        restApi.getEnum(`qualification`).then((e: any) => {
            e.forEach((item: any) => {
                let tempObj: any = {};
                tempObj["code"] = item.code;
                tempObj["description"] = item.description;
                tempObj["id"]=item.id;
                setTempEnum((prevState: any) => {
                    prevState.qualificationEnum.push(tempObj);
                    return {...prevState};
                })
            })
        }).catch((e: any) => message.error("enum is not inserted"));
        restApi.getState({"country": "India"}).then((e: any) => {
            e.data.states.forEach((item: any) => setState((prevState: any) => [...prevState, {
                value: item.name,
                label: item.name
            }]));
        }).catch((e: any) => {
            console.log(e)
        });
        }, []);

    return (
        <Layout className='with-background'>
            <div className='employee-create-section data-table'>
                <Divider orientation="left">
                    <PageHeader title={isEditing ? "Employee Update" : "Employee Create"}/>
                </Divider>
                <div className="forms-steps">
                    <Steps current={current}
                           items={items}
                           direction="vertical"
                           onChange={onChange}
                           className='employee-create-steps'
                    />
                    <Form onFinish={onFinish}
                          onValuesChange={(e) => {
                              if (current <= 2) {
                                  if (Object.hasOwn(e, "dateOfBirth")) {
                                      let currentYear = new Date().getFullYear();
                                      let selectedYear = dayjs(e.dateOfBirth).year();
                                      let final = currentYear - selectedYear;
                                      setAge(final);
                                      setEmployeeData({...employeeData, dateOfBirth: e.dateOfBirth, age: final});
                                  } else {
                                      setEmployeeData({...employeeData, ...e})
                                  }
                                  if (Object.hasOwn(e, "state")) {
                                      setCity([]);
                                      restApi.getCity({"country": "India", "state": e.state}).then((e: any) => {
                                          e.data.forEach((item: any) => setCity((prevState: any) => {
                                              let obj = {
                                                  label: item,
                                                  value: item
                                              }
                                              return [...prevState, {
                                                  label: item,
                                                  value: item
                                              }]
                                          }))
                                      }).catch((e: any) => {
                                          console.log(e)
                                      });
                                  }
                              }
                          }}
                          form={form}
                          className='employee-create-form'
                    >
                        {current === 0 && (<>
                            <PersonalDetails age={age} tempEnum={tempEnum}/>
                            <PrevNext onChange={onChange} current={current}/>
                        </>)}
                        {current === 1 && (<>
                            <Address state={state} setState={setState} city={city} setCity={setCity}/>
                            <PrevNext onChange={onChange} current={current}/>
                        </>)}
                        {current === 2 && (<>
                            <Contact/>
                            <PrevNext onChange={onChange} current={current}/>
                        </>)}
                        {current === 3 && (<>
                            <Experience tempEnum={tempEnum}/>
                            <PrevNext onChange={onChange} current={current}/>
                        </>)}
                        {current === 4 && (<>
                            <FamilyDetail/>
                            <PrevNext onChange={onChange} current={current}/>
                        </>)}
                        {current === 5 && (<>
                            <BankingDeatils/>
                            <PrevNext onChange={onChange} current={current}/>
                        </>)}
                        {current === 6 && (<>
                            <Document employeeData={employeeData} setEmployeeData={setEmployeeData}
                                      isEditing={isEditing}/>
                            <PrevNext onChange={onChange} current={current}/>
                        </>)}
                        {current === 6 && (<>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </>)}
                    </Form>
                </div>
            </div>
        </Layout>
    )
}

export default EmployeeCreate;