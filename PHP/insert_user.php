<?php
include 'db_connection.php';

$email = $_POST['email'] ?? '';
$password_hash = $_POST['password_hash'] ?? '';
$username = $_POST['username'] ?? '';
$created_by = $_POST['created_by'] ?? '';
$state = $_POST['state'] ?? '';

if ($email && $password_hash && $username && $created_by && $state !== '') {
    $stmt = $conn->prepare("CALL InsertUser(?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssi", $email, $password_hash, $username, $created_by, $state);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "User inserted successfully."]);
    } else {
        echo json_encode(["success" => false, "error" => $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "error" => "Missing parameters."]);
}

$conn->close();
?>
