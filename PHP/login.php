<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require 'conexion.php';

$data = json_decode(file_get_contents("php://input"));

if (!$data || !isset($data->email) || !isset($data->password)) {
    echo json_encode(["status" => "error", "message" => "Datos incompletos"]);
    exit();
}

$email = trim(strtolower($data->email));
$password = $data->password;

$stmt = $conn->prepare("SELECT password FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    if (password_verify($password, $row['password'])) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "invalid"]);
    }
} else {
    echo json_encode(["status" => "not_found"]);
}

$stmt->close();
$conn->close();