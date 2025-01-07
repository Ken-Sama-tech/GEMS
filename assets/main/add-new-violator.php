<?php
include('../../config/database/config.php');
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="../../includes/navbar/navbar.css">
    <link rel="stylesheet" href="../style/style.css">
</head>

<body>
    <?php
    require_once '../../includes/navbar/navbar.php';
    ?>

    <div class="container">
        <form action="" method="post" id="form">
            <h2 class="form__title">add new record</h2>
            <label for="std__lrn" class="form__label">learner reference number</label>
            <input type="number" name="std__lrn" id="std__lrn" class="form__inpt">

            <label for="grade__lvl" class="form__label">grade level</label>
            <select name="grade__lvl" id="grade__lvl" class="form__inpt">
                <option id="option" value="grade 7">Grade 7</option>
                <option id="option" value="grade 8">Grade 8</option>
                <option id="option" value="grade 9">Grade 9</option>
                <option id="option" value="grade 10">Grade 10</option>
                <option id="option" value="grade 11">Grade 11</option>
                <option id="option" value="grade 12">Grade 12</option>
            </select>

            <label for="std__lastname" class="form__label">last name</label>
            <input type="text" name="std__lastname" id="std__lastname" class="form__inpt">

            <label for="std__firstname" class="form__label">first name</label>
            <input type="text" name="std__firstname" id="std__firstname" class="form__inpt">

            <label for="std__middlename" class="form__label">middle name</label>
            <input type="text" name="std__middlename" id="std__middlename" class="form__inpt">

            <label for="std__extname" class="form__label">extension name</label>
            <input type="text" name="std__extname" id="std__extname" class="form__inpt">

            <label for="std__bd" class="form__label">birth date</label>
            <input type="date" name="std__bd" id="std__bd" class="form__inpt">

            <label for="std__sex" class="form__label">sex</label>
            <select name="std__sex" id="std__sex" class="form__inpt">
                <option value="male" id="option">male</option>
                <option value="female" id="option">female</option>
            </select>

            <label for="present__address" class="form__label">present address</label>
            <input type="text" name="present__address" id="present__address" class="form__inpt">

            <label for="permanent__address" class="form__label">permanent address</label>
            <input type="text" name="permanent__address" id="permanent__address" class="form__inpt">

            <label for="status" class="form__label">civil status</label>
            <select name="status" id="status" class="form__inpt">
                <option value="single" id="option">single</option>
                <option value="taken" id="option">taken</option>
                <option value="married" id="option">married</option>
                <option value="widowed" id="option">widowed</option>
                <option value="divorce" id="option">divorce</option>
            </select>

            <label for="religion" class="form__label">religion</label>
            <input type="text" name="religion" id="religion" class="form__inpt">

            <label for="std__number" class="form__label">contact number</label>
            <input type="text" name="std__number" id="std__number" class="form__inpt">

            <label for="std__email" class="form__label">email address</label>
            <input type="email" name="std__email" id="std__email" class="form__inpt">

            <label for="mother__lname" class="form__label">Mother Last Name</label>
            <input type="text" name="mother__lname" id="mother__lname" class="form__inpt">
            <label for="mother__fname" class="form__label">Mother First Name</label>
            <input type="text" name="mother__fname" id="mother__fname" class="form__inpt">
            <label for="mother__mname" class="form__label">Mother Middle Name</label>
            <input type="text" name="mother__mname" id="mother__mname" class="form__inpt">
            <label for="maiden__name" class="form__label">Mother Maiden Name</label>
            <input type="text" name="maiden__name" id="maiden__name" class="form__inpt">
            <label for="mother__number" class="form__label">Mother Contact Number</label>
            <input type="text" name="mother__number" id="mother__number" class="form__inpt">
            <label for="father__lname" class="form__label">Father Last Name</label>
            <input type="text" name="father__lname" id="father__lname" class="form__inpt">
            <label for="father__fname" class="form__label">Father First Name</label>
            <input type="text" name="father__fname" id="father__fname" class="form__inpt">
            <label for="father__mname" class="form__label">Father Middle Name</label>
            <input type="text" name="father__mname" id="father__mname" class="form__inpt">
            <label for="father__extname" class="form__label">Father Extension Name</label>
            <input type="text" name="father__extname" id="father__extname" class="form__inpt">
            <label for="father__number" class="form__label">Father Contact Number</label>
            <input type="text" name="father__number" id="father__number" class="form__inpt">

            <h2 class="form__title">Select Student Violation</h2>

            <label for="article" class="form__label">violation</label>
            <select name="article" id="article" class="form__inpt">
                <?php
                $sql = "SELECT * FROM articles";

                $result = $conn->query($sql);

                while ($row = $result->fetch_assoc()) {
                    echo "<option id='option' value='{$row['articleID']}'>{$row['article']}</option>";
                }
                ?>
            </select>

            <label for="article__section" class="form__label">violation section</label>
            <select name="article__section" id="article__section" class="form__inpt">

            </select>

            <label for="sanction" class="form__label">sanction</label>
            <select name="sanction" id="sanction" class="form__inpt">
                <?php
                $sql = "SELECT * FROM sanctions";

                $result = $conn->query($sql);

                while ($row = $result->fetch_assoc()) {
                    echo "<option id='option' value='{$row['sanctionID']}'>{$row['sanctionID']} {$row['sanction']}</option>";
                }
                ?>
            </select>
            <button type="button" id="show__details" class="form__inpt">Show Details</button>
            <input type="submit" value="submit" id="submit" class="form__inpt">
        </form>
    </div>
</body>
<!-- script section here-->
<script src="../../includes/navbar/navbar.js"></script>
<script src="../script/script.js"></script>

</html>