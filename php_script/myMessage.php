<?php
	include("../include/connect.php");	
	$type = $_GET["type"];


	if($type =="fetch"){
		$myid = $_GET["myid"];
		$sql = "SELECT `messagetable`.*, `user`.`username`, `user`.`photoPath` as `owner_photo`
				FROM `messagetable` , `user`
				WHERE `reciever_id` = '$myid' 
				AND `sender_id` = `user`.`fb_id`
				ORDER BY `readed` ASC";
	    $result=mysql_query($sql) or die(mysql_error());
		while ($row = mysql_fetch_array($result)) {	
			$rows[] = $row;
		}
		echo json_encode($rows);	
	}
	else if($type == "reply"){
		$target = $_GET['tID'];
		$my_id  = $_GET['mID'];
		$reply = $_GET['message'];
		if($reply == ""){
			echo "NO MESSAGE!";
		}
		else{
			$insertSQL = "INSERT INTO `exchangeworld`.`messagetable` (`sender_id`, `reciever_id`, `text`) VALUES ('$my_id', '$target', '$reply')";
			$retval = mysql_query($insertSQL);
			if(! $retval ){
			    die('Could not enter data: ' . mysql_error());
			}
			echo $reply;
		}
	}
	else if($type == "readmessage"){
		$mid = $_GET["mid"];
		if($mid != 0){
			$sql = "UPDATE `messagetable` SET `readed` = '1' WHERE `messagetable`.`mid` ='$mid' ";
		    $result=mysql_query($sql) or die(mysql_error());
			echo "messageID=".$mid." readed";
		}
		else
			echo "read message fail".$mid;
	}
	else if($type == "unreadmessage"){
		$myid = $_GET["myid"];
		$sql = "SELECT count(*) as `count`  
				FROM `messagetable` 
				WHERE `reciever_id` = '$myid' 
				AND `readed` = 0
				ORDER BY `readed` ASC";
	    $result=mysql_query($sql) or die(mysql_error());
	    $row = mysql_fetch_array($result);
	    echo $row["count"];
	}
	else{
		echo "ERROR in myMessage.php";
	}

?>
