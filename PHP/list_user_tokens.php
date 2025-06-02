<?php
include 'db_connection.php';

$result = $conn->query("CALL ListUserTokens()");

if ($result) {
    $tokens = [];

    while ($row = $result->fetch_assoc()) {
        $tokens[] = $row;
    }

    echo json_encode($tokens);
    $result->close();
} else {
    echo json_encode(["success" => false, "error" => $conn->error]);
}

$conn->close();
?>
