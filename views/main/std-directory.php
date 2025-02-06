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
    <div class="container-fluid col-lg-10 col-md-9 col-12 position-absolute end-0 h-100 d-flex flex-column p-1 align-items-center justify-content-center" id="container">

        <nav class="navbar container-fluid bg-body-tertiary border rounded-4 m-2">
            <div class="container-fluid d-flex justify-content-start position-relative g-2">
                <div class="d-flex mx-2 " role="search">
                    <!-- search -->
                    <input class="form-control rounded-3" type="search" placeholder="Search" id="std-directory-search" aria-label="Search">
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
                                        <input class="form-check-input" checked name="order" type="radio" value="" id="sort-asc">
                                        <label class="form-check-label" for="sort-asc">
                                            Ascending
                                        </label>
                                    </div>
                                </li>
                                <li>
                                    <div class="form-check">
                                        <input class="form-check-input" name="order" type="radio" value="" id="sort-dsc">
                                        <label class="form-check-label" for="sort-dsc">
                                            Descending
                                        </label>
                                    </div>
                                </li>
                                <div class="dropdown-divider"></div>
                                <li>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" name="order" id="sort-via-lrn">
                                        <label class="form-check-label" for="sort-via-lrn">
                                            LRN
                                        </label>
                                    </div>
                                </li>
                                <li>
                                    <div class="form-check">
                                        <input class="form-check-input" checked type="checkbox" name="order" id="sort-via-name">
                                        <label class="form-check-label" for="sort-via-name">
                                            Name
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
                                        <input class="form-check-input" type="checkbox" name="filter" value="MALE" id="filter-male">
                                        <label class="form-check-label" for="filter-male">
                                            Male
                                        </label>
                                    </div>
                                </li>
                                <li>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" name="filter" value="FEMALE" id="filter-female">
                                        <label class="form-check-label" for="filter-female">
                                            Female
                                        </label>
                                    </div>
                                </li>
                                <li>
                                    <div class="form-check">
                                        <label class="form-check-label" for="filter-address">
                                            Address
                                        </label>
                                        <input class="mx-2" type="text" value="" id="filter-address">
                                    </div>
                                </li>
                            </form>
                        </ul>
                    </li>
                </ul>
                <!-- End of Filter -->
            </div>
        </nav>

        <section class="container-fluid rounded-4 overflow-y-auto border h-100 p-3 d-flex flex-column gap-2" id="std-profile-box-container">
        </section>

        <!--student directory body-->
        <template id="profile-box-temp">
            <!-- student profile boxes or whatever this is  -->
            <div class="container-fluid border d-flex z-2 p-2 border col-12 rounded-3 bg-light border-dark" id="profile-box" show-detail>
                <div class="row m-auto d-flex">
                    <div class="col-12 col-md-4 col-lg-2 d-flex justify-content-center align-items-center">
                        <a id="std-profile-link" class="overflow-hidden rounded-2 p-0 h-100 w-100">
                            <img src="" class="img-fluid" alt="Student Profile" id="std-profile-img">
                        </a>
                    </div>

                    <div class="col-12 col-md-7 col-lg-10 flex-wrap h-100 d-flex justify-content-center align-items-center z-0" id="p-container" show-detail>
                        <p class=" h-100 col-12 col-md-12 col-lg-6 text-break border ps-1" show-detail>Name:</p>
                        <p class=" h-100 col-12 col-md-6 col-lg-6 text-break border ps-1" show-detail>LRN: </p>
                        <p class=" h-100 col-12 col-md-6 col-lg-3 text-break border ps-1" show-detail>Civil Status: </p>
                        <p class=" h-100 col-12 col-md-6 col-lg-3 text-break border ps-1" show-detail>Birthdate: </p>
                        <p class=" h-100 col-12 col-md-6 col-lg-3 text-break border ps-1" show-detail>Sex: </p>
                        <p class=" h-100 col-12 col-md-6 col-lg-3 text-break border ps-1" show-detail>Nationality: </p>
                        <p class=" h-100 col-12 col-md-6 col-lg-3 text-break border ps-1" show-detail>Religion: </p>
                        <p class=" h-100 col-12 col-md-6 col-lg-5 text-break border ps-1" show-detail>Email: </p>
                        <p class=" h-100 col-12 col-md-6 col-lg-4 text-break border ps-1" show-detail>Phone Number: </p>
                        <p class=" h-100 col-12 col-md-6 col-lg-6 text-break border ps-1" show-detail>Current Address:</p>
                        <p class=" h-100 col-12 col-md-6 col-lg-6 text-break border ps-1" show-detail>Permanent Address:</p>
                    </div>
                </div>
            </div>
        </template>
    </div>

    <!-- modal here -->
    <?php
    require_once('../../includes/modals/change_profile_modal.php');
    require_once('../../includes/modals/promt_modal.php');
    require_once('../../includes/modals/std_full_info_modal.php')
    ?>
    <!-- script section here-->
    <script type="module" src="../script/script.js"></script>
    <script src="../../includes/navbar/navbar.js"></script>
    <script type="module" src="../../controller/StudentDirectoryController.js"></script>
    <script src="../../bootstraps/node_modules/@popperjs/core/dist/umd/popper.min.js"></script>
    <script src="../../bootstraps/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>