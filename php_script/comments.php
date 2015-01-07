<?php
	include("../include/connect.php");
//	$type   = $_GET['type']; 
	$gid = $_GET['gid'];
	$my_id = $_GET['mID'];
	$comment = $_GET['Comment'];


	if($type == "fetch"){
		$SQL = "SELECT *
				FROM comments
				WHERE `goods_id` = '$gid' ";
		$result = mysql_query($SQL) or die(mysql_error()); 
		while ($row = mysql_fetch_array($result)) {	
			$rows[] = $row;
		}		
		echo json_encode($rows);
	}
	else if($type == "write"){
		$insertSQL = "INSERT INTO `exchangeworld`.`comments` (`goods_id`, `commenter`, `comment`) VALUES ('$gid', '$my_id', '$comment')";
		$retval = mysql_query($insertSQL);
		if(! $retval ){
		    die('Could not enter data: ' . mysql_error());
		}

		echo "$comment";
	}
	else{
		echo "Comment ERROR!!!";
	}

?>