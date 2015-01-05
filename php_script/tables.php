<?php
	include("../include/connect.php");
	$search = $_GET['uid'];

	$exchangeSearchSQL = "SELECT *
						  FROM goods 
						  WHERE ownerID = '$search'";
	$result = mysql_query($exchangeSearchSQL) or die(mysql_error()); 
	while ($row = mysql_fetch_array($result)) {	
		$rows[] = $row;
	}

//	$rows = array_merge($row1, $row2);

	//	$rows[] = $row;
	//}
	echo json_encode($rows);
?>