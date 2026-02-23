import { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

class PieChart extends Component {
    constructor(props) {
        super(props);

        const seriesData = [44, 55, 41, 17, 15];
        const totalSum = seriesData.reduce((a, b) => a + b, 0);

        this.state = {
            series: seriesData,
            options: {
                chart: {
                    type: 'donut',
                    width: '100%',
                },
                labels: ['Series 1', 'Series 2', 'Series 3', 'Series 4', 'Series 5'],
                legend: {
                    position: 'left',
                    horizontalAlign: 'center',
                    offsetY: 0,
                    fontSize: '14px',
                },
                dataLabels: {
                    enabled: false,
                },
                plotOptions: {
                    pie: {
                        donut: {
                            labels: {
                                show: true,
                                total: {
                                    show: true,
                                    label: 'Total',
                                    fontSize: '20px', 
                                    formatter: () => totalSum,
                                    style: {
                                        show: true,
                                        label: 'Total',
                                        fontSize: '20px', 
                                        fontWeight: 600, 
                                    },
                                },
                            },
                        },
                    },
                },
                responsive: [
                    {
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200,
                            },
                            legend: {
                                position: 'bottom',
                            },
                        },
                    },
                ],
            },
        };
    }

    render() {
        return (
            <div id="chart">
                <ReactApexChart
                    options={this.state.options}
                    series={this.state.series}
                    type="donut"
                    height={350}
                />
            </div>
        );
    }
}

export default PieChart;
