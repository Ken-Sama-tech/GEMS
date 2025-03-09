<?php
require_once('../../includes/bcknd-kit/requires.php');

$validate = new Validator();
// $validate->isTableExist('');
date_default_timezone_set('UTC');

class ChartsData extends DatabaseHost
{
    private $start_day_of_this_month;
    private $end_day_of_this_month;
    private $severity;

    public function __construct()
    {
        $this->start_day_of_this_month  = date('Y-m-d H:i:s', strtotime('first day of this month'));
        $this->end_day_of_this_month = date('Y-m-d H:i:s', strtotime('last day of this month'));
        $this->severity = [];
    }

    private function countCategorizedViolations()
    {
        $conn = $this->connect();

        $sql = "SELECT SUM(category = 'CRITICAL') AS critical_violations, SUM(category = 'MAJOR') AS major_violations, SUM(category = 'MINOR') AS minor_violations, COUNT(*) AS total FROM violationlogs LEFT JOIN sanctions ON violationlogs.sanctionID = sanctions.sanctionID WHERE lastUpdate >= :start_day AND lastUpdate <= :end_day";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':start_day', $this->start_day_of_this_month);
        $stmt->bindParam(':end_day', $this->end_day_of_this_month);
        $stmt->execute();

        return $this->severity = $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function results()
    {
        $this->countCategorizedViolations();

        JsonEncoder::jsonEncode(
            [
                'status' => 'success',
                'severity_data' => $this->severity,
                'data'
            ]
        );
    }
}

$chart = new ChartsData();
$chart->results();
