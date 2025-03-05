<?php
require_once('../../config/database.php');
require_once('../../includes/utils/php/jsonEncoder.inc.php');
require_once('../../includes/utils/php/tableValidator.php');

$validate = new Validator();
$validate->isTableExist('registrations');

class Registration extends DatabaseHost
{
    private $sy;
    private $section;
    private $sID;
    private $regDate;

    public function __construct($post)
    {
        $this->sy = $post['sy'];
        $this->section = $post['section'];
        $this->sID = $post['sID'];
        $this->regDate = $post['reg-date'];
    }

    public function register()
    {
        try {
            $conn = $this->connect();
            $conn->beginTransaction();

            $sql = "INSERT INTO registrations(`registrationDate`, `studentID`, `gradeSectionID`, `schoolYearID`) VALUES(:regdate, :sID, :section, :sy)";
            $stmt = $conn->prepare($sql);

            $stmt->bindParam(':regdate', $this->regDate);
            $stmt->bindParam(':sID', $this->sID);
            $stmt->bindParam(':section', $this->section);
            $stmt->bindParam(':sy', $this->sy);

            $stmt->execute();
            $conn->commit();

            JsonEncoder::jsonEncode(['success' => 'Successfully registered']);
        } catch (Exception $e) {
            JsonEncoder::jsonEncode(['error' => $e->getMessage()]);
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $reg = new Registration($_POST);
    $reg->register();
}
