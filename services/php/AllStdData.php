<?php

require_once('../../config/database.php');
require_once('../../includes/utils/php/jsonEncoder.inc.php');
require_once('../../includes/utils/php/tableValidator.php');

//validate if table exist
$validate = new Validator();
$validate->isTableExist('studentInfo');

class StudentData extends DataBaseHost
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
