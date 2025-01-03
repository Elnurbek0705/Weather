<?php
session_start();

if (isset($_SESSION['user'])) {
    echo json_encode([
        'status' => 'success',
        'username' => $_SESSION['user']['name'],
        'email' => $_SESSION['user']['email']
    ]);
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Foydalanuvchi sessiyasi mavjud emas'
    ]);
}
?>
