<?php
	include("../include/connect.php");
	$search = $_GET['gid'];
	$sql = "SELECT `goods`. * , `user`.`username`, `user`.`photoPath` as `owner_photo`
			FROM `goods`, `user`
			WHERE `goods`.`gid` = '$search' AND `goods`.`ownerID` = `user`.`fb_id`";
	$result = mysql_query($sql);	
	//while ($row = mysql_fetch_array($result)) {	
	$row = mysql_fetch_array($result);
	if($row["categories"]==1) $row["categories"] = "Antiques";
	if($row["categories"]==2) $row["categories"] = "Art";
	if($row["categories"]==3) $row["categories"] = "Book";
	if($row["categories"]==4) $row["categories"] = "Clothing";

	//	$rows[] = $row;
	//}
	echo json_encode($row);
?>