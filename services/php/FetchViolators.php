<?php

require_once('../../config/database.php');
require_once('../../includes/utils/php/jsonEncoder.inc.php');
require_once('../../includes/utils/php/tableValidator.php');

//validate if table exist
$validate = new Validator();
$validate->isTableExist('violationLogs');
$validate->isTableExist('studentInfo');
$validate->isTableExist('articles');
$validate->isTableExist('articleSections');
$validate->isTableExist('sanctions');

class FetchViolators extends DatabaseHost
{

    public function getViolators()
    {
        try {
            $conn = $this->connect();

            $sql = "SELECT violationStatus, violationLogs.violationLogID AS vID, studentInfo.learnerReferenceNumber AS lrn, CONCAT(studentInfo.firstName, ' ', studentInfo.middleName, ' ',  studentInfo.lastName, ' ', studentInfo.extensionName) AS 'name', studentInfo.sex, articles.article, articles.articleDescription AS articleDesc, articleSections.articleSection, articleSections.articleSectionDescription AS articleSectionDesc, sanctions.sanction, violationLogs.violationDate FROM violationLogs LEFT JOIN studentInfo ON violationLogs.studentID = studentInfo.studentID LEFT JOIN articles ON violationLogs.articleID = articles.articleID LEFT JOIN articleSections ON violationLogs.articleSectionID = articleSections.articleSectionID LEFT JOIN sanctions ON violationLogs.sanctionID = sanctions.sanctionID";

            $stmt = $conn->prepare($sql);
            $stmt->execute();

            $result = [];

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $result[] = $row;
            }

            JsonEncoder::jsonEncode($result);
        } catch (Exception $e) {
            JsonEncoder::jsonEncode(['error' => $e->getMessage()]);
        }
    }
}

$fetch = new FetchViolators();
$fetch->getViolators();
