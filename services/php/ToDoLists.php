<?php

require_once('../../config/database.php');
require_once('../../includes/utils/php/jsonEncoder.inc.php');
require_once('../../includes/utils/php/tableValidator.php');

$validate = new Validator();
$validate->isTableExist('toDoLists');

class ToDoList extends DatabaseHost
{
    public function tasksList()
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

            if (count($result) <= 0) {
                JsonEncoder::jsonEncode(['void' => 'No tasks available']);
                return;
            }

            JsonEncoder::jsonEncode(['success' => $result]);
        } catch (Exception $e) {
            JsonEncoder::jsonEncode(['error' => $e->getMessage()]);
        }
    }
}

$toDoList = new ToDoList();
$toDoList->tasksList();
