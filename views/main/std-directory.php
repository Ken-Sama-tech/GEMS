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
    <div class="col-10 position-fixed end-0 h-100 d-flex flex-column p-4 align-items-center justify-content-center ">

        <nav class="navbar bg-body-tertiary border container-fluid rounded-2 m-2">
            <div class="container-fluid d-flex justify-content-start position-relative g-2">
                <div class="d-flex mx-2 " role="search">
                    <!-- search -->
                    <input class="form-control" type="search" placeholder="Search" id="std-directory-search" aria-label="Search">
                    <!-- end of search -->
                </div>
                <!-- Sort -->
                <ul class="navbar-nav mx-2">
                    <li class="nav-item dropdown">
                        <button class="btn btn-success dropdown-toggle" type="button" id="dropdownSort" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="false">
                            Sort
                        </button>
                        <ul class="dropdown-menu border border-success position-absolute" aria-labelledby="dropdownSort">
                            <form>
                                <li>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="sort-asc">
                                        <label class="form-check-label" for="sort-asc">
                                            Ascending
                                        </label>
                                    </div>
                                </li>
                                <li>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="sort-dsc">
                                        <label class="form-check-label" for="sort-dsc">
                                            Descending
                                        </label>
                                    </div>
                                </li>
                                <div class="dropdown-divider"></div>
                                <li>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="sort-via-lrn">
                                        <label class="form-check-label" for="sort-via-lrn">
                                            LRN
                                        </label>
                                    </div>
                                </li>
                                <li>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="sort-via-name">
                                        <label class="form-check-label" for="sort-via-name">
                                            Name
                                        </label>
                                    </div>
                                </li>
                                <li>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="sort-via-grd-lvl">
                                        <label class="form-check-label" for="sort-via-grd-lvl">
                                            Grade Level
                                        </label>
                                    </div>
                                </li>
                            </form>
                        </ul>
                    </li>
                </ul>
                <!-- End of Sort -->

                <!-- Filter -->
                <ul class="navbar-nav mx-2">
                    <li class="nav-item dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownFilter" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="false">
                            Filter
                        </button>
                        <ul class="dropdown-menu border border-success position-absolute" aria-labelledby="dropdownFilter">
                            <form>
                                <li>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="filter-grd-7">
                                        <label class="form-check-label" for="filter-grd-7">
                                            Grade 7
                                        </label>
                                    </div>
                                </li>
                                <li>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="filter-grd-8">
                                        <label class="form-check-label" for="filter-grd-8">
                                            Grade 8
                                        </label>
                                    </div>
                                </li>
                                <li>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="filter-grd-9">
                                        <label class="form-check-label" for="filter-grd-9">
                                            Grade 9
                                        </label>
                                    </div>
                                </li>
                                <li>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="filter-grd-10">
                                        <label class="form-check-label" for="filter-grd-10">
                                            Grade 10
                                        </label>
                                    </div>
                                </li>
                                <li>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="filter-grd-11">
                                        <label class="form-check-label" for="filter-grd-11">
                                            Grade 11
                                        </label>
                                    </div>
                                </li>
                                <li>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="filter-grd-12">
                                        <label class="form-check-label" for="filter-grd-12">
                                            Grade 12
                                        </label>
                                    </div>
                                </li>
                                <li>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="filter-male">
                                        <label class="form-check-label" for="filter-male">
                                            Male
                                        </label>
                                    </div>
                                </li>
                                <li>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="filter-female">
                                        <label class="form-check-label" for="filter-female">
                                            Female
                                        </label>
                                    </div>
                                </li>
                            </form>
                        </ul>
                    </li>
                </ul>
                <!-- End of Filter -->
            </div>
        </nav>

        <!-- -->
        <div class="container rounded-2 overflow-y-auto border h-100 p-2">
            <div class="container-fluid border col-2 p-2 border col-12 d-flex rounded-2">

            </div>
        </div>

    </div>
</body>
<!-- script section here-->
<script type="module" src="../script/script.js"></script>
<script src="../../includes/navbar/navbar.js"></script>
<script type="module" src="../../controller/StudentDirectoryController.js"></script>
<script src="../../bootstraps/node_modules/@popperjs/core/dist/umd/popper.min.js"></script>
<script src="../../bootstraps/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"></script>

</html>