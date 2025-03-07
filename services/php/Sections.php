<?php

require_once('../../config/database.php');
require_once('../../includes/utils/php/jsonEncoder.inc.php');
require_once('../../includes/utils/php/tableValidator.php');

$validate = new Validator();
$validate->isTableExist('gradeSections');

class Sections extends DatabaseHost
{
    public function getSections($gID = null, $sy = null)
    {
        try {
            $conn = $this->connect();

            $sql = "SELECT * FROM gradeSections WHERE gradeLevelID = :gID AND schoolYearID = :sy";

            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':gID', $gID);
            $stmt->bindParam(':sy', $sy);

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

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $sections = new Sections();
    $sections->getSections($_POST['gID'], $_POST['sy']);
}
