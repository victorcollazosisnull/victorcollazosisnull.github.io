<?php
require 'conexion.php';

$data = json_decode(file_get_contents("php://input"));
$email = trim(strtolower($data->email));  
$password = $data->password;

$stmt = $conn->prepare("CALL sp_loginUser(?)");
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
?>