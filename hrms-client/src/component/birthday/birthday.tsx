import {useContext} from 'react';
import {Layout, Table } from 'antd';
import {PageHeader} from "@ant-design/pro-layout";
import BirthdayContext from '../../context/birthdayContext';
import BirthdayData from '../../custom_hooks/birthdayData';
import './birthday.scss';


const columns = [
  {
    title: 'Employee Name',
    dataIndex: 'employeeName',
    key: 'employeeName',
  },
  {
    title: 'Date of Birth',
    dataIndex: 'dateOfBirth',
    key: 'dateOfBirth',
  },
];


const Birthday = () => {
    BirthdayData();
    const {todayBirthday, pastBirthday, upcomingBirthday } = useContext<any>(BirthdayContext);

    const onChange = (pagination:any, filters:any, sorter:any) => {
        console.log('Table onChange:', pagination, filters, sorter);
    };

    return (
        <Layout className='data-table birthday-event-section'>
            <section className='today-birthday-section' >
                <PageHeader title="Today Birthday">
                    {todayBirthday.map((user:any) =>
                        <h5 className='today-birthday-name' key={user.name}>{user.employeeName}</h5>)}
                </PageHeader>
            </section>
            <section className='other-birthday-list'>
                <PageHeader title="Upcoming Birthdays">
                    <Table columns={columns}
                           dataSource={upcomingBirthday}
                           bordered
                           onChange={onChange}
                    />
                </PageHeader>
                <PageHeader title="Past Birthdays">
                    <Table columns={columns}
                           dataSource={pastBirthday}
                           bordered
                           onChange={onChange}
                    />
                </PageHeader>
            </section>
        </Layout>
    );
};

export default Birthday;

