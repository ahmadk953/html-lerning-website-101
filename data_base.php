<?php
// PHP Data Objects(PDO) Sample Code:
try {
    $conn = new PDO("sqlsrv:server = tcp:sqlserver2huaw6nkmzk5w.database.windows.net,1433; Database = sample-db-with-tde", "azureuser", "{your_password_here}");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch (PDOException $e) {
    print("Error connecting to SQL Server.");
    die(print_r($e));
}

// SQL Server Extension Sample Code:
$connectionInfo = array("UID" => "azureuser", "pwd" => "{pas1Word-123}", "Database" => "sample-db-with-tde", "LoginTimeout" => 30, "Encrypt" => 1, "TrustServerCertificate" => 0);
$serverName = "tcp:sqlserver2huaw6nkmzk5w.database.windows.net,1433";
$conn = sqlsrv_connect($serverName, $connectionInfo);
?>