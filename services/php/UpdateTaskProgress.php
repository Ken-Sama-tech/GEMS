<?php
require_once('../../includes/bcknd-kit/requires.php');

$validate = new Validator();
$validate->isTableExist('toDoLists');

class TaskList extends DatabaseHost
{
    //tID is taskID or toDoListID
    private $tID;
    private $status;
    public function __construct($tID, $status)
    {
        $this->tID = $tID;
        $this->status = $status;
    }

    public function update()
    {
        try {
            $conn = $this->connect();
            $conn->beginTransaction();

            $sql = "UPDATE toDoLists SET toDoStatus = :stat WHERE toDoListID = :tID";

            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':stat', $this->status);
            $stmt->bindParam(':tID', $this->tID);

            $stmt->execute();
            $conn->commit();

            JsonEncoder::jsonEncode(['success' => 'Succesfully updated']);
        } catch (Exception $e) {
            JsonEncoder::jsonEncode(['error' => $e->getMessage()]);
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $task = new TaskList($_POST['tID'], $_POST['status']);
    $task->update();
}
