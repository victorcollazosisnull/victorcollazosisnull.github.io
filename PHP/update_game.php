<?php
include 'db_connection.php';

$id = $_POST['id'] ?? '';
$game_name = $_POST['game_name'] ?? '';
$modified_by = $_POST['modified_by'] ?? '';

if ($id && $game_name && $modified_by) {
    $stmt = $conn->prepare("CALL UpdateGame(?, ?, ?)");
    $stmt->bind_param("iss", $id, $game_name, $modified_by);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Game updated successfully."]);
    } else {
        echo json_encode(["success" => false, "error" => $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "error" => "Missing parameters."]);
}

$conn->close();
?>