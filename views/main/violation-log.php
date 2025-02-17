<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="../../bootstraps/node_modules/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="../../includes/navbar/navbar.css">
    <link rel="stylesheet" href="../style/style.css">
</head>

<body>
    <?php
    require_once '../../includes/navbar/navbar.php';
    ?>

    <div class="container-fluid col-lg-10 col-md-9 position-absolute end-0 d-flex flex-wrap align-items-start pt-4" id="container">

        <!-- nav -->
        <nav class="navbar border rounded-3 position-sticky top-0 bg-light w-100 z-2 ">
            <div class="container-fluid">
                <div class="d-flex" role="search">
                    <input class="form-control me-2" name="VL-input" type="search" placeholder="Search" aria-label="Search" id="VL-search">

                    <div class="container position-relative w-25">

                        <div class="d-flex justify-content-center align-items-center h-100" id="hdm-container">
                            <span class="horizontal-dots-menu"></span>
                            <span class="horizontal-dots-menu"></span>
                            <span class="horizontal-dots-menu"></span>
                        </div>

                        <!-- drop-down-list -->
                        <ul class="hdm-menu">
                            <h6>Filter</h6>
                            <li class="hdm-item">
                                <input type="checkbox" name="VL-setting" id="VL-filter-male">
                                <label for="VL-filter-male"> Male </label>
                            </li>
                            <li class="hdm-item">
                                <input type="checkbox" name="VL-setting" id="VL-filter-female">
                                <label for="VL-filter-female"> Female </label>
                            </li>
                            <li class="hdm-item">
                                <label for="VL-filter-violation"> Violation </label>
                                <input type="text" name="VL-input" class="ms-4 w-75" id="VL-filter-violation">
                            </li>
                            <h6>Additional Setting</h6>
                            <li class="hdm-item">
                                <input type="checkbox" name="VL-setting" id="VL-show-description">
                                <label for="VL-show-description">Show Description</label>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>

        <div class="container-fluid d-flex flex-column w-100 overflow-y-auto z-1 h-100 ">
            <!-- table -->
            <table class="table bg-light rounded-3 mt-3 w-100 text-center">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">LRN</th>
                        <th scope="col">Name</th>
                        <th scope="col">Sex</th>
                        <th scope="col">Violation</th>
                        <th scope="col">Date</th>
                    </tr>
                </thead>
                <tbody id="violation-log-tBody">
                </tbody>
            </table>
            <!-- template -->
            <template id="violation-log-template">
                <tr id="VL-tr" selected>
                    <th selected scope="col" id="row-num">x</th>
                    <td selected id="lrn"></td>
                    <td selected id="name"></td>
                    <td selected id="sex"></td>
                    <td selected id="violation"></td>
                    <td selected id="date"></td>
                </tr>
            </template>
        </div>

    </div>
    <!-- modals -->
    <?php
    require_once('../../includes/modals/modify_violation_modal.php');
    ?>
    <!-- script section here-->
    <script src="../../includes/navbar/navbar.js"></script>
    <script type="module" src="../script/script.js"></script>
    <script type="module" src="../../controllers/ViolationLogController.js"></script>
    <script src="../../bootstraps/node_modules/@popperjs/core/dist/umd/popper.min.js"></script>
    <script src="../../bootstraps/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>