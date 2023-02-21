
<?php

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require "PHPMailer/src/Exception.php";
    require "PHPMailer/src/PHPMailer.php";

    $mail = new PHPMailer(true);
	
    $mail->CharSet = "UTF-8";
    $mail->IsHTML(true);


    // $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
    // $mail->isSMTP();                                            //Send using SMTP
    // $mail->Host       = 'smtp-pulse.com';                     //Set the SMTP server to send through
    // $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    // $mail->Username   = 'user@example.com';                     //SMTP username
    // $mail->Password   = 'secret';                               //SMTP password
    // $mail->SMTPSecure = 'ssl';            //Enable implicit TLS encryption
    // $mail->Port       = 465;   
// нач
    $email = $_POST["email"];
    $name = $_POST["name"];
    $name = $_POST["theme"];
    $name = $_POST["name"];
	$email_template = "template_mail.php";

    $body = file_get_contents($email_template);
	$body = str_replace('%name%', $name, $body);
	$body = str_replace('%theme%', $theme, $body);
	$body = str_replace('%message%', $message, $body);
	$body = str_replace('%email%', $email, $body);

    $mail->addAddress("dimashapov89@gmail.com");   // Здесь введите Email, куда отправлять
	$mail->setFrom($email);
    $mail->Subject = "[Заявка с формы]";
    $mail->MsgHTML($body);
// кон
    // $mpdf ->WriteHTML($body);
    // $pdf =$mpdf ->Outout('', 'S');

    // $email = $_POST["email"];
    // $name = $_POST["name"];
    // $surname = $_POST["surname"];
    // $patronymic = $_POST["patronymic"];
	// $phone = $_POST["phone"];
    // $when = $_POST["when"];
	// $email_template = "template_mail.php";

    // $body = file_get_contents($email_template);
	// $body = str_replace('%name%', $name, $body);
	// $body = str_replace('%surname%', $surname, $body);
	// $body = str_replace('%patronymic%', $patronymic, $body);
	// $body = str_replace('%email%', $email, $body);
	// $body = str_replace('%phone%', $phone, $body);
	// $body = str_replace('%when%', $when, $body);

    // $mail->addAddress("Hant.hr@mail.ru");   // Здесь введите Email, куда отправлять
	// $mail->setFrom($email);
    // $mail->Subject = "[Заявка с формы]";
    // $mail->MsgHTML($body);




    if (!$mail->send()) {
        $message = "Ошибка отправки";
    } else {
        $message = "Данные отправлены!";
    }
	
	$response = ["message" => $message];

    header('Content-type: application/json');
    echo json_encode($response);


    


?>