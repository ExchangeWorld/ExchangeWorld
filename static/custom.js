// JavaScript Document
function load_seek()
{
	document.getElementById("leftSide").innerHTML='<object type="text/html" data="leftSide.html" ></object>';
}

function load_post()
{
	var parent = document.getElementById("leftSide");
	var child = document.getElementById("leftSideSwitch");
	parent.removeChild(child);
}