import {
    EventListener,
    GlobalEventListeners,
    Debounce
} from "../includes/utils/js/domHelper";

const evntLi = new EventListener();
const event = new GlobalEventListeners();
const utils = new Debounce();

class Charts {
    constructor() {
        this.doughnut = null;
        this.scatter = null;
    }
    doughnutChart(canvasID, arrLabels, arrData, ) {
        const canvas = document.querySelector(canvasID);

        if (!canvas) {
            console.error(`Canvas element with ID ${canvasID} not found.`);
            return;
        }

        const ctx = canvas.getContext('2d');

        this.doughnut = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: arrLabels,
                datasets: [{
                    label: 'Total',
                    data: arrData,
                    backgroundColor: ['#FF0000', '#FFA500', '#FFFF00'],
                    hoverOffset: 2
                }]
            },
            options: {
                cutout: '60%',
            }
        });
    }

    scatterChart(canvasID, range, arrData, trendData) {
        const canvas = document.querySelector(canvasID);

        if (!canvas) {
            console.error(`Canvas element with ID ${canvasID} not found.`);
            return;
        }

        const ctx = canvas.getContext('2d');

        this.scatter = new Chart(ctx, {
            type: 'scatter',
            data: {
                labels: range,
                datasets: [{
                    type: 'bar',
                    label: 'Total Violations',
                    data: arrData,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: '#FF0000',
                }, {
                    type: 'line',
                    label: 'Average Violations',
                    data: trendData,
                    fill: false,
                    borderColor: 'rgb(54, 162, 235)'
                }]
            },
            options: {
                responsive: true,
            }
        });
    }

    updateChart(chart, callback) {

        if (chart != null)
            chart.destroy();

        if (callback)
            callback();
    }
}

const charts = new Charts();

const chartSetings = (() => {

    const changeChartTimeRange = utils.debounce(() => {
        if (range.value == 5) {
            charts.updateChart(charts.scatter, () => {
                charts.scatterChart('#violations-chart',
                    ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                    [12, 18, 15, 20, 25, 30, 22],
                    [6, 9, 8, 10, 12, 15, 11]
                );
            });

            charts.updateChart(charts.doughnut, () => {
                charts.doughnutChart('#violations-severity-chart',
                    ['Critical', 'Major', 'Minor'],
                    [14, 43, 85]
                );
            });
        }

        if (range.value == 4) {
            charts.updateChart(charts.scatter, () => {
                charts.scatterChart('#violations-chart',
                    ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                    [45, 50, 72, 60],
                    [10, 15, 18, 14]
                );
            });

            charts.updateChart(charts.doughnut, () => {
                charts.doughnutChart('#violations-severity-chart',
                    ['Critical', 'Major', 'Minor'],
                    [23, 68, 136]
                );
            });
        }

        if (range.value == 3) {
            charts.updateChart(charts.scatter, () => {
                charts.scatterChart('#violations-chart',
                    ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    [30, 25, 40, 35, 50, 75, 90, 85, 70, 60, 45, 35],
                    [10, 12, 15, 14, 20, 30, 35, 33, 28, 22, 18, 12]
                );
            });

            charts.updateChart(charts.doughnut, () => {
                charts.doughnutChart('#violations-severity-chart',
                    ['Critical', 'Major', 'Minor'],
                    [64, 192, 384]
                );
            });
        }

        if (range.value == 2) {
            let latestYearTotal = 1450;

            charts.updateChart(charts.scatter, () => {
                charts.scatterChart('#violations-chart',
                    ['Year 2'],
                    [1450],
                    [870]
                );
            });

            charts.updateChart(charts.doughnut, () => {
                charts.doughnutChart('#violations-severity-chart',
                    ['Critical', 'Major', 'Minor'],
                    [145, 435, 870]
                );
            });
        }

        if (range.value == 1) {
            charts.updateChart(charts.scatter, () => {
                charts.scatterChart('#violations-chart',
                    ['Year 1', 'Year 2'],
                    [1200, 1450],
                    [750, 870]
                );
            });

            charts.updateChart(charts.doughnut, () => {
                charts.doughnutChart('#violations-severity-chart',
                    ['Critical', 'Major', 'Minor'],
                    [265, 795, 1590]
                );
            });
        }

    }, 500);

    const range = document.getElementById('statistic-time-range');
    evntLi.callEvent(range, 'change', () => {
        changeChartTimeRange();
    });

    changeChartTimeRange();
})();

const simpleCalculator = (() => {

    function isValidExpression(input) {
        const regex = /^-?(\d+(\.\d+)?)([+\-*/]-?(\d+(\.\d+)?))*$/;
        return regex.test(input);
    }

    function calculate(input) {
        if (!isValidExpression(input)) {
            return "Invalid input";
        }

        try {
            return eval(input);
        } catch (error) {
            return "Error in calculation";
        }
    }

    const calculateBtn = document.getElementById('calculate-btn');
    evntLi.callEvent(calculateBtn, 'click', () => {
        const calculator = document.getElementById('calculator')
        const result = eval(calculator.value);
        calculator.value = result;
    });
})();