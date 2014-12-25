<?php
	include("include/connect.php");
	$search = $_GET['uid'];
	$sql = "SELECT *
			FROM user
			WHERE fb_id LIKE '$search'";

	$result=mysql_query($sql) or die(mysql_error());
//	$result = mysql_query($sql);	
	//while ($row = mysql_fetch_array($result)) {	
	$row = mysql_fetch_array($result);
	//	$rows[] = $row;
	//}
	echo json_encode($row);
?>