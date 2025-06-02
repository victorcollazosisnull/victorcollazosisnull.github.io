<?php
include 'db_connection.php';

$result = $conn->query("CALL ListStateTypes()");

if ($result) {
    $states = [];

    while ($row = $result->fetch_assoc()) {
        $states[] = $row;
    }

    echo json_encode($states);
    $result->close();
} else {
    echo json_encode(["success" => false, "error" => $conn->error]);
}

$conn->close();
?>
