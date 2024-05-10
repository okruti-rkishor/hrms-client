import {Pie} from "react-chartjs-2";
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from "chart.js";
import '../../../styles/component/dashboard.scss';
import Title from "antd/lib/typography/Title";
import restApi from "../../../services/http/api";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);


interface User {
    roles: String[];
    count: Number[];
}

const DashboardChart = () => {
    const [countAdmin, setCountAdmin] = useState(0);
    const [countHR, setCountHR] = useState(0);
    const [countEmployee, setCountEmployee] = useState(0);
    const [countAll, setCountAll] = useState(0);
    const navigate = useNavigate();

    const checkRole = (roles:string[], checkUser:string) => {
        const match = roles.filter((role:string) => checkUser===role);
        return match.length;
    }

    const [user, setUser] = useState<User>({
        roles: [],
        count: [],
    });

    const userCount = async () => {
        try {
            const userCountResponse = await restApi.userCount();
            const allUserCountResponse = await restApi.getUsers(null);
            //for all user count
            userCountResponse.push({role:"ALL",count:allUserCountResponse.length});

            const userCountProps:User = {
                roles: [],
                count: [],
            };

            userCountResponse.forEach((item: any,index:number) => {
                userCountProps.roles.push(item.role);
                userCountProps.count.push(item.count);


            });

            setUser(userCountProps);

            if (userCountResponse.length >= 1) {
                const adminCount = (userCountResponse.filter((item:any) =>
                    item.roles && checkRole(item.roles,"ADMIN")))
                setCountAdmin(adminCount.length);

                const hrCount = (userCountResponse.filter((item:any) =>
                    item.roles && checkRole(item.roles,"HR")))
                setCountHR(hrCount.length);

                const employeeCount = (userCountResponse.filter((item:any) =>
                    item.roles && checkRole(item.roles,"EMPLOYEE")))
                setCountEmployee(employeeCount.length);

                const allCount = (userCountResponse.filter((item:any) =>
                    item.roles && checkRole(item.roles,"ALL")))
                setCountAll(allCount.length);
            }
        } catch (error) {
            console.error("User Count Error: ", error);
        }
    };

    useEffect(() => {
        userCount();
    }, []);

    const dashboardChartData: any = {
        userCount : {
            heading: "Total user count",
            labels: user.roles,
            datasets: [
                {
                    label: 'Total users',
                    data: user.count,
                    backgroundColor: [
                        'rgba(255, 26, 104, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        // 'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(0, 0, 0, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 26, 104, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        // 'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(0, 0, 0, 1)'
                    ],
                    borderWidth: 1,
                    hoverOffset: 10,
                },
            ],
        },
        employeeOnLeave : {
            heading: "Who is in?",
            labels: ['In', 'Out', 'No Punch', 'On Leave'],
            datasets: [
                {
                    label: 'Total count',
                    data: [14, 8, 7, 3],
                    backgroundColor: [
                        'rgba(255, 26, 104, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(0, 0, 0, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 26, 104, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(0, 0, 0, 1)'
                    ],
                    borderWidth: 1,
                    hoverOffset: 10,
                },
            ],
        },
    }

    const options:any = {
        plugins: {
            legend: {
                display: true,
                position: 'right',
                onClick: (e:any, legendItem:any, legend:any)=> {
                    navigate(`/user/list?userTitle=${legendItem.text.toUpperCase()}`);
                },
                labels: {
                    padding: 15,
                    usePointStyle: true,
                    radius: 5,
                    pointStyle: 'rectRounded',
                }
            },
        }
    }

    return (
        <>
            <section className='hrms-dashboard__chart-section'>
                {
                    Object.keys(dashboardChartData).map((chartData:any, index:number) =>
                        (
                            <div key={index} className={`hrms-dashboard__${chartData} hrms-dashboard__chart`}>
                                <Title level={4} className='hrms-dashboard__page-header'>
                                    {dashboardChartData[chartData].heading}
                                </Title>
                                <Pie data={dashboardChartData[chartData]} options={options} width={100} height={100} />
                            </div>
                        )
                    )
                }
            </section>
        </>
    );
}

export default DashboardChart;