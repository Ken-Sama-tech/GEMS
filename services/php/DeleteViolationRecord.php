<?php

require_once('../../config/database.php');
require_once('../../includes/utils/php/jsonEncoder.inc.php');

require_once('../../includes/utils/php/tableValidator.php');

//validate if table exist
$validate = new Validator();
$validate->isTableExist('violationLogs');

class ViolationRecord extends DatabaseHost
{
    private $vID;

    public function __construct($post)
    {
        $this->vID = $post['vID'];
    }

    public function delete()
    {
        try {
            $conn = $this->connect();
            $conn->beginTransaction();

            $sql = "DELETE FROM violationLogs WHERE violationLogID = :vID";

            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':vID', $this->vID);

            $stmt->execute();
            $conn->commit();

            JsonEncoder::jsonEncode(['success' => 'Successfully deleted']);
        } catch (Exception $e) {
            JsonEncoder::jsonEncode(['error' => $e->getMessage()]);
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $record = new ViolationRecord($_POST);
    $record->delete();
}
