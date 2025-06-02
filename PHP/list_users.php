<?php
include 'db_connection.php';

$result = $conn->query("CALL ListUsers()");

if ($result) {
    $users = [];

    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }

    echo json_encode($users);
    $result->close();
} else {
    echo json_encode(["success" => false, "error" => $conn->error]);
}

$conn->close();
?>
