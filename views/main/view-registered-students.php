<?php
require_once('../../includes/ui-kit/session.php');
?>

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

    <div class="container-fluid p-0 position-absolute end-0 col-lg-10 col-md-9" id="container" style="height: 100vh;">
        <div class="container mt-5 overflow-y-scroll h-100">
            <div class="container-fluid p-2 d-flex align-items-center position-sticky top-0 bg-light">
                <h2 class="">Registered Students</h2>
                <div class="form-select-wrapper d-flex gap-2">
                    <select id="reg-sy-range" class="form-select ms-2">
                        <option value="">
                            school year
                        </option>
                    </select>
                    <select name="" id="reg-gl-range" class="form-select">
                        <option value="">grade level</option>
                    </select>
                </div>
                <div class="form-input-wrapper ms-3">
                    <input type="search" id="view-reg-std-search" class="form-control" placeholder="Search...">
                </div>
            </div>
            <table class="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>LRN</th>
                        <th>Name</th>
                        <th>Sex</th>
                        <th>Grade Level</th>
                        <th>Section</th>
                    </tr>
                </thead>
                <tbody id="view-reg-tb">
                </tbody>
                <!-- template  -->
                <template id="view-reg-tb-template">
                    <tr class="rowsss">
                        <th row-num>1</th>
                        <td lrn>105414120013</td>
                        <td name>male</td>
                        <td sex>ken gallarde</td>
                        <td grade-level>12</td>
                        <td section>castillo</td>
                    </tr>
                </template>
            </table>
        </div>
    </div>
</body>
<!-- script section here-->
<?php
require_once('../../includes/ui-kit/js/scripts.html');
?>

</html>