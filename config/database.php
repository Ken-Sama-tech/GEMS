<?php

class DatabaseHost
{
    private $host = 'localhost';
    private $username = 'root';
    private $password = '';
    private $database = 'student_record';

    protected function connect()
    {
        try {
            $conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->database, $this->username, $this->password);
            $conn->setAttribute(
                PDO::ATTR_ERRMODE,
                PDO::ERRMODE_EXCEPTION
            );
            return  $conn;
        } catch (PDOException $e) {
            echo json_encode(['exception' => $e->getMessage()]);
            die();
        }
    }
}
