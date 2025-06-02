<?php
include 'db_connection.php';

$user_id = $_POST['user_id'] ?? '';
$token = $_POST['token'] ?? '';
$login_attempt = $_POST['login_attempt'] ?? '';
$created_by = $_POST['created_by'] ?? '';

if ($user_id && $token && $login_attempt && $created_by) {
    $stmt = $conn->prepare("CALL InsertUserToken(?, ?, ?, ?)");
    $stmt->bind_param("isis", $user_id, $token, $login_attempt, $created_by);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "User token inserted successfully."]);
    } else {
        echo json_encode(["success" => false, "error" => $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "error" => "Missing parameters."]);
}

$conn->close();
?>