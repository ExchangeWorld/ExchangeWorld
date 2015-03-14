<?php
	include("../include/connect.php");
	$type   = $_GET['type'];
	$search = $_GET['uid'];

	if($type == "recommand"){
		$recommandSQL = "SELECT *
						 FROM goods ";
		$result = mysql_query($recommandSQL) or die(mysql_error());
		while ($row = mysql_fetch_array($result)) {
			$rows[] = $row;
		}
	}
	else if($type == "myTables"){
		$exchangeSearchSQL = "SELECT *
							  FROM goods
							  WHERE ownerID = '$search'";
		$result = mysql_query($exchangeSearchSQL) or die(mysql_error());
		while ($row = mysql_fetch_array($result)) {
			$rows[] = $row;
		}
	}
	else{
		echo "Fetch Tables ERROR!";
	}

	echo json_encode($rows);
?>
