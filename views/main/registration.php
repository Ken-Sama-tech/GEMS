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

    <div id="container" class="container-fluid position-fixed col-lg-10 col-md-9 end-0 d-flex overflow-y-auto flex-column justify-content-center h-100 m-0">

        <!-- search -->
        <nav class="navbar bg-body-tertiary">
            <div class="container-fluid d-flex justify-items-start">
                <div class="d-flex" role="search">
                    <input id="reg-search" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
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
                            <h6>Additional Setting</h6>
                            <li class="hdm-item">
                                <button class="btn btn-outline-secondary ms-2" id="change-forms-size">Change Forms Size</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>

        <!-- main section -->
        <div class="container-fluid overflow-y-auto gap-2 d-flex flex-column" id="reg-main-container">

            <section id="reg-upper-section" class="container-fluid border border-dark overflow-auto remove-scroll-bar">

                <table class="table" id="unreg-stds-table">
                    <thead>
                        <tr id="tr">
                            <th scope="col">#</th>
                            <th scope="col">LRN</th>
                            <th scope="col">Name</th>
                            <th scope="col">sex</th>
                        </tr>
                    </thead>
                    <tbody id="reg-tBody">

                    </tbody>

                    <!-- template -->
                    <template id="reg-table-template">
                        <tr selected class="reg-tr p-1 z-3" draggable="true">
                            <th class="bg-transparent" selected scope="row" id="row-num"></th>
                            <td class="bg-transparent" selected id="reg-td-lrn"></td>
                            <td class="bg-transparent" selected id="reg-td-name"></td>
                            <td class="bg-transparent" selected id="reg-td-sex"></td>
                        </tr>
                    </template>
                </table>
            </section>

            <section id="reg-lower-section" class="d-flex gap-1 flex-wrap">

                <!-- first form -->
                <div id="drop-box" class="container-fluid col-md-6 col-12 border border-secondary">
                    <form method="post" class="h-100 d-flex flex-column" id="registration-form">

                        <select value="0" reg-form-select name="gradeLevel" id="select-grade-level" class="w-100 border-bottom">
                            <option value="0">Select Grade Level</option>
                        </select>

                        <select value="0" reg-form-select name="gradeSection" id="select-grade-section" class="w-100 border-bottom">
                            <option value="0">Select Section</option>
                        </select>

                        <div class="w-100 h-100 overflow-x-auto remove-scroll-bar">
                            <table class="table  h-100 w-100 " id="form-table">
                                <tbody id="form-tBody"></tbody>
                            </table>
                        </div>
                    </form>
                </div>

                <!-- second form -->
                <div id="drop-box" class="container-fluid  col-md-6 col-12 border border-secondary">
                    <form method="post" class="h-100 d-flex flex-column" id="registration-form">

                        <select value="0" reg-form-select name="gradeLevel" id="select-grade-level" class="w-100 border-bottom">
                            <option value="0">Select Grade Level</option>
                        </select>

                        <select value="0" reg-form-select name="gradeSection" id="select-grade-section" class="w-100 border-bottom">
                            <option value="0">Select Section</option>
                        </select>

                        <div class="w-100 h-100 overflow-x-auto remove-scroll-bar">
                            <table class="table  h-100 w-100 " id="form-table">
                                <tbody id="form-tBody"></tbody>
                            </table>
                        </div>
                    </form>
                </div>

                <!-- third form  -->
                <div id="drop-box" class="container-fluid  col-md-6 col-12 border border-secondary">
                    <form method="post" class="h-100 d-flex flex-column" id="registration-form">

                        <select value="0" reg-form-select name="gradeLevel" id="select-grade-level" class="w-100 border-bottom">
                            <option value="0">Select Grade Level</option>
                        </select>

                        <select value="0" reg-form-select name="gradeSection" id="select-grade-section" class="w-100 border-bottom">
                            <option value="0">Select Section</option>
                        </select>

                        <div class="w-100 h-100 overflow-x-auto remove-scroll-bar">
                            <table class="table  h-100 w-100 " id="form-table">
                                <tbody id="form-tBody"></tbody>
                            </table>
                        </div>
                    </form>
                </div>

                <!-- fourth form  -->
                <div id="drop-box" class="container-fluid  col-md-6 col-12 border border-secondary">
                    <form method="post" class="h-100 d-flex flex-column" id="registration-form">

                        <select value="0" reg-form-select name="gradeLevel" id="select-grade-level" class="w-100 border-bottom">
                            <option value="0">Select Grade Level</option>
                        </select>

                        <select value="0" reg-form-select name="gradeSection" id="select-grade-section" class="w-100 border-bottom">
                            <option value="0">Select Section</option>
                        </select>

                        <div class="w-100 h-100 overflow-x-auto remove-scroll-bar">
                            <table class="table  h-100 w-100 " id="form-table">
                                <tbody id="form-tBody"></tbody>
                            </table>
                        </div>
                    </form>
                </div>

                <!-- fifth form  -->
                <div id="drop-box" class="container-fluid col-md-6 col-12 border border-secondary">
                    <form method="post" class="h-100 d-flex flex-column" id="registration-form">

                        <select value="0" reg-form-select name="gradeLevel" id="select-grade-level" class="w-100 border-bottom">
                            <option value="0">Select Grade Level</option>
                        </select>

                        <select value="0" reg-form-select name="gradeSection" id="select-grade-section" class="w-100 border-bottom">
                            <option value="0">Select Section</option>
                        </select>

                        <div class="w-100 h-100 overflow-x-auto remove-scroll-bar">
                            <table class="table  h-100 w-100 " id="form-table">
                                <tbody id="form-tBody"></tbody>
                            </table>
                        </div>
                    </form>
                </div>
            </section>
        </div>

        <div class="col-12 my-2">
            <button id="reg-btn" class="btn btn-primary w-100">Register</button>
        </div>
    </div>
</body>
<!-- script section here-->
<script type="module" src="../../controllers/RegistrationController.js"></script>
<script type="module" src="../../script/script.js"></script>
<script src="../../includes/navbar/navbar.js"></script>

</html>