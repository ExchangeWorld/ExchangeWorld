var postInnerHTML = '\
<div class="panel panel-primary" style="margin-bottom:10px">\
    <div class="panel-heading" style="padding-top:5px; padding-bottom:5px">\
        <span class="glyphicon glyphicon-ok-sign" aria-hidden="true"></span> What do you have?\
    </div>\
</div>\
<div class="row postGroup">\
    <div class="col-md-4" style="text-align: right">\
        Name\
    </div>\
    <div class="col-md-8" style="">\
        <div class="form-group">\
            <input id="gName" name="gName" class="form-control" required="" type="text">\
        </div>\
    </div>\
</div>\
<div class="row postGroup">\
    <div class="col-md-4" style="text-align: right">\
        Categories\
    </div>\
    <div class="col-md-8" style="margin-bottom:15px;">\
        <div class="btn-group" style="min-width:50px">\
            <button class="btn btn-default dropdown-toggle" type="button" id="categories" data-toggle="dropdown" aria-expanded="true" value="Select..." style="text-align:left;min-width:50px">\
                <span class="caret">\
                </span>\
            </button>\
            <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu2" style="width:100%">\
                <li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdown">Books</a></li>\
                <li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdown">Textbooks</a></li>\
                <li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdown">Magazine</a></li>\
                <li role="presentation" class="divider"></li>\
                <li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdown">Movies</a></li>\
                <li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdown">Music CD</a></li>\
                <li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdown">Video Game</a></li>\
                <li role="presentation" class="divider"></li>\
                <li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdown">Smart Phone</a></li>\
                <li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdown">Tablet</a></li>\
                <li role="presentation" class="divider"></li>\
                <li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdown">Camera</a></li>\
                <li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdown">Audio</a></li>\
                <li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdown">Computer Hardware</a></li>\
                <li role="presentation" class="divider"></li>\
                <li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdown">Jewelry</a></li>\
                <li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdown">Clothing</a></li>\
                <li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdown">Shoes</a></li>\
                <li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdown">Watches</a></li>\
                <li role="presentation" class="divider"></li>\
                <li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdown">Furniture</a></li>\
                <li role="presentation" class="divider"></li>\
                <li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdown">Others</a></li>\
            </ul>\
        </div>\
    </div>\
</div>\
<div class="row postGroup">\
    <div class="col-md-4" style="text-align: right">\
        Description\
    </div>\
    <div class="col-md-8" style="margin-bottom:15px">\
        <div class="form-group" style="margin-bottom:0px"> <textarea class="form-control" id="description" rows="5" name="description" style="resize:none"></textarea> </div>\
    </div>\
</div>\
<div class="row postGroup">\
    <div class="col-md-4" style="text-align: right">\
        Upload photo\
    </div>\
    <div class="col-md-8" style="margin-bottom:15px">\
        <form id="uploadForm" action="./php_script/upload.php" method="post" enctype="multipart/form-data">\
            <div id="targetLayer"> </div>\
            <div id="uploadFormLayer">\
                <input id="imgUpload" name="userImage" class="inputFile" type="file" accept="image/*">\
                <img id="photo_preview" width="200" src="#" alt=" " style="display: none" />\
                <input id="submit" value="Submit" class="btnSubmit" type="submit">\
            </div>\
        </form>\
    </div>\
</div>\
<div id="goods_photo" data-value="TestSRC" ></div>\
<div class="row postGroup">\
    <div class="col-md-4" style="text-align: right">\
        Locate\
    </div>\
    <div class="col-md-8" style="margin-bottom:15px">\
        Mark on the map with your cursor!\
    </div>\
</div>\
<div class="panel panel-primary" style="margin-bottom:10px">\
    <div class="panel-heading" style="padding-top:5px; padding-bottom:5px">\
        <span class="glyphicon glyphicon-heart" aria-hidden="true"></span> What do you want?\
    </div>\
</div>\
<div class="row postGroup">\
    <div class="col-md-4" style="text-align: right">\
        Name\
    </div>\
    <div class="col-md-8">\
        <div class="form-group" style="margin-bottom:15px;">\
            <input id="want_name" name="want_name" class="form-control" type="text">\
        </div>\
    </div>\
</div>\
<div class="row postGroup">\
    <div class="form-group">\
        <div class="col-md-4">\
        </div>\
        <div class="col-md-6">\
            <button id="submit" name="submit" class="submit" style="padding:0px; border:none; background-color: silver">\
                <h2 style="margin:10px; margin-left:0px">\
                    <span class="label label-danger">Post!</span>\
                </h2>\
            </button>\
        </div>\
        <label class="col-md-2 control-label" for="submit"></label>\
    </div>\
</div>';


function readURL(input)
{
    if (input.files && input.files[0])
    {
        var reader = new FileReader();
        reader.onload = function (e)
        {
            $('#photo_preview').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function load_post()
{
    if (loggedInForPost == false)
    {
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

    $('#leftSideSwitch').fadeOut("slow",function()
    {
        //destroy the scroll
        //and reset the scroll by Noel
        $('#leftSide').perfectScrollbar('destroy');
        $("#leftSide").scrollTop(0);
        $("#leftSide").perfectScrollbar('update');
        $('#leftSide').perfectScrollbar(({
            suppressScrollX: true
        }));

        $("#leftSideSwitch").html(postInnerHTML);
        $('#submit').hide(0);
        $("#goods_photo").hide(0);
        $('#leftSideSwitch').fadeIn("slow");
    });

    console.log("post!");
    //reset gobackStack
    gobackStack = [];
    //set currentStage to post
    currentStage = "post";

    $(document).on('change', '#imgUpload', function ()
    {
        $("#uploadForm").submit();
        console.log("photo uploaded!");
        // check FormData and ajax ..
    });

    $("#uploadForm").on("submit", function (e)
    {
        e.preventDefault();
        $.ajax({
            url: "./php_script/upload.php",
            type: "POST",
            data: new FormData(this),
            contentType: false,
            cache: false,
            processData: false,
            success: function (data)
            {
                $("#targetLayer").html(data);
            },
            error: function ()
            {
                alert('"#uploadForm" on "submit" ERROR!');
            }
        });
    });

    $("#imgUpload").change(function ()
    {
        readURL(this);
        $('#photo_preview').show(0);
        changeMarkerImage($("#goods_photo").attr('data-value'));
        $("#goods_photo").show(0);
    });

    document.getElementById("seek").className = "";
    document.getElementById("post").className = "active";
    document.getElementById("about").className = "";
    document.getElementById("help").className = "";

    //Google Map Setting
    //map.setOptions({draggableCursor: 'default'});
    map.setOptions({ draggableCursor: 'crosshair', draggingCursor: 'crosshair' });
    google.maps.event.addListener(map, 'click', function (event)
    {
        if (marker == null)
            postMarker(event.latLng, $("#goods_photo").attr('data-value'));
        else
            moveMarker(event.latLng, $("#goods_photo").attr('data-value'));

    });

}


$(document).ready(function ()
{
    // Handle User clicking POST on navbar
    $('#post').click(load_post);

    // Handle new post
    $("#leftSideSwitch").on("click", ".submit", function (event)
    {
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
        else
        {
            var X = marker.getPosition().lng();
            var Y = marker.getPosition().lat();
        }

        if (marker != null && post_categories != "")
        {
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
                success: function (response)
                {
                    console.log(response);
                    console.log("POST success");
                    marker.setDraggable(false);
                    $('#seek').trigger("click");
                },
                error: function (xhr, ajaxOption, thrownError)
                {
                    alert('ERROR SECTION : submit post');
                    alert(thrownError);
                    alert(JSON.stringify(xhr));
                }
            });
        }
    });

});
