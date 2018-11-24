<?php

//echo $_POST['phone'].' + '.$_POST['subject'];

//echo 'hello';
$to = 'timotheus@list.ru, alex23011990@gmail.com';

if($_POST['type'] == 'zapis')
{


	
	$subject = 'шок-лид';
	$message = 'Перезвонить по номеру: '. $_POST['phone'] . "\r\n";
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

	$subject = 'Обратный звонок';
	$message = 'Перезвонить по номеру: '. $_POST['phone'] . "\r\n";
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


/*if($_POST['type'] == 'proba')
{
	


	$subject = 'лид с футера';
	$message = 'Номер телефона: '. $_POST['phone'] . "\r\n";
	$message .= 'Имя: '. $_POST['name'] . "\r\n";
	$message .='Предмет №1: '.$_POST['subject1']. "\r\n";


	
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


//print_r($_POST);*/

$json = json_decode(file_get_contents('php://input'));

/*foreach ($json as $key => $value) {
	echo $key.': '.$value . "\n\r";
}*/



	
if($json)
{
	$subject = 'лид с футера';
	$message = 'Номер телефона: '. $json->phone . "\r\n";
	$message .= 'Имя: '. $json->name . "\r\n";
	//$message .='Предмет №1: '.$json->subject0. "\r\n";

	$counter = 1;

	foreach($json as $key=>$value)
	{
  		if("subject" == substr($key,0,7))
  		{
    		//echo $key;
    		$message .= 'Предмет №'.$counter. ': '.$value. "\r\n";
    		$counter++;
  		}
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

