<?php
session_start();
require_once('config/database.php');
require_once('includes/utils/php/jsonEncoder.inc.php');
require_once('includes/utils/php/tableValidator.php');

$validate = new Validator();
$validate->isTableExist('users');

if (isset($_SESSION['logged-in'])) {
    header('Location: views/main/dashboard.php');
}

class Users extends DatabaseHost
{
    private $username;
    private $password;

    public function __construct($post)
    {
        $this->username = filter_var(trim($post['username']), FILTER_SANITIZE_SPECIAL_CHARS);
        $this->password =  filter_var(trim($post['password']), FILTER_SANITIZE_SPECIAL_CHARS);
    }

    public function isUserAndPasswordValid()
    {
        try {
            $conn = $this->connect();
            $sql = "SELECT username AS username, userPassword AS password FROM users WHERE username = :username";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':username', $this->username);
            $stmt->execute();

            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$result) {
                throw new Exception('No such user found');
            }

            if (password_verify($this->password, $result['password'])) {
                $_SESSION['logged-in'] = true;
                JsonEncoder::jsonEncode(['success' => 'logged-in succesfully']);
                die();
            } else {
                throw new Exception('Wrong password');
            }
            die();
        } catch (Exception $e) {
            JsonEncoder::jsonEncode(['error' => $e->getMessage()]);
            die();
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $user = new Users($_POST);
    $user->isUserAndPasswordValid();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Login</title>
    <!-- don't mind ts -->
    <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.11.1/font/bootstrap-icons.min.css"> -->
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

        <form method="POST" id="login-form" novalidate>
            <div class="text-center">GNHS GUIDANCE EFFECTIVE MONITORING SYSTEM</div>
            <span id="error"></span>
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