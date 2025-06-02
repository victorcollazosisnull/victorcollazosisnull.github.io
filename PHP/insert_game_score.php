<?php
include 'db_connection.php';

$game_id = $_POST['game_id'] ?? '';
$user_id = $_POST['user_id'] ?? '';
$scene_time = $_POST['scene_time'] ?? '';
$score = $_POST['score'] ?? '';
$created_by = $_POST['created_by'] ?? '';

if ($game_id && $user_id && $scene_time && $score && $created_by) {
    $stmt = $conn->prepare("CALL InsertGameScore(?, ?, ?, ?, ?)");
    $stmt->bind_param("iisis", $game_id, $user_id, $scene_time, $score, $created_by);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Game score inserted successfully."]);
    } else {
        echo json_encode(["success" => false, "error" => $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "error" => "Missing parameters."]);
}

$conn->close();
?>