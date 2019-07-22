<?php
  $to = "hej@resareko.se";
  $subject = "Nytt resmål";

  $name = $_POST['name'];
  $email = $_POST['email'];
  $why = $_POST['why'];
  $how = $_POST['how'];
  //$image = $_POST['pic'];
  $credit = $_POST['credit'];

  $message = "Plats:\n$name.\n\n".
    "Varför ska man hit?\n$why\n\n".
    "Hur tar man sig hit?\n$how\n\n".
    "Från vem är tipset?\n$credit\n\n".
    "Email:\n$email"; 

  //$headers = "From: $email \r\n";
  
  function IsInjected($str) {
    $injections = array('(\n+)', '(\r+)', '(\t+)', '(%0A+)', '(%0D+)', '(%08+)', '(%09+)');
    $inject = join('|', $injections);
    $inject = "/$inject/i";

    if (preg_match($inject,$str)) { 
      return true;
    } else { 
      return false; 
    }
  }

  if (IsInjected($email)) {
      echo "Det ser ut som svaren är spam. Om så inte är fallet, försök igen.";
      exit;
  }

  /*if (!isset($_POST['submit'])) {
    echo "Fel: du måste skicka in formuläret"; 
  }*/

  //echo "<script>alert('Success!');</script>";

  if (mail($to, $subject, $message, $headers)) {
    echo 'Dina svar har skickats in. Tack för tipset!';
  } else {
    echo 'Svaren kunde inte skickas. Försök igen.';
  }

  header("Location: /");
?> 