<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="images/favicon.ico">

    <title>ExchangeWorld</title>

    <!-- Bootstrap core CSS -->
    <link href="static/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap theme -->
    <link href="static/css/bootstrap-theme.min.css" rel="stylesheet">

    <link href="static/css/perfect-scrollbar.min.css" rel="stylesheet" type="text/css">
    <!--<link href="static/css/jquery.jscrollpane.css" rel="stylesheet" type="text/css" charset="utf-8" media="all">-->

    <!-- Custom styles for this template -->
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
    <script>var loggedInForPost = false;</script>

</head>

<body role="document">
    <div id="fb-root"></div>

    <nav class="navbar navbar-inverse navbar-fixed-top unselectable" role="navigation" style="background-color: #36474F; border-color: #36474F; border-size: 0px">
        <div class="container-fluid" style="background-color: #36474F; border-color: #36474F; border-size: 0px">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="." style="font-size: 130%;">
                    <img style="max-width:200px; margin-top:-8px;" src="static/img/icon/logotmp.png" alt="">
                    <!--<img style="display: inline;" src="images/exchange-icon" width="25">ExchangeWorld-->

                </a>
            </div>
            <div id="navbar" class="navbar-collapse collapse" style="background-color: #36474F; border-color: #36474F; border-size: 0px">
                <ul class="nav navbar-nav">
                    <li id="seek" class="active seeking">
                        <a href="#seek"><span class="glyphicon glyphicon-eye-open" aria-hidden="true" style="color: #FFFFFD"></span> Seek</a>

                    </li>

                    <li id="post">
                        <a href="#post"><span class="glyphicon glyphicon-pushpin" aria-hidden="true" style="color: #FFFFFD"></span> Post</a>
                    </li>

                    <li id="about">
                        <a href="index.html"><span class="glyphicon glyphicon-glass" aria-hidden="true" style="color: #FFFFFD"></span> About</a>
                    </li>

                    <li id="help">
                        <a href="#help"><span class="glyphicon glyphicon-cog" aria-hidden="true" style="color: #FFFFFD"></span> Help</a>
                    </li>



                    <li>
                        <div id="login" class="fb-login-button" data-scope="user_likes,user_photos" onlogin='fbLoaded();' data-max-rows="1" data-size="large" data-show-faces="false" data-auto-logout-link="false"></div>
                    </li>

                    <li class="dropdown">
                        <a id="myname" href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                            <img id="myhead" src="./static/img/alt.gif" height="20" width="20">
                        </a>
                        <ul id="myMenu" class="dropdown-menu" role="menu">
                            <li id="profile" class="owner" data-value="..............."><a href="#">Profile</a></li>
                            <li role="presentation" class="divider"></li>
                            <li id="logout"><a href="#logout">Logout</a></li>
                        </ul>
                    </li>
                    <li id="myMessage" class="dropdown">
                        <a id="messageIcon" href="#" data-toggle="dropdown" ><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span></a>
                        <ul id="myMessageDropdown"class="dropdown-menu" role="menu"></ul>
                    </li>
                </ul>
            </div>
            <!--/.nav-collapse -->
        </div>
    </nav>

    <div id="mainContainer" class="container-fluid">
        <div id="mainRow" class="row">
            <!-- For LeftSide Switch Animate -->
            <div id="slideSpace" style="width: 25%; height: inherit; position: absolute;"></div>
            <div id="leftSide" class="col-md-4">
                <div id="leftSideSwitch">

                    <!-- Add anything with JS or Backend -->
                </div>
            </div>

            <div id="mapSide" class="col-md-8">
                <!-- /input-group -->
                <div id="autocomplete-group" class="input-group">
                    <input id="autocomplete" type="search" class="autocomplete form-control" placeholder="Search for..." value="">
                    <span class="searchclear glyphicon glyphicon-remove-circle"></span>
                </div>

                <div id="mapButton-group" class="btn-group" role="group" aria-label="...">
                    <button id="myLocation" type="button" class="btn btn-default">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%"
                            viewBox="0 0 480 480" style="enable-background: new 0 0 480 480;" xml:space="preserve">
                            <path style="fill-rule: evenodd; clip-rule: evenodd;" d="M240,159.909c-44.235,0-80.091,35.859-80.091,80.091
		                    s35.855,80.091,80.091,80.091c44.231,0,80.091-35.859,80.091-80.091S284.231,159.909,240,159.909z M400,226.667h-25.694
		                    c-6.267-63.891-57.086-114.701-120.973-120.967V80c0-7.363-5.97-13.333-13.333-13.333S226.667,72.637,226.667,80v25.701
		                    c-63.889,6.266-114.705,57.075-120.971,120.966H80c-7.363,0-13.333,5.97-13.333,13.333s5.97,13.333,13.333,13.333h25.696
		                    c6.266,63.891,57.082,114.7,120.971,120.966V400c0,7.363,5.97,13.333,13.333,13.333s13.333-5.97,13.333-13.333v-25.701
		                    c63.888-6.266,114.707-57.075,120.974-120.966H400c7.363,0,13.333-5.97,13.333-13.333S407.363,226.667,400,226.667z M240,347.669
		                    c-59.463,0-107.666-48.209-107.666-107.669S180.537,132.331,240,132.331c59.466,0,107.669,48.209,107.669,107.669
		                    S299.466,347.669,240,347.669z" />
                        </svg>
                    </button>
                </div>

                <div id="mapCanvas" style="height: inherit; margin-left: -15px; margin-right: -15px;"></div>
            </div>
        </div>
    </div>

    <!--Overlay Test-->
    <div id="overlay-login" class="popup">
        <span class="glyphicon glyphicon-remove popup-close" aria-hidden="true"></span>
        <div class="overlay-inner">
            <h2>Please Log-in to Post</h2>
            <br />
            <div class="fb-login-button" data-scope="user_likes,user_photos" onlogin='fbLoaded();' data-max-rows="1" data-size="large" data-show-faces="false" data-auto-logout-link="false"></div>
        </div>
    </div>

    <div id="overlay-maintenance" class="popup">
        <span class="glyphicon glyphicon-remove popup-close" aria-hidden="true"></span>
        <div class="overlay-inner" style="text-align: center">
            <h1>Page is Still on The Make</h1>
        </div>
    </div>

    <div id="myMessageDetailArea">
    </div>

</div>

    <!-- Junks put here -->
    <div id="exchange"></div>

    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script type="text/javascript" src="static/js/ajaxfileupload.js"></script>
    <script src="static/js/bootstrap.min.js"></script>

    <!--fancybox-->
    <script type="text/javascript" src="static/fancy-box/lib/jquery.mousewheel-3.0.6.pack.js"></script>
	<!-- Add fancyBox -->
	<link rel="stylesheet" href="static/fancy-box/source/jquery.fancybox.css?v=2.1.5" type="text/css" media="screen" />
	<script type="text/javascript" src="static/fancy-box/source/jquery.fancybox.pack.js?v=2.1.5"></script>

    <!--<script src="static/js/jquery.mousewheel.min.js"></script>-->
    <!--<script src="static/js/jquery.jscrollpane.min.js"></script>-->
    <script src="static/js/perfect-scrollbar.min.js"></script>
    <script src="static/js/customized.js"></script>
    <!--<script src="../../assets/js/docs.min.js"></script>-->
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <!--<script src="../../assets/js/ie10-viewport-bug-workaround.js"></script>-->

    <!--======================= Google Map Javascript   =======================-->
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCTmx_RgDS6MWl-MdyidKhpCKXMs3pV63Y&signed_in=false&v=3.exp&libraries=places"></script>
    <script src="static/js/richmarker-compiled.js"></script>
    <script src="static/js/map.js"></script>
    <script src="static/js/fb.js"></script>
</body>
</html>
