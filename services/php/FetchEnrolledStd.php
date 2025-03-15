<?php
require_once('../../includes/bcknd-kit/requires.php');

$validate = new Validator();
$validate->isTableExist('registrations');
$validate->isTableExist('gradeLevels');
$validate->isTableExist('gradeSections');
$validate->isTableExist('studentInfo');

class EnrolledStudents extends DatabaseHost
{
    private $sy;
    private $gL;

    public function __construct($post)
    {
        $this->sy = $post['sy'];
        $this->gL = $post['gLevel'];
    }

    public function fetchStudents()
    {
        try {
            $conn = $this->connect();
            $sql = "SELECT registrations.registrationID, registrations.studentID, studentInfo.learnerReferenceNumber AS lrn, CONCAT(studentInfo.firstName, ' ', studentInfo.middleName, ' ',  studentInfo.lastName, ' ', studentInfo.extensionName) AS studentName, studentInfo.sex,registrations.gradeSectionID, gradeSections.section, gradeSections.gradeLevelID, gradeLevels.gradeLevel FROM registrations LEFT JOIN studentInfo ON registrations.studentID = studentInfo.studentID LEFT JOIN gradeSections ON registrations.gradeSectionID = gradeSections.sectionID LEFT JOIN gradeLevels ON gradeSections.gradeLevelID = gradeLevels.gradeLevelID WHERE registrations.schoolYearID = :sy";

            if (!empty($this->gL))
                $sql .= " AND gradeSections.gradeLevelID = :gL";

            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':sy', $this->sy);
            if (!empty($this->gL))
                $stmt->bindParam(':gL', $this->gL);
            $stmt->execute();

            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

            JsonEncoder::jsonEncode(['success' => $result]);
        } catch (Exception $e) {
            JsonEncoder::jsonEncode(['error' => $e->getMessage()]);
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $reg = new EnrolledStudents($_POST);
    $reg->fetchStudents();
}
