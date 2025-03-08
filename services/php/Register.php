<?php
require_once('../../includes/bcknd-kit/requires.php');

$validate = new Validator();
$validate->isTableExist('registrations');

class Registration extends DatabaseHost
{
    private $nsy;
    private $section;
    private $sID;
    private $regDate;

    public function __construct($post)
    {
        $this->nsy = $post['nsy'];
        $this->section = $post['section'];
        $this->sID = $post['sID'];
        $this->regDate = $post['regDate'];
    }

    public function register()
    {
        try {
            $conn = $this->connect();
            $conn->beginTransaction();

            $sql = "INSERT INTO registrations(`registrationDate`, `studentID`, `gradeSectionID`, `schoolYearID`) VALUES(:regDate, :sID, :section, :nsy)";
            $stmt = $conn->prepare($sql);

            $stmt->bindParam(':regDate', $this->regDate);
            $stmt->bindParam(':sID', $this->sID);
            $stmt->bindParam(':section', $this->section);
            $stmt->bindParam(':nsy', $this->nsy);

            if (empty($this->nsy) || empty($this->section) || empty($this->sID) || empty($this->regDate))
                throw new Exception('Please complete the necessary data');

            $stmt->execute();
            $conn->commit();

            JsonEncoder::jsonEncode(['success' => 'Successfully registered']);
        } catch (Exception $e) {
            if ($e->getCode() == 23000)
                return JsonEncoder::jsonEncode(['error' => "Duplicate entry for this school-year"]);

            JsonEncoder::jsonEncode(['error' => $e->getMessage()]);
            die();
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $reg = new Registration($data);
    $reg->register();
}
