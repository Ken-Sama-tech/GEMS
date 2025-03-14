<?php
require_once('../../includes/bcknd-kit/requires.php');

//validate if table exist
$validate = new Validator();
$validate->isTableExist('studentInfo');

class CheckStudentDataBeforeEdit extends DatabaseHost
{
    private $std_lrn;

    public function __construct($std_lrn)
    {
        $this->std_lrn = $std_lrn;
    }

    public function checkStdLrn()
    {
        try {

            $conn = $this->connect();

            $sql = "SELECT * FROM `studentInfo` WHERE learnerReferenceNumber = :lrn";

            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':lrn', $this->std_lrn, PDO::PARAM_INT);
            $stmt->execute();
            $result = [];

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $result = $row;
            }

            JsonEncoder::jsonEncode($result);
        } catch (Exception $e) {
            JsonEncoder::jsonEncode(['error' => $e->getMessage()]);
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $std_lrn = $_POST['lrn'];
    $check_lrn = new CheckStudentDataBeforeEdit($std_lrn);
    $check_lrn->checkStdLrn();
}
