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
				ORDER BY `gid` DESC";
	}
	else if($type == "categories"){
		$sql = "SELECT `goods`. * , `user`.`username`, `user`.`photoPath` as `owner_photo`
				FROM `goods`, `user`
				WHERE `goods`.`ownerID` = `user`.`fb_id` 
				AND `goods`.`categories` = '$search' 
				ORDER BY `gid` DESC";
	}
	else{
		$search = '%'.$search.'%';
		$sql = "SELECT `goods`. * , `user`.`username`, `user`.`photoPath` as `owner_photo`
				FROM `goods`, `user`
				WHERE `goods`.`ownerID` = `user`.`fb_id` 
				AND `goods`.`gname` LIKE '$search' 
				ORDER BY `gid` DESC";		
	}

    $result=mysql_query($sql) or die(mysql_error());
	while ($row = mysql_fetch_array($result)) {	
		$rows[] = $row;
	}
	echo json_encode($rows);
?>
