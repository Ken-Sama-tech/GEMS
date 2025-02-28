<?php

require_once('../../config/database.php');
require_once('../../includes/utils/php/jsonEncoder.inc.php');
require_once('../../includes/utils/php/tableValidator.php');

$validate = new Validator();
$validate->isTableExist('gradeLevels');

class GradeLevels extends DatabaseHost
{

    public function fetchAvailableGradeLevels()
    {
        try {

            $conn = $this->connect();
            $conn->beginTransaction();

            $sql = "SELECT * FROM gradeLevels";

            $stmt = $conn->prepare($sql);

            $stmt->execute();
            $conn->commit();

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

$gradeLevels = new GradeLevels();
$gradeLevels->fetchAvailableGradeLevels();
