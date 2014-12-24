<?

  class micromail{
  	  
  	  

      	public function __construct($sender = "noreply@gomosoft.com", $namesender = "Gomosöft" , $subject = "Contact from Gomosoft.com"){
      	
      	$name = isset($_POST["name"]) ? trim(strip_tags($_POST["name"])) : false;		
		$tel = isset($_POST["tel"]) ? strip_tags($_POST["tel"]) : false;		
		$email = isset($_POST["email"]) ? strip_tags($_POST["email"]) : false;		
		$message = isset($_POST["message"]) ? nl2br(strip_tags($_POST["message"])) : false;
		$lang = isset($_POST["lang"]) ? strip_tags($_POST["lang"]) :  false;		

		$message = strlen($message) < 20 ? false : $message;
		$email = filter_var($email, FILTER_VALIDATE_EMAIL) ? $email : false;
		$name = strlen($name) < 3 ? false : $name;		
		$errors = array();

		if(!$name)
			$errors[] = "errorname";
		if(!$message)
			$errors[] = "errormsg";
		if(!$email)
			$errors[] = "errormail";
		if(!$lang)
			$errors[] = "lang";
		if($tel && !preg_match("/^([+?0-9\(\)\s-]{10,20})+$/", $tel))
			$errors[] = "errortel";
	      

        require_once($_SERVER["DOCUMENT_ROOT"] . "/assets/includes/PHPMailer/Mail.php");	



        $mail = new PHPMailer;
		
		$mail->isSMTP();                   
		$mail->Host = "smtp.gmail.com";
		$mail->Port = 465;  
		$mail->SMTPSecure = 'ssl';
		$mail->SMTPAuth = true;                               
		$mail->Username = 'noreply@gomosoft.com';         
		$mail->Password = 'pl3453.ch4ng3.m3';                                                   
		$mail->CharSet = 'UTF-8';

		$mail->From = $sender;
		$mail->FromName = $namesender;
		$mail->addReplyTo('comercial@gomosoft.com', 'Gomosoft');
		
		$mail->WordWrap = 50;                                 
		$mail->isHTML(true);                                  
		
		

		$mail->addAddress($email);               


		if(count($errors) > 0 )
			throw new Exception( implode("|", $errors), 1);
			
		
		$name = strtoupper($name);
		$mail->Subject = 'Hemos recibido su mensaje';
		$content = "Hola {$name}, <br><br><br>Gracias por contactar con Gomosöft. Dentro de poco uno de nuestros agentes se pondrá en contacto con usted.";
		

		if($lang === "en" || $lang === "fr")
		{
			$mail->Subject = 'We\'ve recieved your message';
		    $content = "Hello {$name}, <br><br><br>Thank you for contact with Gomosöft. In shortly one of our agents will contact you.";

		}



		$template = file_get_contents(dirname(__FILE__) . "/template.html");
		$template = str_replace("{{message}}", $content, $template);
		$template = str_replace("{{tel}}", "+57 (301) 573 4372", $template);
		$template = str_replace("{{business}}", "Gomosöft", $template);
		$template = str_replace("{{fb_url}}", "https://facebook.com/gomosoftweb", $template);
		$template = str_replace("{{tw_url}}", "https://twitter.com/gomosoft", $template);


		$mail->Body    = $template;
		$mail->AltBody = strip_tags($template);

		if(!$mail->send())     		
			throw new Exception($mail->ErrorInfo, 1);

		$mail->clearAddresses(); 
		$mail->clearReplyTos(); 
		$mail->addAddress( $sender, $namesender);	
		$mail->addReplyTo( $email, $name);	
		$mail->Subject = "Contacto de cliente Gomosoft.com";	
		$tel = ($tel) ? "Tel: {$tel} <br>" : "";
		$mail->Body   = "Hola tenemos un cliente interesado, echemos un vistazo: <br><br> Nombre: {$name}<br> {$tel} Email: {$email}<br><br> Mensaje: {$message}<br>";
		$mail->AltBody = strip_tags($template);
			
		if(!$mail->send())     		
			throw new Exception($mail->ErrorInfo, 1);

   	     echo json_encode(array("success" => ''));

      		       	  
      	}

  }
 


   try{

   	 new micromail();

   }catch(Exception $e){
   	   echo json_encode(array("error" => $e->getMessage()));
   	   die;
   }


		
