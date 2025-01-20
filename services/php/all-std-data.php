<?php
require_once('../../config/database.php');



class StudentData extends DataBaseHost
{

    public function studentData()
    {
        $sql = "SELECT * FROM `student_info` WHERE 1";
        $conn = $this->connect();
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $result = array();

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $result = $row;
        }
        echo json_encode($result);
    }
}

$idk = new StudentData();

$idk->studentData();
