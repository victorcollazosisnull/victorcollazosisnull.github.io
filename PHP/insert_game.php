<?php
include 'db_connection.php';

$game_name = $_POST['game_name'] ?? '';
$created_by = $_POST['created_by'] ?? '';

if ($game_name && $created_by) {
    $stmt = $conn->prepare("CALL InsertGame(?, ?)");
    $stmt->bind_param("ss", $game_name, $created_by);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Game inserted successfully."]);
    } else {
        echo json_encode(["success" => false, "error" => $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "error" => "Missing parameters."]);
}

$conn->close();
?>