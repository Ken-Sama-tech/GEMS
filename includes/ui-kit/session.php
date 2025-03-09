<?php
session_start();

if (empty($_SESSION['logged-in'])) {
    header('Location: ../../login.php');
    exit;
}
