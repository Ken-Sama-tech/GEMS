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
    <div class="login-container">
        <form action="login.php" method="POST" id="login-form" novalidate>
            <div class="text-center">PANGET POTA</div>
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
    </div>
    <!-- Bootstrap JS Bundle and scripts-->
    <script src="bootstraps/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <script src="login.js" defer></script>
</body>

</html>