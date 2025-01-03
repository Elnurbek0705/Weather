<?php
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $lastname = $_POST['lastname'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    $sql_check_email = "SELECT * FROM users WHERE email = '$email'";
    $result_check = $conn->query($sql_check_email);

    if ($result_check->num_rows > 0) {
        header("Location: ../index.php?status=email_exists");
    } else {
        $sql_insert = "INSERT INTO users (username, email, password) VALUES ('$name $lastname', '$email', '$hashed_password')";

        if ($conn->query($sql_insert) === TRUE) {
            header("Location: ../index.php?status=registered");
        } else {
            header("Location: ../index.php?status=error");
        }
    }
}

$conn->close();
?>
