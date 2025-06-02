<?php
include 'db_connection.php';

$id = $_POST['id'] ?? '';
$scene_time = $_POST['scene_time'] ?? '';
$score = $_POST['score'] ?? '';
$modified_by = $_POST['modified_by'] ?? '';

if ($id && $scene_time && $score && $modified_by) {
    $stmt = $conn->prepare("CALL UpdateGameScore(?, ?, ?, ?)");
    $stmt->bind_param("isis", $id, $scene_time, $score, $modified_by);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Game score updated successfully."]);
    } else {
        echo json_encode(["success" => false, "error" => $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "error" => "Missing parameters."]);
}

$conn->close();
?>