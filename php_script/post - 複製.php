<?php
	include("../include/connect.php");
	$tmp_file_name = $_FILES['Filedata']['tmp_name'];
	$ok = move_uploaded_file($tmp_file_name, './images/database/'.$tmp_file_name);

	// This message will be passed to 'oncomplete' function
	echo $ok ? "OK" : "FAIL";
?>