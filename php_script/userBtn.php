<?php
	include("../include/connect.php");
	$type   = $_GET['type']; 
	$target = $_GET['tID'];
	$my_id  = $_GET['mID'];

	if($type == "add"){
		$insertSQL = "INSERT INTO `followertable` (`myid`, `follower`) VALUES ('$my_id', '$target')";
		$retval = mysql_query($insertSQL);
		if(! $retval ){
		    die('Could not enter data: ' . mysql_error());
		}
		echo '{"message":"add success"}';

	}
	else if($type == "following"){
		$sql = "SELECT `followertable`.*, `user`.`username`, `user`.`photoPath` as `owner_photo`
			    FROM `followertable`, `user`
			    WHERE `myid` = '$target'
			    AND `follower` = `user`.`fb_id`";
		$result=mysql_query($sql) or die(mysql_error());
		while ($row = mysql_fetch_array($result)) {	
			$rows[] = $row;
		}
		echo json_encode($rows);	
	}
	else if($type == "follower"){
		$sql = "SELECT `followertable`.*, `user`.`username`, `user`.`photoPath` as `owner_photo`
			    FROM `followertable`, `user`
			    WHERE  `follower` = '$target'
			    AND `myid` = `user`.`fb_id`";
		$result=mysql_query($sql) or die(mysql_error());
		while ($row = mysql_fetch_array($result)) {	
			$rows[] = $row;
		}
		echo json_encode($rows);		}
	else if($type == "send"){
		$message = $_GET['message'];
		if($message == ""){
			echo "NO MESSAGE!";
		}
		else{
			$insertSQL = "INSERT INTO `exchangeworld`.`messagetable` (`sender_id`, `reciever_id`, `text`) VALUES ('$my_id', '$target', '$message')";
			$retval = mysql_query($insertSQL);
			if(! $retval ){
			    die('Could not enter data: ' . mysql_error());
			}
			echo '{"send":"success"}';
		}
	}
	else{
		echo '{"error":"Fetch Tables ERROR! (userBtn.php)"}';
	}

?>