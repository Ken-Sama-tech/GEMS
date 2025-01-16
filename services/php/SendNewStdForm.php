<?php 

class SanitizeNewStudentForm {

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

    private function __construct($std_data){
       if($_SERVER['REQUEST_METHOD'] === 'POST'){

        require_once('../../includes/utils/sanitizer.inc.php');

        $this->std_lrn = Sanitizers::sanitizeNumber($std_data['lrn']);
        $this->std_img = Sanitizers::sanitizeImage($std_data['std_img']);
        $this->std_last_name = Sanitizers::sanitizeString($std_data['last_name']);
        $this->std_first_name = Sanitizers::sanitizeString($std_data['first_name']);
        $this->std_middle_name =Sanitizers::sanitizeString($std_data['middle_name']);
        $this->std_extension_name = Sanitizers::sanitizeString($std_data['extension_name']);
        $this->std_bdate = Sanitizers::sanitizeDate($std_data['bdate']);
        $this->std_sex = Sanitizers::sanitizeString($std_data['sex']);
        $this->std_phone_number = Sanitizers::sanitizeNumber(($std_data['phoneNumber']));
        $this->std_email = Sanitizers::sanitizeEmail($std_data['email']);
       }
    }
}