// JavaScript Document

var nowIn = "post";

var seekInnerHTML = '<div class="input-group input-group-lg" style="margin-top: 20px; margin-bottom: 10px"><input type="text" class="form-control" placeholder="Search anything"><span class="input-group-btn"><button class="btn btn-default" type="button">Go!</button></span></div><p style="font-size: small">or</p><div id="searchOptions" class="row"><div class="col-md-4"><div class="dropdown"><button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-expanded="true">Distance<span class="caret"></span></button><ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1"><li role="presentation"><a role="menuitem" tabindex="-1" href="#">&lt; 500m</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="#">500 ~ 1500m</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="#">1500 ~ 5000m</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="#">&gt; 5000m</a></li></ul></div></div><div class="col-md-4"><div class="dropdown"><button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-expanded="true">Categories<span class="caret"></span></button><ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1"><li role="presentation"><a role="menuitem" tabindex="-1" href="#">Antiques</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="#">Art</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="#">Book</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="#">Clothing</a></li></ul></div></div><div class="col-md-4"><button type="button" class="btn btn-default"><span class="glyphicon glyphicon-search" aria-hidden="true"></span> Search</button></div></div><hr style="border-color: #6E6E6E; border-width: 2px"><div id="searchResults" class="row"><div id="searchResult_1" class="row searchResult" onClick="load_profile()"><div class="col-md-5"><div class="thumbnail"><img src="static/img/alt.gif" alt="..."></div></div><div class="col-md-7"><p>Name: </p><p>Category: </p><p>Want for: </p><p>Position: </p></div></div><div id="searchResult_2" class="row searchResult" onClick="load_profile()"><div class="col-md-5"><div class="thumbnail"><img src="static/img/alt.gif" alt="..."></div></div><div class="col-md-7"><p>Name: </p><p>Category: </p><p>Want for: </p><p>Position: </p></div></div><!-- 這邊可以繼續往下列class="row searchResult"，藉由累加_後面的數字 --></div>';

var postInnerHTML = '<span class="label label-default" style="margin-bottom: 10px">1 . What do you have?</span><div class="dropdown" style="margin-top: 10px; margin-bottom: 10px"><button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-expanded="true">Categories<span class="caret"></span></button><ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1"><li role="presentation"><a role="menuitem" tabindex="-1" href="#">Antiques</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="#">Art</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="#">Book</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="#">Clothing</a></li></ul></div><div class="input-group"><span class="input-group-addon">Name</span><input type="text" class="form-control" placeholder="What it called?"></div><div class="row" style="background-color: silver; padding-top: 0px; margin-top: 15px"><div class="col-md-5"><div class="thumbnail"><img src="static/img/alt.gif" alt="..."></div></div><div class="col-md-7"><button type="button" class="btn btn-default"><span class="glyphicon glyphicon-upload" aria-hidden="true"></span>  Upload thumbnail</button></div></div><hr style="border-color: #6E6E6E; border-width: 2px; margin-top:0px"><span class="label label-default">2 . Select what you want</span><div class="dropdown" style="margin-top: 10px; margin-bottom: 10px"><button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-expanded="true">Categories<span class="caret"></span></button><ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1"><li role="presentation"><a role="menuitem" tabindex="-1" href="#">Antiques</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="#">Art</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="#">Book</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="#">Clothing</a></li></ul></div><div class="input-group"><span class="input-group-addon">Name</span><input type="text" class="form-control" placeholder="What it called?"></div><div class="row" style="background-color: silver; padding-top: 0px; margin-top: 10px"><div class="col-md-12"><textarea class="form-control" rows="1" cols="37" placeholder="Describe more about that"></textarea></div></div><hr style="border-color: #6E6E6E; border-width: 2px; margin-top:15px"><span class="label label-default">3 . Mark where you can exchange</span><div class="row" style="background-color: silver; padding-top: 0px; margin-top: 15px"><div class="col-md-10"><button type="button" class="btn btn-default">Mark!</button></div></div>';

var profileInnerHTML = '<div class="row" style="background-color: silver; padding-top: 0px; margin-top: 15px"><div class="col-md-3"><button onClick="goback_profile()" type="button" class="btn btn-default"><span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span> Go back</button></div></div><div class="row" style="background-color: silver; padding-top: 0px; margin-top: 15px"><div class="col-md-5"><img src="static/img/alt.gif" class="img-thumbnail" alt="..."></div><div class="col-md-7"><ul class="list-group" style="font-size: 70%"><li class="list-group-item">ID : </li><li class="list-group-item">E-mail : </li><li class="list-group-item">Nickname : </li></ul></div></div><div class="row" style="background-color: silver; padding-top: 0px; margin-top: 5px; font-size: 70%"><div class="col-md-12"><ul class="nav nav-pills" role="tablist"><li role="presentation"><a href="#">Follow + </a></li><li role="presentation" class="active"><a href="#">Seekers <span class="badge">42</span></a></li><li role="presentation" class="active"><a href="#">Follower <span class="badge">3</span></a></li></ul></div></div><div class="row" style="background-color: silver; padding-top: 0px; margin-top: 15px; font-size: 70%"><div class="col-md-12"><div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">Exchanged</h3></div><div class="panel-body"><div class="col-md-3"><img src="static/img/alt.gif" class="img-thumbnail" alt="..."></div><div class="col-md-3"><img src="static/img/alt.gif" class="img-thumbnail" alt="..."></div><div class="col-md-3"><img src="static/img/alt.gif" class="img-thumbnail" alt="..."></div><div class="col-md-3"><img src="static/img/alt.gif" class="img-thumbnail" alt="..."></div></div></div><div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">Exchanging</h3></div><div class="panel-body"><div class="col-md-3"><img src="static/img/alt.gif" class="img-thumbnail" alt="..."></div><div class="col-md-3"><img src="static/img/alt.gif" class="img-thumbnail" alt="..."></div><div class="col-md-3"><img src="static/img/alt.gif" class="img-thumbnail" alt="..."></div><div class="col-md-3"><img src="static/img/alt.gif" class="img-thumbnail" alt="..."></div></div></div></div></div>';

function load_seek()
{
	if(nowIn == "seek") return;
	$('#leftSideSwitch').hide();
	document.getElementById(nowIn).className = "";
	document.getElementById("leftSideSwitch").innerHTML = seekInnerHTML;
	document.getElementById("seek").className = "active";
	$('#leftSideSwitch').show('fast');
	nowIn = "seek";
}

function load_post()
{
	if(nowIn == "post") return;
	$('#leftSideSwitch').hide();
	document.getElementById(nowIn).className = "";
	document.getElementById("leftSideSwitch").innerHTML = postInnerHTML;
	document.getElementById("post").className = "active";
	$('#leftSideSwitch').show('fast');
	nowIn = "post";
}

function load_profile()
{
	//$('#leftSideSwitch').animate({margin-left: '-=200', margin-right: '+=200'});
	//$('#leftSideSwitch').show('fast');
	$('#leftSideSwitch').hide().html(profileInnerHTML).show('fast');
	//document.getElementById("leftSideSwitch").innerHTML = profileInnerHTML;
}

function goback_profile()
{
	switch(nowIn)
	{
		case "seek":
			$('#leftSideSwitch').hide().html(seekInnerHTML).show('fast');
			break;
		case "post":
			$('#leftSideSwitch').hide().html(postInnerHTML).show('fast');
			break;
	}
}