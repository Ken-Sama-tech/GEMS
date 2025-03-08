<?php
require_once('../../includes/bcknd-kit/requires.php');

$validate = new Validator();
$validate->isTableExist('violationLogs');

class StudentProgress extends DatabaseHost
{
    private $vStatus;
    private $vID;

    public function __construct($post)
    {
        $this->vID = $post['vID'];
        $this->vStatus = $post['vStatus'];
    }

    public function update()
    {
        try {
            $conn = $this->connect();
            $conn->beginTransaction();

            $sql = "UPDATE violationLogs SET violationStatus = :vStatus WHERE violationLogID = :vID";

            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':vID', $this->vID);
            $stmt->bindParam(':vStatus', $this->vStatus);

            $stmt->execute();
            $conn->commit();

            JsonEncoder::jsonEncode(['success' => 'Updated successfully']);
        } catch (Exception $e) {
            JsonEncoder::jsonEncode(['error' => $e->getMessage()]);
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $progress = new StudentProgress($_POST);
    $progress->update();
}
