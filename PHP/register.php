<?php
require 'conexion.php';

$data = json_decode(file_get_contents("php://input"));

$username = $data->username;
$email = trim(strtolower($data->email)); 
$password = password_hash($data->password, PASSWORD_DEFAULT);


$stmt = $conn->prepare("CALL sp_registerUser(?, ?, ?)");
$stmt->bind_param("sss", $username, $email, $password);
$stmt->execute();

echo json_encode(["message" => "Usuario registrado"]);

$stmt->close();
$conn->close();
?>