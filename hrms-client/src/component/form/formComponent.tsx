import React, {useState} from "react";
import {Input,Form,Select,Button,Radio,DatePicker,InputNumber,Row,Col,Cascader} from "antd";
import {Simulate} from "react-dom/test-utils";
import submit = Simulate.submit;
import '../form/formComponent.scss';
import { Steps } from 'antd';
import fieldSet from "react";


const FormComponent = () =>{

    const onFinish = (value:object) =>{
        console.log(value);
    }
    const [current, setCurrent] = useState(0);

    const steps = [
        {
            title: 'First',
            content: 'First-content',
        },
        {
            title: 'Second',
            content: 'Second-content',
        },
        {
            title: 'Last',
            content: 'Last-content',
        },
    ];

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };


    const items = steps.map((item) => ({ key: item.title, title: item.title }));




    return (


        <div className={"parent"}>
            <Steps current={current} items={items} />
        <Form onFinish={onFinish} layout={'horizontal'} >

            {current === 0 && (<>
                <div style={{display:"flex", gap:"30px" , flexDirection:"column",marginTop:"90px"}}>

                <Row gutter={40}>
                <Col xl={6}>
                    <label>Title</label>
                </Col>
                <Col xl={6}>
                        <Form.Item>
                    <Select style={{height:"40px"}}>
                        <Select.Option value="Mr">Mr</Select.Option>
                        <Select.Option value="Mrs">Mrs</Select.Option>
                    </Select>
                </Form.Item>
                        </Col>
                <Col style={{textAlign:"left"}} xl={6}>
                    <label>First Name </label>
                </Col>
                <Col xl={6}>
                    <Form.Item name={"firstName"} >
                        <Input required={true} style={{height:"40px"}}/>
                    </Form.Item>
                </Col>
            </Row>
                <Row gutter={40}>
                    <Col xl={6}>
                        <label>Middle Name</label>
                    </Col>
                    <Col xl={6}>
                        <Form.Item name={"middleName"} >
                            <Input required={true} style={{height:"40px"}}/>
                        </Form.Item>
                    </Col>
                    <Col style={{textAlign:"left"}} xl={6}>
                        <label>last Name </label>
                    </Col>
                    <Col xl={6}>
                        <Form.Item name={"lastName"} >
                            <Input required={true} style={{height:"40px"}}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={40}>
                    <Col xl={6}>
                        <label>gender</label>
                    </Col>
                    <Col xl={6}>
                        <Form.Item>
                            <Radio.Group>
                                            <Radio value="Male"> Male </Radio>
                                            <Radio value="Female"> Female </Radio>
                                        </Radio.Group>
                        </Form.Item>
                    </Col>
                    <Col style={{textAlign:"left"}} xl={6}>
                        <label>Date of Birth</label>
                    </Col>
                    <Col xl={6}>
                        <Form.Item name={"Date of Birth"} >
                            <DatePicker style={{width:"100%"}}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={40}>
                    <Col xl={6}>
                        <label>type</label>
                    </Col>
                    <Col xl={6}>
                        <Form.Item>
                            <Select style={{width:"100%"}}>
                                                <Select.Option value="intern">intern</Select.Option>
                                                <Select.Option value="part time">part time</Select.Option>
                                                <Select.Option value="full time">full time</Select.Option>
                                            </Select>

                        </Form.Item>
                    </Col>
                    <Col style={{textAlign:"left"}} xl={6}>
                        <label>Designation</label>
                    </Col>
                    <Col xl={6}>
                        <Form.Item name={"designation"} >
                            <Input required={true} style={{height:"40px"}}/>
                        </Form.Item>
                    </Col>
                </Row>

                </div>
            </>)}

            {current === 1 && (<><Row gutter={40}>
                <Col xl={24} style={{textAlign:"left",marginBottom:"20px"}}>
                    <label>present Address</label>
                </Col>
                <Col xl={6}>
                    <Form.Item label={"street address"} name={"streetAddress"} required={true} >
                        <Input required={true}/>
                    </Form.Item>
                </Col>
                <Col xl={6}>
                    <Form.Item label={"house number"} name={"house number"} required={true} >
                        <Input required={true}/>
                    </Form.Item>
                </Col>
                <Col xl={6}>
                    <Form.Item label={"city"} name={"city"} required={true} >
                        <Input required={true}/>
                    </Form.Item>

                </Col>
                <Col xl={6}>
                    <Form.Item label={"postcode"} name={"postcode"} required={true} >
                        <Input required={true}/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={40}>
                <Col xl={24} style={{textAlign:"left",marginBottom:"20px"}}>
                    <label>permanent Address</label>
                </Col>
                <Col xl={6}>
                    <Form.Item label={"street address"} name={"streetAddress"} required={true} >
                        <Input required={true}/>
                    </Form.Item>
                </Col>

                <Col xl={6}>
                    <Form.Item label={"house number"} name={"house number"} required={true} >
                        <Input required={true}/>
                    </Form.Item>
                </Col>

                <Col xl={6}>
                    <Form.Item label={"city"} name={"city"} required={true} >
                        <Input required={true}/>
                    </Form.Item>

                </Col>

                <Col xl={6}>
                    <Form.Item label={"postcode"} name={"postcode"} required={true} >
                        <Input required={true}/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={40}>
                <Col xl={6} style={{textAlign:"left",marginBottom:"20px"}}>
                    <Form.Item label="gender" >
                    <Radio.Group>
                        <Radio value="Male"> Male </Radio>
                        <Radio value="Female"> Female </Radio>
                    </Radio.Group>
                </Form.Item>
                </Col>
                <Col xl={6} style={{textAlign:"left",marginBottom:"20px"}}>
                <Form.Item label="Date of Birth">
                <DatePicker style={{width:"100%"}}/>
            </Form.Item>
                </Col>
                <Col xl={6} style={{textAlign:"left",marginBottom:"20px"}}>
                    <Form.Item label="Date of Joining" >
                        <DatePicker style={{width:"100%"}}/>
                    </Form.Item>
                </Col>

            </Row>
            <Row gutter={40}>
                <Col xl={6}>
            <Form.Item label={"Official Mail"} name={"email"} required={true}  rules={[
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
                </Col>
                <Col xl={6}>
                    <Form.Item label={"Total experience"} name={"email"} required={true}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col xl={6}>
                    <Form.Item label="type">
                        <Select style={{width:"100%"}}>
                            <Select.Option value="intern">intern</Select.Option>
                            <Select.Option value="part time">part time</Select.Option>
                            <Select.Option value="full time">full time</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row></>)}

            {current === 2  && (<><Row gutter={40}>
                <Col xl={6}>
                    <Form.Item label={"Contact Number"} name={"contact"} required={true}  rules={[{ required: true, message: 'Please input your phone number!' }]}>
                        <Input prefix={"+91"} style={{ width: '100%' }} required={true}/>
                    </Form.Item>
                </Col>
                <Col xl={6}>
                    <Form.Item label={"Designation"} name={"designation"} required={true}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col xl={6}>
                    <Form.Item label="status">
                        <Select style={{width:"100%"}}>
                            <Select.Option value="active">Active</Select.Option>
                            <Select.Option value="Not Active">not Active</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={40}>
                <Col xl={24} style={{textAlign:"left",marginBottom:"20px"}}>
                    <label>Previous Experience</label>
                </Col>
                <Col xl={6}>
                    <Form.Item label={"Company Name"} name={"companyName"} required={true}>
                        <Input required={true}/>
                    </Form.Item>
                </Col>

                <Col xl={6}>
                    <Form.Item label={"house number"} name={"house number"} required={true} >
                        <Input required={true}/>
                    </Form.Item>
                </Col>

                <Col xl={6}>
                    <Form.Item label={"city"} name={"city"} required={true} >
                        <Input required={true}/>
                    </Form.Item>

                </Col>

                <Col xl={6}>
                    <Form.Item label={"postcode"} name={"postcode"} required={true} >
                        <Input required={true}/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={40}>
                <Col xl={24} style={{textAlign:"left",marginBottom:"20px"}}>
                    <label>Previous Experience</label>
                </Col>
                <Col xl={6}>
                    <Form.Item label={"Company Name"} name={"companyName"} required={true}>
                        <Input required={true}/>
                    </Form.Item>
                </Col>

                <Col xl={6}>
                    <Form.Item label={"house number"} name={"house number"} required={true} >
                        <Input required={true}/>
                    </Form.Item>
                </Col>

                <Col xl={6}>
                    <Form.Item label={"city"} name={"city"} required={true} >
                        <Input required={true}/>
                    </Form.Item>

                </Col>

                <Col xl={6}>
                    <Form.Item label={"postcode"} name={"postcode"} required={true} >
                        <Input required={true}/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={40}>
                <Col xl={24} style={{textAlign:"left",marginBottom:"20px"}}>
                    <label>Previous Experience</label>
                </Col>
                <Col xl={6}>
                    <Form.Item label={"Company Name"} name={"companyName"} required={true}>
                        <Input required={true}/>
                    </Form.Item>
                </Col>

                <Col xl={6}>
                    <Form.Item label={"house number"} name={"house number"} required={true} >
                        <Input required={true}/>
                    </Form.Item>
                </Col>

                <Col xl={6}>
                    <Form.Item label={"city"} name={"city"} required={true} >
                        <Input required={true}/>
                    </Form.Item>

                </Col>

                <Col xl={6}>
                    <Form.Item label={"postcode"} name={"postcode"} required={true} >
                        <Input required={true}/>
                    </Form.Item>
                </Col>
            </Row></>)}

            <Form.Item>
                <Button type={"primary"} htmlType={"submit"}>submit</Button>
            </Form.Item>


        </Form>
            <Button onClick={next}>next</Button>











        </div>



    )


}
export default FormComponent;