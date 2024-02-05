import { Layout, Table } from "antd";
import { PageHeader } from "@ant-design/pro-layout";
import BirthdayData from "../../../custom_hooks/birthdayData";
import "./common.scss";

export interface CommonComponentProps {
  data: data;
  event: string;
}

export type data = {
  today: { employeeName: string; date: string }[];
  passed: { employeeName: string; date: string }[];
  upcoming: { employeeName: string; date: string }[];
};

const Common: React.FC<CommonComponentProps> = ({ data, event }) => {
  const dataToday = data.today;
  const dataPassed = data.passed;
  const dataUpcoming = data.upcoming;
  BirthdayData();

  const columns = [
    {
      title: "Employee Name",
      dataIndex: "employeeName",
      key: "employeeName",
    },
    {
      title: `Date of ${event}`,
      dataIndex: `date`,
      key: "date",
    },
  ];

  return (
    <Layout className="data-table birthday-event-section">
      <section className="today-birthday-section">
        <PageHeader title={`Today ${event}`}>
          {dataToday.map((user: any, index: any) => (
            <h5 className="today-birthday-name" key={index}>
              {user.employeeName}
            </h5>
          ))}
        </PageHeader>
      </section>
      <section className="other-birthday-list">
        <PageHeader title={`Upcoming ${event}`}>
          <Table columns={columns} dataSource={dataUpcoming} bordered />
        </PageHeader>
        <PageHeader title={`Past ${event}`}>
          <Table columns={columns} dataSource={dataPassed} bordered />
        </PageHeader>
      </section>
    </Layout>
  );
};

export default Common;
