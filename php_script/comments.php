<?php
	include("../include/connect.php");
	$type   = $_GET['type']; 
	$gid = $_GET['gid'];
	$my_id = $_GET['mID'];
	$comment = $_GET['Comment'];


	if($type == "fetch"){
		$SQL = "SELECT `comments`.* , `user`.`photoPath` as `commenterPhoto`
				FROM `comments`, `user`
				WHERE `goods_id` = '$gid'
				AND `user`.`fb_id` =`commenter` ORDER BY `comments`.`cid` ASC";
		$result = mysql_query($SQL) or die(mysql_error()); 
		while ($row = mysql_fetch_array($result)) {	
			$rows[] = $row;
		}		
		echo json_encode($rows);
	}
	else if($type == "write"){
		$insertSQL = "INSERT INTO `comments` (`goods_id`, `commenter`, `comment`) VALUES ('$gid', '$my_id', '$comment')";
		$retval = mysql_query($insertSQL);
		if(! $retval ){
		    die('Could not enter data: ' . mysql_error());
		}
		$photoSQL ="SELECT `comments`.* , `user`.`photoPath` as `commenterPhoto`
					FROM `comments`, `user`
					WHERE `goods_id` = '$gid'
					AND `user`.`fb_id` =`commenter` ORDER BY `cid` DESC";
		$result = mysql_query($photoSQL) or die(mysql_error()); 
		$row = mysql_fetch_array($result);
		echo '<img src='.$row["commenterPhoto"].' height="30" width="30"> '.$comment;
	}
	else{
		echo "Comment ERROR!!!".$type;
	}

?>