<?php

// Declare variables
$hostname = 'us-west.connect.psdb.cloud';
$username = 'sct2y9v8tk748yv2tk0o';
$password = 'pscale_pw_o4ntmYssAAUbtXyNvRr1oAiZEg7BNrBVyfM0ix6PU0f';
$database = 'test-db-1';

// Connect to the database
$conn = mysqli_init();
$conn->ssl_set(NULL, NULL, "C:\Program Files\php\Certca-certificates.pem", NULL, NULL);
$conn->real_connect($hostname, $username, $password, $database);

// check if the form has been submitted
if (isset($_POST['submit'])) {
    // retrieve the form data by using the element's name attributes value as key
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);

    // Hash the password
    $password = password_hash($password, PASSWORD_DEFAULT);

    // check if the form fields are filled
    if (!empty($email) && !empty($password)) {
        // write the query
        $query = "SELECT * FROM users WHERE email = '$email'";
        // execute the query
        $result = mysqli_query($conn, $query);
        // check if the query executed successfully
        if ($result) {
            // check if there is a matching record
            if (mysqli_num_rows($result) == 1) {
                // fetch the result
                $user = mysqli_fetch_assoc($result);
                // check if the password matches the hashed password stored in the database
                if (password_verify($password, $user['password'])) {
                    // start a session
                    session_start();
                    // store the user data in the session
                    $_SESSION['user'] = $user;
                    // redirect to the home page
                    header('location: home.php');
                    exit;
                } else {
                    // wrong password error message
                    $password_error = 'Wrong password';
                }
            } else {
                // wrong email error message
                $email_error = 'No account found with this email';
            }
        } else {
            // query execution failed error message
            $query_error = 'There was an error with the query: ' . mysqli_error($conn);
        }
    } else {
        // empty form fields error message
        $form_error = 'Please fill in all the fields';
    }
}
