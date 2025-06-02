<?php
include 'db_connection.php';

$id = $_POST['id'] ?? '';
$email = $_POST['email'] ?? '';
$password_hash = $_POST['password_hash'] ?? '';
$username = $_POST['username'] ?? '';
$modified_by = $_POST['modified_by'] ?? '';
$state = $_POST['state'] ?? '';

if ($id && $email && $password_hash && $username && $modified_by && $state !== '') {
    $stmt = $conn->prepare("CALL UpdateUser(?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("issssi", $id, $email, $password_hash, $username, $modified_by, $state);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "User updated successfully."]);
    } else {
        echo json_encode(["success" => false, "error" => $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "error" => "Missing parameters."]);
}

$conn->close();
?>
