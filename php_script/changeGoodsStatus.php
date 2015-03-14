<?php
    include("../include/connect.php");
    $gid      = $_GET['gid'];
    $newStatus= $_GET['status'];
    $newStatus == 0 ? $newStatus = 1 : $newStatus = 0 ;

    $insertSQL = "UPDATE  `exchangeworld`.`goods` SET  `status` =  '$newStatus' WHERE  `goods`.`gid` = '$gid' LIMIT 1 ;";

    $retval = mysql_query($insertSQL);
    if(! $retval ){
        die('Could not enter data: ' . mysql_error());
    }
    echo "$newStatus";
?>
