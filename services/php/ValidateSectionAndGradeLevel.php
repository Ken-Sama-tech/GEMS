<?php

require_once('../../config/database.php');
require_once('../../includes/utils/php/jsonEncoder.inc.php');

class Validate extends DataBaseHost
{

    private $gradeLevel;
    private $gradeSection;
    private $validity;

    public function __construct($gradeLevel, $gradeSection)
    {
        $this->gradeLevel = $gradeLevel;
        $this->gradeSection = $gradeSection;
        $this->validity = [];
    }

    private function validateGradeLevel()
    {
        try {

            $conn = $this->connect();
            $conn->beginTransaction();

            $sql = "SELECT * FROM gradeLevels WHERE gradeLevelID = :gradeLevel";

            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':gradeLevel', $this->gradeLevel);

            $stmt->execute();
            $conn->commit();

            $result = null;

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $result = $row;
            }

            if (count($result) <= 0)
                throw new Exception('Invalid Grade Level');
            else
                $this->validity['gradeLevel'] = 'valid';
        } catch (Exception $e) {
            $this->validity['gradeLevel'] = $e->getMessage();
        }
    }

    private function validateSection()
    {
        try {

            $conn = $this->connect();
            $conn->beginTransaction();

            $sql = "SELECT * FROM gradeSections WHERE sectionID = :section";

            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':section', $this->gradeSection);

            $stmt->execute();
            $conn->commit();

            $result = null;

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $result = $row;
            }

            if (count($result) <= 0)
                throw new Exception('Invalid Section');
            else
                $this->validity['section'] = 'valid';
        } catch (Exception $e) {
            $this->validity['section'] = $e->getMessage();
        }
    }

    public function startValidation()
    {
        $this->validateGradeLevel();
        $this->validateSection();

        JsonEncoder::jsonEncode($this->validity);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $validate = new Validate($_POST['gradeLevel'], $_POST['gradeSection']);
    $validate->startValidation();
}
