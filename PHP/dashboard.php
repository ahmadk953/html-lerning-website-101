<?php
// Start the session
session_start();

// Check if the user is logged in
if (!isset($_SESSION['user'])) {
    // Redirect the user to the login page
    header('Location: login.php');
    exit;
}

// Display the dashboard
echo 'Welcome, ' . $_SESSION['user']['email'];
