<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <?php
    require_once('../../includes/ui-kit/css/styles.html');
    ?>
</head>

<body>
    <?php
    require_once '../../includes/navbar/navbar.php';
    ?>

    <div class="container-fluid col-lg-10 col-md-9 border col-12 bg-light d-flex flex-column position-absolute end-0 overflow-hidden" id="container">

        <nav class="navbar bg-body-tertiary position-relative mt-2 border border-2 w-100 z-2 rounded-2">
            <div class="container-fluid">
                <div class="d-flex" role="search">
                    <input class="form-control rounded-1" type="search" id="add-violator-search" placeholder="Search" aria-label="Search">
                </div>
            </div>
        </nav>

        <div class="container-fluid border my-2 rounded-2 d-flex flex-column p-3 border border-2" id="add-violator-main-container">
            <table class="rounded-1 table-bordered  table-hover overflow-hidden" id="ANV-table">
                <thead id="ANV-thead">
                    <tr class="row border-bottom p-1">
                        <th class="col-1 text-center">#</th>
                        <th class="col-4 text-center">LRN</th>
                        <th class="col-5 text-center">Name</th>
                        <th class="col-1 text-center">Sex</th>
                    </tr>
                </thead>
                <tbody id="ANV-tbody" class="overflow-auto remove-scroll-bar">

                </tbody>

                <!-- --------------- template for td's --------------- -->
                <template id="ANV-table-template">
                    <tr class="row border-bottom p-1" selected id="ANV-table-row">
                        <th class="col-1 text-center" selected id="row-num" scope="row"></th>
                        <td class="col-4 text-center" selected id="td-lrn"></td>
                        <td class="col-5 text-center text-wrap" selected id="td-name"></td>
                        <td class="col-1 text-center" selected id="td-sex"></td>
                    </tr>
                </template>
            </table>

            <div class="container col-12 col-md-8 col-lg-7 border-bottom border-success justify-self-center text-nowrap overflow-auto remove-scroll-bar" id="name-holder"></div>

            <div class="container-fluid rounded-1 my-2 p-1 overflow-y-auto flex-grow border border-1" id="violator-form-container">
                <form method="post" id="add-violator-form" class="container-fluid p-2  h-100">
                    <input type="hidden" name="std-id" id="std-id">

                    <div class="row col-12 p-2">

                        <div class="col-6">
                            <label for="article" class="form-label">Article </label>
                            <select name="article" id="article" class="form-select">
                                <option value="0" id="articles">Select Article</option>
                            </select>
                        </div>

                        <div class="col-6">
                            <label for="article-section" class="form-label text-nowrap">Article Section</label>
                            <select name="article-section" id="article-section" class="form-select">
                                <option value="0" id="article-sections">Select Artcle First</option>
                            </select>
                        </div>
                    </div>

                    <div class="row col-12 p-2">
                        <div class="col-12 col-lg-6">
                            <label for="sanction" class="form-label">Sanction</label>
                            <select name="sanction" id="sanction" class="form-select">
                                <option value="0" id="sanction">Select Sanction</option>
                            </select>
                        </div>

                        <div class="col-6">
                            <label for="sanction" class="form-label">Violation Date</label>
                            <input type="datetime-local" name="violation-date" id="violation-date" class="form-control" required>
                        </div>

                    </div>

                    <div class="row col-12 p-2 d-flex flex-wrap">
                        <button class="btn btn-primary col-5 col-md-4 me-2 overflow-hidden text-nowrap text-truncate" id="show-details">Show Details</button>
                        <button class="btn btn-secondary col-5 col-md-4" id="reset-violations">Cancel</button>
                    </div>

                    <div class="row col-12 p-2">
                        <input type="submit" value="Submit" class="btn btn-success" id="submit-violation-form">
                    </div>

                </form>
            </div>
        </div>
    </div>
    <!-- modals -->
    <?php
    require_once('../../includes/modals/violation_description_modal.php');
    require_once('../../includes/modals/promt_modal.php');
    ?>
    <!-- script section here-->

</body>
<script type="module" src="../../controllers/AddNewViolatorController.js"></script>
<?php
require_once('../../includes/ui-kit/js/scripts.html');
?>

</html>