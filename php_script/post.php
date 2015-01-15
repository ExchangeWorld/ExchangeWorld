<?php
	include("../include/connect.php");
	$gname      = $_GET['gname'];
	$categories = $_GET['categories'];
	$want		= $_GET['want'];
	$description= $_GET['description'];
	$ownerID	= $_GET['ownerID'];
	$photoPath  = $_GET['photoPath'];
    $posX       = $_GET['posX'];
    $posY       = $_GET['posY'];


//	$Key = get_Key_id();
	$insertSQL = "INSERT INTO `goods` (`gname`, `categories`, `want`, `description`, `ownerID`, `photoPath`, `posX`, `posY`) VALUES ('$gname', '$categories', '$want', '$description', '$ownerID', '$photoPath', '$posX','$posY')";
	// `catrgories`, `want`, `description`
//	$insertSQL = "INSERT INTO `exchangeworld`.`user` (`uid`, `exchangeTable`, `followerTable`, `seekerTable`, `fb_id`, `username` , `email`, `nickname`, `photoPath`) VALUES ('$Key', '$Key', '$Key', '$Key', '$id', '$name', 'test@gmail.com', 'thisisnickname', '$picture')";
	$retval = mysql_query($insertSQL);
	if(! $retval ){
	    die('Could not enter data: ' . mysql_error());
	}
	echo "new post successful".$insertSQL;
?>