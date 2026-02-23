import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const sparklineData = [12, 45, 35, 64, 23, 56, 34, 44, 55, 12, 34];

const randomizeArray = (arr) => {
    return arr.sort(() => Math.random() - 0.5);
};

export const ApexChart = () => {
    const [seriesSpark3, setSeriesSpark3] = useState([{ data: randomizeArray(sparklineData) }]);
    const optionsSpark = {
        chart: {
            type: 'area',
            sparkline: { enabled: true },
        },
        stroke: { curve: 'straight' },
        fill: { opacity: 0.3 },
        yaxis: { min: 0, show: false },
        title: {
            text: '$135,965',
            offsetX: 0,
            style: { fontSize: '24px' },
        },
        subtitle: {
            // text: 'Profits',
            offsetX: 0,
            style: { fontSize: '14px' },
        },
    };

    return (
        <ReactApexChart options={optionsSpark} series={seriesSpark3} type="area" />
    );
};


export function AlternativeAreaChart() {
    const [chartData] = useState({
        series: [
            {
                name: 'Sales',
                data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5],
            },
        ],
        options: {
            chart: {
                type: 'line',
            },
            title: {
                text: '$245,965',
                offsetX: 0,
                style: { fontSize: '24px' },
            },
            stroke: {
                width: 5,
                curve: 'smooth',
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'dark',
                    gradientToColors: ['#FDD835'],
                    shadeIntensity: 1,
                    type: 'horizontal',
                    opacityFrom: 0.5,
                    opacityTo: 0.5,
                    stops: [0, 100, 100, 100],
                },
            },
            xaxis: {
                labels: { show: false },
                axisBorder: { show: false },
                axisTicks: { show: false },
            },
            yaxis: {
                show: false,
            },
            grid: {
                show: false,
            },
            markers: {
                size: 0,
            },
            tooltip: {
                enabled: true,
            },
        },
    });

    return (
        <div>
            <div id="chart">
                <ReactApexChart
                    options={chartData.options}
                    series={chartData.series}
                    type="line"
                    height={"auto"}
                />
            </div>
        </div>
    );
}

export function SigleLineChart() {
    const [chartData] = useState({
        series: [
            {
                name: ' ',
                data: [
                    { x: 'Jan', y: [-2, 4] },
                    { x: 'Feb', y: [-1, 6] },
                    { x: 'Mar', y: [3, 10] },
                    { x: 'Apr', y: [8, 16] },
                    { x: 'May', y: [13, 22] },
                    { x: 'Jun', y: [18, 26] },
                    { x: 'Jul', y: [21, 29] },
                    { x: 'Aug', y: [21, 28] },
                    { x: 'Sep', y: [17, 24] },
                    { x: 'Oct', y: [11, 18] },
                    { x: 'Nov', y: [6, 12] },
                    { x: 'Dec', y: [1, 7] },
                ],
            },
        ],
       
        options: {
            chart: {
                height: 'auto',
                type: 'rangeArea',
            },
            stroke: {
                curve: 'monotoneCubic',
            },
             title: {
            text: '$15,965',
            offsetX: 0,
            style: { fontSize: '24px' },
        },
            markers: {
                hover: {
                    sizeOffset: 5,

                },
            },
            dataLabels: {
                enabled: false,
            },
            xaxis: {
                labels: { show: false },
                axisBorder: { show: false },
                axisTicks: { show: false },
            },
            yaxis: {
                show: false,
            },
        },
    });

    return (
        <div>
            <div id="chart">
                <ReactApexChart
                    options={chartData.options}
                    series={chartData.series}
                    type="rangeArea"
                    height={"auto"}
                />
            </div>
            <div id="html-dist"></div>
        </div>
    );
}