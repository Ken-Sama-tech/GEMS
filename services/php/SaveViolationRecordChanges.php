<?php

require_once('../../config/database.php');
require_once('../../includes/utils/php/jsonEncoder.inc.php');
require_once('../../includes/utils/php/tableValidator.php');

$validate = new Validator();
$validate->isTableExist('violationLogs');

class SaveChanges extends DatabaseHost
{
    private $article;
    private $section;
    private $sanction;
    private $vDate;
    private $vID;

    public function __construct($post)
    {
        $this->article = $post['article'];
        $this->section = $post['section'];
        $this->sanction = $post['sanction'];
        $this->vID = $post['vID'];
        $this->vDate = $post['vDate'];
    }

    public function update()
    {

        try {
            $conn = $this->connect();
            $conn->beginTransaction();

            $sql = "UPDATE `violationLogs` 
            SET
            `articleID` = :article,
            `articleSectionID` = :section, 
            `sanctionID` = :sanction,
            `violationDate` = :vDate
            WHERE `violationLogID` = :vID";

            $stmt = $conn->prepare($sql);

            $stmt->bindParam(':article', $this->article);
            $stmt->bindParam(':section', $this->section);
            $stmt->bindParam(':sanction', $this->sanction);
            $stmt->bindParam(':vDate', $this->vDate);
            $stmt->bindParam(':vID', $this->vID);

            $stmt->execute();
            $conn->commit();

            JsonEncoder::jsonEncode(['success' => 'Update success']);
        } catch (Exception $e) {
            JsonEncoder::jsonEncode($e->getMessage());
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $save = new SaveChanges($_POST);
    $save->update();
}
