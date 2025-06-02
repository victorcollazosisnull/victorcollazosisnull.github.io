<?php
include 'db_connection.php';

$user_id = $_POST['user_id'] ?? '';
$modified_by = $_POST['modified_by'] ?? '';

if ($user_id && $modified_by !== '') {
    $stmt = $conn->prepare("CALL sp_ActivateUser(?, ?)");
    $stmt->bind_param("ii", $user_id, $modified_by);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "User activated successfully."]);
    } else {
        echo json_encode(["success" => false, "error" => $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "error" => "Missing parameters."]);
}

$conn->close();
?>
