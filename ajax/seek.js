var seekInnerHTML = '\
<div class="input-group" style="margin-bottom: 10px">\
    <input id="searchName" type="text" class="form-control" placeholder="Seek anything">\
    <span class="input-group-btn"> <button id="searchString" class="btn btn-info seeking" type="button">Seek !</button> </span>\
</div>\
<div id="searchOptions" class="row">\
    <div class="col-md-12">\
        <div class="btn-group">\
            <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-expanded="true"> Distance <span class="caret"></span> </button>\
            <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">\
                <li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdownLocation">Unlimited</a></li>\
                <li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdownLocation">500m</a></li>\
                <li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdownLocation">1500m</a></li>\
                <li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdownLocation">5000m</a></li>\
                <li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdownLocation">10000m</a></li>\
            </ul>\
        </div>\
        <div class="btn-group">\
            <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-expanded="true"> Categories <span class="caret"></span> </button>\
            <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu2">\
                <li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="dropdown">All</a></li>\
                <li role="presentation" class="divider"></li>\
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
        <div id="resultStats" style="font-size: small"></div>\
    </div>\
</div><hr style="border-color: #6E6E6E; border-width: 2px">\
<div id="searchResults" class="col-md-12"> </div>';

function seek_query(keywords, area, cate)
{
    var pX, pY;
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
                px: pX,
                py: pY,
                Keyword: keywords,
                range:area,
                categories:cate
            },
            success: function (response)
            {
                $("#resultStats").empty();
                var stats1='', stats2='', stats3='';
                if(keywords != "")                       stats1 = "\""+keywords+"\"";
                if(cate.search("Categories") == -1 && cate != "") stats2 = "\""+cate+"\"";
                if(area.search("Distance") == -1 && area != "")   stats3 = "\""+area+"\"";
                $("#resultStats").append(stats1+' '+stats2+' '+stats3);

                if (response == null)
                {
                    $("#searchResults").append("No Results!");
                }
                else
                {
                    for (var i = 0; i < response.length; i++)
                    {
                        // Highlight Keywords in results
                        var gname = response[i]["gname"];
                        if(keywords != ""){
                            keywords = keywords.replace(/(\s+)/,"(<[^>]+>)*$1(<[^>]+>)*");
                            var pattern = new RegExp("("+keywords+")", "gi");

                            gname = gname.replace(pattern, "<mark>$1</mark>");
                            gname = gname.replace(/(<mark>[^<>]*)((<[^>]+>)+)([^<>]*<\/mark>)/,"$1</mark>$2<mark>$4");
                        }

                        //Left Side
                        $('#searchResults').append('\
                            <div class="row searchResult" data-value="' + response[i]["gid"] + '" data-order="'+i+'"> <div class="col-md-5"><img src="' + response[i]["photoPath"] + '" alt="..." class="img-rounded"></div>\
                            <div class="col-md-7 searchResultDescription">\
                                <ul class="list-group">\
                                    <li class="list-group-item">​<span class="glyphicon glyphicon-arrow-left"> </span> ' + gname + '<span class="badge">' + response[i]["categories"] + '</span></li>\
                                    <li class="list-group-item">​<span class="glyphicon glyphicon-arrow-right"> </span> ' + response[i]["want"] + '</li>\
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
                            var tmpMarker = markers[$(this).data("order")];
                            console.log($(this).data("order"));
                            mapOverlay = new markerDetailOverlayview(tmpMarker,tmpMarker.img);
                        },
                        function ()
                        {
                            $(this).removeClass('searchResultSelected');
                            if(mapOverlay!==null)
                              mapOverlay.onRemove();
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

        if(mapOverlay!==null)
          mapOverlay.onRemove();

        //Loading next leftSide to display
        $('#leftSideSwitch').fadeOut("fast",function()
        {
            //destroy the scroll
            //and reset the scroll by Noel
            $('#leftSide').perfectScrollbar('destroy');
            $("#leftSide").scrollTop(0);
            $("#leftSide").perfectScrollbar('update');
            $('#leftSide').perfectScrollbar(({
                suppressScrollX: true
            }));
            $('#leftSideSwitch').html(seekInnerHTML);

            //handle search bar ENTER pressed.
            document.getElementById("searchName").addEventListener("keydown", function (e)
            {
                if (!e) { var e = window.event; }

                // Enter is pressed
                if (e.keyCode == 13 && $("#searchName").val() != "")
                {
                    $("#searchString").click();
                }
            }, false);


            seek_query("","","");
        });


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

        $('#leftSideSwitch').fadeIn("fast");

    });

    // Handle User clicking the specific goods.
    $("#leftSideSwitch").on("click", ".searchResult", load_exchange);

    // Handle Search by keywords
    $("#leftSideSwitch").on("click", "#searchString", function (event)
    {
        var keywords = $("#searchName").val();
        var range = $("#dropdownMenu1").text();
        var cat = $("#dropdownMenu2").text();
        cat = cat.substring(0, cat.length - 1);

        $('#searchResults').empty();
        seek_query(keywords, range, cat);

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
        var keywords = $("#searchName").val();
        var range = $("#dropdownMenu1").text();
        var cat = $(this).text();

        $("#categories").text($(this).text() + ' ');
        $("#categories").append('<span class="caret"></span>');
        $(".btn:first-child").val($(this).text());

        if ($('#seek').attr("class") == "active")
        {
            $('#searchResults').empty();
            seek_query(keywords, range, cat);

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
        var keywords = $("#searchName").val();
        var range = $(this).text();
        var cat = $("#dropdownMenu2").text();
        cat = cat.substring(0, cat.length - 1);

        //alert(range+"mmmmmmmmm"+'---CCCC'+cat+'sssss---'+keywords+'---');
        $('#searchResults').empty();
        seek_query(keywords, range, cat);

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
