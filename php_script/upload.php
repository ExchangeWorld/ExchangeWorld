<?php
if(is_array($_FILES)) {
	if(is_uploaded_file($_FILES['userImage']['tmp_name'])) {
		$sourcePath = $_FILES['userImage']['tmp_name'];
		$targetPath = "./images/database/".$_FILES['userImage']['name'];
		if(move_uploaded_file($sourcePath, ".".$targetPath)) {
?>
			<div id="goods_photo" data-value="<?php echo $targetPath ?>" ></div>
<?php
		}
	}
}
?>