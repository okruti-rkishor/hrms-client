import React, { FC, useEffect } from 'react';
import { Layout, Table } from "antd";
import { PageHeader } from "@ant-design/pro-layout";
import "../../styles/component/commonEvents.scss";


export interface CommonComponentProps {
  data: data;
  event: string;
  animation: React.ReactNode;
}

export type data = {
  today: { employeeName: string; date: string }[];
  passed: { employeeName: string; date: string }[];
  upcoming: { employeeName: string; date: string }[];
};

const CommonEvents: React.FC<CommonComponentProps> = ({ data, event, animation }) => {
  const dataToday = data.today;
  const dataPassed = data.passed;
  const dataUpcoming = data.upcoming;

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
    <Layout className="with-background">
      {animation}
      <div className="data-table birthday-event-section">
        <section className="today-birthday-section">
          <PageHeader title={ `Today ${event}`}>
            {dataToday.length!==0 ? dataToday.map((user: any, index: any) => (
                <h5 className="today-birthday-name" key={index}>
                  {user.employeeName}
                </h5>
            )) : <p className='no-event-today'>🎉  There is no {event} event today  🎉</p>}
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
      </div>
    </Layout>
  );
};

export default CommonEvents;
