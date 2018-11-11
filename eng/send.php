<?php

//echo $_POST['phone'];
if($_POST['phone'])
{
	$to      = 'timotheus@list.ru';
	$subject = 'лид по английскому';
	$message = 'Перезвонить по номеру: '.$_POST['phone'];
	$headers = 'From: webmaster@ct.fzn.by' . "\r\n" .
	    'Reply-To: webmaster@ct.fzn.by' . "\r\n" .
	    'X-Mailer: PHP/' . phpversion();

	if (mail($to, $subject, $message, $headers))
	{
		echo 'ok';
	} else 
	{
		echo 'error';
	}
	
	
}

