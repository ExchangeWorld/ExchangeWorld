$(document).ready(function () {
    $.ajaxSetup({ cache: true });
    $.getScript('//connect.facebook.net/en_UK/all.js', function () {
        FB.init({
            appId: FacebookAppId,                        // App ID from the app dashboard
            cookie: true,                                // Allowed server-side to fetch fb auth cookie
            status: true,                                // Check Facebook Login status
            xfbml: true,                                 // Look for social plugins on the page
            version: 'v2.2'
        });

        // Additional initialization code such as adding Event Listeners goes here
        $("#myname").hide();
        fbLoaded();
    });

    // define the action when user clicked the login button.
    $("#logout").click(function () {
        FB.logout();
        $("#myname").hide();
        $("#login").show();

        loggedInForPost = false;

        // Back to Seek
        $("#seek").trigger("click");
    });
});

function fbLoaded() {
    FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
            // the user is logged in and has authenticated your
            // app, and response.authResponse supplies
            // the user's ID, a valid access token, a signed
            // request, and the time the access token
            // and signed request each expire
            fetch_my_profile();

            var uid = response.authResponse.userID;
            $("#profile").attr('data-value', uid);

            FB.api('/me/picture?width=250', function (response) {
                my_picture_url = response.data.url;
                $("#myhead").attr('src', my_picture_url);
            });
            FB.api('/me', function (response) {
                if($("#myname").text().search(response.name) == -1)
                    $("#myname").append(response.name);
            });
            $("#myname").show();
            $("#login").hide();

            loggedInForPost = true;

            // Back to Seek
            $("#seek").trigger("click");
        } else if (response.status === 'not_authorized') {
            console.log("not_authorized");
            // the user is logged in to Facebook,
            // but has not authenticated your app
        } else {
            // the user isn't logged in to Facebook.
            $("#myname").hide();
            $("#login").show();

            loggedInForPost = false;
        }
    });
};

function fetch_my_profile() {
    var my_name;
    var my_gender;
    var my_email;
    var my_facebook_id;
    var my_picture_url;

    FB.api('/me/picture?width=250', function (response) {
        my_picture_url = response.data.url;
        $("#my-profile-picture").attr('src', my_picture_url);
    });
    FB.api('/me', function (response) {
        my_name = response.name;
        my_gender = response.gender;
        //var my_email = response.email;
        my_facebook_id = response.id;

        $.ajax({
            type: "GET",
            url: "./php_script/createAccount.php",
            dataType: "text",
            data: {
                name: my_name,
                gender: my_gender,
                // my_email : response.email,
                facebook_id: my_facebook_id,
                picture_url: my_picture_url
            },
            success: function (response) {
                console.log(response);
                //    alert(response);
            },
            error: function (xhr, ajaxOption, thrownError) {
                alert(thrownError);
                alert(JSON.stringify(xhr));
            }
        });
    });
};

function fbLoginPrompt() {

}