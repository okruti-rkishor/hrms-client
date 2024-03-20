import {Pie} from "react-chartjs-2";
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from "chart.js";
import '../dashboard.scss';

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
                    'rgba(54,162,235,0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 99, 132, 0.2)',

                    // 'rgba(255, 206, 86, 0.2)',
                    // 'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',

                    // 'rgba(255, 206, 86, 1)',
                    // 'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
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
                data: [18, 4 , 2],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(54,162,235,0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
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
                            <h2>{dashboardChartData[chartData].heading}</h2>
                            <Pie data={dashboardChartData[chartData]} width={100} height={100} />
                        </div>
                    )
                )
            }
        </>
    );
}

export default DashboardChart;