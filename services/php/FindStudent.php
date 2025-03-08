<?php
require_once('../../config/database.php');
require_once('../../includes/utils/php/jsonEncoder.inc.php');
require_once('../../includes/utils/php/tableValidator.php');

$validate = new Validator();
$validate->isTableExist('studentInfo');
$validate->isTableExist('registrations');
$validate->isTableExist('schoolYears');

class Student extends DatabaseHost
{
    private $lrn;
    private $sy;

    public function __construct($post = null)
    {
        $this->lrn = $post['lrn'];
        $this->sy = $post['sy'];
    }

    public function findPreviouslyEnrolledStd()
    {
        try {
            $conn = $this->connect();
            $sql = "SELECT registrations.registrationID AS regID, studentInfo.learnerReferenceNumber AS lrn, CONCAT(studentInfo.firstName, ' ', studentInfo.middleName,' ', studentInfo.lastName, ' ', studentInfo.extensionName) AS studentName, studentInfo.sex, registrations.schoolYearID, schoolYears.schoolYear FROM studentInfo RIGHT JOIN registrations ON studentInfo.studentID = registrations.studentID LEFT JOIN schoolYears ON registrations.schoolYearID = schoolYears.schoolYearID WHERE learnerReferenceNumber = :lrn AND registrations.schoolYearID = :sy";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':lrn', $this->lrn);
            $stmt->bindParam(':sy', $this->sy);
            $stmt->execute();

            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$result || $result == false)
                return JsonEncoder::jsonEncode(['missing' => 'Invalid LRN or no student with the provided LRN is registered for the specified school year']);

            JsonEncoder::jsonEncode(['success' => $result]);
        } catch (Exception $e) {
            JsonEncoder::jsonEncode(['error' => $e->getMessage()]);
        }
    }

    public function findNotPreviouslyEnrolledStd()
    {
        try {
            $conn = $this->connect();
            $sql = "SELECT studentID, learnerReferenceNumber AS lrn, CONCAT(firstName, middleName, lastName, extensionName) AS studentName, sex FROM studentInfo WHERE learnerReferenceNumber = :lrn";

            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':lrn', $this->lrn);
            $stmt->execute();

            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$result || $result == null)
                return JsonEncoder::jsonEncode(['missing' => 'No record found matching your criteria']);

            JsonEncoder::jsonEncode(['success' => $result]);
        } catch (Exception $e) {
            JsonEncoder::jsonEncode(['error' => $e->getMessage()]);
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $std = new Student($_POST);

    if ($_POST['hasRecord'] == 'yes')
        $std->findPreviouslyEnrolledStd();
    else
        $std->findNotPreviouslyEnrolledStd();
}
