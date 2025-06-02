<?php
header('Content-Type: application/json');

// Leer datos JSON enviados desde Unity
$data = json_decode(file_get_contents("php://input"));

$email = $data->email;
$password = $data->password;

$conn = new mysqli("localhost", "root", "", "nombredb"); 

if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "DB connection failed."]));
}

$query = "SELECT password FROM users WHERE email = '$email'";
$result = $conn->query($query);

if ($row = $result->fetch_assoc()) {
    if ($password === $row['password']) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "wrong_password"]);
    }
} else {
    echo json_encode(["status" => "not_found"]);
}

$conn->close();
?>