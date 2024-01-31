import {Key, useState} from 'react';
import {Layout, Table } from 'antd';
import {PageHeader} from "@ant-design/pro-layout";
import dayjs from 'dayjs'

type Employee = {
  key: Key;
  employeeName: string;
  dateOfBirth: string;
};

const data: Employee[] = [
  { key: 1, employeeName: "Gaurav", dateOfBirth: "2024-02-22" },
  { key: 6, employeeName: "Anay", dateOfBirth: "2024-02-24" },
  { key: 2, employeeName: "Abhishek", dateOfBirth: "2024-01-2" },
  { key: 3, employeeName: "Raghu", dateOfBirth: "2024-01-28" },
  { key: 4, employeeName: "Rahul Kumar", dateOfBirth: "2024-01-31" },
  { key: 5, employeeName: "DJ", dateOfBirth: "2024-01-23" },
];

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
  // const todayDate = createTodayDate()
  const [todayBirthday, setTodayBirthday] = useState(data.filter(item=>(dayjs(item.dateOfBirth)).isSame(dayjs().format('YYYY-MM-DD')),'day'))
  const [upcommingBirthday, setUpcomming] = useState(data.filter(item=>(new Date(item.dateOfBirth.toString())) >= new Date()))
  const [previousBirthday, setPreviousBirthday] = useState(data.filter(item=>(new Date(item.dateOfBirth.toString())) <= new Date()))
  const onChange = (pagination:any, filters:any, sorter:any) => {
    console.log('Table onChange:', pagination, filters, sorter);
    // Add your logic here for handling table changes
  };
console.log("upcommingBirthday",upcommingBirthday)
console.log("previousBirthday", previousBirthday)
console.log("todayBirthday", todayBirthday)


  return (
            <Layout className='data-table'>
              <div style={{height:'50px', marginBottom:'100px',backgroundColor:"Highlight",color:"black"}}>
                <h3>Today Birthday</h3>
                {todayBirthday.map(user=><div>{user.employeeName}</div>)}
              </div>
              <div style={{display:"flex", justifyContent:"space-evenly"}}>
              <PageHeader
                  className=""
                  title="Upcoming Birthdays"
                  subTitle="The list of all upcoming birthdays"
            >
              <Table columns={columns} dataSource={upcommingBirthday} onChange={onChange} />
            </PageHeader>
            <PageHeader
                  className=""
                  title="Past Birthdays"
                  subTitle="The list of all previous birthdays"
            >
              <Table columns={columns} dataSource={previousBirthday} onChange={onChange} />
            </PageHeader>
              </div>
            </Layout>
  
  );
};

export default Birthday;

