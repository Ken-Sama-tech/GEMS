<?php
require_once('../../includes/ui-kit/session.php');
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <?php
    require_once('../../includes/ui-kit/css/styles.html');
    ?>
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

            <div class="col-3 card custom-bg text-light" id="cards">
                <h3 id="card-header" class="ps-2">Grade 12 </h3>
                <div class="line w-100 m-0 p-0 bg-light mb-3" style="height:2px"></div>
                <h3 class="text-center" id="violation-counter">0</h3>
                <p id="card-text" class="ps-2">Some sentence or sorts</p>
            </div>
        </section>

        <div class="container-fluid my-2 d-flex flex-column align-items-center p-0 " id="dashboard-main-section">

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
                <!-- to do list  -->
                <div class="col-12 col-lg-6 border border-secondary h-100 position-relative" id="to-do-list-container">
                    <div class="w-100" style="height:35px">
                        <span class="fs-5 fw-bolder ps-2">To Do List</span>
                    </div>
                    <ul class="list-group w-100 overflow-auto" id="to-do-list-body">

                    </ul>
                    <div class="add-new-to-do-list w-100 bg-light border-top border-2 p-1 d-flex align-items-center justify-content-between">
                        <input type="text" id="new-task" class="h-100 w-75">
                        <button class="btn btn-primary py-1 text-truncate" id="add-new-list">Add a new list</button>
                    </div>

                    <!-- context menu -->
                    <div class="container p-0 position-absolute d-none contextmenu rounded-3 px-2">
                        <ul class="list-group d-flex justify-content-center h-100">
                            <li class="list-group-item bg-danger text-light dlt-task-btn pointer">Delete Task</li>
                        </ul>
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
                </div>

                <div class="col-12 col-lg-6 position-relative h-100 border border-secondary" id="student-progress-log-container">
                    <!-- student progress -->
                    <nav class="navbar d-flex p-0 border border-bottom align-item-start" id="mini-navbar">
                        <span class="fs-5 fw-bolder ps-2">Student Progress Log</span>
                        <input type="search" id="mini-search-bar" placeholder="Search...">
                    </nav>
                    <ul class="list-group w-100 overflow-auto" id="progress-log">
                    </ul>

                    <!-- context menu -->
                    <div class="container p-0 position-absolute d-none progress-logs-contextmenu rounded-3 px-2">
                        <ul class="list-group d-flex justify-content-center h-100">
                            <li class="list-group-item pointer hover-gray" set-status-to="PENDING">PENDING</li>
                            <li class="list-group-item pointer hover-gray" set-status-to="IN-PROGRESS">IN-PROGRESS</li>
                            <li class="list-group-item pointer hover-gray" set-status-to="COMPLETED">COMPLETED</li>
                        </ul>
                    </div>

                    <!-- template -->
                    <template id="progress-log-template">
                        <li class="list-group-item d-flex gap-2 hover-gray" id="progress-log-row">
                            <span class="col-3 lrn"></span>
                            <span class="col-5 text-nowrap ps-2 overflow-x-auto remove-scroll-bar fw-bold log-desc"></span>
                            <span class="col-1 text-center progress-status ms-5"></span>
                        </li>
                    </template>
                </div>
            </div>
        </div>
    </div>
</body>
<script type="module" src="../../controllers/DashboardController.js" defer></script>
<?php
require_once('../../includes/ui-kit/js/scripts.html');
?>
</script>

</html>