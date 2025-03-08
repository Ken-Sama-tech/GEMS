<?php
require_once('../../includes/bcknd-kit/requires.php');

//validate if table exist
$validate = new Validator();
$validate->isTableExist('studentInfo');

class StudentData extends DatabaseHost
{

    public function studentData()
    {
        try {
            $sql = "SELECT * FROM `studentInfo` WHERE 1";
            $conn = $this->connect();
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $result = [];

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $result[] = $row;
            }
            JsonEncoder::jsonEncode($result);
        } catch (Exception $e) {
            JsonEncoder::jsonEncode(['error' => $e->getMessage()]);
        }
    }
}

$studentData = new StudentData();

$studentData->studentData();
