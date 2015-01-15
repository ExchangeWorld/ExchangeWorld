var currentStage = "seek";
var gobackStack = [];
var gobackSearchResultDataValue = 0;
var gobackSearchResultDataValueNeedToBeReplaced = false;

var seekInnerHTML = '<div class="input-group" style="margin-top: 15px; margin-bottom: 10px"> <input id="searchName" type="text" class="form-control" placeholder="Seek anything"> <span class="input-group-btn"> <button id="searchString" class="btn btn-info seeking" type="button">Seek !</button> </span></div><div id="searchOptions" class="row"> <div class="col-md-12"> <div class="btn-group"> <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-expanded="true"> Distance <span class="caret"></span> </button> <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1"> <li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdownLocation">500m</a></li> <li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdownLocation">1500m</a></li> <li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdownLocation">5000m</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdownLocation">10000m</a></li> </ul> </div> <div class="btn-group"> <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-expanded="true"> Categories <span class="caret"></span> </button> <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu2"> <li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdown">Books</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdown">Textbooks</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdown">Magazine</a></li><li role="presentation" class="divider"></li><li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdown">Movies</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdown">Music CD</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdown">Video Game</a></li><li role="presentation" class="divider"></li><li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdown">Smart Phone</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdown">Tablet</a></li><li role="presentation" class="divider"></li><li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdown">Camera</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdown">Audio</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdown">Computer Hardware</a></li><li role="presentation" class="divider"></li><li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdown">Jewelry</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdown">Clothing</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdown">Shoes</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdown">Watches</a></li><li role="presentation" class="divider"></li><li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdown">Furniture</a></li><li role="presentation" class="divider"></li><li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdown">Others</a></li></ul> </div> </div></div><hr style="border-color: #6E6E6E; border-width: 2px"><div id="searchResults" class="col-md-12"> </div>';

var postInnerHTML = '<!--<form class="form-horizontal" id ="new_post" method="POST" enctype="multipart/form-data"><fieldset>--><!-- Form Name --><h1>Post Goods</h1><!-- Prepended text--><h3><span class="label label-primary" style="margin-bottom: 10px"><span class="glyphicon glyphicon-ok-sign" aria-hidden="true"></span> What do you have?</span></h3><div class="row postGroup"> <div class="col-md-12"> <div class="form-group" style="margin:0px"> <div class="input-group" style="width:100%"> <input id="gName" name="gName" class="form-control" placeholder="Name" required="" type="text" style="width:100%"> </div> </div> </div></div><!-- Select Basic --><div class="row postGroup"> <div class="col-md-12" style="margin-top: 5px"> <div class="btn-group" style="width:100%"> <button class="btn btn-default dropdown-toggle" type="button" id="categories" data-toggle="dropdown" aria-expanded="true" style="text-align:left"><span> Choose a category </span><span class="caret"></span></button> <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu2" style="width:100%"> <li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdown">Books</a></li> <li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdown">Textbooks</a></li> <li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdown">Magazine</a></li> <li role="presentation" class="divider"></li> <li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdown">Movies</a></li> <li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdown">Music CD</a></li> <li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdown">Video Game</a></li> <li role="presentation" class="divider"></li> <li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdown">Smart Phone</a></li> <li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdown">Tablet</a></li> <li role="presentation" class="divider"></li> <li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdown">Camera</a></li> <li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdown">Audio</a></li> <li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdown">Computer Hardware</a></li> <li role="presentation" class="divider"></li> <li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdown">Jewelry</a></li> <li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdown">Clothing</a></li> <li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdown">Shoes</a></li> <li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdown">Watches</a></li> <li role="presentation" class="divider"></li> <li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdown">Furniture</a></li> <li role="presentation" class="divider"></li> <li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdown">Others</a></li> </ul> </div> </div></div><!-- File Button --><h3><span class="label label-primary" style="margin-bottom: 10px"><span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span> Upload Photo</span></h3><div class="row postGroup"> <div class="col-md-12"> <form id="uploadForm" action="./php_script/upload.php" method="post" enctype="multipart/form-data"> <div id="targetLayer"> </div> <div id="uploadFormLayer"> <input id="imgUpload" name="userImage" class="inputFile" type="file" accept="image/*"><img id="photo_preview" width="200" src="#" alt=" " style="display: none" /><input id="submit" value="Submit" class="btnSubmit" type="submit"> </div> </form> </div></div><!-- Textarea --><div class="row postGroup"> <div class="col-md-12" style="margin-top: 5px"> <div class="form-group" style="margin-bottom:0px"> <textarea class="form-control" id="description" rows="5" name="description" placeholder="Say more about your good" style="resize:none"></textarea> </div> </div></div><!-- Button --><!-- Prepended text--><h3><span class="label label-primary" style="margin-bottom: 10px"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Locate your goods on map!</span></h3><h4>Set your place on the map!</h4><h3><span class="label label-primary" style="margin-bottom: 10px"><span class="glyphicon glyphicon-heart" aria-hidden="true"></span> What do you want?</span></h3><div class="row postGroup"> <div class="col-md-12"> <div class="form-group" style="margin-bottom:0px"> <div class="input-group" style="width:100%"> <input id="want_name" name="want_name" class="form-control" placeholder="Name" type="text"> </div> </div> </div></div><!-- Button --><div class="row postGroup"> <div class="form-group"> <label class="col-md-4 control-label" for="submit"></label> <div class="col-md-6"> <button id="submit" name="submit" class="submit" style="padding:0px; border:none; background-color: silver"> <h1><span class="label label-danger">Post!</span></h1> </button> </div> </div></div><!--</fieldset></form>-->';

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#photo_preview').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function load_post() {
    if (loggedInForPost == false) {
       
        // Getting the variable's value from a link
        var loginBox = $('#overlay-login');

        //Fade in the Popup and add close button
        loginBox.fadeIn(300);

        //Set the center alignment padding + border
        var popMargTop = (loginBox.height() + 24) / 2;
        var popMargLeft = (loginBox.width() + 24) / 2;

        loginBox.css({
            'margin-top': -popMargTop,
            'margin-left': -popMargLeft
        });

        // Add the mask to body
        $('body').prepend('<div id="mask"></div>');
        $('#mask').fadeIn(300);

        return false;
        //return;
    }

    //destroy the scroll
    //and reset the scroll by Noel
    $('#leftSide').perfectScrollbar('destroy');
    $("#leftSide").scrollTop(0);
	$("#leftSide").perfectScrollbar('update');
    $('#leftSide').perfectScrollbar(({
            suppressScrollX: true
        }));

    console.log("post!");
    //reset gobackStack
    gobackStack = [];
    //set currentStage to post
    currentStage = "post";

    $("#leftSideSwitch").hide().html(postInnerHTML).show('fast');
    $('#submit').hide();
    $("#goods_photo").hide();

    $(document).on('change', '#imgUpload', function(){
        $("#uploadForm").submit();
        console.log("photo uploaded!");
    // check FormData and ajax ..
    });
    
    $("#uploadForm").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            url: "./php_script/upload.php",
            type: "POST",
            data: new FormData(this),
            contentType: false,
            cache: false,
            processData: false,
            success: function (data) {
                $("#targetLayer").html(data);
            },
            error: function () {
            }
        });
    });

    $("#imgUpload").change(function () {
        readURL(this);
        $('#photo_preview').show();
        changeMarkerImage($("#goods_photo").attr('data-value'));
        $("#goods_photo").show();
    });

    document.getElementById("seek").className = "";
    document.getElementById("post").className = "active";
    document.getElementById("about").className = "";
    document.getElementById("help").className = "";

    //Google Map Setting
    //map.setOptions({draggableCursor: 'default'});
    map.setOptions({ draggableCursor: 'crosshair', draggingCursor: 'crosshair' });
    google.maps.event.addListener(map, 'click', function (event) {
        if (marker == null)
            postMarker(event.latLng, $("#goods_photo").attr('data-value'));
        else
            moveMarker(event.latLng, $("#goods_photo").attr('data-value'));

    });

}

function load_exchange(event) {
    //destroy the scroll
    //and reset the scroll by Noel
    $('#leftSide').perfectScrollbar('destroy');
    $("#leftSide").scrollTop(0);
	$("#leftSide").perfectScrollbar('update');
    $('#leftSide').perfectScrollbar(({
            suppressScrollX: true
        }));

    console.log("exchange!" + ", and gobackSearchResultDataValue is: " + gobackSearchResultDataValue);
    //push previous stage to gobackStack, but have to check if come from owner page, if so, have to not push
    if (currentStage == "seek") gobackStack.push(currentStage);
    //set currentStage to next stage, exchange
    currentStage = "exchange";

    //for goback function
    //dumb replace method ^^ when gobackSearchResultDataValueNeedToBeReplaced is false, going original way
    //if true, going tmp way
    if (gobackSearchResultDataValueNeedToBeReplaced == false) {
        val = $(this).attr('data-value');
    }
    else {
        val = gobackSearchResultDataValue;
        gobackSearchResultDataValueNeedToBeReplaced = false;
    }

    if (val != 0) {
        //for goback
        gobackSearchResultDataValue = val;

        $.ajax({
            type: "GET",
            url: "./php_script/exchange.php",
            dataType: "json",
            data: {
                gid: val
            },
            success: function (response) {
                //Left Side
                $('#leftSideSwitch').hide().empty();
                $('#leftSideSwitch').html('<div class="row" style="background-color: silver; padding-top: 0px; margin-top: 15px"> <div class="col-md-5"> <button id="goback" type="button" class="btn btn-default"><span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span> Go back</button> </div> <div class="col-md-7"> <input type="checkbox" name="exchangeStatus" checked> </div></div><div class="row" style="background-color: silver; padding-top: 0px; margin-top: 15px"> <div class="col-md-5 fancybox" href="' + response["photoPath"] + '"> <img src="' + response["photoPath"] + '" class="img-thumbnail" alt="..."> </div> <div class="col-md-7"> <ul class="list-group" style="font-size: 70%"> <li class="list-group-item">' + response["gname"] + '<span class="badge">' + response["categories"] + '</span></li> <li class="list-group-item">Wanted : ' + response["want"] + '</li> <li class="list-group-item owner" data-value="' + response["ownerID"] + '"><img src="' + response["owner_photo"] + '" height="20" width="20"> ' + response["username"] + '</li> </ul> </div></div><div class="row" style="background-color: silver; padding-top: 0px; margin-top: 15px; font-size: 85%"> <div class="col-md-12"> <div class="panel panel-info"> <div class="panel-heading"> Description : </div> <div class="panel-body"> <p> ' + response["description"] + ' </div> </div> </div> </div> <div class="row" style="background-color: silver; padding-top: 0px; margin-top: 15px; font-size: 70%"> <div class="col-md-12"> <div class="panel panel-info"> <div class="panel-heading" style="font-size: 121%"> Comments : </div> <div class="panel-body" style="padding-top:0px;"> <div id="comment_area"> <ul class="list-group"> </ul> </div> <div class="form-group" style="margin-bottom: 0px; margin-top: 10px;"> <div class="input-group"> <span class="input-group-addon">Say</span><input id="comment" name="comment" class="form-control" placeholder="leave comment" type="text"> </div> </div> </div> </div> </div> </div> <div class="searchResults" style="background-color: silver; padding-top: 0px; margin-top: 15px; font-size: 70%">').show('fast');
                $("[name='exchangeStatus']").bootstrapSwitch();
                $("[name='exchangeStatus']").bootstrapSwitch('onText', 'Exchanging!');
                $("[name='exchangeStatus']").bootstrapSwitch('offText', 'Exchanged!');
                $("[name='exchangeStatus']").bootstrapSwitch('onColor', 'info');



                document.getElementById("comment").addEventListener("keydown", function(e) {
                    if (!e) { var e = window.event; }
                    //e.preventDefault(); // sometimes useful

                    // Enter is pressed  Handle comments
                    if (e.keyCode == 13 && $("#comment").val()!="") { 
                        var targetID = $("#profile").attr("data-value");
                        var comment = $("#comment").val();
                        $.ajax({
                            type: "GET",
                            url: "./php_script/comments.php",
                            dataType: "text",
                            data: {
                                type:"write",
                                gid : val,
                                mID :targetID,
                                Comment: comment
                            },
                            success: function (response) {
                                $('#comment_area').append('<li class="list-group-item" style="padding: 5px; font-size:16px">' + response + '</li>');
                                $("#comment").val('');

                            },
                            error: function (xhr, ajaxOption, thrownError) {
                                alert(thrownError);
                                alert(JSON.stringify(xhr));
                            }
                        });
                    }
                }, false);
                //Handle comments
                $.ajax({
                    type: "GET",
                    url: "./php_script/comments.php",
                    dataType: "json",
                    data: {
                        type:"fetch",
                        gid : val
                    },
                    success: function (response) {
                        for(var i=0; i<response.length;i++){
                            $('#comment_area').append('<li class="list-group-item" style="padding: 5px; font-size:16px; background-image: linear-gradient(to bottom,#d9edf7 0,#c4e3f3 100%);"><img class="owner" data-value="' + response[i]["commenter"] + '" src="' + response[i]["commenterPhoto"] + '" style="width: 30px; height: 30px;"> ' + response[i]["comment"] + '</li>');
                        }
                    },
                    error: function (xhr, ajaxOption, thrownError) {
                        alert(thrownError);
                        alert(JSON.stringify(xhr));
                    }
                });

                //Handle Random Recommand Tables
                $.ajax({
                    type: "GET",
                    url: "./php_script/tables.php",
                    dataType: "json",
                    data: {
                        type: "recommand",
                        uid : val
                    },
                    success: function (response) {
                        $('#leftSideSwitch').append('<div class="col-md-12" style="padding: 0px"><div class="panel panel-info"><div class="panel-heading"><h3 class="panel-title">You might also likes ...</h3></div><div class="panel-body" id="recommandTables"></div></div></div></div>');
                        for (var i = 0; i < 5; i++) {
                            var min = 0;
                            var max = response.length-1;
                            var xx  = Math.floor(Math.random()*(max-min+1)+min);
                            //alert(xx);
                            $('#recommandTables').append('<div class="col-md-3 searchResult" style="padding: 0px; padding-top: 0px; padding-bottom: 0px; border: 0px; background: #fff; margin: 0px;" data-value="' + response[xx]["gid"] + '"><img src="' + response[xx]["photoPath"] + '" width="100" height="100" style="max-width: 100%; height: auto;" class="img-thumbnail" alt="..."></div>');
                        }
                    },
                    error: function (xhr, ajaxOption, thrownError) {
                        alert(thrownError);
                        alert(JSON.stringify(xhr));
                    }
                });

                //Map Side
                map.setCenter(new google.maps.LatLng(response["posY"], response["posX"]));
                map.setZoom(17);
            },
            error: function (xhr, ajaxOption, thrownError) {
                alert(thrownError);
                alert(JSON.stringify(xhr));
            }
        });

    }
}

function load_profile() {
    //destroy the scroll 
    $('#leftSide').perfectScrollbar('destroy');

    var hidegoback = false;
    console.log("owner!");
    //push previous stage to gobackStack
    gobackStack.push(currentStage);
    //set currentStage to next stage, owner
    if (currentStage == "owner") {
        //means that user looked at somebody's profile and check own profile, then this time we want to hide goback and reset the stack
        console.log("hidegoback!");
        hidegoback = true;
        gobackStack = [];
    }
    currentStage = "owner";

    val = $(this).attr('data-value');

    if (val != 0) {
      // Other's profiles
      if (hidegoback == false && val != $("#profile").attr("data-value")) {
            $.ajax({
                type: "GET",
                url: "./php_script/profile.php",
                dataType: "json",
                data: {
                    uid: val
                },
                success: function (response) {
                    $('#leftSideSwitch').hide().empty();
                    $('#leftSideSwitch').html('<div class="row" style="background-color: silver; padding-top: 0px; margin-top: 15px"><div class="col-md-3"><button id="goback" type="button" class="btn btn-default"><span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span> Go back</button></div></div><div class="row" style="background-color: silver; padding-top: 0px; margin-top: 15px"><div class="col-md-5 fancybox" href="' + response["photoPath"] + '"><img src="' + response["photoPath"] + '" class="img-thumbnail" alt="..."></div><div class="col-md-7"><ul class="list-group" style="font-size: 70%"><li class="list-group-item">' + response["username"] + '</li><li class="list-group-item">' + response["email"] + '</li><li class="list-group-item">' + response["nickname"] + '</li></ul></div></div><div class="row" style="background-color: silver; padding-top: 0px; margin-top: 10px; font-size: 70%"><div class="col-md-12"><ul class="nav nav-pills" role="tablist"><li role="presentation" class="userBtn" data-value="' + response["fb_id"] + '" id="add"><a  href="#">Follow + </a></li><li role="presentation" class="active userBtn" id="seeker"><a href="#">Following <span class="badge">42</span></a></li><li role="presentation" class="active userBtn" id="follower"><a href="#">Follower <span class="badge">3</span></a></li> <li role="presentation" class="active fancybox" id="sendMessage" href="#messageTextarea"><a >Send message!</a> </li> </ul></ul></div></div><div class="row" style="background-color: silver; padding-top: 0px; margin-top: 15px; font-size: 70%">').show('fast');

                    // popup (send) messagebox
                    $('#leftSideSwitch').append('<div id="messageTextarea" class="form-group" style="display:none; width:400px;">To:   <img src="' + response["photoPath"] + '" height="30" width="30" >' + response["username"] + '<textarea class="form-control" id="message" name="send" rows="16" placeholder="Send some text...." ></textarea> <button id="send" name="send" class="btn btn-danger userBtn btn-send">Send Message</button> </div> ');

                    //<div class="form-group"> <textarea class="form-control" id="message" name="send" placeholder="Send message !"></textarea> </div>

                    //Handle Exchanging/Exchanged Tables
                    //Get Exchange Table(?) and represent in map
                    $.ajax({
                        type: "GET",
                        url: "./php_script/tables.php",
                        dataType: "json",
                        data: {
                            type: "myTables",
                            uid : val
                        },
                        success: function (response) {

                            $('#leftSideSwitch').append('<div class="col-md-12" style="padding: 0px"><div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">Exchanging</h3></div><div id="Exchanging" class="panel-body "></div></div><div class="panel panel-default" style="margin-top: 15px"><div class="panel-heading"><h3 class="panel-title">Exchanged</h3></div><div id="Exchanged" class="panel-body"></div></div></div></div>');
                            for (var i = 0; i < response.length; i++) {
                                if (response[i]["status"] == 0) { // Exchanging
                                    $('#Exchanging').append('<div class="col-md-3 searchResult" style="padding: 0px; padding-top: 0px; padding-bottom: 0px; border: 0px; background: #fff; margin: 0px;" data-value="' + response[i]["gid"] + '"><img src="' + response[i]["photoPath"] + '"width="100" height="100" style="max-width: 100%; height: auto;" class="img-thumbnail" alt="..."></div>');
                                }
                                /*  else{
                                        If "status" != 0
                                        Then put into Exchanged Table
                                    } */
                            }
                        },
                        error: function (xhr, ajaxOption, thrownError) {
                            alert(thrownError);
                            alert(JSON.stringify(xhr));
                        }
                    });                },
                error: function (xhr, ajaxOption, thrownError) {
                    alert(thrownError);
                    alert(JSON.stringify(xhr));
                }
            });
        }
    	// my Profile
        else {
            $.ajax({
                type: "GET",
                url: "./php_script/profile.php",
                dataType: "json",
                data: {
                    uid: val
                },
                success: function (response) {
                    $('#leftSideSwitch').hide().empty();
                    $('#leftSideSwitch').html('<div class="row" style="background-color: silver; padding-top: 0px; margin-top: 15px"><div class="col-md-5 fancybox" href="' + response["photoPath"] + '"><img src="' + response["photoPath"] + '" class="img-thumbnail" alt="..."></div><div class="col-md-7"><ul class="list-group" style="font-size: 70%"><li class="list-group-item">' + response["username"] + '</li><li class="list-group-item"> ' + response["email"] + '</li><li class="list-group-item"> ' + response["nickname"] + '</li></ul></div></div><div class="row" style="background-color: silver; padding-top: 0px; margin-top: 10px; font-size: 70%"><div class="col-md-12"><ul class="nav nav-pills" role="tablist"> <li role="presentation" class="active userBtn" id="seeker"><a href="#">Following <span class="badge">42</span></a></li><li role="presentation" class="active userBtn" id="follower"><a href="#">Follower <span class="badge">3</span></a></li></ul></div></div><div class="row" style="background-color: silver; padding-top: 0px; margin-top: 15px; font-size: 70%">').show('fast');
                    //Handle Exchanging/Exchanged Tables
                    //Get Exchange Table(?) and represent in map
                    $.ajax({
                        type: "GET",
                        url: "./php_script/tables.php",
                        dataType: "json",
                        data: {
                            type: "myTables",
                            uid : val
                        },
                        success: function (response) {

                            $('#leftSideSwitch').append('<div class="col-md-12" style="padding: 0px"><div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">Exchanging</h3></div><div id="Exchanging" class="panel-body "></div></div><div class="panel panel-default" style="margin-top: 15px"><div class="panel-heading"><h3 class="panel-title">Exchanged</h3></div><div id="Exchanged" class="panel-body"></div></div></div></div>');
                            for (var i = 0; i < response.length; i++) {
                                if (response[i]["status"] == 0) { // Exchanging
                                    $('#Exchanging').append('<div class="col-md-3 searchResult" style="padding: 0px; padding-top: 0px; padding-bottom: 0px; border: 0px; background: #fff; margin: 0px;" data-value="' + response[i]["gid"] + '"><img src="' + response[i]["photoPath"] + '" width="100" height="100" style="max-width: 100%; height: auto;" class="img-thumbnail" alt="..."></div>');
                                }
                                /*  else{
                                        If "status" != 0
                                        Then put into Exchanged Table
                                    } */
                            }
                        },
                        error: function (xhr, ajaxOption, thrownError) {
                            alert(thrownError);
                            alert(JSON.stringify(xhr));
                        }
                    });
                },
                error: function (xhr, ajaxOption, thrownError) {
                    alert(thrownError);
                    alert(JSON.stringify(xhr));
                }
            });
        }



    }
}

function seek_query(search, query_type) {
    var pX, pY;
    if (query_type == "location") {
        navigator.geolocation.getCurrentPosition(function (position) {
            var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.setCenter(latlng);
            pX = latlng.lng();
            pY = latlng.lat();
            console.log("myLocation: " + pX + ',' + pY);
            $.ajax({
                type: "GET",
                url: "./php_script/seek.php",
                dataType: "json",
                data: {
                    type: query_type,
                    px: pX,
                    py: pY,
                    selected: search
                },
                success: function (response) {
                    if (response == null) {
                        $("#searchResults").append("No Results!");
                    } else {
                        for (var i = 0; i < response.length; i++) {
                            //Left Side
                            $('#searchResults').append('<div class="row searchResult" data-value="' + response[i]["gid"] + '"> <div class="col-md-5"><img src="' + response[i]["photoPath"] + '" alt="..." class="img-rounded"></div> <div class="col-md-7 searchResultDescription"> <ul class="list-group"> <li class="list-group-item"> ' + response[i]["gname"] + '<span class="badge">' + response[i]["categories"] + '</span></li> <li class="list-group-item">Wanted: ' + response[i]["want"] + '</li> <li class="list-group-item"><img src="' + response[i]["owner_photo"] + '" height="20" width="20"> ' + response[i]["username"] + '</li></ul> </div></div>');

                            //Map Side
                            addMarkers(response[i]["posY"], response[i]["posX"], response[i]["photoPath"], response[i]["gid"]);
                        }
                        //fit the map bounds with search results
                        markersBounds();

                        $('.searchResult').hover(
                            function () {
                                $(this).addClass('searchResultSelected');
                            },
                            function () {
                                $(this).removeClass('searchResultSelected');
                            }
                        );

                        document.getElementById("post").className = "";
                        document.getElementById("about").className = "";
                        document.getElementById("help").className = "";
                        document.getElementById("seek").className = "active";
                    }
                },
                error: function (xhr, ajaxOption, thrownError) {
                    alert(thrownError);
                    alert(JSON.stringify(xhr));
                }

            });
        }, function () {
            handleNoGeolocation(browserSupportFlag);
        });
    }
    else {
        $.ajax({
            type: "GET",
            url: "./php_script/seek.php",
            dataType: "json",
            data: {
                type: query_type,
                px: pX,
                py: pY,
                selected: search
            },
            success: function (response) {
                if (response == null) {
                    $("#searchResults").append("No Results!");
                } else {
                    for (var i = 0; i < response.length; i++) {
                        //Left Side
                        $('#searchResults').append('<div class="row searchResult" data-value="' + response[i]["gid"] + '"> <div class="col-md-5"><img src="' + response[i]["photoPath"] + '" alt="..." class="img-rounded"></div> <div class="col-md-7 searchResultDescription"> <ul class="list-group"> <li class="list-group-item"> ' + response[i]["gname"] + '<span class="badge">' + response[i]["categories"] + '</span></li> <li class="list-group-item">Wanted: ' + response[i]["want"] + '</li> <li class="list-group-item"><img src="' + response[i]["owner_photo"] + '" height="20" width="20"> ' + response[i]["username"] + '</li></ul> </div></div>');

                        //Map Side
                        addMarkers(response[i]["posY"], response[i]["posX"], response[i]["photoPath"], response[i]["gid"]);
                    }
                    //fit the map bounds with search results
                    markersBounds();

                    $('.searchResult').hover(
                        function () {
                            $(this).addClass('searchResultSelected');

                            var gid = $(this).attr("data-value");
                            //$("div[data-gid='" + gid + "']").addClass('selected-item');
                        },
                        function () {
                            $(this).removeClass('searchResultSelected');
                            var gid = $(this).attr("data-value");
                            //$("div[data-gid='" + gid + "']").removeClass('selected-item');
                        }
                    );

                    document.getElementById("post").className = "";
                    document.getElementById("about").className = "";
                    document.getElementById("help").className = "";
                    document.getElementById("seek").className = "active";
                }
            },
            error: function (xhr, ajaxOption, thrownError) {
                alert(thrownError);
                alert(JSON.stringify(xhr));
            }

        });
    }
}

$(document).ready(function () {
    $(function () {
        $(".fancybox").fancybox();
        /// §ä¨ìclass¦Wº?¬°fancyboxªº?þ§O¡A±N¥L®M¥? fancybox®?ªG
    });

    $("body").on("click", ".userBtn", function (event) {
        var tagetID = $("#add").attr("data-value");  // get others' fb id
        var myID = $("#profile").attr("data-value"); // get my fb id
        var Type = $(this).attr("id");

        //destroy the scroll
        //and reset the scroll by Noel
        $('#leftSide').perfectScrollbar('destroy');
        $("#leftSide").scrollTop(0);
        $("#leftSide").perfectScrollbar('update');
        $('#leftSide').perfectScrollbar(({
                suppressScrollX: true
            }));

        if (Type != "send")
            $('#leftSideSwitch').hide().empty();

        //basic components like "goback"
        if(Type == "following")
        {
            $('#leftSideSwitch').html('<div class="row" style="background-color: silver; padding-top: 0px; margin-top: 15px"><div class="col-md-3"><button id="goback" type="button" class="btn btn-default"><span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span> Go back</button></div></div>\
            <div class="row" style="background-color: silver; padding-top: 0px; margin-top: 15px">\
                <div class="col-md-2">\
                    <h1 style="margin-top: 0px"><span class="glyphicon glyphicon-eye-open" aria-hidden="true" style="color: #04ACD9"></span></h1>\
                </div>\
                <div class="col-md-6">\
                    <h1 style="margin-top: 0px">Following</h1>\
                </div>\
                <div class="col-md-4">\
                    <h1 style="margin-top: 0px; color: #04ACD9">42</h1>\
                </div>\
            </div>');
        }
        else if(Type == "follower")
        {
            $('#leftSideSwitch').html('<div class="row" style="background-color: silver; padding-top: 0px; margin-top: 15px"><div class="col-md-3"><button id="goback" type="button" class="btn btn-default"><span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span> Go back</button></div></div>\
            <div class="row" style="background-color: silver; padding-top: 0px; margin-top: 15px">\
                <div class="col-md-2">\
                    <h1 style="margin-top: 0px"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true" style="color: #04ACD9"></span></h1>\
                </div>\
                <div class="col-md-6">\
                    <h1 style="margin-top: 0px">Follower</h1>\
                </div>\
                <div class="col-md-4">\
                    <h1 style="margin-top: 0px; color: #04ACD9">42</h1>\
                </div>\
            </div>');
        }
        

        //then show
        if (Type != "send") {
            $('#leftSideSwitch').show('fast');
            console.log($("#message").val());
        }

        $.ajax({
            type: "GET",
            url: "./php_script/userBtn.php",
            dataType: "text",
            data: {
                tID: tagetID,
                type: Type,
                mID: myID,
                message: $("#message").val()
            },
            success: function (response) {
                parent.$.fancybox.close();
                //alert(response);
            },
            error: function (xhr, ajaxOption, thrownError) {
                alert(thrownError);
                alert(JSON.stringify(xhr));
            }
        });
    });

    //load_exchange();
    // Handle User clicking the specific goods.
    // Move to outside by Noel. To fit goback function QwQ
    $("#leftSideSwitch").on("click", ".searchResult", load_exchange);

    // Handle new post
    $("#leftSideSwitch").on("click", ".submit", function (event) {

        var post_gname = $("#gName").val();
        var post_want = $("#want_name").val();
        var post_description = $("#description").val();
        var post_ownerID = $("#profile").attr('data-value');
        var post_photo = $("#goods_photo").attr('data-value');
        var post_categories = $(".btn:first-child").val();

        if ($(".btn:first-child").val() == "")
            alert("Please select a categories!");

        var X;
        var Y;
        if (marker == null)
            alert("Please select a location!");
        else {
            var X = marker.getPosition().lng();
            var Y = marker.getPosition().lat();
        }

        if(marker!=null && post_categories != ""){
            $.ajax({
                type: "GET",
                url: "./php_script/post.php",
                dataType: "text",
                data: {
                    gname: post_gname,
                    want: post_want,
                    categories: post_categories,
                    ownerID: post_ownerID,
                    description: post_description,
                    photoPath: post_photo,
                    posX: X,
                    posY: Y
                },
                success: function (response) {
                    console.log(response);
                    console.log("POST success");
                    marker.setDraggable(false);
                    $('#seek').trigger("click");
                },
                error: function (xhr, ajaxOption, thrownError) {
                    alert(thrownError);
                    alert(JSON.stringify(xhr));
                }
            });
        }
    });

    // Handle load profile
    // Move to outside by Noel. To fit goback function QwQ
    $("body").on("click", ".owner", load_profile);

    // Handle User clicking seek on navbar
    $("#seek").on("click", function (event) {
        console.log("seek!");
        //reset gobackStack
        gobackStack = [];
        //set currentStage to post
        currentStage = "seek";

        $('#leftSideSwitch').hide();
        $('#leftSideSwitch').html(seekInnerHTML);
        $('#leftSideSwitch').show('fast');

        seek_query("");

        //Create the scroll only on Seek
        $('#leftSide').perfectScrollbar(({
            suppressScrollX: true
        }));

        //Google Map Setting
        if (marker != null)
            marker.setMap(marker = null);
        if (markers != null)
            clearMarkers();

        if (map != null) {
            map.setOptions({ draggableCursor: 'default', draggingCursor: 'default' });
            google.maps.event.clearListeners(map, 'click');
        }
    });

    // Handle Search by keywords
    $("#leftSideSwitch").on("click", ".seeking", function (event){
         var search = $("#searchName").val();
        $('#leftSideSwitch').hide();
        $('#leftSideSwitch').html(seekInnerHTML);
        $('#leftSideSwitch').show('fast');
        seek_query(search, "keywords");      

           //Create the scroll only on Seek
        $('#leftSide').perfectScrollbar(({
            suppressScrollX: true
        }));

        //Google Map Setting
        if (marker != null)
            marker.setMap(marker = null);
        if (markers != null)
            clearMarkers();

        if (map != null) {
            map.setOptions({ draggableCursor: 'default', draggingCursor: 'default' });
            google.maps.event.clearListeners(map, 'click');
        }
    });

    // Handle Search by Categories
    $("#leftSideSwitch").on("click", ".dropdown",function (event) {
        $("#categories").text($(this).text()+' ');
        $("#categories").append('<span class="caret"></span>');
        $(".btn:first-child").val($(this).text());

        if ($('#seek').attr("class") == "active") {
             var search = $(this).text();
            $('#leftSideSwitch').hide();
            $('#leftSideSwitch').html(seekInnerHTML);
            $('#leftSideSwitch').show('fast');
            seek_query(search, "categories");

            //Create the scroll only on Seek
            $('#leftSide').perfectScrollbar(({
                suppressScrollX: true
            }));

            //Google Map Setting
            if (marker != null)
                marker.setMap(marker = null);
            if (markers != null)
                clearMarkers();

            if (map != null) {
                map.setOptions({ draggableCursor: 'default', draggingCursor: 'default' });
                google.maps.event.clearListeners(map, 'click');
            }
            $("#dropdownMenu2").text($(this).text() + ' ');
            $("#dropdownMenu2").append('<span class="caret"></span>');
            $(".btn:first-child").val($(this).text());
        }
    });

    // Handle Search by my Location
    $("#leftSideSwitch").on("click", ".dropdownLocation", function (event) {
        var search = $(this).text();
        $('#leftSideSwitch').hide();
        $('#leftSideSwitch').html(seekInnerHTML);
        $('#leftSideSwitch').show('fast');
        seek_query(search, "location");

        //Create the scroll only on Seek
        $('#leftSide').perfectScrollbar(({
            suppressScrollX: true
        }));

        //Google Map Setting
        if (marker != null)
            marker.setMap(marker = null);
        if (markers != null)
            clearMarkers();

        if (map != null) {
            map.setOptions({ draggableCursor: 'default', draggingCursor: 'default' });
            google.maps.event.clearListeners(map, 'click');
        }
        $("#dropdownMenu1").text($(this).text() + ' ');
        $("#dropdownMenu1").append('<span class="caret"></span>');
        $(".btn:first-child").val($(this).text());
    });

    // Handle User clicking POST on navbar
    $('#post').click(load_post);

    // Handle myMessage
    $('#myMessage').click(function (event) {
        $.ajax({
            type: "GET",
            url: "./php_script/myMessage.php",
            dataType: "json",
            data: {
                type: "fetch",
                myid: $("#profile").attr("data-value")
            },
            success: function (response) {
                $('#myMessageDropdown').empty();
                $('#myMessageDetailArea').empty();
                if (response == null) {
                    $("#myMessageDropdown").append("<li>No message!</li>");
                } else {
                    for (var i = 0; i < response.length; i++) {
                        //Dropdown
                        if (response[i]["readed"] == 0) {
                            $('#myMessageDropdown').append('<li ><a class="fancybox messageRow" href="#mid' + response[i]["mid"] + '"><span class="glyphicon glyphicon-certificate"></span>' + " " + response[i]["text"].substr(0, 10) + "..." + '</a></li>');
                        }
                        else {
                            $('#myMessageDropdown').append('<li ><a class="fancybox messageRow" href="#mid' + response[i]["mid"] + '"><span class="glyphicon glyphicon-certificate" style="display:none"></span>' + " " + response[i]["text"].substr(0, 10) + "..." + '</a></li>');
                        }
                        if ($('#mid' + response[i]["mid"] + '').attr("id") == null) {
                            $('#myMessageDetailArea').append('<div id="mid' + response[i]["mid"] + '" style="display:none" data-value="'+response[i]["sender_id"]+'"><img src="' + response[i]["owner_photo"] + '" height="50" width="50" >'+response[i]["username"]+'<li class="list-group-item" style="padding: 5px; font-size:16px ;width:400px;height:150px"> ' + response[i]["text"] + '</li><textarea class="form-control" id="messageReply' + response[i]["mid"] + '" name="messageReply" placeholder="Relpy......"></textarea> <button name="Reply" data-value="' + response[i]["mid"] + '" class="btn btn-primary Reply">Reply !</button></div>');
                        }
                    }
                }
            },
            error: function (xhr, ajaxOption, thrownError) {
                alert(thrownError);
                alert(JSON.stringify(xhr));
            }
        });
    });

    $("body").on("click", ".Reply", function (event) {
        var replyMessage = $("#messageReply" + $(this).attr("data-value")).val();
        var tagetID = $("#mid"+ $(this).attr("data-value")).attr("data-value");  // get others' fb id
        var myID = $("#profile").attr("data-value"); // get my fb id

        //alert($(target).val());
        $.ajax({
            type: "GET",
            url: "./php_script/myMessage.php",
            dataType: "text",
            data: {
                type: "reply",
                tID: tagetID,
                mID: myID,
                message: replyMessage
            },
            success: function (response) {
                //alert(response);
                parent.$.fancybox.close();
                alert("reply success!");

                console.log(response);
            },
            error: function (xhr, ajaxOption, thrownError) {
                alert(thrownError);
                alert(JSON.stringify(xhr));
            }
        });
    });

    // Update message status to readed if clicked
    $("#myMessage").on("click", ".messageRow", function (event) {
        $.ajax({
            type: "GET",
            url: "./php_script/myMessage.php",
            dataType: "text",
            data: {
                type:"readmessage",
                mid: $(this).attr("href").replace("#mid", "")
            },
            success: function (response) {
                console.log("Unread messages = "+response);
            },
            error: function (xhr, ajaxOption, thrownError) {
                alert(thrownError);
                alert(JSON.stringify(xhr));
            }
        });
    });

    // JustInTime check unread messages
    $('body').click(function (event) {
        $.ajax({
            type: "GET",
            url: "./php_script/myMessage.php",
            dataType: "text",
            data: {
                type: "unreadmessage",
                myid: $("#profile").attr("data-value")
            },
            success: function (response) {
                $("#messageIcon").empty();
                $("#messageIcon").html('<span class="glyphicon glyphicon-envelope" aria-hidden="true"></span><span class="badge">'+response+'</span>');
                console.log(response);
            },
            error: function (xhr, ajaxOption, thrownError) {
                alert(thrownError);
                alert(JSON.stringify(xhr));
            }
        });
    });

    $("#leftSideSwitch").on("click", "#goback", function (event) {
        console.log("goback!");
        console.log(gobackStack);

        //select where to goback
        switch (gobackStack[gobackStack.length - 1]) {
            case "exchange":
                console.log("case Exchange");
                gobackStack.pop();
                gobackSearchResultDataValueNeedToBeReplaced = true;
                load_exchange(event);
                break;
            case "seek":
                gobackStack.pop();
                $("#seek").trigger("click");
                break;
            case "post":
                gobackStack.pop();
                load_post();
                break;
        }

    });

    $("#help").on("click", function (event) {

        // Getting the variable's value from a link
        var loginBox = $('#overlay-maintenance');

        //Fade in the Popup and add close button
        loginBox.fadeIn(300);

        //Set the center alignment padding + border
        var popMargTop = (loginBox.height() + 24) / 2;
        var popMargLeft = (loginBox.width() + 24) / 2;

        loginBox.css({
            'margin-top': -popMargTop,
            'margin-left': -popMargLeft
        });

        // Add the mask to body
        $('body').prepend('<div id="mask"></div>');
        $('#mask').fadeIn(300);

        return false;
    });

    // Overlay Effect
    $('body').on('click', '.popup-close, #mask', function () {
        $('#mask , .popup').fadeOut(300, function () {
            $('#mask').remove();
        });
        return false;
    });

    $('.popup-close').hover(
        function () {
            $(this).addClass('emphasis');
        },
        function () {
            $(this).removeClass('emphasis');
        }
    );

});

$(window).load(function () {
    $('#seek').click();
});

