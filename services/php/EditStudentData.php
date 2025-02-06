 <?php

    require_once "../../config/database.php";
    require_once "../../includes/utils/php/jsonEncoder.inc.php";

    class EditStudentData extends DataBaseHost
    {
        private $std_lrn;
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

        public function __construct($std_data, $image)
        {
            try {
                require_once "../../includes/utils/php/sanitizer.inc.php";

                $this->std_lrn = Sanitizers::sanitizeNumber($std_data['lrn']);
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
                JsonEncoder::jsonEncode(['error' => $e->getMessage()]);
                die();
            }
        }

        public function saveChanges()
        {
            $conn = $this->connect();
            $conn->beginTransaction();

            try {
                $sql =
                    "UPDATE 
                `studentInfo`
                SET 
                `lastName` = :lastName, 
                `firstName` = :firstName, 
                `middleName` = :middleName, 
                `extensionName` = :extensionName, 
                `birthDate` = :birthDate, 
                `sex` = :sex, 
                `phoneNumber` = :phoneNumber, 
                `email` = :email, 
                `civilStatus` = :civilStatus, 
                `religion` = :religion, 
                `current_address` = :current_address, 
                `permanent_address` = :permanent_address, 
                `nationality` = :nationality, 
                `disability` = :disability, 
                `guardianLastName` = :guardianLastName, 
                `guardianFirstName` = :guardianFirstName, 
                `guardianMiddleName` = :guardianMiddleName, 
                `guardianExtensionName` = :guardianExtensionName, 
                `guardianPhoneNumber` = :guardianPhoneNumber, 
                `motherLastName` = :motherLastName, 
                `motherFirstName` = :motherFirstName, 
                `motherMiddleName` = :motherMiddleName, 
                `motherMaidenName` = :motherMaidenName, 
                `motherPhoneNumber` = :motherPhoneNumber, 
                `fatherLastName` = :fatherLastName, 
                `fatherFirstName` = :fatherFirstName, 
                `fatherMiddleName` = :fatherMiddleName, 
                `fatherExtensionName` = :fatherExtensionName, 
                `fatherPhoneNumber` = :fatherPhoneNumber
                WHERE 
                learnerReferenceNumber = :lrn";

                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':lrn', $this->std_lrn, PDO::PARAM_INT);
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

                JsonEncoder::jsonEncode(['success' => 'successfuly changed data']);
            } catch (Exception $e) {
                JsonEncoder::jsonEncode(['error' => $e->getMessage()]);
            }
        }
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {

        $editedData = new EditStudentData($_POST, $_FILES);
        $editedData->saveChanges();
    }
