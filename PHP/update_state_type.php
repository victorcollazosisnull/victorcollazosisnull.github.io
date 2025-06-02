<?php
include 'db_connection.php';

$id = $_POST['id'] ?? '';
$description = $_POST['description'] ?? '';
$modified_by = $_POST['modified_by'] ?? '';

if ($id !== '' && $description && $modified_by) {
    $stmt = $conn->prepare("CALL UpdateStateType(?, ?, ?)");
    $stmt->bind_param("iss", $id, $description, $modified_by);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "State type updated successfully."]);
    } else {
        echo json_encode(["success" => false, "error" => $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "error" => "Missing parameters."]);
}

$conn->close();
?>
