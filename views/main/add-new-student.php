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

    <div class="container col-10 h-100 z-2 position-fixed end-0 d-flex flex-column py-3 bg-light overflow-y-auto">
        <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <button class="nav-link active text-capitalized" id="nav-add" data-bs-toggle="tab" data-bs-target="#nav-add-student" type="button" role="tab" aria-controls="nav-home" aria-selected="true">add student</button>
                <button class="nav-link text-capitalized" id="nav-edit" data-bs-toggle="tab" data-bs-target="#nav-edit-student" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">edit student </button>
                <button class="nav-link text-capitalized" id="nav-delete" data-bs-toggle="tab" data-bs-target="#nav-delete-student" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">delete student </button>
            </div>
        </nav>
        <div class="tab-content border-bottom h-100 overflow-y-auto" id="nav-tabContent">
            <div class="tab-pane fade show active" id="nav-add-student" role="tabpanel" aria-labelledby="nav-add-student" tabindex="0">
                <form class="container h-100 py-2 px-2 d-flex align-items-center flex-column needs-validation" id="add-std-form" method="post" novalidate>

                    <h2 class="h2 text-center">Add New Student</h2>

                    <div class=" input-group my-2 w-100">
                        <span class=" input-group-text" id="addon-wrapping">LRN</span>
                        <input type="number" class="form-control" name="lrn" placeholder="Learner Reference Number" aria-label="Learner Reference Number" aria-describedby="addon-wrapping" id="lrn" required>
                    </div>

                    <div class="input-group mb-2 my-2 w-100">
                        <label class="input-group-text" for="upload-std-img">Upload</label>
                        <input type="file" name="std_img" class="form-control" id="upload-std-img">
                    </div>

                    <div class="input-group  my-2 w-100">
                        <span class="input-group-text" id="addon-wrapping">last name</span>
                        <input type="text" class="form-control" name="last_name" placeholder="Last Name" aria-label="Lastname" aria-describedby="addon-wrapping" id="last_name" required>
                    </div>

                    <div class="input-group  my-2 w-100">
                        <span class="input-group-text" id="addon-wrapping">first name</span>
                        <input type="text" class="form-control" name="first_name" placeholder="First Name" aria-label="Firstname" aria-describedby="addon-wrapping" id="first_name" required>
                    </div>

                    <div class="input-group  my-2 w-100">
                        <span class="input-group-text" id="addon-wrapping">middle name</span>
                        <input type="text" class="form-control" name="middle_name" placeholder="Middle Name" aria-label="Middlename" aria-describedby="addon-wrapping">
                    </div>

                    <div class="input-group  my-2 w-100">
                        <span class="input-group-text" id="addon-wrapping">extension name</span>
                        <input type="text" class="form-control" name="extension_name" placeholder="Extension Name (e.g., Jr/Sr/III)" aria-label="Extension name" aria-describedby="addon-wrapping">
                    </div>

                    <div class="input-group  my-2 w-100">
                        <span class="input-group-text" id="addon-wrapping">birth date</span>
                        <input type="date" class="form-control" name="bdate" placeholder="birth date" aria-label="Birth Date" aria-describedby="addon-wrapping" id="bdate" required>
                    </div>

                    <div class="input-group mb-3 w-100">
                        <label class="input-group-text" for="sex">sex</label>
                        <select class="form-select" name="sex" id="sex">
                            <option value="MALE" class="option">male</option>
                            <option value="FEMALE" class="option">female</option>
                        </select>
                    </div>

                    <div class="input-group  my-2 w-100">
                        <span class="input-group-text" id="addon-wrapping">Phone Number</span>
                        <input type="text" class="form-control" minlength="3" maxlength="15" name="phoneNumber" placeholder="Phone Number" aria-label="Phone Number" aria-describedby="addon-wrapping" id="phoneNumber" required>
                    </div>

                    <div class="input-group  my-2 w-100">
                        <span class="input-group-text" id="addon-wrapping">Email</span>
                        <input type="email" class="form-control" name="email" placeholder="Email" aria-label="Email" aria-describedby="addon-wrapping"
                            id="email" required>
                    </div>

                    <div class="input-group mb-3 w-100">
                        <label class="input-group-text" for="civilStatus">Civil Status</label>
                        <select class="form-select" id="civilStatus" name="civilStatus">
                            <option value="SINGLE" class="option">Single</option>
                            <option value="TAKEN" class="option">Taken</option>
                            <option value="MARRIED" class="option">Married</option>
                            <option value="DIVORCED" class="option">Divorced</option>
                            <option value="WIDOWED" class="option">Widowed</option>
                        </select>
                    </div>

                    <div class="input-group  my-2 w-100">
                        <span class="input-group-text" id="addon-wrapping">Religion</span>
                        <input type="text" class="form-control" name="religion" placeholder="Religion" aria-label="Religion" aria-describedby="addon-wrapping">
                    </div>

                    <div class="input-group  my-2 w-100">
                        <span class="input-group-text" id="addon-wrapping">Current Address</span>
                        <input type="text" class="form-control" name="current_address" placeholder="Current Address" aria-label="Current Address" aria-describedby="addon-wrapping" id="current_address" required>
                    </div>

                    <div class="input-group  my-2 w-100">
                        <span class="input-group-text" id="addon-wrapping">Permanent Address</span>
                        <input type="text" class="form-control" name="permanent_address" placeholder="Permanent Address" aria-label="Permanent Address" aria-describedby="addon-wrapping">
                    </div>

                    <div class="input-group  my-2 w-100">
                        <span class="input-group-text" id="addon-wrapping">Nationality</span>
                        <input type="text" class="form-control" name="nationality" placeholder="Nationality" aria-label="Nationality" aria-describedby="addon-wrapping" id="nationality">
                    </div>

                    <div class="input-group  my-2 w-100">
                        <span class="input-group-text" id="addon-wrapping">Disability</span>
                        <input type="text" class="form-control" name="disability" placeholder="Disability" aria-label="Disability" aria-describedby="addon-wrapping">
                    </div>

                    <div class="input-group  my-2 w-100">
                        <span class="input-group-text" id="addon-wrapping">Guardian Last Name</span>
                        <input type="text" class="form-control" name="guardianLastName" placeholder="Guardian Last Name" aria-label="Guardian Last Name" aria-describedby="addon-wrapping">
                    </div>

                    <div class="input-group  my-2 w-100">
                        <span class="input-group-text" id="addon-wrapping">Guardian First Name</span>
                        <input type="text" class="form-control" name="guardianFirstName" placeholder="Guardian First Name" aria-label="Guardian First Name" aria-describedby="addon-wrapping">
                    </div>

                    <div class="input-group  my-2 w-100">
                        <span class="input-group-text" id="addon-wrapping">Guardian Middle Name</span>
                        <input type="text" class="form-control" name="guardianMiddleName" placeholder="Guardian Middle Name" aria-label="Guardian Middle Name" aria-describedby="addon-wrapping">
                    </div>

                    <div class="input-group  my-2 w-100">
                        <span class="input-group-text" id="addon-wrapping">Guardian Extension Name</span>
                        <input type="text" class="form-control" name="guardianExtensionName" placeholder="Guardian Extension Name" aria-label="Guardian Extension Name" aria-describedby="addon-wrapping">
                    </div>

                    <div class="input-group  my-2 w-100">
                        <span class="input-group-text" id="addon-wrapping">Guardian Phone Number</span>
                        <input type="text" class="form-control" name="guardianPhoneNumber" placeholder="Guardian Phone Number" aria-label="Guardian Phone Number" aria-describedby="addon-wrapping">
                    </div>

                    <div class="input-group  my-2 w-100">
                        <span class="input-group-text" id="addon-wrapping">Mother Last Name</span>
                        <input type="text" class="form-control" name="motherLastName" placeholder="Mother Last Name" aria-label="Mother Last Name" aria-describedby="addon-wrapping">
                    </div>

                    <div class="input-group  my-2 w-100">
                        <span class="input-group-text" id="addon-wrapping">Mother First Name</span>
                        <input type="text" class="form-control" name="motherFirstName" placeholder="Mother First Name" aria-label="Mother First Name" aria-describedby="addon-wrapping">
                    </div>

                    <div class="input-group  my-2 w-100">
                        <span class="input-group-text" id="addon-wrapping">Mother Middle Name</span>
                        <input type="text" class="form-control" name="motherMiddleName" placeholder="Mother Middle Name" aria-label="Mother Middle Name" aria-describedby="addon-wrapping">
                    </div>

                    <div class="input-group  my-2 w-100">
                        <span class="input-group-text" id="addon-wrapping">Mother Maiden Name</span>
                        <input type="text" class="form-control" name="motherMaidenName" placeholder="Mother Maiden Name" aria-label="Mother Maiden Name" aria-describedby="addon-wrapping">
                    </div>

                    <div class="input-group  my-2 w-100">
                        <span class="input-group-text" id="addon-wrapping">Mother Phone Number</span>
                        <input type="text" class="form-control" name="motherPhoneNumber" placeholder="Mother Phone Number" aria-label="Mother Phone Number" aria-describedby="addon-wrapping">
                    </div>

                    <div class="input-group  my-2 w-100">
                        <span class="input-group-text" id="addon-wrapping">Father Last Name</span>
                        <input type="text" class="form-control" name="fatherLastName" placeholder="Father Last Name" aria-label="Father Last Name" aria-describedby="addon-wrapping">
                    </div>

                    <div class="input-group  my-2 w-100">
                        <span class="input-group-text" id="addon-wrapping">Father First Name</span>
                        <input type="text" class="form-control" name="fatherFirstName" placeholder="Father First Name" aria-label="Father First Name" aria-describedby="addon-wrapping">
                    </div>

                    <div class="input-group  my-2 w-100">
                        <span class="input-group-text" id="addon-wrapping">Father Middle Name</span>
                        <input type="text" class="form-control" name="fatherMiddleName" placeholder="Father Middle Name" aria-label="Father Middle Name" aria-describedby="addon-wrapping">
                    </div>

                    <div class="input-group  my-2 w-100">
                        <span class="input-group-text" id="addon-wrapping">Father Extension Name</span>
                        <input type="text" class="form-control" name="fatherExtensionName" placeholder="Father Extension Name" aria-label="Father Extension Name" aria-describedby="addon-wrapping">
                    </div>

                    <div class="input-group  my-2 w-100">
                        <span class="input-group-text" id="addon-wrapping">Father Phone Number</span>
                        <input type="text" class="form-control" name="fatherPhoneNumber" placeholder="Father Phone Number" aria-label="Father Phone Number" aria-describedby="addon-wrapping">
                    </div>

                    <input type="submit" id="submit-new-std-info" value="submit" class="btn col-12 my-2">
                </form>
            </div>
            <div class="tab-pane fade position-relative" id="nav-edit-student" role="tabpanel" aria-labelledby="nav-edit-student" tabindex="0">
                <nav class="navbar bg-body-tertiary border position-sticky z-3 top-0">
                    <div class="container-fluid">
                        <div class="d-flex" role="search">
                            <input class="form-control me-2" type="search" id="search-std-to-edit" placeholder="Search" aria-label="Search">
                        </div>
                    </div>
                </nav>

                <table class="table my-3 border-top">
                    <thead>
                        <tr>
                            <th scope="col" id="td-number">#</th>
                            <th scope="col" class="text-capitalize" id="td-lrn">lrn</th>
                            <th scope="col" class="text-capitalize" id="td-name">name</th>
                            <th scope="col" class="text-capitalize" id="td-sex">sex</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody id="displayEditableStudentHere" class="overflow-y-auto">
                    </tbody>
                </table>

            </div>
            <div class="tab-pane fade" id="nav-delete-student" role="tabpanel" aria-labelledby="nav-delete-student" tabindex="0">
                <nav class="navbar bg-body-tertiary border position-sticky z-3 top-0">
                    <div class="container-fluid">
                        <div class="d-flex" role="search">
                            <input class="form-control me-2" type="search" id="search-std-to-delete" placeholder="Search" aria-label="Search">
                        </div>
                    </div>
                </nav>
                <table class="table my-3 border-top">
                    <thead>
                        <tr>
                            <th scope="col" id="td-number">#</th>
                            <th scope="col" class="text-capitalize" id="td-lrn">lrn</th>
                            <th scope="col" class="text-capitalize" id="td-name">name</th>
                            <th scope="col" class="text-capitalize" id="td-sex">sex</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody id="displayDeletableStudentHere" class="overflow-y-auto">
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <!-- modals here-->
    <?php
    require_once('../../includes/modals/yes_or_close_modal.php');
    require_once('../../includes/modals/edit_std_modal.php');
    require_once('../../includes/modals/promt_modal.php');
    ?>
    <!-- script section here-->
    <script type="module" src="../script/script.js"></script>
    <script src="../../includes/navbar/navbar.js"></script>
    <script type="module" src="../../controller/AddNewStudentController.js"></script>
    <script src="../../bootstraps/node_modules/@popperjs/core/dist/umd/popper.min.js"></script>
    <script src="../../bootstraps/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>