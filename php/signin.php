<?php
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM users WHERE email = '$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        if (password_verify($password, $user['password'])) {
            session_start();
            $_SESSION['user'] = [
                'name' => $user['username'],
                'email' => $user['email']
            ];

            header("Location: ../index.php?status=success");
        } else {
            header("Location: ../index.php?status=error_password");
        }
    } else {
        header("Location: ../index.php?status=error_email");
    }
}
?>
