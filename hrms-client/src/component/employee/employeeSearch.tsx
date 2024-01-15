import ReactDOM from "react-dom";
// import 'antd/dist/antd.css';
import { Form, Row, Col, Input, Button } from "antd";
import { PageHeader } from "@ant-design/pro-layout";
import "./employeeSearch.scss";
import type { DatePickerProps } from "antd";
import { DatePicker, Space, Select } from "antd";

function EmployeeSearch() {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <div className="employee-search">
      {/* <PageHeader
        className="site-page-header"
        title="Employee Search"
        breadcrumb={{}}
        // subTitle="This is a subtitle"
      /> */}
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
            <Form.Item name={`joiningDate`} label={`Joining Date`}>
              {/* <Space direction="vertical" >
                
              </Space> */}
              <DatePicker onChange={onChange} />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={8}>
          <Space wrap>
              <Select
                defaultValue="lucy"
                style={{ width: 120 }}
                onChange={handleChange}
                options={[]}
              />
            </Space>
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
  );
}

// ReactDOM.render(
//     <div>
//       <EmployeeSearch />
//       <div className="search-result-list">Search Result List</div>
//     </div>,
//     document.getElementById('container')
//   );

export default EmployeeSearch;
