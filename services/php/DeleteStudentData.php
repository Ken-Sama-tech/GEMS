<?php

require_once('../../config/database.php');
require_once('../../includes/utils/php/jsonEncoder.inc.php');
require_once('../../includes/utils/php/sanitizer.inc.php');

class DeleteStudent extends DataBaseHost
{

    private $std_lrn;

    public function __construct($param)
    {
        $this->std_lrn = Sanitizers::sanitizeNumber($param['lrn']);
    }


    public function deleteStudent()
    {
        $conn = $this->connect();
        $conn->beginTransaction();
        try {

            $sql = "DELETE FROM `studentInfo` WHERE learnerReferenceNumber = :lrn";

            $stmt = $conn->prepare($sql);

            $stmt->bindParam(':lrn', $this->std_lrn, PDO::PARAM_STR);
            $stmt->execute();
            $conn->commit();
            JsonEncoder::jsonEncode(['success' => 'Student successfully deleted']);
        } catch (Exception $e) {
            JsonEncoder::jsonEncode(['error' => 'failed to delete ' . $e->getMessage()]);
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $deleteStudent = new DeleteStudent($_POST);
    $deleteStudent->deleteStudent();
}
