<?php
	include("../include/connect.php");	
	$sql = "SELECT * 
			FROM goods";
	$result=mysql_query($sql) or die(mysql_error());

	while ($row = mysql_fetch_array($result)) {	
		$rows[] = $row;
	}
	echo json_encode($rows);
?>
