import ReactDOM from "react-dom";
import React, { useState } from "react";
// import 'antd/dist/antd.css';
import {Form, Row, Col, Input, Button, DatePicker, Select, Divider} from "antd";
// import { PageHeader } from "@ant-design/pro-layout";
import "./employeeSearch.scss";
// import type { DatePickerProps, Space } from "antd";
import {} from "antd";
import {
  Designation,
  // Gender,
  // Type_Time,
  // Status,
  // Blood_Group,
} from "../../../src/constant/constant";
import rest from "../../services/http/api/index";
import EmployeeSearchDataTable from "./employeeSearchDataTable";
import {PageHeader} from "@ant-design/pro-layout";
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

function convert(str: Date) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
}

function EmployeeSearch() {
  const [form] = Form.useForm();
  const [emploreeResponse, setEmployeeResponse] = useState<employeeInterface[]>(
    []
  );
  const [showTableStatus, setShowTableStatus] = useState(false);
  const enumKeysArray: (keyof typeof Designation)[] = Object.keys(
    Designation
  ) as (keyof typeof Designation)[];

  const onFinish = async (values: any) => {
    let tempFormData = {};
    let tempResponse: [] = [];
    if (values && values !== undefined) {
      if (values.name) {
        tempFormData = { ...tempFormData, name: values.name };
      }
      if (values.employeeCode) {
        tempFormData = { ...tempFormData, employeeCode: values.employeeCode };
      }
      if (values.joiningDate) {
        tempFormData = {
          ...tempFormData,
          joiningDate: convert(values.joiningDate),
        };
      }
      if (values.designation) {
        tempFormData = { ...tempFormData, designation: values.designation };
      }
      if (values.contact) {
        tempFormData = { ...tempFormData, contact: values.contact };
      }
      if (values.documentNumber) {
        tempFormData = {
          ...tempFormData,
          documentNumber: values.documentNumber,
        };
      }
    }
    try {
      const response = await rest.employeeSearch(tempFormData);

      tempResponse = response.map((employee: any) => {
        let designation = (employee.designation as string).split("_");
        designation = designation.map(
          (nameString: string): string =>
            nameString.charAt(0).toUpperCase() +
            nameString.slice(1).toLowerCase()
        ); // capitalize first character of array of string
        const formattedDesignation = designation.join(" "); // convert array of string to string saprated with space
        return {
          ...employee,
          employeeName: `${employee.name.firstName}${employee.name.middleName!==null?" "+employee.name.middleName:""} ${employee.name.lastName}`,
          designation: formattedDesignation,
        };
      });

      setShowTableStatus(true);
      setEmployeeResponse(tempResponse);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="data-table employee-search">
      <Divider orientation="left">
        <PageHeader
            className=""
            title="Employee Search"
        />
      </Divider>
      {/*<h1 className="title-heading">Employee Search</h1>*/}
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
            <FormItem name={`joiningDate`} label={`Joining Date`}>
              <DatePicker />
            </FormItem>
          </Col>
          <Col className="gutter-row" span={8}>
            <Form.Item
              label={"Designation"}
              name={"designation"}
              required={true}
              initialValue={Object.keys(Designation)[1]}
              rules={[
                {
                  required: true,
                  message: "Select your designation",
                },
              ]}
            >
              <Select defaultValue={Designation.JUNIOR_SOFTWARE_DEVELOPER}>
                {enumKeysArray.map((key) => (
                  <Select.Option key={key} value={key}>
                    {Designation[key]}
                  </Select.Option>
                ))}
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
      <hr />
      <div className="search-result-list">
        {showTableStatus !== true ? (
          "Search Result List"
        ) : (
          <EmployeeSearchDataTable employeeResponse={emploreeResponse} />
        )}
      </div>
    </div>
  );
}

export default EmployeeSearch;
