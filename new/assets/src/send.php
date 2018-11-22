<?php

//echo $_POST['phone'].' + '.$_POST['subject'];

//echo 'hello';

if($_POST['type'] == 'zapis')
{
	$to      = 'timotheus@list.ru';
	$subject = 'лид ct.fzn.by/new';
	$message = 'Номер телефона: '.$_POST['phone']. "\r\n";
	$message .='Предмет: '.$_POST['subject'];
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

