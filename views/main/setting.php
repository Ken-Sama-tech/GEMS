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

    <div class="container-fluid col-lg-10 col-md-9 position-absolute end-0" id="container">
        <h1>UNDER DEVELOPMENT</h1>
        <br>
        <h2>Future developments will includes the following:</h2>
        <ul>
            <li>View article, sections, sanctions</li>
            <li>Add section (Grade section)</li>
            <li>Add schoolyear</li>
            <li>Violation settings</li>
            <ul>
                <li>Add new article</li>
                <li>Add article section</li>
                <li>Add sanction </li>
            </ul>
            <li>To do list history</li>
            <li>Setup database and all tables needed</li>
            <li>Troubleshoot</li>
            <ul>
                <li>Troubleshoot basic UI errors</li>
                <li>Troubleshoot basic database exceptions</li>
            </ul>
            <li>Performance Optimization</li>
            <ul>
                <li>Choose between pagination and virtual scrolling</li>
                <li></li>
            </ul>
        </ul>
    </div>
</body>
<!-- script section here-->
<!-- <script src="../../includes/navbar/navbar.js"></script> -->
<?php
require_once('../../includes/ui-kit/js/scripts.html');
?>

</html>