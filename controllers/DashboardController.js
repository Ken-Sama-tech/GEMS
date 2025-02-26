import {
    EventListener,
    GlobalEventListeners,
    Debounce
} from "../includes/utils/js/domHelper";

const evntLi = new EventListener();
const event = new GlobalEventListeners();
const utils = new Debounce();

class Charts {
    doughnutChart(canvasID, arrLabels, arrData, ) {
        const canvas = document.querySelector(canvasID);

        // Check if the canvas exists
        if (!canvas) {
            console.error(`Canvas element with ID ${canvasID} not found.`);
            return;
        }

        const ctx = canvas.getContext('2d');

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: arrLabels,
                datasets: [{
                    label: 'severity',
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

        new Chart(ctx, {
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
}



const changeChartRange = (() => {

    const range = document.getElementById('statistic-time-range');
    evntLi.callEvent(range, 'change', () => {
        updateCharts();
    });

    const updateCharts = utils.debounce(() => {

        // if (range.value === 5)
        chart.scatterChart('#violations-chart', ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7'], [10, 20, 2, 2, 9, 7, 22], [8, 9, 0, 10, 5, 6, 7]);

        // console.log('sa');
    }, 500);
})();

const chart = new Charts();
chart.doughnutChart('#violations-severity-chart', ['Critical', 'Major', 'Minor'], [10, 20, 30]);
chart.scatterChart('#violations-chart', ['Week1', 'Week2', 'Week3', 'week4'], [10, 20, 102, 2], [8, 9, 0, 10]);