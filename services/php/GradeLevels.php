<?php
require_once('../../includes/bcknd-kit/requires.php');

$validate = new Validator();
$validate->isTableExist('gradeLevels');

class GradeLevels extends DatabaseHost
{

    public function fetchAvailableGradeLevels()
    {
        try {

            $conn = $this->connect();

            $sql = "SELECT * FROM gradeLevels";

            $stmt = $conn->prepare($sql);

            $stmt->execute();

            $result = [];

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $result[] = $row;
            }

            JsonEncoder::jsonEncode(['success' => $result]);
        } catch (Exception $e) {
            JsonEncoder::jsonEncode(['error' => $e->getMessage()]);
        }
    }
}

$gradeLevels = new GradeLevels();
$gradeLevels->fetchAvailableGradeLevels();
