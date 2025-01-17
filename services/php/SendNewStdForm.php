<?php

class NewStudentFormData
{

    private $std_lrn;
    private $std_img;
    private $std_last_name;
    private $std_first_name;
    private $std_middle_name;
    private $std_extension_name;
    private $std_bdate;
    private $std_sex;
    private $std_phone_number;
    private $std_email;
    private $std_civil_status;
    private $std_religion;
    private $std_current_address;
    private $std_permanent_address;
    private $std_nationality;
    private $std_disability;
    private $gdn_last_name;
    private $gdn_first_name;
    private $gdn_middle_name;
    private $gdn_extension_name;
    private $gdn_phone_number;
    private $mother_last_name;
    private $mother_first_name;
    private $mother_middle_name;
    private $mother_maiden_name;
    private $mother_phone_number;
    private $father_last_name;
    private $father_first_name;
    private $father_middle_name;
    private $father_extension_name;
    private $father_phone_number;

    protected function __construct($std_data, $image)
    {
        require_once('../../includes/utils/sanitizer.inc.php');

        //fetch new student data and sanitize

        $this->std_lrn = Sanitizers::sanitizeNumber($std_data['lrn']);
        $this->std_img = Sanitizers::sanitizeImage($image['std_img']);
        $this->std_last_name = Sanitizers::sanitizeString($std_data['last_name']);
        $this->std_first_name = Sanitizers::sanitizeString($std_data['first_name']);
        $this->std_middle_name = Sanitizers::sanitizeString($std_data['middle_name']);
        $this->std_extension_name = Sanitizers::sanitizeString($std_data['extension_name']);
        $this->std_bdate = Sanitizers::sanitizeDate($std_data['bdate']);
        $this->std_sex = Sanitizers::sanitizeString($std_data['sex']);
        $this->std_phone_number = Sanitizers::sanitizeNumber(($std_data['phoneNumber']));
        $this->std_email = Sanitizers::sanitizeEmail($std_data['email']);
        $this->std_civil_status = Sanitizers::sanitizeString($std_data['civilStatus']);
        $this->std_religion = Sanitizers::sanitizeString($std_data['religion']);
        $this->std_current_address = Sanitizers::sanitizeString($std_data['current_address']);
        $this->std_permanent_address = Sanitizers::sanitizeString($std_data['permanent_address']);
        $this->std_nationality = Sanitizers::sanitizeString($std_data['nationality']);
        $this->std_disability = Sanitizers::sanitizeString($std_data['disability']);
        $this->gdn_last_name = Sanitizers::sanitizeString($std_data['guardianLastName']);
        $this->gdn_first_name = Sanitizers::sanitizeString($std_data['guardianFirstName']);
        $this->gdn_middle_name = Sanitizers::sanitizeString($std_data['guardianMiddleName']);
        $this->gdn_extension_name = Sanitizers::sanitizeString($std_data['guardianExtensionName']);
        $this->gdn_phone_number = Sanitizers::sanitizeNumber($std_data['guardianPhoneNumber']);
        $this->mother_last_name = Sanitizers::sanitizeString($std_data['motherLastName']);
        $this->mother_first_name = Sanitizers::sanitizeString($std_data['motherFirstName']);
        $this->mother_middle_name = Sanitizers::sanitizeString($std_data['motherMiddleName']);
        $this->mother_maiden_name = Sanitizers::sanitizeString($std_data['motherMaidenName']);
        $this->mother_phone_number = Sanitizers::sanitizeNumber($std_data['motherPhoneNumber']);
        $this->father_last_name = Sanitizers::sanitizeString($std_data['fatherLastName']);
        $this->father_first_name = Sanitizers::sanitizeString($std_data['fatherFirstName']);
        $this->father_middle_name = Sanitizers::sanitizeString($std_data['fatherMiddleName']);
        $this->father_extension_name = Sanitizers::sanitizeString($std_data['fatherExtensionName']);
        $this->father_phone_number = Sanitizers::sanitizeNumber($std_data['fatherPhoneNumber']);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $new = new NewStudentFormData($_POST, $_FILES);
    echo json_encode('ss');
}
