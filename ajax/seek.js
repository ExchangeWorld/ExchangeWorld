var seekInnerHTML = '\
<div class="input-group" style="margin-top: 15px; margin-bottom: 10px">\
    <input id="searchName" type="text" class="form-control" placeholder="Seek anything">\
    <span class="input-group-btn"> <button id="searchString" class="btn btn-info seeking" type="button">Seek !</button> </span>\
</div>\
<div id="searchOptions" class="row">\
    <div class="col-md-12">\
        <div class="btn-group">\
            <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-expanded="true"> Distance <span class="caret"></span> </button>\
            <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">\
                <li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdownLocation">500m</a></li>\
                <li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdownLocation">1500m</a></li>\
                <li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdownLocation">5000m</a></li>\
                <li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdownLocation">10000m</a></li>\
            </ul>\
        </div>\
        <div class="btn-group">\
            <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-expanded="true"> Categories <span class="caret"></span> </button>\
            <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu2">\
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
</div><hr style="border-color: #6E6E6E; border-width: 2px">\
<div id="searchResults" class="col-md-12"> </div>';

function seek_query(search, query_type)
{
    var pX, pY;
    if (query_type == "location")
    {
        navigator.geolocation.getCurrentPosition(function (position)
        {
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
                success: function (response)
                {
                    if (response == null)
                    {
                        $("#searchResults").append("No Results!");
                    } else
                    {
                        for (var i = 0; i < response.length; i++)
                        {
                            //Left Side
                            $('#searchResults').append('\
                                <div class="row searchResult" data-value="' + response[i]["gid"] + '"> <div class="col-md-5"><img src="' + response[i]["photoPath"] + '" alt="..." class="img-rounded"></div>\
                                <div class="col-md-7 searchResultDescription">\
                                    <ul class="list-group">\
                                        <li class="list-group-item"> ' + response[i]["gname"] + '<span class="badge">' + response[i]["categories"] + '</span></li>\
                                        <li class="list-group-item">Wanted: ' + response[i]["want"] + '</li>\
                                        <li class="list-group-item"><img src="' + response[i]["owner_photo"] + '" height="20" width="20"> ' + response[i]["username"] + '></li>\
                                    </ul>\
                                </div>');

                            //Map Side
                            addMarkers(response[i]["posY"], response[i]["posX"], response[i]["photoPath"], response[i]["gid"]);
                        }
                        //fit the map bounds with search results
                        markersBounds();

                        $('.searchResult').hover(
                            function ()
                            {
                                $(this).addClass('searchResultSelected');
                            },
                            function ()
                            {
                                $(this).removeClass('searchResultSelected');
                            }
                        );

                        document.getElementById("post").className = "";
                        document.getElementById("about").className = "";
                        document.getElementById("help").className = "";
                        document.getElementById("seek").className = "active";
                    }
                },
                error: function (xhr, ajaxOption, thrownError)
                {
                    alert('ERROR SECTION : Seek query - location');
                    alert(thrownError);
                    alert(JSON.stringify(xhr));
                }

            });
        }, function ()
        {
            handleNoGeolocation(browserSupportFlag);
        });
    }
    else
    {
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
            success: function (response)
            {
                if (response == null)
                {
                    $("#searchResults").append("No Results!");
                } else
                {
                    for (var i = 0; i < response.length; i++)
                    {
                        //Left Side
                        $('#searchResults').append('\
                            <div class="row searchResult" data-value="' + response[i]["gid"] + '"> <div class="col-md-5"><img src="' + response[i]["photoPath"] + '" alt="..." class="img-rounded"></div>\
                            <div class="col-md-7 searchResultDescription">\
                                <ul class="list-group">\
                                    <li class="list-group-item"> ' + response[i]["gname"] + '<span class="badge">' + response[i]["categories"] + '</span></li>\
                                    <li class="list-group-item">Wanted: ' + response[i]["want"] + '</li>\
                                    <li class="list-group-item"><img src="' + response[i]["owner_photo"] + '" height="20" width="20"> ' + response[i]["username"] + '</li>\
                                </ul>\
                            </div>');

                        //Map Side
                        addMarkers(response[i]["posY"], response[i]["posX"], response[i]["photoPath"], response[i]["gid"]);
                    }
                    //fit the map bounds with search results
                    markersBounds();

                    $('.searchResult').hover(
                        function ()
                        {
                            $(this).addClass('searchResultSelected');

                            var gid = $(this).attr("data-value");
                            //$("div[data-gid='" + gid + "']").addClass('selected-item');
                        },
                        function ()
                        {
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
            error: function (xhr, ajaxOption, thrownError)
            {
                alert('ERROR SECTION : Seek query - non_location');
                alert(thrownError);
                alert(JSON.stringify(xhr));
            }
        });
    }
}


$(document).ready(function ()
{
    // Handle User clicking seek on navbar
    $("#seek").on("click", function (event)
    {
        console.log("seek!");
        //reset gobackStack
        gobackStack = [];
        //set currentStage to post
        currentStage = "seek";
        gobackOwnerDataValue = 0;

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

        if (map != null)
        {
            map.setOptions({ draggableCursor: 'default', draggingCursor: 'default' });
            google.maps.event.clearListeners(map, 'click');
        }
    });

    // Handle User clicking the specific goods.
    $("#leftSideSwitch").on("click", ".searchResult", load_exchange);

    // Handle Search by keywords
    $("#leftSideSwitch").on("click", ".seeking", function (event)
    {
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

        if (map != null)
        {
            map.setOptions({ draggableCursor: 'default', draggingCursor: 'default' });
            google.maps.event.clearListeners(map, 'click');
        }
    });

    // Handle Search by Categories
    $("#leftSideSwitch").on("click", ".dropdown", function (event)
    {
        $("#categories").text($(this).text() + ' ');
        $("#categories").append('<span class="caret"></span>');
        $(".btn:first-child").val($(this).text());

        if ($('#seek').attr("class") == "active")
        {
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

            if (map != null)
            {
                map.setOptions({ draggableCursor: 'default', draggingCursor: 'default' });
                google.maps.event.clearListeners(map, 'click');
            }
            $("#dropdownMenu2").text($(this).text() + ' ');
            $("#dropdownMenu2").append('<span class="caret"></span>');
            $(".btn:first-child").val($(this).text());
        }
    });

    // Handle Search by my Location
    $("#leftSideSwitch").on("click", ".dropdownLocation", function (event)
    {
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

        if (map != null)
        {
            map.setOptions({ draggableCursor: 'default', draggingCursor: 'default' });
            google.maps.event.clearListeners(map, 'click');
        }
        $("#dropdownMenu1").text($(this).text() + ' ');
        $("#dropdownMenu1").append('<span class="caret"></span>');
        $(".btn:first-child").val($(this).text());
    });

});