<?php

$host = 'localhost';
$name = 'root';
$pass = '';
$database = 'students_violation_records';

try {
    $conn = mysqli_connect($host, $name, $pass, $database);
} catch (mysqli_sql_exception) {
    echo "Connection failed";
}
