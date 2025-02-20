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

    <div id="container" class="container-fluid border border-3 border-danger position-fixed col-lg-10 col-md-9 end-0 d-flex overflow-y-auto flex-column justify-content-center h-100">

        <!-- search -->
        <nav class="navbar bg-body-tertiary">
            <div class="container-fluid">
                <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                </form>
            </div>
        </nav>

        <!-- main section -->
        <div class="container gap-2 d-flex flex-column" id="reg-main-container">

            <section id="reg-upper-section" class="border border-primary">

            </section>
            <section id="reg-lower-section" class=" d-flex gap-1">
                <div id="drop-container">
                    <select name="" id="select-grade-level" class="w-100">
                        <option value="">example</option>
                        <option value="">example</option>
                        <option value="">example</option>
                    </select>

                    <select name="" id="select-grade-section" class="w-100">
                        <option value="">example</option>
                        <option value="">example</option>
                        <option value="">example</option>
                    </select>
                </div>
                <div id="drop-container"></div>
                <div id="drop-container"></div>
                <div id="drop-container"></div>
                <div id="drop-container"></div>

                <template id="drop-container-template">
                    <div id="drop-container">

                    </div>
                </template>
            </section>
        </div>
    </div>
    <!-- script section here-->
    <script src="../../script/script.js"></script>
    <script src="../../includes/navbar/navbar.js"></script>
</body>

</html>