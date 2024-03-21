import {Pie} from "react-chartjs-2";
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from "chart.js";
import '../dashboard.scss';
import Title from "antd/lib/typography/Title";
import React from "react";

ChartJS.register(ArcElement, Tooltip, Legend);


const dashboardChartData: any = {
    userCount : {
        heading: "Total user count",
        labels: ['Admin', 'HR', 'Employee', 'Guest User'],
        datasets: [
            {
                label: 'Total users',
                data: [2, 4, 18, 2],
                backgroundColor: [
                    '#EBF2FE',
                    '#ECEBF8',
                    '#DCF5DE',
                    '#FAF1E1',
                    '#F4DCF2',
                    '#FAE2E1',

                    // 'rgba(54,162,235,0.2)',
                    // 'rgba(153, 102, 255, 0.2)',
                    // 'rgba(255, 99, 132, 0.2)',
                    // 'rgba(255, 206, 86, 0.2)',
                    // 'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    '#1F7FFE',
                    '#7474DB',
                    '#5DB961',
                    '#F58626',
                    '#D140A4',
                    '#F4573F',

                    // 'rgba(54, 162, 235, 1)',
                    // 'rgba(153, 102, 255, 1)',
                    // 'rgba(75, 192, 192, 1)',
                    // 'rgba(255, 99, 132, 1)',
                    // 'rgba(255, 206, 86, 1)',
                    // 'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
                hoverOffset: 4,
            },
        ],
        options: {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    fontColor: "#000080",
                }
            },
        }
    },
    employeeOnLeave : {
        heading: "Who is in?",
        labels: ['In', 'Out', 'On Leave'],
        datasets: [
            {
                label: 'Total users',
                data: [14, 6, 4],
                backgroundColor: [
                    '#FAE2E1',
                    '#DCF5DE',
                    '#F4DCF2',
                    '#FAF1E1',
                    '#EBF2FE',
                    '#ECEBF8',
                ],
                borderColor: [
                    '#F4573F',
                    '#5DB961',
                    '#D140A4',
                    '#F58626',
                    '#1F7FFE',
                    '#7474DB',
                ],
                borderWidth: 1,
                hoverOffset: 4,
            },
        ],
    },
}

const DashboardChart = () => {

    return (
        <>
            {
                Object.keys(dashboardChartData).map((chartData:any) =>
                    (
                        <div className={`hrms-dashboard__${chartData} hrms-dashboard__chart`}>
                            <Title level={4} className='hrms-dashboard__page-header'>
                                {dashboardChartData[chartData].heading}
                            </Title>
                            <Pie data={dashboardChartData[chartData]} width={100} height={100} />
                        </div>
                    )
                )
            }
        </>
    );
}

export default DashboardChart;