<?php
session_start();

session_unset();
session_destroy();

if (empty($_SESSION['logged-in'])) {
    header('Location: index.php');
    exit;
}
