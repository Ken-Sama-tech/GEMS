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

    <div class="container-fluid col-lg-10 col-md-9 col-12 bg-light d-flex flex-column position-fixed end-0 h-100" id="container">

        <nav class="navbar bg-body-tertiary position-relative mt-2 border w-100 z-3 rounded-2">
            <div class="container-fluid">
                <div class="d-flex" role="search">
                    <input class="form-control rounded-1" type="search" id="add-violator-search" placeholder="Search" aria-label="Search">
                </div>
            </div>
        </nav>

        <div class="container-fluid border h-100 my-2 rounded-2" id="add-violators-main-container">
            <table class="rounded-1 border border-dark overflow-hidden" id="ANV-table">
                <thead id="ANV-thead">
                    <tr class="row border-bottom p-1">
                        <th class="col-1 text-center">#</th>
                        <th class="col-4 text-center">LRN</th>
                        <th class="col-5 text-center">Name</th>
                        <th class="col-1 text-center">Sex</th>
                    </tr>
                </thead>
                <tbody id="ANV-tbody" class="overflow-auto">

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

            <div class="container col-12 col-md-8 col-lg-7 border-bottom border-success justify-self-center " id="name-holder"></div>

            <div class="container-fluid rounded-1 border border-primary my-2 p-2" id="some-container">
                <form method="post" id="add-violator-form" class="container overflow-y-auto">
                    <input type="hidden" name="violator-lrn">

                    <div class="row col-12 p-2 gy-1">

                        <div class="col-6 col-lg-4">
                            <select name="article" id="article" class="form-select">
                                <option value="0" id="articles">Select The Corresponding Article</option>
                            </select>
                        </div>

                        <div class="col-6 col-lg-4">
                            <select name="article" id="article" class="form-select">
                                <option value="0" id="articles">Select The Corresponding Section</option>
                            </select>
                        </div>


                        <div class="col-6 col-lg-4">
                            <button class="btn btn-success col-12">Show Details</button>
                        </div>

                    </div>

                </form>
            </div>
        </div>
    </div>
</body>
<!-- script section here-->
<script src="../../includes/navbar/navbar.js"></script>
<script type="module" src="../script/script.js"></script>
<script type="module" src="../../controller/AddNewViolatorController.js"></script>

</html>