<?php
	include("./connect.php");
	$id     = $_GET['facebook_id'];
	$name   = $_GET['name'];
	$gender = $_GET['gender'];
	$picture= $_GET['picture_url'];

	//find the incresemental Key value
	function get_Key_id(){
		$selectSQL = "SELECT `uid` FROM `user` ORDER BY `uid`";
		$result=mysql_query($selectSQL);
		$cid = 1;
		while($row= mysql_fetch_array($result)){
			if($row['uid']=="" || $row['uid']!=$cid){
				break;
			}
			else{
				$cid = $cid + 1;
			}
		}
		return $cid;
	}

	$sql = "SELECT count(*)
			FROM user
			WHERE fb_id = '$id'";

	if($id != ""){
		$result = mysql_query($sql);
		$row = mysql_fetch_array($result);

		if($row[0] == 0){//Create new account
			$Key = get_Key_id();
			$insertSQL = "INSERT INTO `user` (`uid`, `exchangeTable`, `followerTable`, `seekerTable`, `fb_id`, `username` , `email`, `nickname`, `photoPath`) VALUES ('$Key', '$Key', '$Key', '$Key', '$id', '$name', 'test@gmail.com', 'thisisnickname', '$picture')";
			$retval = mysql_query($insertSQL);
			if(! $retval ){
			    die('Could not enter data: ' . mysql_error());
			}
			echo "create_new_account_success".$insertSQL;
		}

		else{
			$updateSQL = "UPDATE `user`
						  SET `username` = '$name', `email` = 'test@gmail.com', `nickname` = 'thisisnickname', `photoPath` = '$picture'
						  WHERE `fb_id` = '$id'";
			$retval = mysql_query($updateSQL);
			if(! $retval ){
			    die('Could not update data: ' . mysql_error());
			}

			echo "fb_id exist, profile updated. ";
		}
	}
	else{
		echo "fail fb_id =".$id."---";
	}
	//	$rows[] = $row;
	//}
//	echo json_encode($row);

?>
