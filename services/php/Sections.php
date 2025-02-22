<?php

use Random\Engine\Secure;

require_once('../../config/database.php');
require_once('../../includes/utils/php/jsonEncoder.inc.php');

class Sections extends DataBaseHost
{

    public function getSections()
    {
        $conn = $this->connect();
        $conn->beginTransaction();

        $sql = "SELECT * FROM gradeSections";

        $stmt = $conn->prepare($sql);

        $stmt->execute();
        $conn->commit();

        $result = [];

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $result[] = $row;
        }

        JsonEncoder::jsonEncode($result);
    }
}

$section = new Sections();
$section->getSections();
