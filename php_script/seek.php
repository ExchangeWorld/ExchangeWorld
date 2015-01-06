<?php
	include("../include/connect.php");	

	$sql = "SELECT `goods`. * , `user`.`username`, `user`.`photoPath` as `owner_photo`
			FROM `goods`, `user`
			WHERE `goods`.`ownerID` = `user`.`fb_id` ORDER BY `gid` DESC";
	$result=mysql_query($sql) or die(mysql_error());

	while ($row = mysql_fetch_array($result)) {	

		if($row["categories"]==1) $row["categories"] = "Antiques";
		if($row["categories"]==2) $row["categories"] = "Art";
		if($row["categories"]==3) $row["categories"] = "Book";
		if($row["categories"]==4) $row["categories"] = "Clothing";

		$rows[] = $row;
	}
	echo json_encode($rows);
?>
