<?php

require_once "../../config/database.php";
require_once "../php/SendNewStdForm.php";
require_once "../../includes/utils/php/jsonEncoder.inc.php";

class EditStudentData extends NewStudentFormData
{

    public function __construct($std_data, $image)
    {
        parent::__construct($std_data, $image);
    }

    public function saveChanges()
    {
        $conn = $this->connect();
        $conn->beginTransaction();

        try {
            $sql =
                "UPDATE 
                `student_info`
                SET  
                `learnerReferenceNumber` = ':lrn',
                `studentImg` = ':studentImg',
                `lastName` = ':lastName', 
                `firstName` = ':firstName', 
                `middleName` = ':middleName', 
                `extensionName` = ':middleName', 
                `birthDate` = ':birthDate', 
                `sex` = ':sex', 
                `phoneNumber` = ':phoneNumber', 
                `email` = ':email', 
                `civilStatus` = ':civilStatus', 
                `religion` = ':religion', 
                `current_address` = ':current_address', 
                `permanent_address` = ':permanent_address', 
                `nationality` = ':nationality', 
                `disability` = ':disability', 
                `guardianLastName` = ':guardianLastName', 
                `guardianFirstName` = ':guardianFirstName', 
                `guardianMiddleName` = ':guardianMiddleName', 
                `guardianExtensionName` = ':guardianExtensionName', 
                `guardianPhoneNumber` = ':guardianPhoneNumber', 
                `motherLastName` = ':motherLastName', 
                `motherFirstName` = ':motherFirstName', 
                `motherMiddleName` = 'motherMiddleName', 
                `motherMaidenName` = ':motherMaidenName', 
                `motherPhoneNumber` = ':motherPhoneName', 
                `fatherLastName` = ':fatherLastName', 
                `fatherFirstName` = ':fatherFirstName', 
                `fatherMiddleName` = ':fatherMiddleName', 
                `fatherExtensionName` = ':fatherExtensionName', 
                `fatherPhoneNumber`=  ':fatherPhoneNumber'
                ";

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
