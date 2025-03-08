<?php
require_once('../../includes/bcknd-kit/requires.php');

//validate if table exist
$validate = new Validator();
$validate->isTableExist('studentInfo');

class DeleteStudent extends DatabaseHost
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
            JsonEncoder::jsonEncode(['error' => 'Failed to delete: ' . $e->getMessage()]);
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $deleteStudent = new DeleteStudent($_POST);
    $deleteStudent->deleteStudent();
}
