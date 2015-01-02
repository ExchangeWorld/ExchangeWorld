// JavaScript Document

var postInnerHTML='\
<!--<form class="form-horizontal" id ="new_post"  method="POST" enctype="multipart/form-data">\
<fieldset>-->\
\
<!-- Form Name -->\
<legend>Post Goods</legend>\
\
<!-- Prepended text-->\
<span class="label label-default" style="margin-bottom: 10px">1 . What do you have?</span>\
<div class="form-group">\
  <div class="col-md-10">\
    <div class="input-group">\
      <span class="input-group-addon">Name</span>\
      <input id="gName" name="gName" class="form-control" placeholder="What it called" required="" type="text">\
    </div>\
  </div>\
</div>\
\
<!-- Select Basic -->\
<div class="form-group">\
  <div class="col-md-10">\
    <select id="categories" name="categories" class="form-control">\
      <option value="-1">Categories</option>\
      <option value="1">Books</option>\
      <option value="2">Clothes</option>\
      <option value="3">Arts</option>\
    </select>\
  </div>\
</div>\
\
<!-- File Button -->\
<span class="label label-default" style="margin-bottom: 10px">2 . Upload Photo?</span>\
<form id="uploadForm" action="./php_script/upload.php" method="post" enctype="multipart/form-data">\
	<div id="targetLayer"></div>\
	<div id="uploadFormLayer">\
		<input id="imgUpload" name="userImage" class="inputFile" type="file" accept="image/*">\
    	<img id="photo_preview" width="200" src="#" alt="　"/>\
    	<input id="submit" value="Submit"   class="btnSubmit" type="submit">\
	</div>\
</form>\
<!-- Textarea -->\
<div class="form-group">\
  <div class="col-md-10">\
    <textarea class="form-control" id="description" name="description">say more about your goods</textarea>\
  </div>\
</div>\
<!-- Button -->\
<div class="form-group">\
    <button id="mark_location" name="mark_location" class="btn btn-info">Mark Place!</button>\
</div>\
<!-- Prepended text-->\
<span class="label label-default" style="margin-bottom: 10px">3 . What do you want?</span>\
<div class="form-group">\
  <div class="col-md-10">\
    <div class="input-group">\
      <span class="input-group-addon">Name</span>\
      <input id="want_name" name="want_name" class="form-control" placeholder="What you want" type="text">\
    </div>\
  </div>\
</div>\
<!-- Button -->\
<div class="form-group">\
  <label class="col-md-4 control-label" for="submit"></label>\
  <div class="col-md-4">\
    <button id="submit" name="submit" class="btn btn-primary submit" >POST!</button>\
  </div>\
</div>\
\
<!--</fieldset>\
</form>-->\
';

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#photo_preview').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function load_post()
{
	$("#uploadForm").on("submit", function(e) {
		e.preventDefault();
		$.ajax({
        	url        : "./php_script/upload.php",
			type       : "POST",
			data       : new FormData(this),
			contentType: false,
    	    cache      : false,
			processData: false,
			success: function(data) {
				$("#targetLayer").html(data);
		    },
		  	error: function() {
	    	} 	        
	    });
	});

    $("#imgUpload").change(function(){
        readURL(this);
    });
}

$(document).ready(function() {

	// Handle User clicking the specific goods.
    $("#leftSideSwitch").on("click",".searchResult", function(event) {
        val = $(this).attr('data-value');
 		if (val != 0){
			$.ajax({
				type     : "GET",
				url      : "./php_script/exchange.php",
				dataType : "json",
				data: {	
					gid: val
				},
				success: function(response){
					$('#leftSideSwitch').hide().empty();
					$('#leftSideSwitch').html('<div class="row" style="background-color: silver; padding-top: 0px; margin-top: 15px"><div class="col-md-3"><button onClick="goback()" type="button" class="btn btn-default"><span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span> Go back</button></div></div><div class="row" style="background-color: silver; padding-top: 0px; margin-top: 15px"><div class="col-md-5"><img src="' + response["photoPath"] + '" class="img-thumbnail" alt="..."></div><div class="col-md-7"><ul class="list-group" style="font-size: 70%"><li class="list-group-item">Name : ' + response["gname"] + '</li><li class="list-group-item">Genre : ' + response["categories"] + '</li><li class="list-group-item">Wanted : ' + response["want"] + '</li><li class="list-group-item owner" data-value="'+ response["ownerID"] +'">Owner : ' + response["username"] + '</li></ul></div></div><div class="row" style="background-color: silver; padding-top: 0px; margin-top: 5px; font-size: 85%"><div class="col-md-12"><div class="panel panel-default"><div class="panel-heading">Description : </div><div class="panel-body"><p>Description content~</p><p>.</p><p>.</p></div></div></div></div><div class="row" style="background-color: silver; padding-top: 0px; margin-top: 15px; font-size: 70%"><div class="col-md-12"><div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">You might also check ...</h3></div><div class="panel-body"><div class="col-md-3"><img src="static/img/alt.gif" class="img-thumbnail" alt="..."></div><div class="col-md-3"><img src="static/img/alt.gif" class="img-thumbnail" alt="..."></div><div class="col-md-3"><img src="static/img/alt.gif" class="img-thumbnail" alt="..."></div><div class="col-md-3"><img src="static/img/alt.gif" class="img-thumbnail" alt="..."></div></div></div></div></div>').show('fast');
				},
				error: function(xhr,ajaxOption,thrownError){
					alert(thrownError);
					alert(JSON.stringify(xhr));
				}
		    });
		}
    });

	// Handle new post
	$("#leftSideSwitch").on("click", ".submit", function(event){

	    var post_gname  	 = $("#gName").val();
	    var post_want   	 = $("#want_name").val();
	    var post_description = $("#description").val();
	    var post_ownerID     = $("#profile").attr('data-value');
	    var post_photo		 = $("#goods_photo").attr('data-value');
	    var post_categories  = $("#categories").val();
	    if(post_categories=="-1") alert("please select categories!");
	    else if(post_categories=="1") post_categories == "Books";
	    else if(post_categories=="2") post_categories == "Clothes";
	    else if(post_categories=="3") post_categories == "Arts";

		$.ajax({
			type     : "GET",
			url      : "./php_script/post.php",
			dataType : "text",
			data: {
				gname 	   : post_gname,	
				want  	   : post_want,
				categories : post_categories,
				ownerID    : post_ownerID,
				description: post_description,
				photoPath  : post_photo
			},
			success: function(response){
				console.log(response);
			},
			error: function(xhr,ajaxOption,thrownError){
				alert(thrownError);
				alert(JSON.stringify(xhr));
			}
	    });
	});

	// Handle load profile
	$("body").on("click", ".owner", function(event){
        val = $(this).attr('data-value');

        if(val !=0){
			$.ajax({
				type     : "GET",
				url      : "./php_script/profile.php",
				dataType : "json",
				data: {	
					uid: val
				},
				success: function(response){

					$('#leftSideSwitch').hide().empty();
					$('#leftSideSwitch').html('<div class="row" style="background-color: silver; padding-top: 0px; margin-top: 15px"><div class="col-md-3"><button onClick="goback()" type="button" class="btn btn-default"><span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span> Go back</button></div></div><div class="row" style="background-color: silver; padding-top: 0px; margin-top: 15px"><div class="col-md-5"><img src="'+response["photoPath"]+'" class="img-thumbnail" alt="..."></div><div class="col-md-7"><ul class="list-group" style="font-size: 70%"><li class="list-group-item">Name : '+response["username"]+'</li><li class="list-group-item">E-mail : '+response["email"]+'</li><li class="list-group-item">Nickname : '+response["nickname"]+'</li></ul></div></div><div class="row" style="background-color: silver; padding-top: 0px; margin-top: 10px; font-size: 70%"><div class="col-md-12"><ul class="nav nav-pills" role="tablist"><li role="presentation"><a href="#">Follow + </a></li><li role="presentation" class="active"><a href="#">Seekers <span class="badge">42</span></a></li><li role="presentation" class="active"><a href="#">Follower <span class="badge">3</span></a></li></ul></div></div><div class="row" style="background-color: silver; padding-top: 0px; margin-top: 15px; font-size: 70%"><div class="col-md-12"><div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">Exchanging</h3></div><div class="panel-body"><div class="col-md-3"><img src="static/img/alt.gif" class="img-thumbnail" alt="..."></div><div class="col-md-3"><img src="static/img/alt.gif" class="img-thumbnail" alt="..."></div><div class="col-md-3"><img src="static/img/alt.gif" class="img-thumbnail" alt="..."></div><div class="col-md-3"><img src="static/img/alt.gif" class="img-thumbnail" alt="..."></div></div></div><div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">Exchanged</h3></div><div class="panel-body"><div class="col-md-3"><img src="static/img/alt.gif" class="img-thumbnail" alt="..."></div><div class="col-md-3"><img src="static/img/alt.gif" class="img-thumbnail" alt="..."></div><div class="col-md-3"><img src="static/img/alt.gif" class="img-thumbnail" alt="..."></div><div class="col-md-3"><img src="static/img/alt.gif" class="img-thumbnail" alt="..."></div></div></div></div></div>').show('fast');
				},
				error: function(xhr,ajaxOption,thrownError){
					alert(thrownError);
					alert(JSON.stringify(xhr));
				}
		    });
        }
	});

	// Handle User clicking SEEK on navbar
	$("#seek").on("click", function(event){
		
		$('#leftSideSwitch').html('<div class="input-group" style="margin-top: 15px; margin-bottom: 10px"> <input type="text" class="form-control" placeholder="Seek anything"> <span class="input-group-btn"> <button class="btn btn-default" type="button">Go!</button> </span></div><div id="searchOptions" class="row"> <div class="col-md-12"> <div class="btn-group"> <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-expanded="true"> Distance <span class="caret"></span> </button> <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1"> <li role="presentation"><a role="menuitem" tabindex="-1" href="#">&lt; 500m</a></li> <li role="presentation"><a role="menuitem" tabindex="-1" href="#">500 ~ 1500m</a></li> <li role="presentation"><a role="menuitem" tabindex="-1" href="#">1500 ~ 5000m</a></li> <li role="presentation"><a role="menuitem" tabindex="-1" href="#">&gt; 5000m</a></li> </ul> </div> <div class="btn-group"> <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-expanded="true"> Categories <span class="caret"></span> </button> <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu2"> <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Antiques</a></li> <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Art</a></li> <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Book</a></li> <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Clothing</a></li> </ul> </div> </div></div><hr style="border-color: #6E6E6E; border-width: 2px"><div id="searchResults" class="col-md-12"> </div>');

		$.ajax({
			type     : "GET",
			url      : "./php_script/seek.php",
			dataType : "json",
			data : {
				data: "?"
			},
			success: function(response){
				//$('#leftSideSwitch').hide().html('').show('fast');
				for (var i = 0; i < response.length; i++){
					$('#searchResults').append('<div class="row searchResult" data-value="'+response[i]["gid"]+'"> <div class="col-md-6"><img src="'+response[i]["photopath"]+'" alt="..." class="img-rounded"></div> <div class="col-md-6 searchResultDescription"> <ul class="list-group"> <li class="list-group-item">Name: '+response[i]["gname"]+'</li> <li class="list-group-item">Category: '+response[i]["categories"]+'</li> <li class="list-group-item">Want for: '+response[i]["want"]+'</li> <li class="list-group-item">Position: ('+response[i]["posX"]+','+response[i]["posY"]+')</li> </ul> </div></div>');
				}
				document.getElementById("post").className = "";
				document.getElementById("about").className = "";
				document.getElementById("help").className = "";
				document.getElementById("seek").className = "active";
			},
			error: function(xhr,ajaxOption,thrownError){
				alert(thrownError);
				alert(JSON.stringify(xhr));
			}
		});
	});
});