<?php
include 'db_connection.php';

$id = $_POST['id'] ?? '';
$token = $_POST['token'] ?? '';
$login_attempt = $_POST['login_attempt'] ?? '';
$last_login = $_POST['last_login'] ?? '';
$modified_by = $_POST['modified_by'] ?? '';

if ($id && $token && $login_attempt && $last_login && $modified_by) {
    $stmt = $conn->prepare("CALL UpdateUserToken(?, ?, ?, ?, ?)");
    $stmt->bind_param("isiss", $id, $token, $login_attempt, $last_login, $modified_by);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "User token updated successfully."]);
    } else {
        echo json_encode(["success" => false, "error" => $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "error" => "Missing parameters."]);
}

$conn->close();
?>
