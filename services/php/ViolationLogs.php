<?php
require_once('../../includes/bcknd-kit/requires.php');

$validate = new Validator();
$validate->isTableExist('violationLogs');


class ViolationLogs extends DatabaseHost
{
    private $vID;

    public function __construct($vID)
    {
        $this->vID = $vID;
    }

    public function fetchRecord()
    {

        try {
            $conn = $this->connect();

            $sql = "SELECT * FROM violationLogs WHERE violationLogID = :vID";

            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':vID', $this->vID);

            $stmt->execute();

            $result = [];

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $result = $row;
            }

            JsonEncoder::jsonEncode($result);
        } catch (Exception $e) {
            JsonEncoder::jsonEncode(['error' => $e->getMessage()]);
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $log = new ViolationLogs($_POST['vID']);

    $log->fetchRecord();
}
