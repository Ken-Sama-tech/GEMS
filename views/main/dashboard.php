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

    <div id="container" class="container-fluid d-flex flex-wrap col-lg-10 col-md-9 overflow-y-auto remove-scroll-bar position-absolute h-100 end-0">

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

        <div class="container-fluid h-100 my-2 d-flex flex-column align-items-center border border-danger">

            <div class="row w-100 p-0 border border-2 d-md-grid d-lg-flex h-50 position-relative gap-0" id="charts-section">
                <div class="position-absolute end-0 pointer chart-toggle-btn d-flex" style="height:19px; width:50px;"> 
                    <span class="position-absolute border border-2 border-secondary min-max-sym" style="height:1px; width:15px;"></span>
                    <span class="position-absolute border border-2 border-secondary min-max-sym" style="height:1px; width:15px;"></span>
                </div>
                <!-- Chart Section -->
                <section id="doughnut-chart" class="col-md-12 col-lg-4 p-0 h-100">
                    <div class="w-100 h-100">
                        <canvas id="violations-severity-chart" class="w-100 h-100"></canvas>
                    </div>
                </section>

                <!-- Statistic Time Range -->
                <section id="statistic-time-range-section" class="col-md-12 col-lg-2 col h-100 pt-1 border border-2 ">
                    <select id="statistic-time-range" value="1" class="form-select h-0">
                        <option value="1" id="option">Overall</option>
                        <option value="2" id="option">Yearly</option>
                        <option value="3" id="option">Monthly</option>
                        <option value="4" id="option">Weekly</option>
                        <option value="5" id="option">Daily</option>
                    </select>

                    <input type="text" class="mt-2 form-control h-0" id="calculator">
                    <button class="btn btn-primary mt-2 w-100 h-0" id="calculate-btn">Calculate</button>
                </section>

                <section id="scatter-chart" class="col-md-12 col-lg-6 h-100 p-0">
                    <div class="w-100 h-100">
                        <canvas id="violations-chart" class="h-100"></canvas>
                    </div>
                </section>

            </div>

            <div class="container border border-primary h-50 m-0 col-12 d-flex p-0 mt-3">
                <div class="col-lg-6 border border-dark">
                    <span>To do list</span>
                </div>
                <div class="col-lg-6 border border-dark"></div>
            </div>
        </div>
    </div>
</body>
<!-- script section here-->
<script type="module" src="../../controllers/DashboardController.js" defer></script>
<script src=" ../../includes/navbar/navbar.js">
</script>
</html>