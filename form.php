<?php 
sleep(.5);
//Sanitize incoming data and store in variable

//customer info
$policyName = trim(stripslashes(htmlspecialchars($_POST['policyName'])));           
$homePhone = trim(stripslashes(htmlspecialchars($_POST['homePhone'])));
$homePhoneLink = preg_replace('/\D+/', '', $homePhone);
$workPhone = trim(stripslashes(htmlspecialchars($_POST['workPhone'])));
$workPhoneLink = preg_replace('/\D+/', '', $workPhone);
$filerName = trim(stripslashes(htmlspecialchars($_POST['filerName'])));
$agentOrNot = trim(stripslashes(htmlspecialchars($_POST['agentOrNot'])));
$replyEmail = '';
if ($_POST['replyEmail'] != '') {
$replyEmail .= $_POST['replyEmail'];
} else {
$replyEmail .= 'noReply@centuryglasssc.com';
}

//insurance info
$policy = trim(stripslashes(htmlspecialchars($_POST['policy'])));
$insCompany = trim(stripslashes(htmlspecialchars($_POST['insCompany'])));
$agentName = trim(stripslashes(htmlspecialchars($_POST['agentName'])));
$vin = trim(stripslashes(htmlspecialchars($_POST['vin'])));
$compCoverage = trim(stripslashes(htmlspecialchars($_POST['compCoverage'])));
$dateOfLoss = trim(stripslashes(htmlspecialchars($_POST['dateOfLoss'])));

//vehicle info
$year = trim(stripslashes(htmlspecialchars($_POST['year'])));
$make = trim(stripslashes(htmlspecialchars($_POST['make'])));
$model = trim(stripslashes(htmlspecialchars($_POST['model'])));
$bodyStyle = trim(stripslashes(htmlspecialchars($_POST['bodyStyle'])));
$doors = trim(stripslashes(htmlspecialchars($_POST['doors'])));
$damagedGlass = trim(stripslashes(htmlspecialchars($_POST['damagedGlass'])));

//spam filters
$humancheck = $_POST['humancheck'];
$honeypot = $_POST['honeypot'];
$answer = $_POST['answer'];
$c = $_POST['value1'] + $_POST['value2'];

if ($honeypot == 'http://' && empty($humancheck)) { 

//Validate data and return success or error message
$error_message = '';    
$reg_exp = "/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,4}$/";


if (empty($policyName)) {
        $error_message .= "<p>POLICYHOLDER NAME IS REQUIRED.</p>";             
}

if (empty($homePhone)) {
        $error_message .= "<p>HOME PHONE IS REQUIRED.</p>";            
}
if (empty($workPhone)) {
        $error_message .= "<p>WORK IS REQUIRED.</p>";              
}



if ($answer != $c) {
            $error_message .=   "<p>PLEASE RE-ENTER YOUR SIMPLE MATH ANSWER AND TRY AGAIN.</p>";
}


if (!empty($error_message)) {
        $return['error'] = true;
        $return['msg'] = '<div class="alert alert-danger">'."<h4>OOPS! THE FORM WAS NOT SUBMITTED.</h4>".$error_message;                    
        echo json_encode($return);
        exit();
} 

else {
//mail variables
#$to =              'info@centuryglasssc.com';
$to =           'mainstwebguy@gmail.com';
$from = $_POST['replyEmail'];
$headers =  'From: '.$from."\r\n";
$headers .= 'MIME-Version: 1.0' . "\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
$subject =  "Agent Claim From Website\n";


$body =         '<h4>Customer Information</h4>';
$body .=        '<p>Policyholder:   '.$policyName."<br />";
$body .=        'Home Phone: '.'<a href="tel:+1'.$homePhoneLink.'">'.$homePhone."</a><br />";
$body .=        'Work Phone: '.'<a href="tel:+1'.$workPhoneLink.'">'.$workPhone."</a><br />";
if (isset($_POST['filerName']))     {   $body   .=  $filerName;     }
if (isset($_POST['agentOrNot']))    {   $body   .=  $agentOrNot;    }
if(isset($_POST['replyEmail']))     {   $body   .=  $replyEmail;    }
$body .=        '</p>';



$body .=        '<h4>Insurance Information</h4>';
$body .=        '<p>Policy #: '.$policy.'<br />';
$body .=        'Ins. Company:  '.$insCompany.'<br />';
$body .=        'Agent\'s Name: '.$agency.'<br />';
$body .=        'VIN: '.$vin.'<br />';
$body .=        'Comp Coverage: '.$compCoverage.'<br />';
$body .=        'Date of Loss:  '.$dateOfLoss.'</p>';





$body .=        '<h4>Vehicle Information</h4>';
$body .=        '<p>Year:   '.$year.'<br />';
$body .=        'Make:  '.$make.'<br />';
$body .=        'Model: '.$model.'<br />';
$body .=        'Body Style:    '.$bodyStyle.'<br />';
$body .=        'Number of Doors:   '.$doors.'<br />';
$body .=        'Damaged Glass: '.$damagedGlass.'</p>';



//send email and return a message to user
if(mail($to, $subject, $body, $headers)) {  
    $return['error'] = false;
    $return['msg'] = 
        '<div class="alert alert-success">'.
            "<h4>Thank you for using our form </h4>".
            "<p>We'll reply to you as soon as we can.</p>";

            echo json_encode($return);
}
else {

    $return['error'] = true;
    $return['msg'] = "<h4>Oops! There was a problem sending the email. Please try again.</h4>"; 
    echo json_encode($return);
}

}

} 
else {

$return['error'] = true;
$return['msg'] = "<h4>Oops! There was a problem with your submission. Please try again.</h4>";  
echo json_encode($return);
}

?> 