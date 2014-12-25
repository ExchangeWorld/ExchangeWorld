<?php
	include("include/connect.php");
	$search = $_GET['gid'];
	$sql = "SELECT `goods`. * , `user`.`username`
			FROM `goods`, `user`
			WHERE `goods`.`gid` = '$search' AND `goods`.`ownerID` = `user`.`fb_id`";
	$result = mysql_query($sql);	
	//while ($row = mysql_fetch_array($result)) {	
	$row = mysql_fetch_array($result);
	//	$rows[] = $row;
	//}
	echo json_encode($row);
?>