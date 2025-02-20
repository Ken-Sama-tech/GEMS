<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="../../includes/navbar/navbar.css">
    <link rel="stylesheet" href="../../style/style.css">
</head>

<body>
    <?php
    require_once '../../includes/navbar/navbar.php';
    ?>

    <div id="container" class="container-fluid border col-lg-10 col-md-9 border-danger position-absolute h-100 end-0">
        <section id="cards-section" class="container-fluid overflow-x-auto border border-primary mt-3 position-relative col-12 ">

            <div class="col-3 card bg-success  text-light" id="cards">
                <h3 id="card-header" class="ps-2">Grade 7</h3>
                <div class="line w-100 m-0 p-0 bg-light" style="height:2px"></div>
                <h3 class="text-center" id="violation-counter">0</h3>
                <p id="card-text" class="ps-2">Idk</p>
            </div>
            <!-- template -->
            <template id="cards-template">
                <div class="col-3 card bg-success  text-light" id="cards">
                    <h3 id="card-header" class="ps-2">Grade 7</h3>
                    <div class="line w-100 m-0 p-0 bg-light" style="height:2px"></div>
                    <h3 class="text-center" id="violation-counter">0</h3>
                    <p id="card-text" class="ps-2">Idk</p>
                </div>
            </template>
        </section>


    </div>
</body>
<!-- script section here-->
<script src="../../includes/navbar/navbar.js"></script>

</html>