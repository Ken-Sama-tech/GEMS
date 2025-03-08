<?php
require_once('../../includes/bcknd-kit/requires.php');

$validate = new Validator();
$validate->isTableExist('');

class ChartsData extends DatabaseHost
{

    public function fetchData()
    {
        $conn = $this->connect();

        $sql = "SELECT violationLogs.violationLogID, violationLogs.studentID, ";
    }
}
