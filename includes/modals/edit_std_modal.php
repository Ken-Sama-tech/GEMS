<div class="modal fade" id="edit-std-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class=" modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5 "></h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="edit-student" method="post">
                    <div class="container my-4 p-4 border rounded bg-light">
                        <h3 class="mb-4 text-center">Edit Learner Details</h3>

                        <div class="row mb-3">
                            <div class="col-md-6">
                                <label for="edit-lrn" class="form-label">Learner Reference Number (LRN)</label>
                                <input type="number" id="edit-lrn" name="lrn" class="form-control" placeholder="Enter LRN" readonly>
                            </div>

                            <div class="col-md-6">
                                <label for="edit-upload-std-img" class="form-label">Upload Student Image</label>
                                <input type="file" id="edit-upload-std-img" name="std_img" class="form-control">
                            </div>
                        </div>

                        <div class="row mb-3">
                            <div class="col-md-3">
                                <label for="edit-last_name" class="form-label">Last Name</label>
                                <input type="text" id="edit-last_name" name="last_name" class="form-control" placeholder="Last Name" required>
                            </div>
                            <div class="col-md-3">
                                <label for="edit-first_name" class="form-label">First Name</label>
                                <input type="text" id="edit-first_name" name="first_name" class="form-control" placeholder="First Name" required>
                            </div>
                            <div class="col-md-3">
                                <label for="edit-middle_name" class="form-label">Middle Name</label>
                                <input type="text" id="edit-middle_name" name="middle_name" class="form-control" placeholder="Middle Name">
                            </div>
                            <div class="col-md-3">
                                <label for="edit-extension_name" class="form-label">Extension Name</label>
                                <input type="text" id="edit-extension_name" name="extension_name" class="form-control" placeholder="e.g., Jr/Sr/III">
                            </div>
                        </div>

                        <div class="row mb-3">
                            <div class="col-md-4">
                                <label for="edit-bdate" class="form-label">Birth Date</label>
                                <input type="date" id="edit-bdate" name="bdate" class="form-control" required>
                            </div>
                            <div class="col-md-4">
                                <label for="edit-sex" class="form-label">Sex</label>
                                <select id="edit-sex" name="sex" class="form-select">
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            <div class="col-md-4">
                                <label for="edit-phoneNumber" class="form-label">Phone Number</label>
                                <input type="text" id="edit-phoneNumber" name="phoneNumber" class="form-control" placeholder="Phone Number" minlength="3" maxlength="15" required>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <div class="col-md-6">
                                <label for="edit-email" class="form-label">Email</label>
                                <input type="email" id="edit-email" name="email" class="form-control" placeholder="Email" required>
                            </div>
                            <div class="col-md-6">
                                <label for="edit-civilStatus" class="form-label">Civil Status</label>
                                <select id="edit-civilStatus" name="civilStatus" class="form-select">
                                    <option value="single">Single</option>
                                    <option value="taken">Taken</option>
                                    <option value="married">Married</option>
                                    <option value="divorced">Divorced</option>
                                    <option value="widowed">Widowed</option>
                                </select>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <div class="col-md-6">
                                <label for="edit-current_address" class="form-label">Current Address</label>
                                <input type="text" id="edit-current_address" name="current_address" class="form-control" placeholder="Current Address" required>
                            </div>

                            <div class="col-md-6">
                                <label for="edit-permanent_address" class="form-label">Permanent Address</label>
                                <input type="text" id="edit-permanent_address" name="permanent_address" class="form-control" placeholder="Permanent Address">
                            </div>
                        </div>

                        <div class="row mb-3">
                            <div class="col-md-6">
                                <label for="edit-religion" class="form-label">Religion</label>
                                <input type="text" id="edit-religion" name="religion" class="form-control" placeholder="Religion">
                            </div>
                            <div class="col-md-6">
                                <label for="edit-nationality" class="form-label">Nationality</label>
                                <input type="text" id="edit-nationality" name="nationality" class="form-control" placeholder="Nationality">
                            </div>
                            <div class="col-md-6">
                                <label for="edit-disability" class="form-label">Disability</label>
                                <input type="text" id="edit-disability" name="disability" class="form-control" placeholder="Nationality">
                            </div>
                        </div>

                        <h5 class="text-secondary mb-3">Family Information</h5>

                        <div class="row mb-3">
                            <div class="col-md-6">
                                <label for="edit-fatherLastName" class="form-label">Father's Last Name</label>
                                <input type="text" id="edit-fatherLastName" name="fatherLastName" class="form-control" placeholder="Father's Last Name">
                            </div>
                            <div class="col-md-6">
                                <label for="edit-fatherFirstName" class="form-label">Father's First Name</label>
                                <input type="text" id="edit-fatherFirstName" name="fatherFirstName" class="form-control" placeholder="Father's First Name">
                            </div>
                            <div class="col-md-6">
                                <label for="edit-fatherMiddleName" class="form-label">Father's Middle Name</label>
                                <input type="text" id="edit-fatherMiddleName" name="fatherMiddleName" class="form-control" placeholder="Father's Middle Name">
                            </div>
                            <div class="col-md-6">
                                <label for="edit-fatherExtensionName" class="form-label">Father's Extension Name</label>
                                <input type="text" id="edit-fatherExtensionName" name="fatherExtensionName" class="form-control" placeholder="e.g., Jr/Sr/III">
                            </div>
                            <div class="col-md-6">
                                <label for="edit-fatherPhoneNumber" class="form-label">Father's Phone Number</label>
                                <input type="text" id="edit-fatherPhoneNumber" name="fatherPhoneNumber" minlength="3" maxlength="15" class="form-control" placeholder="Father Phone Number">
                            </div>
                        </div>

                        <div class="row mb-3">
                            <div class="col-md-6">
                                <label for="edit-motherLastName" class="form-label">Mother's Last Name</label>
                                <input type="text" id="edit-motherLastName" name="motherLastName" class="form-control" placeholder="Mother's Last Name">
                            </div>
                            <div class="col-md-6">
                                <label for="edit-motherFirstName" class="form-label">Mother's First Name</label>
                                <input type="text" id="edit-motherFirstName" name="motherFirstName" class="form-control" placeholder="Mother's First Name">
                            </div>
                            <div class="col-md-6">
                                <label for="edit-motherMiddleName" class="form-label">Mother's Middle Name</label>
                                <input type="text" id="edit-motherMiddleName" name="motherMiddleName" class="form-control" placeholder="Mother Middle Name">
                            </div>
                            <div class="col-md-6">
                                <label for="edit-motherMaidenName" class="form-label">Mother's Maiden Name</label>
                                <input type="text" id="edit-motherMaidenName" name="motherMaidenName" class="form-control" placeholder="Mother Maiden Name">
                            </div>
                            <div class="col-md-6">
                                <label for="edit-motherPhoneNumber" class="form-label">Mother's Phone Number</label>
                                <input type="text" id="edit-motherPhoneNumber" name="motherPhoneNumber" minlength="3" maxlength="15" class="form-control" placeholder="mother Phone Number">
                            </div>
                        </div>

                        <div class="row mb-3">
                            <div class="col-md-6">
                                <label for="edit-guardianLastName" class="form-label">Guardian's Last Name</label>
                                <input type="text" id="edit-guardianLastName" name="guardianLastName" class="form-control" placeholder="Guardian's Last Name">
                            </div>
                            <div class="col-md-6">
                                <label for="edit-guardianFirstName" class="form-label">Guardian's First Name</label>
                                <input type="text" id="edit-guardianFirstName" name="guardianFirstName" class="form-control" placeholder="Guardian's First Name">
                            </div>
                            <div class="col-md-6">
                                <label for="edit-guardianMiddleName" class="form-label">Guardian's Middle Name</label>
                                <input type="text" id="edit-guardianMiddleName" name="guardianMiddleName" class="form-control" placeholder="Guardian's Middle Name">
                            </div>
                            <div class="col-md-6">
                                <label for="edit-guardianExtensionName" class="form-label">Guardian's Extension Name</label>
                                <input type="text" id="edit-guardianExtensionName" name="guardianExtensionName" class="form-control" placeholder="e.g., Jr/Sr/III">
                            </div>
                            <div class="col-md-6">
                                <label for="edit-guardianPhoneNumber" class="form-label">Guardian's Phone Number</label>
                                <input type="text" id="edit-guardianPhoneNumber" name="guardianPhoneNumber" minlength="3" maxlength="15" class="form-control" placeholder="Guardian Phone Number">
                            </div>
                        </div>
                    </div>

                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <input type="submit" class="btn btn-primary" id="save-btn" value="Save Changes">
            </div>
        </div>
    </div>
</div>