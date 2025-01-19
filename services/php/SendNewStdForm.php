<?php

require_once "../../config/database.php";
require_once "../../includes/utils/php/jsonEncoder.inc.php";

class NewStudentFormData extends DataBaseHost
{

    protected $std_lrn;
    protected $std_img;
    protected $std_last_name;
    protected $std_first_name;
    protected $std_middle_name;
    protected $std_extension_name;
    protected $std_bdate;
    protected $std_sex;
    protected $std_phone_number;
    protected $std_email;
    protected $std_civil_status;
    protected $std_religion;
    protected $std_current_address;
    protected $std_permanent_address;
    protected $std_nationality;
    protected $std_disability;
    protected $gdn_last_name;
    protected $gdn_first_name;
    protected $gdn_middle_name;
    protected $gdn_extension_name;
    protected $gdn_phone_number;
    protected $mother_last_name;
    protected $mother_first_name;
    protected $mother_middle_name;
    protected $mother_maiden_name;
    protected $mother_phone_number;
    protected $father_last_name;
    protected $father_first_name;
    protected $father_middle_name;
    protected $father_extension_name;
    protected $father_phone_number;

    public function __construct($std_data, $image)
    {
        require_once('../../includes/utils/php/sanitizer.inc.php');

        try {
            $this->std_lrn = Sanitizers::sanitizeNumber($std_data['lrn']);
            $this->std_img = Sanitizers::sanitizeImage($image['std_img']);
            $this->std_last_name = Sanitizers::sanitizeString($std_data['last_name']);
            $this->std_first_name = Sanitizers::sanitizeString($std_data['first_name']);
            $this->std_middle_name = Sanitizers::sanitizeString($std_data['middle_name']);
            $this->std_extension_name = Sanitizers::sanitizeString($std_data['extension_name']);
            $this->std_bdate = Sanitizers::sanitizeDate($std_data['bdate']);
            $this->std_sex = Sanitizers::sanitizeString($std_data['sex']);
            $this->std_phone_number = Sanitizers::sanitizeString($std_data['phoneNumber']);
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
            $this->gdn_phone_number = Sanitizers::sanitizeString($std_data['guardianPhoneNumber']);
            $this->mother_last_name = Sanitizers::sanitizeString($std_data['motherLastName']);
            $this->mother_first_name = Sanitizers::sanitizeString($std_data['motherFirstName']);
            $this->mother_middle_name = Sanitizers::sanitizeString($std_data['motherMiddleName']);
            $this->mother_maiden_name = Sanitizers::sanitizeString($std_data['motherMaidenName']);
            $this->mother_phone_number = Sanitizers::sanitizeString($std_data['motherPhoneNumber']);
            $this->father_last_name = Sanitizers::sanitizeString($std_data['fatherLastName']);
            $this->father_first_name = Sanitizers::sanitizeString($std_data['fatherFirstName']);
            $this->father_middle_name = Sanitizers::sanitizeString($std_data['fatherMiddleName']);
            $this->father_extension_name = Sanitizers::sanitizeString($std_data['fatherExtensionName']);
            $this->father_phone_number = Sanitizers::sanitizeString($std_data['fatherPhoneNumber']);
        } catch (Exception $e) {
            JsonEncoder::jsonEncode(['error' =>  $e->getMessage()]);
            die();
        }
    }

    public function SaveStudentData()
    {

        $conn = $this->connect();
        $conn->beginTransaction();

        try {
            $sql = "SELECT learnerReferenceNumber FROM student_info WHERE learnerReferenceNumber = :lrn";


            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':lrn', $this->std_lrn);
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($result) {
                throw new Exception('Learner reference number already exist');
            } else {

                $sql = "INSERT INTO 
                student_info
                (
                `learnerReferenceNumber`, `studentImg`,`lastName`, `firstName`, `middleName`, `extensionName`, 
                `birthDate`, `sex`, `phoneNumber`, `email`, `civilStatus`, 
                `religion`, `current_address`, `permanent_address`, `nationality`, `disability`, 
                `guardianLastName`, `guardianFirstName`, `guardianMiddleName`, `guardianExtensionName`, `guardianPhoneNumber`, 
                `motherLastName`, `motherFirstName`, `motherMiddleName`, `motherMaidenName`, `motherPhoneNumber`, 
                `fatherLastName`, `fatherFirstName`, `fatherMiddleName`, `fatherExtensionName`, `fatherPhoneNumber`
                ) 
                VALUES (
                :lrn, :studentImg,:lastName, :firstName, :middleName, :extensionName, 
                :birthDate, :sex, :phoneNumber, :email, :civilStatus, 
                :religion, :current_address, :permanent_address, :nationality, :disability, 
                :guardianLastName, :guardianFirstName, :guardianMiddleName, :guardianExtensionName, :guardianPhoneNumber, 
                :motherLastName, :motherFirstName, :motherMiddleName, :motherMaidenName, :motherPhoneNumber, 
                :fatherLastName, :fatherFirstName, :fatherMiddleName, :fatherExtensionName, :fatherPhoneNumber
                )";

                $stmt = $conn->prepare($sql);

                $stmt->bindParam(':lrn', $this->std_lrn, PDO::PARAM_INT);
                $stmt->bindParam(':studentImg', $this->std_img, PDO::PARAM_STR);
                $stmt->bindParam(':lastName', $this->std_last_name, PDO::PARAM_STR);
                $stmt->bindParam(':firstName', $this->std_first_name, PDO::PARAM_STR);
                $stmt->bindParam(':middleName', $this->std_middle_name, PDO::PARAM_STR);
                $stmt->bindParam(':extensionName', $this->std_extension_name, PDO::PARAM_STR);
                $stmt->bindParam(':birthDate', $this->std_bdate, PDO::PARAM_STR);
                $stmt->bindParam(':sex', $this->std_sex, PDO::PARAM_STR);
                $stmt->bindParam(':phoneNumber', $this->std_phone_number, PDO::PARAM_STR);
                $stmt->bindParam(':email',  $this->std_email, PDO::PARAM_STR);
                $stmt->bindParam(':civilStatus', $this->std_civil_status, PDO::PARAM_STR);
                $stmt->bindParam(':religion', $this->std_religion, PDO::PARAM_STR);
                $stmt->bindParam(':current_address', $this->std_current_address, PDO::PARAM_STR);
                $stmt->bindParam(':permanent_address', $this->std_permanent_address, PDO::PARAM_STR);
                $stmt->bindParam(':nationality', $this->std_nationality, PDO::PARAM_STR);
                $stmt->bindParam(':disability', $this->std_disability, PDO::PARAM_STR);
                $stmt->bindParam(':guardianLastName', $this->gdn_last_name, PDO::PARAM_STR);
                $stmt->bindParam(':guardianFirstName', $this->gdn_first_name, PDO::PARAM_STR);
                $stmt->bindParam(':guardianMiddleName', $this->gdn_middle_name, PDO::PARAM_STR);
                $stmt->bindParam(':guardianExtensionName', $this->gdn_extension_name, PDO::PARAM_STR);
                $stmt->bindParam(':guardianPhoneNumber', $this->gdn_phone_number, PDO::PARAM_STR);
                $stmt->bindParam(':motherLastName', $this->mother_last_name, PDO::PARAM_STR);
                $stmt->bindParam(':motherFirstName', $this->mother_first_name, PDO::PARAM_STR);
                $stmt->bindParam(':motherMiddleName', $this->mother_middle_name, PDO::PARAM_STR);
                $stmt->bindParam(':motherMaidenName', $this->mother_maiden_name, PDO::PARAM_STR);
                $stmt->bindParam(':motherPhoneNumber', $this->mother_phone_number, PDO::PARAM_STR);
                $stmt->bindParam(':fatherLastName', $this->father_last_name, PDO::PARAM_STR);
                $stmt->bindParam(':fatherFirstName', $this->father_first_name, PDO::PARAM_STR);
                $stmt->bindParam(':fatherMiddleName', $this->father_middle_name, PDO::PARAM_STR);
                $stmt->bindParam(':fatherExtensionName', $this->father_extension_name, PDO::PARAM_STR);
                $stmt->bindParam(':fatherPhoneNumber', $this->father_phone_number, PDO::PARAM_STR);

                $stmt->execute();
                $conn->commit();

                JsonEncoder::jsonEncode(['success' => 'Succesfully inserted the data']);
            }
        } catch (Exception $e) {
            $conn->rollBack();
            JsonEncoder::jsonEncode(['error' => $e->getMessage()]);
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $newStudentForm = new NewStudentFormData($_POST, $_FILES);
    $newStudentForm->SaveStudentData();
}
