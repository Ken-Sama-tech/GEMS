<?php
require_once('../../includes/bcknd-kit/requires.php');

$validate = new Validator();
$validate->isTableExist('toDoLists');

class ToDoLists extends DatabaseHost
{
    private $task;
    private $status;

    public function __construct($task, $status = "PENDING")
    {
        $this->task = Sanitizers::sanitizeString($task);
        $this->status = Sanitizers::sanitizeString($status);
    }

    public function addNewTask()
    {
        try {
            $conn = $this->connect();
            $conn->beginTransaction();

            $sql = "INSERT INTO toDoLists(toDo, toDoStatus) VALUES(:toDo, :toDoStatus)";

            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':toDo', $this->task);
            $stmt->bindParam(':toDoStatus', $this->status);

            $stmt->execute();
            $conn->commit();

            JsonEncoder::jsonEncode(['success' => 'Successfully added']);
        } catch (Exception $e) {
            JsonEncoder::jsonEncode(['error' => $e->getMessage()]);
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $toDoLists = new ToDoLists($_POST['task']);
    $toDoLists->addNewTask();
}
