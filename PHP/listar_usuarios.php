<?php
header('Content-Type: application/json');

include 'db_connection.php';

$sql = "CALL ListUsers()";
$result = $conn->query($sql);

$usuarios = [];

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $usuarios[] = $row;
    }
    echo json_encode($usuarios);
} else {
    echo json_encode(["error" => "Error al ejecutar el SP: " . $conn->error]);
}

$conn->close();
?>