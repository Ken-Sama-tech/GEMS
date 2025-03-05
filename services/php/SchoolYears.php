<?php
require_once('../../config/database.php');
require_once('../../includes/utils/php/jsonEncoder.inc.php');
require_once('../../includes/utils/php/tableValidator.php');

$validate = new Validator();
$validate->isTableExist('schoolYears');

class SchoolYears extends DatabaseHost
{

    public function getSchoolYears()
    {
        try {
            $conn = $this->connect();

            $sql = "SELECT * FROM schoolYears";
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

$sy = new SchoolYears();
$sy->getSchoolYears();
