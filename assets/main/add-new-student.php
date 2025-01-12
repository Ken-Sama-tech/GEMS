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

    <div class="container col-10 h-100 z-2 position-fixed end-0 d-flex flex-column py-3 bg-light">
        <h1 class="h1 text-center">Add New Student</h1>
        <form class="container h-100 overflow-y-auto py-2 px-2 d-flex align-items-center flex-column" id="add-std-form" method="post">

            <div class="input-group flex-nowrap my-2 w-100 ">
                <span class="input-group-text" id="addon-wrapping">LRN</span>
                <input type="number" class="form-control" name="lrn" placeholder="Learner Reference Number" aria-label="Learner Reference Number" aria-describedby="addon-wrapping" id="lrn" required>
            </div>

            <div class="input-group mb-2 my-2 w-100">
                <label class="input-group-text" for="upload-std-img">Upload</label>
                <input type="file" name="std-img" class="form-control" id="upload-std-img">
            </div>

            <div class="input-group flex-nowrap my-2 w-100">
                <span class="input-group-text" id="addon-wrapping">last name</span>
                <input type="text" class="form-control" name="last_name" placeholder="Last Name" aria-label="Lastname" aria-describedby="addon-wrapping" id="last_name" required>
            </div>

            <div class="input-group flex-nowrap my-2 w-100">
                <span class="input-group-text" id="addon-wrapping">first name</span>
                <input type="text" class="form-control" name="first_name" placeholder="First Name" aria-label="Firstname" aria-describedby="addon-wrapping" id="first_name" required>
            </div>

            <div class="input-group flex-nowrap my-2 w-100">
                <span class="input-group-text" id="addon-wrapping">middle name</span>
                <input type="text" class="form-control" name="middle_name" placeholder="Middle Name" aria-label="Middlename" aria-describedby="addon-wrapping">
            </div>

            <div class="input-group flex-nowrap my-2 w-100">
                <span class="input-group-text" id="addon-wrapping">extension name</span>
                <input type="text" class="form-control" name="extension_name" placeholder="Extension Name" aria-label="Extension name" aria-describedby="addon-wrapping">
            </div>

            <div class="input-group flex-nowrap my-2 w-100">
                <span class="input-group-text" id="addon-wrapping">birth date</span>
                <input type="date" class="form-control" name="bdate" placeholder="birth date" aria-label="Birth Date" aria-describedby="addon-wrapping" id="bdate" required>
            </div>

            <div class="input-group mb-3 w-100">
                <label class="input-group-text" for="gender">gender</label>
                <select class="form-select"  name="gender" id="gender">
                    <option selected>non-binary</option>
                    <option value="male" class="option">male</option>
                    <option value="female" class="option">female</option>
                </select>
            </div>

            <div class="input-group flex-nowrap my-2 w-100">
                <span class="input-group-text" id="addon-wrapping">Phone Number</span>
                <input type="text" class="form-control" name="phoneNumber" placeholder="Phone Number" aria-label="Phone Number" aria-describedby="addon-wrapping" id="phoneNumber" required>
            </div>

            <div class="input-group flex-nowrap my-2 w-100">
                <span class="input-group-text" id="addon-wrapping">Email</span>
                <input type="email" class="form-control" name="email" placeholder="Email" aria-label="Email" aria-describedby="addon-wrapping"
                id="email" required>
            </div>

            <div class="input-group mb-3 w-100">
                <label class="input-group-text" for="civilStatus">Civil Status</label>
                <select class="form-select" id="civilStatus" name="civilStatus">
                    <option value="single" class="option">Single</option>
                    <option value="taken" class="option">Taken</option>
                    <option value="married" class="option">Married</option>
                    <option value="divorced" class="option">Divorced</option>
                    <option value="widowed" class="option">Widowed</option>
                </select>
            </div>

            <div class="input-group flex-nowrap my-2 w-100">
                <span class="input-group-text" id="addon-wrapping">Religion</span>
                <input type="text" class="form-control" name="religion" placeholder="Religion" aria-label="Religion" aria-describedby="addon-wrapping">
            </div>

            <div class="input-group flex-nowrap my-2 w-100">
                <span class="input-group-text" id="addon-wrapping">Current Address</span>
                <input type="text" class="form-control" name="current_address" placeholder="Current Address" aria-label="Current Address" aria-describedby="addon-wrapping" id="current_address" required>
            </div>

            <div class="input-group flex-nowrap my-2 w-100">
                <span class="input-group-text" id="addon-wrapping">Permanent Address</span>
                <input type="text" class="form-control" name="permanent_address" placeholder="Permanent Address" aria-label="Permanent Address" aria-describedby="addon-wrapping">
            </div>

            <div class="input-group flex-nowrap my-2 w-100">
                <span class="input-group-text" id="addon-wrapping">Nationality</span>
                <input type="text" class="form-control" name="nationality" placeholder="Nationality" aria-label="Nationality" aria-describedby="addon-wrapping" id="nationality">
            </div>

            <div class="input-group flex-nowrap my-2 w-100">
                <span class="input-group-text" id="addon-wrapping">Disability</span>
                <input type="text" class="form-control" name="disability" placeholder="Disability" aria-label="Disability" aria-describedby="addon-wrapping">
            </div>

            <div class="input-group flex-nowrap my-2 w-100">
                <span class="input-group-text" id="addon-wrapping">Guardian Last Name</span>
                <input type="text" class="form-control" name="guardianLastName" placeholder="Guardian Last Name" aria-label="Guardian Last Name" aria-describedby="addon-wrapping">
            </div>

            <div class="input-group flex-nowrap my-2 w-100">
                <span class="input-group-text" id="addon-wrapping">Guardian First Name</span>
                <input type="text" class="form-control" name="guardianFirstName" placeholder="Guardian First Name" aria-label="Guardian First Name" aria-describedby="addon-wrapping">
            </div>

            <div class="input-group flex-nowrap my-2 w-100">
                <span class="input-group-text" id="addon-wrapping">Guardian Middle Name</span>
                <input type="text" class="form-control" name="guardianMiddleName" placeholder="Guardian Middle Name" aria-label="Guardian Middle Name" aria-describedby="addon-wrapping">
            </div>

            <div class="input-group flex-nowrap my-2 w-100">
                <span class="input-group-text" id="addon-wrapping">Guardian Extension Name</span>
                <input type="text" class="form-control" name="guardianExtensionName" placeholder="Guardian Extension Name" aria-label="Guardian Extension Name" aria-describedby="addon-wrapping">
            </div>

            <div class="input-group flex-nowrap my-2 w-100">
                <span class="input-group-text" id="addon-wrapping">Guardian Phone Number</span>
                <input type="text" class="form-control" name="guardianPhoneNumber" placeholder="Guardian Phone Number" aria-label="Guardian Phone Number" aria-describedby="addon-wrapping">
            </div>

            <div class="input-group flex-nowrap my-2 w-100">
                <span class="input-group-text" id="addon-wrapping">Father Last Name</span>
                <input type="text" class="form-control" name="fatherLastName" placeholder="Father Last Name" aria-label="Father Last Name" aria-describedby="addon-wrapping">
            </div>

            <div class="input-group flex-nowrap my-2 w-100">
                <span class="input-group-text" id="addon-wrapping">Father First Name</span>
                <input type="text" class="form-control" name="fatherFirstName" placeholder="Father First Name" aria-label="Father First Name" aria-describedby="addon-wrapping">
            </div>

            <div class="input-group flex-nowrap my-2 w-100">
                <span class="input-group-text" id="addon-wrapping">Father Middle Name</span>
                <input type="text" class="form-control" name="fatherMiddleName" placeholder="Father Middle Name" aria-label="Father Middle Name" aria-describedby="addon-wrapping">
            </div>

            <div class="input-group flex-nowrap my-2 w-100">
                <span class="input-group-text" id="addon-wrapping">Father Extension Name</span>
                <input type="text" class="form-control" name="fatherExtensionName" placeholder="Father Extension Name" aria-label="Father Extension Name" aria-describedby="addon-wrapping">
            </div>

            <div class="input-group flex-nowrap my-2 w-100">
                <span class="input-group-text" id="addon-wrapping">Father Phone Number</span>
                <input type="text" class="form-control" name="fatherPhoneNumber" placeholder="Father Phone Number" aria-label="Father Phone Number" aria-describedby="addon-wrapping">
            </div>

            <input type="submit" id="submit-new-std-info" value="submit" class="btn col-12 my-2">
        </form>
    </div>
</body>
<!-- script section here-->
<script src="../../includes/navbar/navbar.js"></script>
<script src="../script/script.js"></script>
<script src="../../bootstraps/node_modules/@popperjs/core/dist/umd/popper.min.js"></script>
<script src="../../bootstraps/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
</html>