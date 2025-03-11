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
    <div class="container-fluid col-lg-10 col-md-9 col-12 h-100 z-2 position-absolute end-0 d-flex flex-column py-3 bg-light overflow-y-auto" id="container">
        <nav>
            <div class="nav nav-tabs flex-nowrap" id="nav-tab" role="tablist">
                <button class="nav-link active text-capitalized" id="nav-add" data-bs-toggle="tab" data-bs-target="#nav-add-student" type="button" role="tab" aria-controls="nav-home" aria-selected="true">add student</button>
                <button class="nav-link text-capitalized" id="nav-edit" data-bs-toggle="tab" data-bs-target="#nav-edit-student" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">edit student </button>
                <button class="nav-link text-capitalized" id="nav-delete" data-bs-toggle="tab" data-bs-target="#nav-delete-student" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">delete student </button>
            </div>
        </nav>
        <div class="tab-content border-bottom overflow-y-auto h-100 remove-scroll-bar" id="nav-tabContent">
            <div class="tab-pane fade show active" id="nav-add-student" role="tabpanel" aria-labelledby="nav-add-student" tabindex="0">
                <form class="container-fluid h-100 py-4 px-3 d-flex flex-column needs-validation remove-scroll-bar" id="add-std-form" method="post" novalidate>
                    <h2 class="text-center mb-4">Add New Student</h2>

                    <!-- Student Information -->
                    <div class="row">
                        <div class="col-12 mb-3">
                            <label for="lrn" class="form-label">Learner Reference Number (LRN)</label>
                            <input type="number" class="form-control" name="lrn" id="lrn" placeholder="Learner Reference Number" required>
                        </div>
                        <div class="col-12 mb-3">
                            <label for="upload-std-img" class="form-label">Upload Student Image</label>
                            <input type="file" class="form-control" name="std_img" id="upload-std-img">
                        </div>
                    </div>

                    <!-- Personal Details -->
                    <fieldset>
                        <legend class="fs-5">Personal Details</legend>
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label for="last_name" class="form-label">Last Name</label>
                                <input type="text" class="form-control" name="last_name" id="last_name" placeholder="Last Name" required>
                            </div>
                            <div class="col-md-6">
                                <label for="first_name" class="form-label">First Name</label>
                                <input type="text" class="form-control" name="first_name" id="first_name" placeholder="First Name" required>
                            </div>
                            <div class="col-md-6">
                                <label for="middle_name" class="form-label">Middle Name</label>
                                <input type="text" class="form-control" name="middle_name" id="middle_name" placeholder="Middle Name">
                            </div>
                            <div class="col-md-6">
                                <label for="extension_name" class="form-label">Extension Name</label>
                                <input type="text" class="form-control" name="extension_name" id="extension_name" placeholder="e.g., Jr, Sr">
                            </div>
                            <div class="col-md-6">
                                <label for="bdate" class="form-label">Birth Date</label>
                                <input type="date" class="form-control" name="bdate" id="bdate" required>
                            </div>
                            <div class="col-md-6">
                                <label for="sex" class="form-label">Sex</label>
                                <select class="form-select" name="sex" id="sex" required>
                                    <option value="MALE">Male</option>
                                    <option value="FEMALE">Female</option>
                                </select>
                            </div>
                        </div>
                    </fieldset>

                    <!-- Contact Information -->
                    <fieldset class="mt-4">
                        <legend class="fs-5">Contact Information</legend>
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label for="phoneNumber" class="form-label">Phone Number</label>
                                <input type="text" class="form-control" name="phoneNumber" id="phoneNumber" placeholder="Phone Number" minlength="3" maxlength="15" required>
                            </div>
                            <div class="col-md-6">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" name="email" id="email" placeholder="Email" required>
                            </div>
                            <div class="col-md-6">
                                <label for="civilStatus" class="form-label">Civil Status</label>
                                <select class="form-select" id="civilStatus" name="civilStatus">
                                    <option value="SINGLE">Single</option>
                                    <option value="IN A RELATIONSHIP">IN A RELATIONSHIP</option>
                                    <option value="MARRIED">Married</option>
                                    <option value="DIVORCED">Divorced</option>
                                    <option value="WIDOWED">Widowed</option>
                                </select>
                            </div>
                        </div>
                    </fieldset>

                    <!-- Address Details -->
                    <fieldset class="mt-4">
                        <legend class="fs-5">Address Details</legend>
                        <div class="row g-3">
                            <div class="col-12">
                                <label for="current_address" class="form-label">Current Address</label>
                                <input type="text" class="form-control" name="current_address" id="current_address" placeholder="Current Address" required>
                            </div>
                            <div class="col-12">
                                <label for="permanent_address" class="form-label">Permanent Address</label>
                                <input type="text" class="form-control" name="permanent_address" id="permanent_address" placeholder="Permanent Address">
                            </div>
                        </div>
                    </fieldset>

                    <!-- Additional Details -->
                    <fieldset class="mt-4">
                        <legend class="fs-5">Additional Details</legend>
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label for="religion" class="form-label">Religion</label>
                                <input type="text" class="form-control" name="religion" id="religion" placeholder="Religion">
                            </div>
                            <div class="col-md-6">
                                <label for="nationality" class="form-label">Nationality</label>
                                <input type="text" class="form-control" name="nationality" id="nationality" placeholder="Nationality">
                            </div>
                            <div class="col-md-6">
                                <label for="disability" class="form-label">Disability</label>
                                <input type="text" class="form-control" name="disability" id="disability" placeholder="Disability">
                            </div>
                        </div>
                    </fieldset>

                    <!-- Family Information -->
                    <fieldset class="mt-4">
                        <legend class="fs-5">Family Information</legend>
                        <!-- Guardian -->
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label for="guardianLastName" class="form-label">Guardian Last Name</label>
                                <input type="text" class="form-control" name="guardianLastName" id="guardianLastName" placeholder="Guardian Last Name">
                            </div>
                            <div class="col-md-6">
                                <label for="guardianFirstName" class="form-label">Guardian First Name</label>
                                <input type="text" class="form-control" name="guardianFirstName" id="guardianFirstName" placeholder="Guardian First Name">
                            </div>
                            <div class="col-md-6">
                                <label for="guardianMiddleName" class="form-label">Guardian Middle Name</label>
                                <input type="text" class="form-control" name="guardianMiddleName" id="guardianMiddleName" placeholder="Guardian Middle Name">
                            </div>
                            <div class="col-md-6">
                                <label for="guardianExtensionName" class="form-label">Guardian Extension Name</label>
                                <input type="text" class="form-control" name="guardianExtensionName" id="guardianExtensionName" placeholder="Guardian Extension Name">
                            </div>
                            <div class="col-md-6">
                                <label for="guardianPhoneNumber" class="form-label">Guardian Phone Number</label>
                                <input type="text" class="form-control" name="guardianPhoneNumber" minlength="3" maxlength="15" id="guardianPhoneNumber" placeholder="Guardian Phone Number">
                            </div>
                        </div>

                        <!-- Parents -->
                        <legend class="fs-6 mt-3">Mother's Details</legend>
                        <div class="row g-3">
                            <div class="col-md-4">
                                <input type="text" class="form-control" name="motherLastName" placeholder="Last Name">
                            </div>
                            <div class="col-md-4">
                                <input type="text" class="form-control" name="motherFirstName" placeholder="First Name">
                            </div>
                            <div class="col-md-4">
                                <input type="text" class="form-control" name="motherMiddleName" placeholder="Middle Name">
                            </div>
                            <div class="col-md-4">
                                <input type="text" class="form-control" name="motherMaidenName" placeholder="Maiden Name">
                            </div>
                            <div class="col-md-4">
                                <input type="text" class="form-control" name="motherPhoneNumber" minlength="3" maxlength="15" placeholder="Phone Number">
                            </div>
                        </div>
                        <legend class="fs-6 mt-3">Father's Details</legend>
                        <div class="row g-3">
                            <div class="col-md-4">
                                <input type="text" class="form-control" name="fatherLastName" placeholder="Last Name">
                            </div>
                            <div class="col-md-4">
                                <input type="text" class="form-control" name="fatherFirstName" placeholder="First Name">
                            </div>
                            <div class="col-md-4">
                                <input type="text" class="form-control" name="fatherMiddleName" placeholder="Middle Name">
                            </div>
                            <div class="col-md-4">
                                <input type="text" class="form-control" name="fatherExtensionName" placeholder="Extension Name">
                            </div>
                            <div class="col-md-4">
                                <input type="text" class="form-control" name="fatherPhoneNumber" minlength="3" maxlength="15" placeholder="Phone Number">
                            </div>
                        </div>
                    </fieldset>

                    <!-- Submit Button -->
                    <div class="d-grid mt-4">
                        <button type="submit" id="submit-new-std-info" class="btn btn-success">Submit</button>
                    </div>
                </form>
            </div>
            <div class="tab-pane fade" id="nav-edit-student" role="tabpanel" aria-labelledby="nav-edit-student" tabindex="0">
                <nav class="navbar bg-body-tertiary border z-3 rounded-0 mt-3 position-sticky top-0">
                    <div class="container-fluid">
                        <div class="d-flex" role="search">
                            <input class="form-control me-2 rounded-1" type="search" id="search-std-to-edit" placeholder="Search" aria-label="Search">
                        </div>
                    </div>
                </nav>

                <table class="table table-bordered my-3 border-bottom" id="edit-table">
                    <thead>
                        <tr>
                            <th scope="col" id="td-number">#</th>
                            <th scope="col" class="text-uppercase" id="td-lrn">lrn</th>
                            <th scope="col" class="text-capitalize" id="td-name">name</th>
                            <th scope="col" class="text-capitalize" id="td-sex">sex</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody id="displayEditableStudentHere">
                    </tbody>
                    <!--template-->
                    <template id="ANS-edt-table-template">
                        <tr>
                            <th scope="row" id="row-num"></th>
                            <td class="text-break" id="td-lrn"></td>
                            <td class="text-break" id="td-name"></td>
                            <td class="" id="td-sex"></td>
                            <td><button class=" btn btn-outline-success" id="edt-btn" data-bs-toggle="modal" data-bs-target="#edit-std-modal">Edit</button></td>
                        </tr>
                    </template>
                </table>

            </div>
            <div class="tab-pane fade" id="nav-delete-student" role="tabpanel" aria-labelledby="nav-delete-student" tabindex="0">
                <nav class="navbar bg-body-tertiary border z-3 rounded-0 position-sticky top-0 mt-2">
                    <div class="container-fluid">
                        <div class="d-flex" role="search">
                            <input class="form-control me-2 rounded-1" type="search" id="search-std-to-delete" placeholder="Search" aria-label="Search">
                        </div>
                    </div>
                </nav>
                <table class="table table-bordered my-3" id="delete-table">
                    <thead>
                        <tr>
                            <th scope="col" id="td-number">#</th>
                            <th scope="col" class="text-uppercase" id="td-lrn">lrn</th>
                            <th scope="col" class="text-capitalize" id="td-name">name</th>
                            <th scope="col" class="text-capitalize" id="td-sex">sex</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody id="displayDeletableStudentHere" class="overflow-y-auto">
                    </tbody>
                    <!--template-->
                    <template id="ANS-dlt-table-template">
                        <tr>
                            <th scope="col" class="" id="row-num"></th>
                            <td id="td-lrn" class="text-break"></td>
                            <td id="td-name"></td>
                            <td id="td-sex"></td>
                            <td> <button class="btn btn-outline-danger" id="dlt-btn">DELETE</button> </td>
                        </tr>
                    </template>
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
</body>
<!-- script section here-->
<script type="module" src="../../controllers/AddNewStudentController.js"></script>
<?php
require_once('../../includes/ui-kit/js/scripts.html');
?>

</html>