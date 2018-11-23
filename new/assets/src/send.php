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

if($_POST['type'] == 'zakaz')
{
	$to      = 'timotheus@list.ru';
	$subject = 'Перезвонить ct.fzn.by/new';
	$message = 'Номер телефона: '.$_POST['phone']. "\r\n";
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


if($_POST['type'] == 'proba')
{
	$to      = 'timotheus@list.ru';
	$subject = 'лид с футера ct.fzn.by/new';
	$message = 'Номер телефона: '.$_POST['phone']. "\r\n";
	$message .= 'Имя: '.$_POST['name']. "\r\n";
	$message .= 'Предмет №1: '.$_POST['subject1']. "\r\n";
	
	if($_POST['subject2'])
	{
		$message .= 'Предмет №2: '.$_POST['subject2']. "\r\n";
	}

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


