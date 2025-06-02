<?php
include 'db_connection.php';

$description = $_POST['description'] ?? '';
$created_by = $_POST['created_by'] ?? '';

if ($description && $created_by) {
    $stmt = $conn->prepare("CALL InsertStateType(?, ?)");
    $stmt->bind_param("ss", $description, $created_by);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "State type inserted successfully."]);
    } else {
        echo json_encode(["success" => false, "error" => $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "error" => "Missing parameters."]);
}

$conn->close();
?>
