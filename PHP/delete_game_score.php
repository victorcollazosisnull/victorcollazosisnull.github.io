<?php
include 'db_connection.php';

$id = $_POST['id'] ?? '';

if ($id) {
    $stmt = $conn->prepare("CALL DeleteGameScore(?)");
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Game score deleted successfully."]);
    } else {
        echo json_encode(["success" => false, "error" => $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "error" => "Missing ID parameter."]);
}

$conn->close();
?>