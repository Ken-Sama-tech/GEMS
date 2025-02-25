<?php

require_once('../../config/database.php');
require_once('../../includes/utils/php/jsonEncoder.inc.php');

require_once('../../includes/utils/php/tableValidator.php');

//validate if table exist
$validate = new Validator();
$validate->isTableExist('studentInfo');

class UploadStudentProfile extends DataBaseHost
{

    private $img;
    private $lrn;

    public function __construct($lrn, $img)
    {
        try {

            require_once('../../includes/utils/php/sanitizer.inc.php');

            $this->lrn = Sanitizers::sanitizeNumber($lrn['lrn']);
            $this->img = Sanitizers::sanitizeImage($img['img']);
        } catch (Exception $e) {
            JsonEncoder::jsonEncode(['error' => $e->getMessage()]);
            die();
        }
    }

    public function uploadImg()
    {
        $conn = $this->connect();
        $conn->beginTransaction();

        try {
            $sql = 'UPDATE `studentInfo` SET `studentImg` = :img WHERE learnerReferenceNumber = :lrn';
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':img', $this->img);
            $stmt->bindParam(':lrn', $this->lrn);

            $stmt->execute();
            $conn->commit();
            JsonEncoder::jsonEncode(['success' => 'Succesfuly changed image']);
        } catch (Exception $e) {
            JsonEncoder::jsonEncode(['error' => $e->getMessage()]);
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $upload_student_pfp = new UploadStudentProfile($_POST, $_FILES);
    $upload_student_pfp->uploadImg();
}
