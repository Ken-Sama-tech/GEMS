<?php

require_once "../../config/database.php";
require_once "../../includes/utils/jsonEncoder.inc.php";

class NewStudentFormData extends DataBaseHost
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

    public function __construct($std_data, $image)
    {
        require_once('../../includes/utils/sanitizer.inc.php');

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
    }

    public function sendSaveStudentData()
    {


        try {
            $conn = $this->connect();
            $conn->beginTransaction();

            $sql = "INSERT INTO 
            student_info
            (
            `learnerReferenceNumber`,`lastName`, `firstName`, `middleName`, `extensionName`, 
            `birthDate`, `sex`, `phoneNumber`, `email`, `civilStatus`, 
            `religion`, `current_address`, `permanent_address`, `nationality`, `disability`, 
            `guardianLastName`, `guardianFirstName`, `guardianMiddleName`, `guardianExtensionName`, `guardianPhoneNumber`, 
            `motherLastName`, `motherFirstName`, `motherMiddleName`, `motherMaidenName`, `motherPhoneNumber`, 
            `fatherLastName`, `fatherFirstName`, `fatherMiddleName`, `fatherExtensionName`, `fatherPhoneNumber`
            ) 
            VALUES (
            :lrn, :lastName, :firstName, :middleName, :extensionName, 
            :birthDate, :sex, :phoneNumber, :email, :civilStatus, 
            :religion, :current_address, :permanent_address, :nationality, :disability, 
            :guardianLastName, :guardianFirstName, :guardianMiddleName, :guardianExtensionName, :guardianPhoneNumber, 
            :motherLastName, :motherFirstName, :motherMiddleName, :motherMaidenName, :motherPhoneNumber, 
            :fatherLastName, :fatherFirstName, :fatherMiddleName, :fatherExtensionName, :fatherPhoneNumber
            );";

            if (isset($this->std_img)) {
                $img_name = $this->std_img['name'];
                $img_tmpName = $this->std_img['tmp_name'];
                $img_size = $this->std_img['size'];
                $img_type = $this->std_img['type'];
                $img_err = $this->std_img['error'];

                $img_ext = strtolower(pathinfo($img_name, PATHINFO_EXTENSION));

                $allowed_type = ['image/jpg', 'image/png', 'image/jpeg'];
                if (in_array($img_type, $allowed_type)) {
                    if ($img_err === 0) {
                        if ($img_size <= 5 * 1024 * 1024) {
                            $uploadDir = '../../imgs/studentProfile/';
                            $newImg = uniqid('profile_', true) . '.' . $img_ext;
                            $targetPath = $uploadDir . $newImg;

                            if (move_uploaded_file($img_tmpName, $targetPath)) {
                                $this->std_img =  $newImg;
                            } else {
                                throw new Exception('Failed to move uploaded image');
                            }
                        } else {
                            throw new Exception('Image exceeded 5mb');
                        }
                    } else {
                        switch ($img_err) {
                            case 1:
                                throw new Exception(' UPLOAD_ERR_INI_SIZE — The uploaded file exceeds the upload_max_filesize directive in the php.ini file.');
                                break;
                            case 2:
                                throw new Exception('UPLOAD_ERR_FORM_SIZE — The uploaded file exceeds the MAX_FILE_SIZE directive specified in the HTML form.');
                                break;
                            case 3:
                                throw new Exception(' UPLOAD_ERR_PARTIAL — The file was only partially uploaded.');
                                break;
                            case 4:
                                throw new Exception(' UPLOAD_ERR_NO_FILE — No file was uploaded.');
                                break;
                            case 6:
                                throw new Exception(' UPLOAD_ERR_NO_TMP_DIR — Missing a temporary folder (a required PHP configuration).');
                                break;
                            case 7:

                                throw new Exception('UPLOAD_ERR_CANT_WRITE — Failed to write file to disk.');
                                break;
                            case 8:
                                throw new Exception('UPLOAD_ERR_EXTENSION — A PHP extension stopped the file upload.');
                                break;

                            default:
                                throw new Exception('Unknown Error');
                        }
                    }
                } else {
                    throw new Exception('Invalid image type. Only png/jpg is allowed');
                }
            }

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
        } catch (PDOException $e) {
            $conn->rollBack();
            error_log('PDO exception' . $e->getMessage());
            echo json_encode('Query failed to insert data');
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $new = new NewStudentFormData($_POST, $_FILES);

    $new->sendSaveStudentData();
}
