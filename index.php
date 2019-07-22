<?php
	if (isset($_POST['name']) && isset($_POST['email'])) {
		$name = @trim(stripslashes($_POST['name'])); 
	    $email = @trim(stripslashes($_POST['email'])); 
	    $subject = "Results from Online contact form:\n\n";

	    $email_from = $email;
	    $email_to = 'mail@mail.com';

	    $body = 'Name: ' . $name . "\n\n" . 'Email: ' . $email. "\n\n" . 'Subject: ' . $subject;

	    $success = @mail($email_to, $subject, $body, 'From: <'.$email_from.'>');
		echo alert('Message did send');
	} else {
		echo alert('Message did not send');
	}
?> 
