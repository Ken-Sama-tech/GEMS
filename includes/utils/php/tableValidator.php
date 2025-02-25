<?php
// require_once('../../../config/database.php');
// require_once('jsonEncoder.inc.php');

class Validator extends DataBaseHost
{
    public  function isTableExist($tableName)
    {

        try {
            $conn = $this->connect();
            $conn->beginTransaction();

            $sql = "SELECT {$tableName}.* FROM {$tableName}";

            $stmt = $conn->prepare($sql);
            $stmt->execute();
        } catch (Exception) {
            JsonEncoder::jsonEncode(['exception' => "{$tableName} table not found"]);
            die();
        }
    }
}
