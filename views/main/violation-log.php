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

    <div class="container-fluid overflow-hidden border border-2 border-primary col-lg-10 col-md-9 position-absolute end-0 d-flex align-items-start  pt-4 h-100" id="container">

    </div>

</body>
<!-- script section here-->
<script src="../../includes/navbar/navbar.js"></script>
<script type="module" src="../script/script.js"></script>
<script src="../../controller/ViolationLogController.js"></script>
<script src="../../bootstraps/node_modules/@popperjs/core/dist/umd/popper.min.js"></script>
<script src="../../bootstraps/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"></script>

</html>