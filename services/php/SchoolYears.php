<?php
require_once('../../config/database.php');
require_once('../../includes/utils/php/jsonEncoder.inc.php');
require_once('../../includes/utils/php/tableValidator.php');

$validate = new Validator();
$validate->isTableExist('schoolYears');

class SchoolYears extends DatabaseHost
{

    public function getSchoolYears($post = null)
    {
        try {
            $conn = $this->connect();

            $sql = "SELECT * FROM schoolYears ORDER BY schoolYear ASC";
            $stmt = $conn->prepare($sql);
            $stmt->execute();

            $result = [];

            $schoolYears = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if (!empty($post['sy'])) {
                $sy = $post['sy'];

                $sql = "SELECT * FROM schoolYears WHERE schoolYearID = :sy";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':sy', $sy);
                $stmt->execute();
                $selectedYearRow = $stmt->fetch(PDO::FETCH_ASSOC);

                if ($selectedYearRow) {
                    $selectedYear = (int)explode("-", $selectedYearRow['schoolYear'])[0];

                    foreach ($schoolYears as $row) {
                        $currentYear = (int)explode("-", $row['schoolYear'])[0];

                        if ($currentYear > $selectedYear) {
                            $result[] = $row;
                        }
                    }
                }
            } else {
                $result = $schoolYears;
            }

            JsonEncoder::jsonEncode(['success' => $result]);
        } catch (Exception $e) {
            JsonEncoder::jsonEncode(['error' => $e->getMessage()]);
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $sy = new SchoolYears();
    $sy->getSchoolYears($_POST);
}
