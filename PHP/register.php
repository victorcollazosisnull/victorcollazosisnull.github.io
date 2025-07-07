<?php
header("Access-Control-Allow-Origin: *"); // Reemplaza * por http://localhost:5173 si prefieres
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require 'conexion.php';

$data = json_decode(file_get_contents("php://input"));
$email = trim(strtolower($data->email));
$password = $data->password;

// Verificar si el email ya existe
$stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(["status" => "exists"]);
    exit();
}
$stmt->close();

// Insertar nuevo usuario con contraseña hasheada
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);
$stmt = $conn->prepare("INSERT INTO users (email, password) VALUES (?, ?)");
$stmt->bind_param("ss", $email, $hashedPassword);

if ($stmt->execute()) {
    echo json_encode(["status" => "created"]);
} else {
    echo json_encode(["status" => "error"]);
}

$stmt->close();
$conn->close();