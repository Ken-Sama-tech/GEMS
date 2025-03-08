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

    <div class="container-fluid position-absolute col-md-9 col-lg-10 end-0 p-0" id="container">
        <!-- navbar  -->
        <nav class="navbar bg-body-tertiary search-nav">
            <div class="container-fluid h-100">
                <form class="d-flex flex-wrap  align-items-center p-0 w-100 h-100" role="search">
                    <div class="container p-0 d-flex w-50 pe-1 h-100">
                        <select name="school-year" id="school-year" class="form-select w-50 me-2">
                            <option value="">School Year</option>
                        </select>
                        <input class="form-control me-2 w-50" id="find-std" type="search" placeholder="Search" aria-label="Search">
                        <button class="btn btn-outline-success" type="button" id="reg-search">Search</button>
                    </div>

                    <div class="container p-0 w-50 h-100 d-flex justify-content-center align-items-center gap-3">
                        <div class="form-check">
                            <input class="form-check-input border border-secondary" type="checkbox" value="" id="has-no-record">
                            <label class="form-check-label text-nowrap" for="has-no-record">
                                Add as new
                            </label>
                        </div>
                        <fieldset>
                            <input class="form-" type="date" value="" id="reg-date">
                            <label for="reg-date" class="form-label fs-6">Registration Date</label>
                        </fieldset>
                    </div>
                </form>
            </div>
        </nav>

        <!-- main body  -->
        <div class="container-fluid p-0 mt-1 reg-container d-flex flex-column border-top p-4">
            <div class="container-fluid w-50 d-flex flex-nowrap p-0 mt-2 gap-2">
                <select name="new-school-year" id="new-school-year" select-option class="form-select">
                    <option value="">new sy</option>
                </select>
                <select name="grade-level" id="grade-level" select-option class="form-select">
                    <option value="">Grade Level</option>
                </select>
                <select name="section" id="section" class="form-select">
                    <option value="">section</option>
                </select>
                <input type="hidden" name="lrn" id="reg-std-lrn">
            </div>
            <div class=" reg-table-wrapper h-100 w-100 mt-1">
                <table class="table table-borderless">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody id="reg-search-result">

                    </tbody>

                    <!-- template  -->
                    <template id="reg-table-template">
                        <tr class="border-bottom">
                            <td class="col-4" lrn>sample</td>
                            <td class="col-4" name>sample</td>
                            <td class="col-2" sex>sample</td>
                            <td class="col-2" enroll-btn><button class="btn btn-outline-success">Enroll</button></td>
                        </tr>
                    </template>
                </table>
            </div>
        </div>
    </div>
</body>
<!-- script section here-->
<script type="module" src="../../controllers/RegistrationController.js" defer></script>
<script type="module" src="../../script/script.js"></script>
<script src="../../includes/navbar/navbar.js"></script>

</html>