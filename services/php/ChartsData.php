<?php
require_once('../../includes/bcknd-kit/requires.php');

$validate = new Validator();
// $validate->isTableExist('');
date_default_timezone_set('Asia/Singapore');

class ChartsData extends DatabaseHost
{
    private $start;
    private $end;
    private $data;
    private $label;

    public function __construct()
    {
        $this->data = [];
    }

    public function fetchData($start = null, $end = null, $label = null)
    {

        if ($start == null || empty($start))
            $start =  date('Y-m-d H:i:s', strtotime('first day of this year'));

        if ($end == null || empty($end))
            $end = date('Y-m-d H:i:s', strtotime('last day of this year'));

        $this->start = $start;
        $this->end = $end;
        $this->label = $label;

        try {
            $conn = $this->connect();

            $sql =
                "SELECT
                CONVERT(IFNULL(SUM(CASE WHEN category = 'CRITICAL' THEN 1 ELSE 0 END), 0), SIGNED) AS critical_violations,
                CONVERT(IFNULL(SUM(CASE WHEN category = 'MAJOR' THEN 1 ELSE 0 END), 0), SIGNED) AS major_violations,
                CONVERT(IFNULL(SUM(CASE WHEN category = 'MINOR' THEN 1 ELSE 0 END), 0), SIGNED) AS minor_violations,
                IFNULL(COUNT(*), 0) AS total
                FROM violationlogs
                LEFT JOIN sanctions ON violationlogs.sanctionID = sanctions.sanctionID
                WHERE violationDate BETWEEN :start_time AND :end_time;
            ";

            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':start_time', $this->start);
            $stmt->bindParam(':end_time', $this->end);
            $stmt->execute();

            $data = $stmt->fetch(PDO::FETCH_ASSOC);

            $this->data["{$this->label}"] = [
                'status' => 'success',
                'label' => $this->label,
                'data' =>  $data,
            ];
            return;
        } catch (Exception $e) {
            JsonEncoder::jsonEncode(['error' => $e->getMessage()]);
            die();
        }
    }

    public function result()
    {
        JsonEncoder::jsonEncode($this->data);
    }
}


$chart = new ChartsData();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $trend = $_POST['trend'];

    if ($trend == 'daily') {
        $start_time = date('Y-m-d H:i:s', strtotime('yesterday 00:00:00'));
        $end_of_day = date('Y-m-d H:i:s', strtotime('today 00:00:00') - 1);

        $hour = 1;
        for ($i = 0; $start_time < $end_of_day; $i++) {
            $end_time = date('Y-m-d H:i:s', strtotime($start_time) + 3600);
            $label = (string) $hour . "hour";
            $chart->fetchData($start_time, $end_time, $label);
            if ($i == 23)
                $chart->result();
            $hour++;
            $start_time = date('Y-m-d H:i:s', strtotime($start_time) + 3600);
        }
    }

    // if ($trend == 'weekly') {
    //     $start_time = date('Y-m-d H:i:s', strtotime('monday this week 00:00:00'));
    //     $end_of_week = date('Y-m-d H:i:s', strtotime('sunday this week 00:00:00') - 1);

    //     for ($i = 0; $start_time < $end_of_week; $i++) {
    //         $end_time = date('Y-m-d H:i:s', strtotime($start_time) + (3600 * 24));

    //         $label =  date('l', strtotime($start_time));
    //         prepareTimeline($start_time, $end_time, $label);
    //         $start_time = date('Y-m-d H:i:s', strtotime($start_time) + (3600 * 24));
    //     }
    // }
}
