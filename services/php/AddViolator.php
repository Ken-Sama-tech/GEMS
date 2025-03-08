<?php
require_once('../../includes/bcknd-kit/requires.php');

//validate if table exist
$validate = new Validator();
$validate->isTableExist('violationLogs');

class AddViolator extends DatabaseHost
{
    private $stdId;
    private $article;
    private $section;
    private $sanction;
    private $violationDate;

    public function __construct($form)
    {
        $this->stdId = Sanitizers::sanitizeNumber($form['std-id']);
        $this->article = Sanitizers::sanitizeNumber($form['article']);
        $this->section = Sanitizers::sanitizeNumber($form['article-section']);
        $this->sanction = Sanitizers::sanitizeNumber($form['sanction']);
        $this->violationDate = Sanitizers::sanitizeDate($form['violation-date']);
    }

    public function add()
    {
        try {

            if (empty($this->stdId)) {
                throw new Error('No student selected');
            }

            $conn = $this->connect();
            $conn->beginTransaction();

            $sql = 'INSERT INTO violationLogs(`studentID`, `articleID`, `articleSectionID`, `sanctionID`, `violationDate`) VALUES(:studentID, :articleID, :sectionID, :sanctionID, :violDate)';

            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':studentID', $this->stdId);
            $stmt->bindParam(':articleID', $this->article);
            $stmt->bindParam(':sectionID', $this->section);
            $stmt->bindParam(':sanctionID', $this->sanction);
            $stmt->bindParam(':violDate', $this->violationDate);

            $stmt->execute();

            $conn->commit();

            JsonEncoder::jsonEncode(['success' => 'Violator successfully added']);
        } catch (Error $e) {
            JsonEncoder::jsonEncode(['error' => $e->getMessage()]);
            die();
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $addViolator = new AddViolator($_POST);
    $addViolator->add();
}
