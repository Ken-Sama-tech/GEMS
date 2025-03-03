<?php
require_once('../../config/database.php');
require_once('../../includes/utils/php/jsonEncoder.inc.php');
require_once('../../includes/utils/php/tableValidator.php');

$validate = new Validator();
$validate->isTableExist('toDoLists');

class ToDoList extends DatabaseHost
{

    private $tID;

    public function __construct($post)
    {
        $this->tID = $post['tID'];
    }

    public function delete()
    {
        try {
            $conn = $this->connect();
            $conn->beginTransaction();

            $sql = "DELETE FROM toDoLists WHERE toDoListID = :tID";

            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':tID', $this->tID);

            $stmt->execute();
            $conn->commit();

            JsonEncoder::jsonEncode(['success' => 'Successfully deleted']);
        } catch (Exception $e) {
            JsonEncoder::jsonEncode(['error' => $e->getMessage()]);
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $toDoList = new ToDoList($_POST);
    $toDoList->delete();
}
