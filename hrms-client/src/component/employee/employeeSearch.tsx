import ReactDOM from "react-dom";
import { useState } from "react";
// import 'antd/dist/antd.css';
import { Form, Row, Col, Input, Button } from "antd";
import { PageHeader } from "@ant-design/pro-layout";
import "./employeeSearch.scss";
import type { DatePickerProps } from "antd";
import { DatePicker, Space, Select } from "antd";
import { Designation } from "../../constant/constant";
import rest from '../../services/http/api/index'
import EmployeeSearchDataTable from "./employeeSearchDataTable";
const FormItem = Form.Item;

export interface employeeInterface {
  id: string;
  name: {
    title: string;
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  age: number;
  gender: string;
  dateOfBirth: string;
  bloodGroup: string;
  contact: string;
  email: string;
  officialEmail: string;
  designation: string;
  employeeCode: string;
  joiningDate: string;
  exitDate?: string;
  status: string;
  qualification: string;
  totalExperience: string;
  type: string;
  bankDetails: {
    // Define the structure of bankDetails if available
    // For example: accountNumber: string; bankName: string; etc.
    // ...
  }[];
  documents: any[]; // You can replace 'any' with a more specific type if needed
  familyDetails: {
    // Define the structure of familyDetails if available
    // For example: familyMemberName: string; relation: string; etc.
    // ...
  }[];
  permanentAddress: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    zipCode: string;
  };
  presentAddress: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    zipCode: string;
  };
  previousExperiences: {
    // Define the structure of previousExperiences if available
    // For example: companyName: string; jobTitle: string; etc.
    // ...
  }[];
}


function convert(str:Date) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
}

function EmployeeSearch() {
  const [form] = Form.useForm();
  const [emploreeResponse, setEmployeeResponse] = useState<employeeInterface[]>([]);
  const [showTableStatus, setShowTableStatus] = useState(false);

  const onFinish = async(values: any) => {
    console.log("Received values of form: ", values);
    let tempFormData = {}
    let tempResponse:[] = []
    if(values&&(values!==undefined)){
      if(values.name&&values.name){
        console.log(values.name)
        tempFormData = {...tempFormData,name : values.name}
        // setFormData({...values, name : values.name})
      }
      if(values.employeeCode&&values.employeeCode){
        console.log(values.employeeCode)
        tempFormData = {...tempFormData,employeeCode : values.employeeCode}
        // setFormData({...values, employeeCode : values.employeeCode})
      }
      if(values.joiningDate&&values.joiningDate){
        console.log(convert( values.joiningDate))
        tempFormData = {...tempFormData, joiningDate : convert( values.joiningDate)}
        // setFormData({...values, joiningDate : convert( values.joiningDate)})
      }
      if(values.designation&&values.designation){
        console.log(values.designstion)
        tempFormData = {...tempFormData,designation : values.designation}
        // setFormData({...values, designstion : values.designstion})
      }
      if(values.contact&&values.contact){
        console.log(values.contact)
        tempFormData = {...tempFormData,contact : values.contact}
        // setFormData({...values, contact : values.contact})
      }
      if(values.documentNumber&&values.documentNumber){
        console.log(values.documentNumber)
        tempFormData = {...tempFormData,documentNumber : values.documentNumber}
        // setFormData({...values, documentNumber : values.documentNumber})
      }
    }

    console.log(tempFormData)
    try{
      const response = await rest.employeeSearch(tempFormData)

      tempResponse = response.map((employee:any)=>{
        let designation = (employee.designation as string).split("_");
        designation = designation.map((nameString: string): string =>
          nameString.charAt(0).toUpperCase() + nameString.slice(1).toLowerCase()
        ); // capitalize first character of array of string
        const formattedDesignation = designation.join(' ');  // convert array of string to string saprated with space
        return {...employee,employeeName:`${employee.name.firstName} ${employee.name.middleName} ${employee.name.lastName}`, designation:formattedDesignation}
      });

      setShowTableStatus(true);
     setEmployeeResponse(tempResponse)
     console.log("modify response :", tempResponse);
    }catch(error){
      console.log(error)
    }

  };


  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <div className="employee-search">
      <div>
        <h1 className="title-heading">Employee Search</h1>
        <Form
          form={form}
          name="advanced_search"
          className="ant-advanced-search-form"
          layout="horizontal"
          onFinish={onFinish}
        >
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" span={8}>
              <Form.Item name={`name`} label={`Name`}>
                <Input placeholder="Name" />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item name={`employeeCode`} label={`Employee Code`}>
                <Input placeholder="Employee Code" />
              </Form.Item>
            </Col>

            <Col className="gutter-row" span={8}>
              {/* <Form.Item name={`joiningDate`} label={`Joining Date`}>
                <Space direction="vertical">
                  <DatePicker name="joiningDate" onChange={onChange} />
                </Space>
              </Form.Item> */}
              <FormItem name={`joiningDate`} label={`Joining Date`}>
                <DatePicker />
              </FormItem>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item label={"Designation"} name={"designation"} required={true} rules={[{
                        required:true,
                        message:"select your designation",
                    }]}>
                        <Select defaultValue={Designation.JUNIOR_SOFTWARE_ENGINEER}>
                            <Select.Option value={Designation.TRAINEE}>{'TRAINEE'}</Select.Option>
                            <Select.Option value={Designation.JUNIOR_SOFTWARE_ENGINEER}>{'JUNIORSOFTWARE ENGINEER'}</Select.Option>
                            <Select.Option value={Designation.SOFTWARE_ENGINEER}>{'SOFTWARE ENGINEER'}</Select.Option>
                            <Select.Option value={Designation.SENIOR_SOFTWARE_ENGINEER}>{'SENIOR SOFTWARE ENGINEER'}</Select.Option>
                            <Select.Option value={Designation.TECHNICAL_LEAD}>{'TECHNICAL LEAD'}</Select.Option>
                        </Select>
                    </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item name={`documentNumber`} label={`Document Number`}>
                <Input placeholder="Document Number" />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item name={`contact`} label={`Contact`}>
                <Input placeholder="Contact" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col
              span={24}
              style={{
                textAlign: "right",
              }}
            >
              <Button type="primary" htmlType="submit">
                Search
              </Button>
              <Button
                style={{
                  margin: "0 8px",
                }}
                onClick={() => {
                  form.resetFields();
                }}
              >
                Clear
              </Button>
            </Col>
          </Row>
        </Form>
      </div>

      <div className="search-result-list">

      {showTableStatus!==true ? 'Search Result List':<EmployeeSearchDataTable  employeeResponse={emploreeResponse}/>}
      </div>
    </div>
  );
}


export default EmployeeSearch;
