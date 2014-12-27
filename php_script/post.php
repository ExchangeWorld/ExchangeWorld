<?php
	include("../include/connect.php");
	$gname      = $_GET['gname'];
	$categories = $_GET['categories'];
	$want		= $_GET['want'];
	$description= $_GET['description'];
	$ownerID	= $_GET['ownerID'];


//	$Key = get_Key_id();
	$insertSQL = "INSERT INTO `exchangeworld`.`goods` (`gname`, `categories`, `want`, `description`, `ownerID`) VALUES ('$gname', '$categories', '$want', '$description', '$ownerID')";
	// `catrgories`, `want`, `description`
//	$insertSQL = "INSERT INTO `exchangeworld`.`user` (`uid`, `exchangeTable`, `followerTable`, `seekerTable`, `fb_id`, `username` , `email`, `nickname`, `photoPath`) VALUES ('$Key', '$Key', '$Key', '$Key', '$id', '$name', 'test@gmail.com', 'thisisnickname', '$picture')";
	$retval = mysql_query($insertSQL);
	if(! $retval ){
	    die('Could not enter data: ' . mysql_error());
	}
	echo "create_new_account_success".$insertSQL;
?>