<?php
include 'db_connection.php';

$result = $conn->query("CALL ListGames()");

if ($result) {
    $games = [];

    while ($row = $result->fetch_assoc()) {
        $games[] = $row;
    }

    echo json_encode($games);
    $result->close();
} else {
    echo json_encode(["success" => false, "error" => $conn->error]);
}

$conn->close();
?>