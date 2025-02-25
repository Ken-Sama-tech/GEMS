import Chart from '.././chart.js/auto'

class Display {
    async chart() {
        const data = [
            { year: 2010, count: 10 },
            { year: 2011, count: 20 },
            { year: 2012, count: 15 },
            { year: 2013, count: 25 },
            { year: 2014, count: 22 },
            { year: 2015, count: 30 },
            { year: 2016, count: 28 }
        ];

        new Chart(document.getElementById('violations-chart'), {
            type: "doughnut",
            data: {
                labels: data.map(row => row.year),
                datasets: [{
                    data: data.map(row => row.count),
                    backgroundColor: [
                        'red', 'blue', 'green', 'yellow', 'purple', 'orange', 'cyan'
                    ]
                }]
            }
        });
    }
}

const display = new Display();
display.chart();
