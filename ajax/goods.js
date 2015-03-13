var val ; //goodsID

function load_exchange(event)
{
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

    //for goback function dumb replace method ^^
    //when gobackSearchResultDataValueNeedToBeReplaced is false, going original way
    //if true, going tmp way
    if (gobackSearchResultDataValueNeedToBeReplaced == false)
    {
        val = $(this).attr('data-value');
    }
    else
    {
        val = gobackSearchResultDataValue;
        gobackSearchResultDataValueNeedToBeReplaced = false;
    }

    if (val != 0)
    {
        //for goback
        gobackSearchResultDataValue = val;

        $.ajax({
            type: "GET",
            url: "./php_script/exchange.php",
            dataType: "json",
            data: {
                gid: val
            },
            success: function (response)
            {
                //Left Side
                $('#leftSideSwitch').hide().empty();
                $('#leftSideSwitch').html('\
                <div class="row" style="background-color: silver; padding-top: 0px; margin-top: 15px">\
                    <div class="col-md-5">\
                        <button id="goback" type="button" class="btn btn-default"><span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span> Go back</button>\
                    </div>\
                    <div class="col-md-7">\
                        <input id="checkbox" type="checkbox" name="exchangeStatus" checked> \
                        <span id="removeGood" class="glyphicon glyphicon-remove" aria-hidden="true">\
                    </div>\
                </div>\
                <div class="row" style="background-color: silver; padding-top: 0px; margin-top: 15px">\
                    <div class="fancybox" href="' + response["photoPath"] + '" style="padding:15px"> <img src="' + response["photoPath"] + '" class="img-thumbnail" alt="..."> </div>\
                    <div style="padding:15px;padding-bottom:0px">\
                        <ul class="list-group" style="font-size: 85%;margin-bottom:0px">\
                            <li class="list-group-item">' + response["gname"] + '<span class="badge">' + response["categories"] + '</span></li>\
                            <li class="list-group-item">' + response["want"] + '</li>\
                            <li class="list-group-item owner" data-value="' + response["ownerID"] + '"><img src="' + response["owner_photo"] + '" height="20" width="20"> ' + response["username"] + '</li>\
                        </ul>\
                    </div>\
                </div>\
                <div class="row" style="background-color: silver; padding-top: 0px; margin-top: 15px; font-size: 85%">\
                    <div class="col-md-12">\
                        <div class="panel panel-info">\
                            <div class="panel-heading"><h3 class="panel-title">Description :</h3></div>\
                            <div class="panel-body">\
                                <p> ' + response["description"] + '\
                            </div>\
                        </div>\
                    </div>\
                </div>\
                <div class="row" style="background-color: silver; padding-top: 0px; margin-top: 15px; font-size: 85%">\
                    <div class="col-md-12">\
                        <div class="panel panel-info">\
                            <div class="panel-heading"><h3 class="panel-title">Comments :</h3></div>\
                            <div class="panel-body" style="padding-top:0px;">\
                                <div id="comment_area">\
                                    <ul class="list-group"> </ul>\
                                </div>\
                                <div class="form-group" style="margin-bottom: 0px; margin-top: 3px;">\
                                    <div class="input-group">\
                                        <input id="comment" name="comment" class="form-control" placeholder="..." type="text" style="height:42px">\
                                        <span class="input-group-addon">Add</span>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
                <div class="searchResults" style="background-color: silver; padding-top: 0px; margin-top: 15px; font-size: 85%">\
                ').show('fast');

                // Can't leave comment if not loggedin
                if (loggedInForPost == false) $("#comment").attr("disabled", "disabled");

                $("[name='exchangeStatus']").bootstrapSwitch();
                $("[name='exchangeStatus']").bootstrapSwitch('onText', 'Exchanging');
                $("[name='exchangeStatus']").bootstrapSwitch('offText', 'Exchanged');
                $("[name='exchangeStatus']").bootstrapSwitch('onColor', 'info');

                //can't change status / delete goods if not owner
                if (response["ownerID"] != $("#profile").attr("data-value"))
                {
                    $("[name='exchangeStatus']").bootstrapSwitch('readonly', true);
                    $("#removeGood").hide();
                }


                document.getElementById("comment").addEventListener("keydown", function (e)
                {
                    if (!e) { var e = window.event; }
                    //e.preventDefault(); // sometimes useful

                    // Enter is pressed  Handle comments
                    if (e.keyCode == 13 && $("#comment").val() != "")
                    {
                        var targetID = $("#profile").attr("data-value");
                        var comment = $("#comment").val();
                        $.ajax({
                            type: "GET",
                            url: "./php_script/comments.php",
                            dataType: "text",
                            data: {
                                type: "write",
                                gid: val,
                                mID: targetID,
                                Comment: comment
                            },
                            success: function (response)
                            {
                                $('#comment_area').append('<li class="list-group-item" style="padding: 5px; font-size:16px; background-color: #DAE5EA; margin-bottom:3px">\
                                                               <div style="word-wrap: break-word">' + response + '</div>\
                                                           </li>');

                                $("#comment").val('');

                            },
                            error: function (xhr, ajaxOption, thrownError)
                            {
                                alert('ERROR SECTION : if (e.keyCode == 13 && $("#comment").val() != "")');
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
                        type: "fetch",
                        gid: val
                    },
                    success: function (response)
                    {
                        if (response != null)
                        {
                            for (var i = 0; i < response.length; i++)
                            {
                                $('#comment_area').append('<li class="list-group-item" style="padding: 5px; font-size:16px; background-color: #DAE5EA; margin-bottom:3px">\
                                                                <div style="word-wrap: break-word">\
                                                                    <img class="owner" data-value="' + response[i]["commenter"] + '" src="' + response[i]["commenterPhoto"] + '" style="margin-right:5px;width: 30px; height: 30px; box-shadow: 2px 2px 11px 0px rgba(50, 50, 50, 0.36);">' + response[i]["comment"] + '\
                                                                </div>\
                                                           </li>');
                            }
                        }
                    },
                    error: function (xhr, ajaxOption, thrownError)
                    {
                        alert('ERROR SECTION : Handle Comments');
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
                        uid: val
                    },
                    success: function (response)
                    {
                        $('#leftSideSwitch').append('<div class="col-md-12" style="padding: 0px">\
                                                        <div class="panel panel-info">\
                                                            <div class="panel-heading"><h3 class="panel-title">You might also like ...</h3></div>\
                                                            <div class="panel-body" id="recommandTables"></div>\
                                                        </div>\
                                                     </div>');
                        for (var i = 0; i < 5; i++)
                        {
                            var min = 0;
                            var max = response.length - 1;
                            var xx = Math.floor(Math.random() * (max - min + 1) + min);
                            $('#recommandTables').append('<div class="col-md-3 searchResult" style="padding: 0px; padding-top: 0px; padding-bottom: 0px; border: 0px; background: #fff; margin: 0px;" data-value="' + response[xx]["gid"] + '">\
                                                            <img src="' + response[xx]["photoPath"] + '" width="100" height="100" style="max-width: 100%; height: auto;" class="img-thumbnail" alt="...">\
                                                          </div>');
                        }
                    },
                    error: function (xhr, ajaxOption, thrownError)
                    {
                        alert('ERROR SECTION : Handle Random Recommand Tables');
                        alert(thrownError);
                        alert(JSON.stringify(xhr));
                    }
                });

                //Map Side
                map.panTo(new google.maps.LatLng(response["posY"], response["posX"]));
                map.setZoom(17);
            },
            error: function (xhr, ajaxOption, thrownError)
            {
                alert('ERROR SECTION : Load Exchange');
                alert(thrownError);
                alert(JSON.stringify(xhr));
            }
        });
    }
}
$(document).ready(function ()
{
    //Handle delete post
    $("#leftSideSwitch").on("click", ".glyphicon-remove", function (event)
    {
        if (confirm('Are you sure you want to Delete this post?')) {
            $.ajax({
                type: "GET",
                url: "./php_script/removePost.php",
                dataType: "text",
                data: {
                    gid: val
                },
                success: function (response)
                {
                    $('#seek').click();
                },
                error: function (xhr, ajaxOption, thrownError)
                {
                    alert('ERROR SECTION : Handle delete');
                    alert(thrownError);
                    alert(JSON.stringify(xhr));
                }
            });
        } else {
            // Do nothing!
        }

    });
});
