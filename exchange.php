<?php
	include("include/connect.php");
	$search = $_GET['gid'];
	$sql = "SELECT *
			FROM goods
			WHERE gid LIKE '$search'";
	$result = mysql_query($sql);	
	//while ($row = mysql_fetch_array($result)) {	
	$row = mysql_fetch_array($result);
	//	$rows[] = $row;
	//}
	echo json_encode($row);
?>