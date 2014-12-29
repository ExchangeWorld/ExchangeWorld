
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="">
  <meta name="author" content="">
  <link rel="icon" href="favicon.ico">

  <title>ExchangeWorld</title>

  <!-- Bootstrap core CSS -->
  <link href="static/css/bootstrap.min.css" rel="stylesheet">
  <!-- Bootstrap theme -->
  <link href="static/css/bootstrap-theme.min.css" rel="stylesheet">

  <link href="static/css/perfect-scrollbar.min.css" rel="stylesheet" type="text/css">

  <!-- Custom styles for this template -->
  <!-- <link href="static/home-03b2f3d29cb61f65e848770009364984.css" rel="stylesheet" type="text/css" charset="utf-8"> -->
  <link href="static/css/customized.css" rel="stylesheet" type="text/css" charset="utf-8">

  <!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
  <!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
  <!--<script src="../../assets/js/ie-emulation-modes-warning.js"></script>-->
  <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
  <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->
  <script src="./include/FBappID.js"></script>
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>

</head>

<body role="document">
    <!-- BLOCK: FB SDK initialization -->
    <div id="fb-root"></div>
    <script>
    window.fbAsyncInit = function() {
        // init the FB JS SDK
        FB.init({
        appId      : FacebookAppId,                        // App ID from the app dashboard
        cookie     : true,                                 // Allowed server-side to fetch fb auth cookie
        status     : true,                                 // Check Facebook Login status
        xfbml      : true                                  // Look for social plugins on the page
        });

        // Additional initialization code such as adding Event Listeners goes here
        window.fbLoaded();

   };
    // Load the SDK asynchronously
    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        //js.src = "http://connect.facebook.net/en_US/all.js";
        // Debug version of Facebook JS SDK
        js.src = "http://connect.facebook.net/en_US/all/debug.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    </script>
    <!-- ENDBLOCK: FB SDK initialization -->


  <!-- Fixed navbar -->
  <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
    <div class="container">
      <div class="navbar-header" style="margin-left:8%">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#" style="font-size: 130%;">ExchangeWorld</a>
      </div>
      <div id="navbar" class="navbar-collapse collapse">
        <ul class="nav navbar-nav">
          <li id="seek">
            <a href="#seek" >
              <span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
              Seek
            </a>
          </li>

          <li id="post">
            <a href="#post" onclick="load_post()">
              <span class="glyphicon glyphicon-pushpin" aria-hidden="true"></span>
              Post
            </a>
          </li>

          <li id="about">
            <a href="#about" onclick="load_about()">
              <span class="glyphicon glyphicon-glass" aria-hidden="true"></span>
              About
            </a>
          </li>

          <li id="help">
            <a href="#help" onclick="load_help()">
              <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>
              Help
            </a>
          </li>

          <!--<button id="login" class="btn btn-primary" style="left: 65%">Facebook</button>-->
          <fb:login-button id ="login" class="nav navbar-nav" style="left: 70%" scope="user_likes,user_photos" onlogin='window.location.reload(true);'></fb:login-button>
          <li class="dropdown" style="left: 70%">
 
            <a id="myname" href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
              <img id="myhead" src="./static/img/alt.gif" height="20" width="20"></img>
            </a>
            <ul id="myMenu" class="dropdown-menu" role="menu">
                <li id="profile" class="owner" data-value="..............."><a href="#">Profile</a></li>
                <li id="seekers"><a href="#seekers">Seekers</a></li>
                <li id="my_exchanges"><a href="#my_exchanges">My exchanges</a></li>
                <li role="presentation" class="divider"></li>
                <li id="logout"><a href="#logout">Logout</a></li>
            </ul>
         </li>
        </ul>
      </div><!--/.nav-collapse -->
    </div>
  </nav>

  <div id="mainContainer" class="container-fluid">

    <div id="slideSpace" style="width:25%;height:inherit;position:absolute;">
      <!-- Only for Jquery Animate -->

    </div>

    <div id="mainRow" class="row">
      <div id="leftSide" class="col-md-3">
        <div id="leftSideSwitch" style="margin-top: 10px">
        	
        	<div class="input-group input-group-lg" style="margin-top: 20px; margin-bottom: 10px">
        	<input type="text" class="form-control" placeholder="Seek anything">
        	<span class="input-group-btn"><button class="btn btn-default" type="button">Go!</button>
        	</span></div><p style="font-size: small">or</p>
        	<div id="searchOptions" class="row"><div class="col-md-4"><div class="dropdown">
        	<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-expanded="true">Distance<span class="caret"></span></button><ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1"><li role="presentation"><a role="menuitem" tabindex="-1" href="#">&lt; 500m</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="#">500 ~ 1500m</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="#">1500 ~ 5000m</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="#">&gt; 5000m</a></li></ul></div></div><div class="col-md-4"><div class="dropdown"><button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-expanded="true">Categories<span class="caret"></span></button><ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1"><li role="presentation"><a role="menuitem" tabindex="-1" href="#">Antiques</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="#">Art</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="#">Book</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="#">Clothing</a></li></ul></div></div><div class="col-md-4"><button type="button" class="btn btn-default"><span class="glyphicon glyphicon-search" aria-hidden="true"></span> Seek</button></div></div><hr style="border-color: #6E6E6E; border-width: 2px">
        	<div id="searchResults" class="row">
  				<?php
						include("include/connect.php");	
						$sql = "SELECT * FROM `goods`";
						$result=mysql_query($sql) or die(mysql_error());
						while ($row = mysql_fetch_array($result)) {
							echo '<div class="row searchResult" data-value="'.trim($row['gid']).'" ><div class="col-md-5"><div class="thumbnail"><img src="'.trim($row['photoPath']).'" alt="..."></div></div><div class="col-md-7"><p>Name: '.trim($row['gname']).'</p><p>Category: '.trim($row['categories']).'</p><p>Want for: '.trim($row['want']).'</p><p>Position: ('.trim($row['posX']).','.trim($row['posY']).')</p></div></div>';
						}
				?>
					</div>
         <!-- Add anything with JS or Backend -->
        </div>
      </div>

      <div id="mapSide" class="col-md-9">
      </div>
    </div>
  </div>

  <!-- Junks put here -->
  <div id="exchange"></div>

  <!-- Bootstrap core JavaScript
  ================================================== -->
  <!-- Placed at the end of the document so the pages load faster -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
  <script src="static/js/bootstrap.min.js"></script>

  <!--<script src="static/js/bootstrap.min.js"></script>-->
  <script src="static/js/customized.js"></script>
  <!--<script src="../../assets/js/docs.min.js"></script>-->
  <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
  <!--<script src="../../assets/js/ie10-viewport-bug-workaround.js"></script>-->
  <script src="static/js/perfect-scrollbar.min.js"></script>
  <script src="https://maps.googleapis.com/maps/api/js"></script>
  <script>
    function initialize() {
      var mapProp = {
        center: new google.maps.LatLng(24.9853919, 121.5865058),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map(document.getElementById("mapSide"), mapProp);
    }
    google.maps.event.addDomListener(window, 'load', initialize);
    //load_seek();
  </script>


      <!-- BLOCK: Your script playground -->
    <script id="script-playground">
        window.fbLoaded = function(){
            FB.getLoginStatus(function(response) {
                if (response.status === 'connected') {
                    // the user is logged in and has authenticated your
                    // app, and response.authResponse supplies
                    // the user's ID, a valid access token, a signed
                    // request, and the time the access token 
                    // and signed request each expire
                    fetch_my_profile();

                    var uid = response.authResponse.userID;
                    $("#profile").attr('data-value', uid);

                    FB.api('/me/picture?width=250', function(response) {
                        my_picture_url = response.data.url;
                        $("#myhead").attr('src', my_picture_url);
                    });
                    FB.api('/me', function(response) {
                        $("#myname").append(response.name);
                    });
                    $("#myname").show();
                    $("#login").hide();
                } else if (response.status === 'not_authorized') {
	                alert("not_authorized");
                    // the user is logged in to Facebook, 
                    // but has not authenticated your app
                } else {
                    // the user isn't logged in to Facebook.
                    $("#myname").hide();
                    $("#login").show();
                }
            });

            // define the action when user clicked the login button.
            $("#logout").click(function(){
                FB.logout();
                $("#myname").hide();
                $("#login").show();
            });

            var fetch_my_profile = function () {
                var my_name;
                var my_gender;
                var my_email;
                var my_facebook_id;
                var my_picture_url ;

                FB.api('/me/picture?width=250', function(response) {
                    my_picture_url = response.data.url;
                    $("#my-profile-picture").attr('src', my_picture_url);
                });
                FB.api('/me', function(response) {
                    my_name = response.name;
                    my_gender = response.gender;
                    //var my_email = response.email;
                    my_facebook_id = response.id;

                    $.ajax({
                        type: "GET",
                        url: "./php_script/createAccount.php",
                        dataType: "text",
                        data: { 
                            name : my_name,
                            gender : my_gender,    
                           // my_email : response.email,
                            facebook_id : my_facebook_id,
                            picture_url : my_picture_url 
                        },
                        success: function(response){
                            console.log(response);
                        //    alert(response);
                        },
                        error: function(xhr,ajaxOption,thrownError){
                            alert(thrownError);
                            alert(JSON.stringify(xhr));
                        }
                    });
                });

            };
        };

    </script>
    <!-- ENDBLOCK: Your script playground -->
</body>
</html>
