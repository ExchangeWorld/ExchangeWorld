<?php
	include("../include/connect.php");
	$search = $_GET["selected"];
	$type = $_GET["type"];
	//if($search == "") $search='%';


	if($type=="keywords"){
		$search = '%'.$search.'%';
		$sql = "SELECT `goods`. * , `user`.`username`, `user`.`photoPath` as `owner_photo`
				FROM `goods`, `user`
				WHERE `goods`.`ownerID` = `user`.`fb_id`
				AND `goods`.`gname` LIKE '$search'
				AND `goods`.`status` = 0
				ORDER BY `gid` DESC";
	}
	else if($type == "categories"){
		$sql = "SELECT `goods`. * , `user`.`username`, `user`.`photoPath` as `owner_photo`
				FROM `goods`, `user`
				WHERE `goods`.`ownerID` = `user`.`fb_id`
				AND `goods`.`categories` = '$search'
				AND `goods`.`status` = 0
				ORDER BY `gid` DESC";
	}
	else if($type == "location"){
		$px = $_GET["px"];
		$py = $_GET["py"];
		$delta;
		if($search == "500m")  $delta = 0.005;
		else if($search == "1500m") $delta = 0.015;
		else if($search == "5000m") $delta = 0.05;
		else if($search == "10000m")$delta = 0.1;
		else $delta = 10;

		$sql = "SELECT `goods`. * , `user`.`username` , `user`.`photoPath` AS `owner_photo`
				FROM `goods` , `user`
				WHERE `goods`.`ownerID` = `user`.`fb_id`
				AND `goods`.`posX` >$px - $delta
				AND `goods`.`posX` <$px + $delta
				AND `goods`.`posY` >$py - $delta
				AND `goods`.`posY` <$py + $delta
				AND `goods`.`status` = 0
				ORDER BY `gid` DESC";
	}
	else{
		$search = '%'.$search.'%';
		$sql = "SELECT `goods`. * , `user`.`username`, `user`.`photoPath` as `owner_photo`
				FROM `goods`, `user`
				WHERE `goods`.`ownerID` = `user`.`fb_id`
				AND `goods`.`gname` LIKE '$search'
				AND `goods`.`status` = 0
				ORDER BY `gid` DESC";
	}

    $result=mysql_query($sql) or die(mysql_error());
	while ($row = mysql_fetch_array($result)) {
		$rows[] = $row;
	}
	echo json_encode($rows);
?>
