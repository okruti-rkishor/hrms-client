import {Pie} from "react-chartjs-2";
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from "chart.js";
import {PieChartOutlined} from "@ant-design/icons/lib";

ChartJS.register(ArcElement, Tooltip, Legend);


const userCount = {
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
};

const employeeOnLeave = {
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
}

const DashboardChart = () => {

    return (
        <div style={{ width: 300, textAlign: "center" }}>
            <h2><PieChartOutlined />User Distribution in Company</h2>
            <Pie data={userCount} width={100} height={100} />
        </div>
    );
}

export default DashboardChart;