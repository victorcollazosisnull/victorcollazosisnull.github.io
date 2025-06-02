<?php
include 'db_connection.php';

$result = $conn->query("CALL ListGameScores()");

if ($result) {
    $scores = [];

    while ($row = $result->fetch_assoc()) {
        $scores[] = $row;
    }

    echo json_encode($scores);
    $result->close();
} else {
    echo json_encode(["success" => false, "error" => $conn->error]);
}

$conn->close();
?>