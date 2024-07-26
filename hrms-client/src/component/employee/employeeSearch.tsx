import React, { useContext, useEffect, useState } from "react";
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  DatePicker,
  Select,
  Divider,
  Layout,
} from "antd";
import "../../styles/component/employeeSearch.scss";
import rest from "../../services/http/api/index";
import EmployeeSearchDataTable from "./employeeSearchDataTable";
import { PageHeader } from "@ant-design/pro-layout";
import {firstCharUpperCase, removeUnderScoreWithLowerCase} from "../../utility/utility";
import UserLoginContext from "../../context/userLoginContext";
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
  bankDetails: {}[];
  documents: any[];
  familyDetails: {}[];
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
  previousExperiences: {}[];
}

export interface DesignationEnum {
  id: string;
  code: string;
  description: string;
  active: boolean;
  auditInfo: {
    createdOn: string;
    createdBy: string;
    updatedOn: string;
    updatedBy: string;
  };
}

function convert(str: Date) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
}

function EmployeeSearch() {
  const [form] = Form.useForm();
  const [employeeResponse, setEmployeeResponse] = useState<employeeInterface[]>([]);
  const [designation, setDesignation] = useState<DesignationEnum[]>([]);
  const [showTableStatus, setShowTableStatus] = useState<any>(false);
  const {newUser} = useContext(UserLoginContext);
  const fetchDesignationData = async () => {
    try {
      const resp: any = await rest.getAllDesignation();
      resp.unshift({id: '-Select-', code: '-Select-', description: '-Select-', active: false,})
      setDesignation(resp);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchInitialData=async()=>{
  try {
    const resp = await rest.employeeSearch({})
    const formatedResp = resp.map((employee:any,index:number)=>{
      return{
          ...employee,
        employeeName: firstCharUpperCase(`${employee?.name?.firstName}${
            employee?.name?.middleName !== null
                ? " " + employee?.name?.middleName
                : ""
        } ${employee.name.lastName}`),
        designation: removeUnderScoreWithLowerCase(employee.designation.code),
        key:index,
      }
    })
    setEmployeeResponse(formatedResp);
  }catch (e) {
    console.log(e)
  }
  }

  useEffect(() => {
    if(newUser?.roles.includes("ADMIN")||newUser?.roles.includes("HR")) {
      fetchDesignationData();}
      fetchInitialData();
      setShowTableStatus(true);

  }, []);

  const onFinish = async (values: any) => {
    let tempFormData = {};
    if(values.designationCode === "-Select-")delete values.designationCode
    //how many times iterate loop
    const valuesKey = Object.keys(values)
    valuesKey.forEach((key:string)=>{
    if(values[key]===""||values[key]===undefined){
      delete values.key
    }
    })
     tempFormData = values
    let tempResponse: [] = [];

    try {
      const response = await rest.employeeSearch(tempFormData);
      tempResponse = response.map((employee: any,index:number) => {
        // let formattedDesignation = removeUnderScore(
        //   String(employee.designation.code),
        //   "_"
        // );
        return {
          ...employee,
          employeeName: firstCharUpperCase(`${employee.name.firstName}${
            employee.name.middleName !== null
              ? " " + employee.name.middleName
              : ""
          } ${employee.name.lastName}`),
          designation: removeUnderScoreWithLowerCase(employee?.default),
          key:index,
        };
      });

      setShowTableStatus(true);
      setEmployeeResponse(tempResponse);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout className="with-background">
      <div className="data-table employee-search">
        <Divider orientation="left">
          <PageHeader className="" title="Employee Search" />
        </Divider>
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
                name={"designationCode"}
                required={true}
                initialValue={"-Select-"}
                rules={[
                  {
                    required: true,
                    message: "Select your designation",
                  },
                ]}
              >
                <Select className={"select-designation"}>
                  {designation.map((key: DesignationEnum) => (
                    <Select.Option key={key.id} value={key.code}>
                      {key.description}
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
            <div style={{ padding: "40px" }}>
              Search Result List
              {/* <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> */}
            </div>
          ) : (
            <EmployeeSearchDataTable employeeResponse={employeeResponse} />
          )}
        </div>
      </div>
    </Layout>
  );
}

export default EmployeeSearch;
