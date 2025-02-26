<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="../../includes/navbar/navbar.css">
    <link rel="stylesheet" href="../../style/style.css">
    <script src="../../charts/node_modules/chart.js/dist/chart.umd.js"></script>
</head>

<body>
    <?php
    require_once '../../includes/navbar/navbar.php';
    ?>

    <div id="container" class="container-fluid d-flex flex-wrap col-lg-10 col-md-9 overflow-y-auto remove-scroll-bar position-absolute h-100 end-0">

        <section id="cards-section" class="container-fluid overflow-x-auto mt-1 position-relative col-12 border border-2 border-secondary rounded-2 ">

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
                <div class="col-3 card bg-success  text-light" id="cards">
                    <h3 id="card-header" class="ps-2">Grade 7</h3>
                    <div class="line w-100 m-0 p-0 bg-light mb-3" style="height:2px"></div>
                    <h3 class="text-center" id="violation-counter">0</h3>
                    <p id="card-text" class="ps-2">Idk</p>
                </div>
            </template>
        </section>

        <div class="container-fluid h-100 my-2 d-flex justify-content-center align-items-start">

            <div class="row w-100 p-0 border border-dark d-flex" style="height: 50%;">

                <!-- Chart Section -->
                <section id="doughnut-chart" class="col-md-12 col-lg-4 p-0 h-100">
                    <div class="w-100 h-100">
                        <canvas id="violations-severity-chart" class="w-100 h-100"></canvas>
                    </div>
                </section>

                <!-- Statistic Time Range -->
                <section id="statistic-time-range-section" class="col-md-12 col-lg-2 colh-100 pt-1 border border-2">
                    <select id="statistic-time-range" value="1" class="form-select">
                        <option value="1" id="option">Overall</option>
                        <option value="2" id="option">Year</option>
                        <option value="3" id="option">Monthly</option>
                        <option value="4" id="option">Weekly</option>
                        <option value="5" id="option">Daily</option>
                    </select>
                </section>

                <!-- Additional Section -->
                <section id="scatter-chart" class="col-md-12 col-lg-6 h-100 p-0">
                    <div class="w-100 h-100">
                        <canvas id="violations-chart" class="border border-primary h-100"></canvas>
                    </div>
                </section>

            </div>
        </div>
    </div>
</body>
<!-- script section here-->
<script type="module" src="../../controllers/DashboardController.js" defer></script>
<script src=" ../../includes/navbar/navbar.js">
</script>

</html>