<?php
	include("../include/connect.php");
	$type   = $_GET['type']; 
	$target = $_GET['tID'];
	$my_id  = $_GET['mID'];

	if($type == "add"){
		$insertSQL = "INSERT INTO `exchangeworld`.`followertable` (`myid`, `follower`) VALUES ('$my_id', '$target')";
		$retval = mysql_query($insertSQL);
		if(! $retval ){
		    die('Could not enter data: ' . mysql_error());
		}
		echo "Follow Success!!";

	}
	else if($type == "seeker"){
		echo "SEEKER TABLE PRESSED";
	}
	else if($type == "follower"){
		echo "FOLLOWER TABLE PRESSED";		
	}
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
			echo "Follow Success!!";
		}
	}
	else{
		echo "Fetch Tables ERROR!";
	}

?>