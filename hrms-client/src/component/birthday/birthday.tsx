import {Key, useState, useContext, useEffect} from 'react';
import {Layout, Table } from 'antd';
import {PageHeader} from "@ant-design/pro-layout";
import dayjs from 'dayjs'
import BirthdayContext from '../../context/birthdayContext';
import rest from '../../services/http/api'
import BirthdayData from '../../hooks/birthdayData';


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
  const [value]:any = BirthdayData();
  
  const {todayBirthday,pastBirthday,upcomingBirthday,setTodayBirthday,setPastBirthday,setUpcomingBirthday, myValue, updateValue } = useContext<any>(BirthdayContext);

  const onChange = (pagination:any, filters:any, sorter:any) => {
    console.log('Table onChange:', pagination, filters, sorter);
    // Add your logic here for handling table changes
  };
console.log("upcommingBirthday",upcomingBirthday)
console.log("previousBirthday", pastBirthday)
console.log("todayBirthday", todayBirthday)

useEffect(()=>{ 
  
},[])
const getAllBirthdays = async()=>{
  const resp = await rest.allBirthday()

}
console.log(value);
  return (
            <Layout className='data-table'>
              <div style={{height:"fit-content", marginBottom:'100px',backgroundColor:"Highlight",color:"black"}}>
                <h3>Today Birthday</h3>
                {todayBirthday.map((user:any)=><span style={{margin:"30px", padding:'0px'}} key={user.name}>{user.employeeName}</span>)}
              </div>
              <div style={{display:"flex", justifyContent:"space-evenly"}}>
              <PageHeader
                  className=""
                  title="Upcoming Birthdays"
                  subTitle="The list of all upcoming birthdays"
            >
              <Table columns={columns} dataSource={upcomingBirthday} onChange={onChange} />
            </PageHeader>
            <PageHeader
                  className=""
                  title="Past Birthdays"
                  subTitle="The list of all previous birthdays"
            >
              <Table columns={columns} dataSource={pastBirthday} onChange={onChange} />
            </PageHeader>
              </div>
            </Layout>
  
  );
};

export default Birthday;

