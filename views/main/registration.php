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
        <nav class="navbar bg-body-tertiary reg-nav">
            <div class="container-fluid h-100">
                <form class="d-flex flex-wrap p-0" role="search">
                    <div class="container p-0 d-flex">
                        <input class="form-control me-2 w-50" id="find-std" type="search" placeholder="Search" aria-label="Search">
                        <button class="btn btn-outline-success" type="button" id="reg-search">Search</button>
                    </div>

                    <div class="container-fluid h-100 d-flex flex-nowrap p-0 mt-2 gap-2">
                        <select name="school-year" id="school-year" class="form-select ">
                            <option value="">School Year</option>
                        </select>
                        <select name="grade-level" id="grade-level" class="form-select ">
                            <option value="">Grade Level</option>
                        </select>
                        <select name="section" id="section" class="form-select ">
                            <option value="">section</option>
                        </select>
                        <select name="new-school-year" id="new-school-year" class="form-select ">
                            <option value="">new sy</option>
                        </select>
                    </div>
                </form>
            </div>
        </nav>

        <!-- main body  -->
        <div class="container-fluid p-0 mt-1 reg-container">
            <div class=" reg-table-wrapper h-100 w-100">
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