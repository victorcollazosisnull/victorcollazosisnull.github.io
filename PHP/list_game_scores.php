<?php
include "db_connection.php";


$sql = "CALL ListGameScores()";  
$result = $conn->query($sql);

$data = [];

while ($row = $result->fetch_assoc()) {
    $data[] = $row; 
}

echo json_encode($data);

$conn->close();
?>