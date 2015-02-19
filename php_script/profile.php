<?php
	include("./connect.php");
	$search = $_GET['uid'];
	$sql = "SELECT *
			FROM user
			WHERE fb_id LIKE '$search'";

	$result=mysql_query($sql) or die(mysql_error());
	$row = mysql_fetch_array($result);

	$sql2 = "SELECT count(*) as `followingCount` FROM `followertable` WHERE `myid` = '$search'";//following
	$result=mysql_query($sql2) or die(mysql_error());
	$row2 = mysql_fetch_array($result);

	$sql3 = "SELECT count(*) as `followerCount` FROM `followertable` WHERE `follower` = '$search'";//follower
	$result=mysql_query($sql3) or die(mysql_error());
	$row3 = mysql_fetch_array($result);

	$r[] = $row;
	$r[] = $row2;
	$r[] = $row3;
//	$rows = array_merge($row1, $row2);

	//	$rows[] = $row;
	//}
	echo json_encode($r);
?>
