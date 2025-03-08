<?php
require_once('../../includes/bcknd-kit/requires.php');

$validate = new Validator();
$validate->isTableExist('toDoLists');

class ToDoList extends DatabaseHost
{
    private $tasks;

    public function __construct()
    {
        $this->tasks = [];
    }

    private function fetchPendingTask()
    {
        try {
            $conn = $this->connect();

            $sql = "SELECT * FROM `toDoLists` WHERE toDoStatus = 'PENDING'";
            $stmt = $conn->prepare($sql);

            $stmt->execute();

            $result = [];

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $result[] = $row;
            }

            $this->tasks['pending'] = $result;
        } catch (Exception $e) {
            JsonEncoder::jsonEncode(['error' => $e->getMessage()]);
            die();
        }
    }

    private function fetchCompletedTasks()
    {
        try {
            $conn = $this->connect();

            $sql = "SELECT * FROM `toDoLists` WHERE toDoStatus = 'COMPLETED'";
            $stmt = $conn->prepare($sql);

            $stmt->execute();

            $result = [];

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $result[] = $row;
            }

            $this->tasks['completed'] = $result;
        } catch (Exception $e) {
            JsonEncoder::jsonEncode(['error' => $e->getMessage()]);
            die();
        }
    }

    public function fetchAll()
    {
        $this->fetchCompletedTasks();
        $this->fetchPendingTask();
        JsonEncoder::jsonEncode(['success' => $this->tasks]);
    }
}

$toDoList = new ToDoList();
$toDoList->fetchAll();
