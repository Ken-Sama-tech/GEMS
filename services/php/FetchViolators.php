<?php

require_once('../../config/database.php');
require_once('../../includes/utils/php/jsonEncoder.inc.php');

class FetchViolators extends DataBaseHost
{

    public function fetch()
    {
        $conn = $this->connect();
        $conn->beginTransaction();

        $sql = "SELECT studentInfo.learnerReferenceNumber AS lrn, CONCAT(studentInfo.firstName, ' ', studentInfo.middleName, ' ',  studentInfo.lastName, ' ', studentInfo.extensionName) AS 'name', studentInfo.sex, articles.article, articles.articleDescription AS articleDesc, articleSections.articleSection, articleSections.articleSectionDescription AS articleSectionDesc, sanctions.sanction FROM violationLogs LEFT JOIN studentInfo ON violationLogs.studentID = studentInfo.studentID LEFT JOIN articles ON violationLogs.articleID = articles.articleID LEFT JOIN articleSections ON violationLogs.articleSectionID = articleSections.articleSectionID LEFT JOIN sanctions ON violationLogs.sanctionID = sanctions.sanctionID";

        $stmt = $conn->prepare($sql);
        $stmt->execute();

        $conn->commit();

        $result = [];

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $result[] = $row;
        }

        JsonEncoder::jsonEncode($result);
    }
}

$idk = new FetchViolators();

$idk->fetch();
