<?php

require_once('../../config/database.php');
require_once('../../includes/utils/php/jsonEncoder.inc.php');
require_once('../../includes/utils/php/tableValidator.php');

$validate = new Validator();
$validate->isTableExist('gradeSections');

class Sections extends DatabaseHost
{

    public function getSections()
    {
        $conn = $this->connect();

        $sql = "SELECT * FROM gradeSections";

        $stmt = $conn->prepare($sql);

        $stmt->execute();

        $result = [];

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $result[] = $row;
        }

        JsonEncoder::jsonEncode($result);
    }
}

$section = new Sections();
$section->getSections();
