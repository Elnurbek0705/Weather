<?php
$servername = "localhost";
$username = "root"; 
$password = "";
$dbname = "weatherdb";

// Bog'lanish
$conn = new mysqli($servername, $username, $password, $dbname);

// Xatolikni tekshirish
if ($conn->connect_error) {
    die("Bazaga ulanish amalga oshmadi: " . $conn->connect_error);
}
?>
