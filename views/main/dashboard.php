<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="../../includes/navbar/navbar.css">
    <link rel="stylesheet" href="../../style/style.css">
    <!-- charts src -->
    <script src="../../charts/node_modules/chart.js/dist/chart.umd.js"></script>
</head>

<body>
    <?php
    require_once '../../includes/navbar/navbar.php';
    ?>

    <div id="container" class="container-fluid d-flex flex-column col-lg-10 col-md-9 overflow-y-auto remove-scroll-bar position-absolute h-100 end-0">

        <section id="cards-section" class="container-fluid overflow-x-auto mt-1 position-relative col-12 custom-scroll-bar rounded-2 ">

            <div class="col-3 card bg-primary text-light" id="cards">
                <h3 id="card-header" class="ps-2">Grade 7</h3>
                <div class="line w-100 m-0 p-0 bg-light mb-3" style="height:2px"></div>
                <h3 class="text-center" id="violation-counter">0</h3>
                <p id="card-text" class="ps-2">Some sentence or sorts</p>
            </div>

            <div class="col-3 card bg-success text-light" id="cards">
                <h3 id="card-header" class="ps-2">Grade 8</h3>
                <div class="line w-100 m-0 p-0 bg-light mb-3" style="height:2px"></div>
                <h3 class="text-center" id="violation-counter">0</h3>
                <p id="card-text" class="ps-2">Some sentence or sorts</p>
            </div>

            <div class="col-3 card bg-secondary text-light" id="cards">
                <h3 id="card-header" class="ps-2">Grade 9</h3>
                <div class="line w-100 m-0 p-0 bg-light mb-3" style="height:2px"></div>
                <h3 class="text-center" id="violation-counter">0</h3>
                <p id="card-text" class="ps-2">Some sentence or sorts</p>
            </div>

            <div class="col-3 card bg-danger text-light" id="cards">
                <h3 id="card-header" class="ps-2">Grade 10</h3>
                <div class="line w-100 m-0 p-0 bg-light mb-3" style="height:2px"></div>
                <h3 class="text-center" id="violation-counter">0</h3>
                <p id="card-text" class="ps-2">Some sentence or sorts</p>
            </div>

            <div class="col-3 card bg-warning text-light" id="cards">
                <h3 id="card-header" class="ps-2">Grade 11</h3>
                <div class="line w-100 m-0 p-0 bg-light mb-3" style="height:2px"></div>
                <h3 class="text-center" id="violation-counter">0</h3>
                <p id="card-text" class="ps-2">Some sentence or sorts</p>
            </div>

            <div class="col-3 card bg-dark text-light" id="cards">
                <h3 id="card-header" class="ps-2">Grade 12 </h3>
                <div class="line w-100 m-0 p-0 bg-light mb-3" style="height:2px"></div>
                <h3 class="text-center" id="violation-counter">0</h3>
                <p id="card-text" class="ps-2">Some sentence or sorts</p>
            </div>

            <!-- template -->
            <template id="cards-template">
                <div class="col-3 card bg-success text-light" id="cards">
                    <h3 id="card-header" class="ps-2">Grade 7</h3>
                    <div class="line w-100 m-0 p-0 bg-light mb-3" style="height:2px"></div>
                    <h3 class="text-center" id="violation-counter">0</h3>
                    <p id="card-text" class="ps-2">Idk</p>
                </div>
            </template>
        </section>

        <div class="container-fluid my-2 d-flex flex-column align-items-center p-0" id="dashboard-main-section">

            <div class="row w-100 p-0 border border-2 d-lg-flex flex-wrap position-relative gap-0" id="charts-section">
                <div class="position-absolute end-0 pointer chart-toggle-btn d-flex">
                    <span class="position-absolute border border-2 border-secondary min-max-sym"></span>
                    <span class="position-absolute border border-2 border-secondary min-max-sym"></span>
                </div>
                <!-- Chart Section -->
                <section id="doughnut-chart" class="col-md-12 col-lg-4 p-0 h-100">
                    <div class="w-100 h-100">
                        <canvas id="violations-severity-chart" class="w-100 h-100"></canvas>
                    </div>
                </section>

                <!-- Statistic Time Range -->
                <section id="statistic-time-range-section" class="col-md-12 col-lg-2 col h-100 pt-1 d-flex flex-column align-items-center mt-2 justify-content-start gap-0">
                    <select id="statistic-time-range" value="1" class="form-select w-100">
                        <option value="1" id="option">Overall</option>
                        <option value="2" id="option">Yearly</option>
                        <option value="3" id="option">Monthly</option>
                        <option value="4" id="option">Weekly</option>
                        <option value="5" id="option">Daily</option>
                    </select>

                    <input type="text" class="mt-2 form-control w-100" id="calculator">
                    <button class="btn btn-primary mt-2 w-100" id="calculate-btn">Calculate</button>
                </section>

                <section id="scatter-chart" class="col-md-12 col-lg-6 h-100 p-0">
                    <div class="w-100 h-100">
                        <canvas id="violations-chart" class="h-100"></canvas>
                    </div>
                </section>

            </div>

            <div class="container-fluid m-0 col-12 d-flex flex-wrap p-0 mt-3" id="progress-tracker">

                <div class="col-12 col-lg-6 border border-2 border-primary border-primary h-100 position-relative" id="to-do-list-container">
                    <span class="fs-5 fw-bolder" style="height: 20px;">To Do List</span>
                    <ul class="list-group w-100 overflow-auto" id="to-do-list-body">

                    </ul>
                    <div class="add-new-to-do-list w-100 bg-light border-top border-2 p-1 d-flex align-items-center justify-content-between">
                        <input type="text" id="new-task" class="h-100 w-75">
                        <button class="btn btn-primary py-1" id="add-new-list">Add a new list</button>
                    </div>

                    <!-- context menu -->
                    <div class="container p-0 position-absolute d-none contextmenu rounded-3 px-2">
                        <ul class="list-group d-flex justify-content-center h-100">
                            <li class="list-group-item bg-danger text-light dlt-task-btn pointer">Delete Task</li>
                        </ul>
                    </div>
                </div>

                <!-- template -->
                <template id="to-do-list-template">
                    <li class="list-group-item d-flex gap-2 hover-gray" id="to-do-list-row">
                        <input type="checkbox" class="btn-check" id="to-do-list-checkbox" to-do-list-checkbox>
                        <label class="btn btn-outline-primary text-light py-0 px-2 rounded-0" for="to-do-list-checkbox" id="checkbox-label">&check;</label>
                        <span class="col-8 text-nowrap ps-2 overflow-x-auto remove-scroll-bar fw-bold task"></span>
                        <span class="col-2 text-center to-do-status ms-5"></span>
                    </li>
                </template>
                <div class="col-12 col-lg-6 border"></div>
            </div>
        </div>
    </div>
</body>
<!-- script section here-->
<script type="module" src="../../script/script.js"></script>
<script type="module" src="../../controllers/DashboardController.js" defer></script>
<script src=" ../../includes/navbar/navbar.js">
</script>

</html>