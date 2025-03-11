<?php
session_start();

if (empty($_SESSION['logged-in'])) {
    header('Location: ../../index.php');
    exit;
}
