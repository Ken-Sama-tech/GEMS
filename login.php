<?php
session_start();
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $proto_user = 'admin';
    $proto_pass = 'admin';

    if ($username == $proto_user && $password == $proto_pass) {
        $_SESSION['logged-in'] = true;
    }

    if (isset($_SESSION['logged-in'])) {
        header('Location: views/main/dashboard.php');
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Login</title>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="bootstraps/node_modules/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="login.css">
</head>

<body>

    <div class="login-container d-flex flex-column">
        <div class="container p-0 d-flex align-items-center justify-content-center">
            <a href="#" id="logo-wrapper">
                <img src="imgs/defaultImgs/Galvan.png" alt="Galvan.png" class="brand-image img-circle elevation-3 " style="opacity:.8; object-fit: cover; height: 100px">
            </a>
        </div>

        <form action="login.php" method="POST" id="login-form" novalidate>
            <div class="text-center">GNHS GUIDANCE EFFECTIVE MONITORING SYSTEM</div>
            <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    class="form-control"
                    placeholder="Enter your username"
                    required />
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    class="form-control"
                    placeholder="Enter your password"
                    required />
            </div>
            <button type="submit" class="btn btn-primary w-100" id="log-in">Login</button>
        </form>
        <footer class="footer position-relative d-flex justify-content-center" style="top:15px; height:25px">
            <p>&copy; 2024-2025 <a href="GEMS.html" class="text-decoration-none">GEMS</a></p>
        </footer>
    </div>
    <!-- Bootstrap JS Bundle and scripts-->
    <script src="bootstraps/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <script src="login.js" defer></script>
</body>

</html>