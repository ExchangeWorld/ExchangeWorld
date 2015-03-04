<?php
	include("../include/connect.php");
	$tmp_file_name = $_FILES['fileToUpload'];
	$ext = pathinfo($_FILES['fileToUpload'], PATHINFO_EXTENSION);
	$new_file_name = date('Y-m-d_H-i-s');
	$ok = move_uploaded_file($tmp_file_name, './images/database/'.$new_file_name.'.'.$ext);

	// This message will be passed to 'oncomplete' function
	echo $ok ? "OK" : "FAIL";
?>
