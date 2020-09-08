<?php
 
 session_start();

 $id = "" ;
 $name = "" ;
 $email = "" ;
 $nationality = "" ;
 $phon_nember = "" ;
 $specialization= "" ;
 $GPA= "" ;
 $academic_level= "" ;

 $errors = array();


 $db = mysqli_connect( 'localhost' , 'root' , '' , 'web_tu');


 $id = mysqli_real_escape_string($db , $_POST['id']);
 $name = mysqli_real_escape_string($db , $_POST['name']);
 $email = mysqli_real_escape_string($db , $_POST['email']);
 $nationality = mysqli_real_escape_string($db , $_POST['nationality']);
 $phon_nember = mysqli_real_escape_string($db , $_POST['phone nember']);
 $specialization= mysqli_real_escape_string($db , $_POST['ispecialization']);
 $GPA= mysqli_real_escape_string($db , $_POST['GPA']);
 $academic_level= mysqli_real_escape_string($db , $_POST['academic level']);



 if(empty($id)) {array_push($errors , "id is required")};
 if(empty($name)) {array_push($errors , "name is required")};
 if(empty($email)) {array_push($errors , "email is required")};
 if(empty($nationality)) {array_push($errors , "nationality is required")};
 if(empty($phon_nember)) {array_push($errors , "phone nember is required")};
 if(empty($specialization)) {array_push($errors , "pecialization is required")};
 if(empty($GPA)) {array_push($errors , "GPA is required")};
 if(empty($academic_level)) {array_push($errors , "cademic level is required")};

?>