<?php
    include("../include/connect.php");
    $gid      = $_GET['gid'];

    $insertSQL = "DELETE FROM `goods` WHERE `goods`.`gid` = '$gid'";

    $retval = mysql_query($insertSQL);
    if(! $retval ){
        die('Could not enter data: ' . mysql_error());
    }
    echo " delete successful ";
?>
