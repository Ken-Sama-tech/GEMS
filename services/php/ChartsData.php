<?php
require_once('../../config/database.php');
require_once('../../includes/utils/php/jsonEncoder.inc.php');
require_once('../../includes/utils/php/tableValidator.php');

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
