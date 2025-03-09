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
                IFNULL(COUNT(*), 0) AS total,
                CONVERT(
                IFNULL(
                    ROUND(
                        SUM(CASE WHEN category IN ('CRITICAL', 'MAJOR', 'MINOR') THEN 1 ELSE 0 END) 
                        / NULLIF(COUNT(DISTINCT DATE(violationDate)), 0),
                    0 
                    ),
                    0
                ),
                SIGNED
            ) AS average
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
        $start_time = date('Y-m-d H:i:s', strtotime('today 00:00:00'));
        $end_of_day = date('Y-m-d H:i:s', strtotime('tomorrow 00:00:00') - 1);

        $hour = 1;
        while ($start_time < $end_of_day) {
            $end_time = date('Y-m-d H:i:s', strtotime($start_time . '+1 hour'));
            $label = (string) $hour . "hour";
            $chart->fetchData($start_time, $end_time, $label);

            $hour++;
            $start_time = date('Y-m-d H:i:s', strtotime($start_time) + 3600);
        }
        $chart->result();
    }

    if ($trend == 'weekly') {
        $start_time = date('Y-m-d H:i:s', strtotime('monday this week 00:00:00'));
        $end_of_week = date('Y-m-d H:i:s', strtotime('monday next week 00:00:00') - 1);

        while ($start_time < $end_of_week) {
            $end_time = date('Y-m-d H:i:s', strtotime($start_time . '+1 day'));
            // echo "start:{$start_time} end:{$end_time}<br>";
            $label =  date('l', strtotime($start_time));
            $chart->fetchData($start_time, $end_time, $label);

            $start_time = date('Y-m-d H:i:s', strtotime($start_time . '+1 day'));
        }

        $chart->result();
    }

    if ($trend == 'monthly') {
        $start_time = date('Y-m-d H:i:s', strtotime('first day of this month 00:00:00'));
        $end_of_month = date('Y-m-d H:i:s', strtotime('first day of next month 00:00:00') - 1);

        while ($start_time < $end_of_month) {
            $end_time = date('Y-m-d H:i:s', strtotime($start_time . '+7 days'));

            if ($end_time >= $end_of_month)
                $end_time = $end_of_month;

            $label =  date('d', strtotime($start_time)) . '-' . date('d', strtotime($end_time));

            $chart->fetchData($start_time, $end_time, $label);

            $start_time = date('Y-m-d H:i:s', strtotime($start_time . '+7 days'));
        }
        $chart->result();
    }

    if ($trend == 'yearly') {
        $start_time = date('Y-m-d H:i:s', strtotime('first day of january this year 00:00:00'));
        $end_of_year = date('Y-m-d H:i:s', strtotime('first day of january next year 00:00:00') - 1);

        while ($start_time < $end_of_year) {
            $end_time = date('Y-m-d H:i:s', strtotime($start_time . '+1 month'));
            echo `start: $start_time end: $end_time <br>`;

            $label =  date('F', strtotime($start_time));

            $chart->fetchData($start_time, $end_time, $label);

            $start_time = date('Y-m-d H:i:s', strtotime($start_time . '+1 month'));
        }
        $chart->result();
    }

    if ($trend == 'overall') {
        $start_time = date('Y-m-d H:i:s', strtotime('first day of january 2024 00:00:00'));
        $end_of_curr_year = date('Y-m-d H:i:s', strtotime('first day of january next year 00:00:00') - 1);
        while ($start_time < $end_of_curr_year) {
            $end_time = date('Y-m-d H:i:s', strtotime($start_time . '+1 year'));
            // echo `start: $start_time end: $end_time <br>`;

            $label =  date('Y', strtotime($start_time)) . '-' . date('Y', strtotime($end_time));

            $chart->fetchData($start_time, $end_time, $label);

            $start_time = date('Y-m-d H:i:s', strtotime($start_time . '+1 year'));
        }
        $chart->result();
    }
}
