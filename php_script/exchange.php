<?php
	include("../include/connect.php");
	$search = $_GET['gid'];
	$sql = "SELECT `goods`. * , `user`.`username`, `user`.`photoPath` as `owner_photo`
			FROM `goods`, `user`
			WHERE `goods`.`gid` = '$search' AND `goods`.`ownerID` = `user`.`fb_id`";
	$result = mysql_query($sql);
	//while ($row = mysql_fetch_array($result)) {
	$row = mysql_fetch_array($result);

	$row["description"] = nl2br($row["description"]);


	echo json_encode($row);
?>
