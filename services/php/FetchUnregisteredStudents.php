<?php
require_once('../../config/database.php');
require_once('../../includes/utils/php/jsonEncoder.inc.php');
require_once('../../includes/utils/php/tableValidator.php');

$validate = new Validator();
$validate->isTableExist('registrations');
$validate->isTableExist('studentInfo');
$validate->isTableExist('schoolYears');

class Registration extends DatabaseHost
{
    private $sy;

    public function __construct($post)
    {
        $this->sy = $post['sy'];
    }

    public function fetchUnregistedStudents()
    {
        try {
            $conn = $this->connect();

            $sql = "SELECT studentInfo.studentID, studentInfo.learnerReferenceNumber, studentInfo.lastName, studentInfo.firstName, studentInfo.middleName, studentInfo.extensionName, studentInfo.sex, registrations.schoolYearID, schoolYears.schoolYear FROM studentInfo LEFT JOIN registrations ON  registrations.studentID = studentInfo.studentID LEFT JOIN schoolyears ON registrations.schoolYearID = schoolyears.schoolYearID WHERE registrations.schoolYearID = :sy";

            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':sy', $this->sy);
            $stmt->execute();

            $result = [];

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $result[] = $row;
            }
            
            JsonEncoder::jsonEncode(['success' => $result]);
        } catch (Exception $e) {
            JsonEncoder::jsonEncode(['error' => $e->getMessage()]);
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $reg = new Registration($_POST);
    $reg->fetchUnregistedStudents();
}
