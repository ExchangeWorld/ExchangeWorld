<?php
	include("../include/connect.php");
	$search = $_GET['uid'];
	$sql = "SELECT *
			FROM user
			WHERE fb_id LIKE '$search'";

	$result=mysql_query($sql) or die(mysql_error());
	$row = mysql_fetch_array($result);



//	$rows = array_merge($row1, $row2);

	//	$rows[] = $row;
	//}
	echo json_encode($row);
?>