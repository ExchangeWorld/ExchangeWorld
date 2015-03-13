
function load_profile()
{
    //destroy the scroll
    //and reset the scroll by Noel
    $('#leftSide').perfectScrollbar('destroy');
    $("#leftSide").scrollTop(0);
    $("#leftSide").perfectScrollbar('update');
    $('#leftSide').perfectScrollbar(({
        suppressScrollX: true
    }));

    var hidegoback = false;
    console.log("owner!");
    //push previous stage to gobackStack
    if (currentStage != "userBtn") gobackStack.push(currentStage);
    //set currentStage to next stage, owner
    if (currentStage == "owner" && $(this).attr('data-value') == $("#profile").attr("data-value"))
    {
        //means that user looked at somebody's profile and check own profile, then this time we want to hide goback and reset the stack
        console.log("hidegoback!");
        hidegoback = true;
        gobackStack = [];
    }
    else if(currentStage == "owner")
    {
        gobackStack.pop()
    }
    currentStage = "owner";

    //if it's come back from following or follower
    if (gobackOwnerDataValue != 0)
    {
        val = gobackOwnerDataValue;
        // gobackOwnerDataValue = 0; <- fuck this fucking bug for f@#!$%@#%@
    }
    else
    {
        val = $(this).attr('data-value');
        gobackOwnerDataValue = val;
    }

    //Specialized for click user monkeys
    if(gobackOwnerDataValue != $(this).attr('data-value') && $(this).attr('data-value')!= null)
    {
        val = $(this).attr('data-value');
    }


    if (val != 0)
    {
        // Other's profiles
        if (hidegoback == false && val != $("#profile").attr("data-value"))
        {
            $.ajax({
                type: "GET",
                url: "./php_script/profile.php",
                dataType: "json",
                data: {
                    uid: val
                },
                success: function (response)
                {
                    $('#leftSideSwitch').hide(0).empty();
                    $('#leftSideSwitch').html('\
                        <div class="row" style="background-color: silver; padding-top: 0px; margin-top: 15px">\
                            <div class="col-md-3">\
                                <button id="goback" type="button" class="btn btn-default"><span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span> Go back</button>\
                            </div>\
                        </div>\
                        <div class="row" style="background-color: silver; padding-top: 0px; margin-top: 15px">\
                            <div class="col-md-5 fancybox" href="' + response[0]["photoPath"] + '"><img src="' + response[0]["photoPath"] + '" class="img-thumbnail" alt="..."></div>\
                            <div class="col-md-7">\
                                <ul class="list-group" style="font-size: 85%">\
                                    <li class="list-group-item">' + response[0]["username"] + '</li>\
                                    <li class="list-group-item">' + response[0]["email"] + '</li>\
                                </ul>\
                            </div>\
                        </div>\
                        <div class="row" style="background-color: silver; padding-top: 0px; margin-top: 10px; font-size: 70%">\
                            <div class="col-md-12">\
                                <ul class="nav nav-pills" role="tablist">\
                                    <li role="presentation" class="userBtn" data-value="' + response[0]["fb_id"] + '" id="add"><a href="#">Follow + </a></li>\
                                    <li role="presentation" class="active userBtn" id="following">\
                                        <a href="#">Following <span class="badge" id="bdgfollowing">' + response[1]["followingCount"] + '</span></a>\
                                    </li>\
                                    <li role="presentation" class="active userBtn" id="follower">\
                                        <a href="#">Follower <span class="badge" id="bdgfollower">' + response[2]["followerCount"] + '</span></a>\
                                    </li>\
                                    <li role="presentation" class="active fancybox" id="sendMessage" href="#messageTextarea"><a style="cursor:pointer; cursor:hand">Send message!</a> </li>\
                                </ul></ul>\
                            </div>\
                        </div>\
                        <div class="row" style="background-color: silver; padding-top: 0px; margin-top: 15px; font-size: 85%">').show(0);

                    // popup (send) messagebox
                    $('#leftSideSwitch').append('\
                            <div id="messageTextarea" class="form-group" style="display:none; width:400px;">\
                                To:\
                                <img class="circular" src="' + response[0]["photoPath"] + '" height="30" width="30" >' + '  ' + response[0]["username"] + '>\
                                <textarea class="form-control" id="message" name="send" rows="16" placeholder="Send some text...."></textarea>\
                                <img class="circular" src="' + $(" #myhead").attr('src') + '" style="width:60px;height:60px;margin-top:15px;">\
                                <button id="send" name="send" class="btn btn-danger userBtn btn-send">Send Message</button>\
                            </div> ');

                    //Handle Exchanging/Exchanged Tables
                    //Get Exchange Table(?) and represent in map
                    $.ajax({
                        type: "GET",
                        url: "./php_script/tables.php",
                        dataType: "json",
                        data: {
                            type: "myTables",
                            uid: val
                        },
                        success: function (response)
                        {
                            $('#leftSideSwitch').append('\
                                <div class="col-md-12" style="padding: 0px">\
                                    <div class="panel panel-info">\
                                        <div class="panel-heading">\
                                            <h3 class="panel-title">Exchanging</h3>\
                                        </div>\
                                        <div id="Exchanging" class="panel-body "></div>\
                                    </div>\
                                    <div class="panel panel-info" style="margin-top: 15px">\
                                        <div class="panel-heading">\
                                            <h3 class="panel-title">Exchanged</h3>\
                                        </div>\
                                        <div id="Exchanged" class="panel-body"></div>\
                                    </div>\
                                </div>');

                            for (var i = 0; i < response.length; i++)
                            {
                                if (response[i]["status"] == 0)
                                { // Exchanging
                                    $('#Exchanging').append('<div class="col-md-3 searchResult" style="padding: 0px; padding-top: 0px; padding-bottom: 0px; border: 0px; background: #fff; margin: 0px;" data-value="' + response[i]["gid"] + '"><img src="' + response[i]["photoPath"] + '"width="100" height="100" style="max-width: 100%; height: auto;" class="img-thumbnail" alt="..."></div>');
                                }
                                /*  else{
                                        If "status" != 0
                                        Then put into Exchanged Table
                                    } */
                            }
                        },
                        error: function (xhr, ajaxOption, thrownError)
                        {
                            alert('ERROR SECTION : Handle Exchanging/Exchanged Tables - other');
                            alert(thrownError);
                            alert(JSON.stringify(xhr));
                        }
                    });
                },
                error: function (xhr, ajaxOption, thrownError)
                {
                    alert('ERROR SECTION : Profiles - other');
                    alert(thrownError);
                    alert(JSON.stringify(xhr));
                }
            });
        }

        // my Profile
        else
        {
            $.ajax({
                type: "GET",
                url: "./php_script/profile.php",
                dataType: "json",
                data: {
                    uid: val
                },
                success: function (response)
                {
                    //alert('-'+val+'-');
                    $('#leftSideSwitch').hide(0).empty();
                    $('#leftSideSwitch').html('\
                        <div class="row" style="background-color: silver; padding-top: 0px; margin-top: 15px">\
                            <div class="col-md-5 fancybox" href="' + response[0]["photoPath"] + '"><img  src="' + response[0]["photoPath"] + '" class="img-thumbnail" alt="..."></div>\
                            <div class="col-md-7">\
                                <div style="margin-top:50px;">\
                                    <h2>' + response[0]["username"] + '</h2>\
                                </div>\
                            </div>\
                        </div>\
                        <div class="row" style="background-color: silver; padding-top: 0px; margin-top: 10px; font-size: 85%">\
                            <div class="col-md-12">\
                                <ul class="nav nav-pills" role="tablist">\
                                    <li role="presentation" class="userBtn" data-value="' + response[0]["fb_id"] + '" style="display:none" id="add"><a href="#">Follow + </a></li>\
                                    <li role="presentation" class="active  userBtn" id="following">\
                                        <a href="#">Following <span class="badge" id="bdgfollowing">' + response[1]["followingCount"] + '</span></a>\
                                    </li>\
                                    <li role="presentation" class="active  userBtn" id="follower">\
                                        <a href="#">Follower <span class="badge" id="bdgfollower">' + response[2]["followerCount"] + '</span></a>\
                                    </li>\
                                </ul>\
                            </div>\
                        </div>\
                        <div class="row" style="background-color: silver; padding-top: 0px; margin-top: 15px; font-size: 85%">').show(0);

                    //Handle Exchanging/Exchanged Tables
                    //Get Exchange Table(?) and represent in map
                    $.ajax({
                        type: "GET",
                        url: "./php_script/tables.php",
                        dataType: "json",
                        data: {
                            type: "myTables",
                            uid: val
                        },
                        success: function (response)
                        {
                            $('#leftSideSwitch').append('\
                                <div class="col-md-12" style="padding: 0px">\
                                    <div class="panel panel-info">\
                                        <div class="panel-heading">\
                                            <h3 class="panel-title">Exchanging</h3>\
                                        </div>\
                                        <div id="Exchanging" class="panel-body "></div>\
                                    </div>\
                                    <div class="panel panel-info" style="margin-top: 15px">\
                                        <div class="panel-heading">\
                                            <h3 class="panel-title">Exchanged</h3>\
                                        </div>\
                                        <div id="Exchanged" class="panel-body"></div>\
                                    </div>\
                                </div>');

                            for (var i = 0; i < response.length; i++)
                            {
                                if (response[i]["status"] == 0)
                                { // Exchanging
                                    $('#Exchanging').append('<div class="col-md-3 searchResult" style="padding: 0px; padding-top: 0px; padding-bottom: 0px; border: 0px; background: #fff; margin: 0px;" data-value="' + response[i]["gid"] + '"><img src="' + response[i]["photoPath"] + '" width="100" height="100" style="max-width: 100%; height: auto;" class="img-thumbnail" alt="..."></div>');
                                }
                                /*  else{
                                        If "status" != 0
                                        Then put into Exchanged Table
                                    } */
                            }
                        },
                        error: function (xhr, ajaxOption, thrownError)
                        {
                            alert('ERROR SECTION : Handle Exchanging/Exchanged Tables - my');
                            alert(thrownError);
                            alert(JSON.stringify(xhr));
                        }
                    });
                },
                error: function (xhr, ajaxOption, thrownError)
                {
                    alert('ERROR SECTION : Profile - my');
                    alert(thrownError);
                    alert(JSON.stringify(xhr));
                }
            });
        }
    }
}

$(document).ready(function ()
{
    // Handle load profile
    // Move to outside by Noel. To fit goback function QwQ
    $("body").on("click", ".owner", load_profile);

    // Handle userBtn click: Following, Follower, +Following
    $("body").on("click", ".userBtn", function (event)
    {
        console.log("userBtn!");
        console.log("previous stage is " + currentStage);
        gobackStack.push(currentStage);
        console.log(gobackStack);
        currentStage = "userBtn";
        
        //hidegoback has to be resetted
        hidegoback = false;

        var tagetID = $("#add").attr("data-value");  // get others' fb id
        var myID = $("#profile").attr("data-value"); // get my fb id
        var Type = $(this).attr("id");

        //destroy the scroll and reset the scroll by Noel
        $('#leftSide').perfectScrollbar('destroy');
        $("#leftSide").scrollTop(0);
        $("#leftSide").perfectScrollbar('update');
        $('#leftSide').perfectScrollbar(({
            suppressScrollX: true
        }));

        $.ajax({
            type: "GET",
            url: "./php_script/userBtn.php",
            dataType: "json",
            data: {
                tID: tagetID,
                type: Type,
                mID: myID,
                message: $("#message").val()
            },
            success: function (response)
            {
                if (Type == "following")
                {
                    console.log('get into following');
                    var v = $("#bdgfollowing").text();
                    $('#leftSideSwitch').hide(0).empty();
                    $('#leftSideSwitch').html('\
                    <div class="row" style="background-color: silver; padding-top: 0px; margin-top: 15px">\
                        <div class="col-md-3">\
                            <button id="goback" type="button" class="btn btn-default">\
                                <span class="glyphicon glyphicon-arrow-left" aria-hidden="true">\
                                </span>\
                                 Go back\
                            </button>\
                        </div>\
                    </div>\
                    <div class="row" style="background-color: silver; padding-top: 0px; margin-top: 15px">\
                        <div class="col-md-2">\
                            <h1 style="margin-top: 0px"><span class="glyphicon glyphicon-eye-open" aria-hidden="true" style="color: #04ACD9"></span></h1>\
                        </div>\
                        <div class="col-md-6">\
                            <h1 style="margin-top: 0px">Following</h1>\
                        </div>\
                        <div class="col-md-4">\
                            <h1 style="margin-top: 0px; color: #04ACD9">'+ v + '</h1>\
                        </div>\
                    </div>').show(0);
                    if (response == null); //$("#leftSideSwitch").append('No Result');
                    else
                    {
                        for (var i = 0; i < response.length; i++)
                        {
                            if (i == 0 || (i + 1) % 4 == 0)
                                $('#leftSideSwitch').append('<div class="row" style="background-color: silver; padding-top: 0px; margin-top: 15px">');

                            $('#leftSideSwitch').append('<div class="col-md-4 owner" data-value="' + response[i]["follower"] + '"><img class="img-thumbnail" alt=".." src="' + response[i]["owner_photo"] + '" style="width: 100%"></div>');

                            if ((i + 1) % 4 == 0)
                                $('#leftSideSwitch').append('</div>');
                        }
                    }
                    $('#leftSideSwitch').show(0);
                }
                else if (Type == "follower")
                {
                    console.log('get into follower');
                    var v = $("#bdgfollower").text();
                    $('#leftSideSwitch').hide(0).empty();
                    $('#leftSideSwitch').html('\
                    <div class="row" style="background-color: silver; padding-top: 0px; margin-top: 15px">\
                        <div class="col-md-3">\
                            <button id="goback" type="button" class="btn btn-default">\
                                <span class="glyphicon glyphicon-arrow-left" aria-hidden="true">\
                                </span>\
                                 Go back\
                            </button>\
                        </div>\
                    </div>\
                    <div class="row" style="background-color: silver; padding-top: 0px; margin-top: 15px">\
                        <div class="col-md-2">\
                            <h1 style="margin-top: 0px"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true" style="color: #04ACD9"></span></h1>\
                        </div>\
                        <div class="col-md-6">\
                            <h1 style="margin-top: 0px">Follower</h1>\
                        </div>\
                        <div class="col-md-4">\
                            <h1 style="margin-top: 0px; color: #04ACD9">' + v + '</h1>\
                        </div>\
                    </div>').show(0);
                    if (response == null); //$("#leftSideSwitch").append('No Result');
                    else
                    {
                        for (var i = 0; i < response.length; i++)
                        {
                            //Warpping line: 4 items a rows 
                            if (i == 0 || (i + 1) % 4 == 0) $('#leftSideSwitch').append('<div class="row" style="background-color: silver; padding-top: 0px; margin-top: 15px">');

                            $('#leftSideSwitch').append('<div class="col-md-4 owner" data-value="' + response[i]["myid"] + '"><img class="img-thumbnail" alt=".." src="' + response[i]["owner_photo"] + '" style="width: 100%"></div>');

                            //Warpping line
                            if ((i + 1) % 4 == 0) $('#leftSideSwitch').append('</div>');
                        }
                    }
                    $('#leftSideSwitch').show(0);
                }
                if (Type == "send")
                {
                    parent.$.fancybox.close();
                }
            },
            error: function (xhr, ajaxOption, thrownError)
            {
                alert('ERROR SECTION : userBtn');
                alert(thrownError);
                alert(JSON.stringify(xhr));
            }
        });
    });
});