<?php
//include("../include/connect.php");

if(is_array($_FILES)) {
	if(is_uploaded_file($_FILES['userImage']['tmp_name'])) {
		$sourcePath = $_FILES['userImage']['tmp_name'];
//		$ext = pathinfo($_FILES['userImage']['tmp_name'], PATHINFO_EXTENSION);
		date_default_timezone_set("Asia/Taipei");
		$new_file_name = date('Y-m-d_H-i-s');
		$targetPath = "./images/database/".$new_file_name;

		if(move_uploaded_file($sourcePath, ".".$targetPath)) {
?>
		<script type="text/javascript">
			$("#goods_photo").attr("data-value", "<?php echo $targetPath ?>" );
		</script>
<?php
		}
	}
}
?>
