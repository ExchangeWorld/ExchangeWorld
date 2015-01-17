var markers = [];
var marker;
var infowindow;
var map;

$(document).ready(function ()
{

    /*----------------Input Clear Button-----------------*/
    $(".autocomplete").keyup(function ()
    {
        $(this).next().toggle(Boolean($(this).val()));
    });
    $(".searchclear").toggle(Boolean($(".autocomplete").val()));
    $(".searchclear").click(function ()
    {
        $(this).prev().val('').focus();
        $(this).hide();
    });
    /*-------------------------------------------------*/
});

function initialize()
{
    var centerLocation = new google.maps.LatLng(24.9853919, 121.5865058);
    var noPOILabels = [
    {
        "featureType": "all",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#eaeaea"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry",
        "stylers": [
            {
                "weight": 0.9
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape.natural.landcover",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#83cead"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "saturation": "0"
            },
            {
                "lightness": "0"
            },
            {
                "color": "#515151"
            },
            {
                "weight": "0.40"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#fee379"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#fee379"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#222222"
            },
            {
                "weight": "0.50"
            },
            {
                "saturation": "0"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#7fc8ed"
            }
        ]
    }
    ];
    //]
    //[
    //    {
    //        featureType: "poi",
    //        elementType: "labels",
    //        stylers: [{ visibility: "off" }]
    //    }
    //];

    // Create a new StyledMapType object, passing it the array of styles,
    // as well as the name to be displayed on the map type control.
    var noPOIMapType = new google.maps.StyledMapType(noPOILabels, { name: "NO POI" });

    var mapProp = {
        center: new google.maps.LatLng(24.9853919, 121.5865058),
        zoom: 17,
        mapTypeControlOptions: { mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'no_poi'] },
        draggableCursor: 'default',
        draggingCursor: 'default',
        disableDoubleClickZoom: true,

        panControl: false,
        mapMaker: false,
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_TOP
        },

        streetViewControl: false,
        scaleControl: false,
        overviewMapControl: false,
        mapTypeControl: false
        //mapTypeId: google.maps.MapTypeId.ROADMAP,


    };
    //Associate the styled map with the MapTypeId and set it to display.


    naigvator();
    map = new google.maps.Map(document.getElementById("mapCanvas"), mapProp);

    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(document.getElementById('mapButton-group'));
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(document.getElementById('autocomplete-group'));
    map.mapTypes.set('no_poi', noPOIMapType);
    map.setMapTypeId('no_poi');

    autocomplete = new google.maps.places.Autocomplete(
      /** @type {HTMLInputElement} */(document.getElementById('autocomplete')), { bounds: map.getBounds() });

    google.maps.event.addListener(autocomplete, 'place_changed', function ()
    {
        console.log("Autocomplete");

        var place = autocomplete.getPlace();
        if (!place.geometry)
            return;

        if (place.geometry.viewport)
            map.fitBounds(place.geometry.viewport);
        else
        {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }
    });

    google.maps.event.addDomListener(document.getElementById('myLocation'), 'click', naigvator);

    google.maps.event.addListener(map, 'zoom_changed', function ()
    {
        var zoomLevel = map.getZoom();
        console.log('zoom_changed' + zoomLevel);

        if (zoomLevel >= 17)
        {
            resetMarkerSize();
        }
        else if (zoomLevel == 16)
        {
            $('.custom-marker').removeClass('custom-marker-112');
            $('.custom-marker').addClass('custom-marker-120');
        }
        else if (zoomLevel == 15)
        {
            $('.custom-marker').removeClass('custom-marker-120');
            $('.custom-marker').removeClass('custom-marker-104');
            $('.custom-marker').addClass('custom-marker-112');
        }
        else if (zoomLevel == 14)
        {
            $('.custom-marker').removeClass('custom-marker-112');
            $('.custom-marker').removeClass('custom-marker-96');
            $('.custom-marker').addClass('custom-marker-104');
        }
        else if (zoomLevel == 13)
        {
            $('.custom-marker').removeClass('custom-marker-104');
            $('.custom-marker').removeClass('custom-marker-88');
            $('.custom-marker').addClass('custom-marker-96');
        }
        else if (zoomLevel == 12)
        {
            $('.custom-marker').removeClass('custom-marker-96');
            $('.custom-marker').removeClass('custom-marker-80');
            $('.custom-marker').addClass('custom-marker-88');
        }
        else if (zoomLevel == 11)
        {
            $('.custom-marker').removeClass('custom-marker-88');
            $('.custom-marker').removeClass('custom-marker-72');
            $('.custom-marker').addClass('custom-marker-80');
        }
        else if (zoomLevel == 10)
        {
            $('.custom-marker').removeClass('custom-marker-80');
            $('.custom-marker').removeClass('custom-marker-64');
            $('.custom-marker').addClass('custom-marker-72');
        }
        else if (zoomLevel == 9)
        {
            $('.custom-marker').removeClass('custom-marker-72');
            $('.custom-marker').removeClass('custom-marker-56');
            $('.custom-marker').addClass('custom-marker-64');
        }
        else if (zoomLevel == 8)
        {
            $('.custom-marker').removeClass('custom-marker-64');
            $('.custom-marker').removeClass('custom-marker-48');
            $('.custom-marker').addClass('custom-marker-56');
        }
        else if (zoomLevel <= 7)
        {
            $('.custom-marker').removeClass('custom-marker-56');
            $('.custom-marker').addClass('custom-marker-48');
        }

    });
}
google.maps.event.addDomListener(window, 'load', initialize);


function handleNoGeolocation(errorFlag)
{
    if (errorFlag == true)
    {
        alert("Geolocation service failed.");
    } else
    {
        alert("Your browser doesn't support geolocation.");
    }
}

function naigvator()
{
    var browserSupportFlag = new Boolean();
    if (navigator.geolocation)
    {
        browserSupportFlag = true;
        navigator.geolocation.getCurrentPosition(function (position)
        {
            var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.setCenter(latlng);
            map.setZoom(17);
        }, function ()
        {
            handleNoGeolocation(browserSupportFlag);
        });
    }
    else
    { // Browser doesn't support Geolocation
        browserSupportFlag = false;
        handleNoGeolocation(browserSupportFlag);
    }
}

function postMarker(location, img)
{
    if (map == null)
        return;

    marker = new RichMarker({
        position: location,
        map: map,
        draggable: true,
        flat: true,
        anchor: RichMarkerPosition.MIDDLE,
        zIndex: 10,
        content: '<div class="custom-marker normal-item">' +
          '<span><img class="contained-image" src="' + img + '"/></span>' +
          '</div>'
    });
};

function moveMarker(location)
{
    if (marker == null)
        return;
    marker.setPosition(location);
};

function changeMarkerImage(img)
{
    if (marker == null)
        return;
    marker.setContent('<div class="custom-marker normal-item">' +
          '<span><img class="contained-image" src="' + img + '"/></span>' +
          '</div>')
}

function addMarkers(lat, lng, img, gid)
{
    if (lat > 90 || lat < -90 || lng > 180 || lng < -180)
    {
        console.log("Uncorrect Latlng");
        return;
    }

    markers.push(new RichMarker({
        position: new google.maps.LatLng(lat, lng),
        map: map,
        draggable: false,
        flat: true,
        anchor: RichMarkerPosition.MIDDLE,
        zIndex: markers.length,
        content: '<div class="custom-marker normal-item" data-gid="' + gid + '">' +
          '<span><img class="contained-image" src="' + img + '"/></span>' +
          '</div>'
    }));

    google.maps.event.addListener(markers[markers.length - 1], 'click', function ()
    {
        //destroy the scroll and reset the scroll 
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
        if (gobackSearchResultDataValueNeedToBeReplaced == false)
        {
            val = gid;
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
                    $('#leftSideSwitch').html('<div class="row" style="background-color: silver; padding-top: 0px; margin-top: 15px"> <div class="col-md-5"> <button id="goback" type="button" class="btn btn-default"><span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span> Go back</button> </div> <div class="col-md-7"> <input id="checkbox" type="checkbox" name="exchangeStatus" checked> </div></div><div class="row" style="background-color: silver; padding-top: 0px; margin-top: 15px"> <div class="col-md-5 fancybox" href="' + response["photoPath"] + '"> <img src="' + response["photoPath"] + '" class="img-thumbnail" alt="..."> </div> <div class="col-md-7"> <ul class="list-group" style="font-size: 85%"> <li class="list-group-item">' + response["gname"] + '<span class="badge">' + response["categories"] + '</span></li> <li class="list-group-item">Wanted : ' + response["want"] + '</li> <li class="list-group-item owner" data-value="' + response["ownerID"] + '"><img src="' + response["owner_photo"] + '" height="20" width="20"> ' + response["username"] + '</li> </ul> </div></div><div class="row" style="background-color: silver; padding-top: 0px; margin-top: 15px; font-size: 85%"> <div class="col-md-12"> <div class="panel panel-info"> <div class="panel-heading"> Description : </div> <div class="panel-body"> <p> ' + response["description"] + ' </div> </div> </div> </div> <div class="row" style="background-color: silver; padding-top: 0px; margin-top: 15px; font-size: 85%"> <div class="col-md-12"> <div class="panel panel-info"> <div class="panel-heading" style="font-size: 121%"> Comments : </div> <div class="panel-body" style="padding-top:0px;"> <div id="comment_area"> <ul class="list-group"> </ul> </div> <div class="form-group" style="margin-bottom: 0px; margin-top: 3px;"> <div class="input-group"> <span class="input-group-addon">Say</span><input id="comment" name="comment" class="form-control" placeholder="leave comment" type="text"> </div> </div> </div> </div> </div> </div> <div class="searchResults" style="background-color: silver; padding-top: 0px; margin-top: 15px; font-size: 85%">').show('fast');

                    $("[name='exchangeStatus']").bootstrapSwitch();
                    $("[name='exchangeStatus']").bootstrapSwitch('onText', 'Exchanging');
                    $("[name='exchangeStatus']").bootstrapSwitch('offText', 'Exchanged');
                    $("[name='exchangeStatus']").bootstrapSwitch('onColor', 'info');
                    if (response["ownerID"] != $("#profile").attr("data-value"))
                    {
                        $("[name='exchangeStatus']").bootstrapSwitch('readonly', true);
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
                                    $('#comment_area').append('<li class="list-group-item" style="padding: 5px; font-size:16px; background-color: #F4CDCD; margin-bottom:3px"><div style="word-wrap: break-word">' + response + '</div></li>');

                                    $("#comment").val('');

                                },
                                error: function (xhr, ajaxOption, thrownError)
                                {
                                    alert('ERROR SECTION : Enter is pressed  Handle comments (map side)');
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
                                    $('#comment_area').append('<li class="list-group-item" style="padding: 5px; font-size:16px; background-color: #F4CDCD; margin-bottom:3px"><div style="word-wrap: break-word"><img class="owner" data-value="' + response[i]["commenter"] + '" src="' + response[i]["commenterPhoto"] + '" style="margin-right:5px;width: 30px; height: 30px; box-shadow: 2px 2px 11px 0px rgba(50, 50, 50, 0.36);">' + response[i]["comment"] + '</div></li>');

                                }
                            }
                        },
                        error: function (xhr, ajaxOption, thrownError)
                        {
                            alert('ERROR SECTION : Handle comments (map side)');
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
                            $('#leftSideSwitch').append('<div class="col-md-12" style="padding: 0px"><div class="panel panel-info"><div class="panel-heading"><h3 class="panel-title">You might also like ...</h3></div><div class="panel-body" id="recommandTables"></div></div></div></div>');
                            for (var i = 0; i < 5; i++)
                            {
                                var min = 0;
                                var max = response.length - 1;
                                var xx = Math.floor(Math.random() * (max - min + 1) + min);
                                //alert(xx);
                                $('#recommandTables').append('<div class="col-md-3 searchResult" style="padding: 0px; padding-top: 0px; padding-bottom: 0px; border: 0px; background: #fff; margin: 0px;" data-value="' + response[xx]["gid"] + '"><img src="' + response[xx]["photoPath"] + '" width="100" height="100" style="max-width: 100%; height: auto;" class="img-thumbnail" alt="..."></div>');
                            }
                        },
                        error: function (xhr, ajaxOption, thrownError)
                        {
                            alert('ERROR SECTION : Random Recommand Tables (map side)');
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
                    alert('ERROR SECTION : Exchanges (map side)');
                    alert(thrownError);
                    alert(JSON.stringify(xhr));
                }
            });

        }

    });
}

function clearMarkers()
{
    for (var i = 0; i < markers.length; i++)
        markers[i].setMap(null);
    markers = [];
}

function resetMarkerSize()
{
    $('.custom-marker').removeClass('custom-marker-120');
    $('.custom-marker').removeClass('custom-marker-112');
    $('.custom-marker').removeClass('custom-marker-104');
    $('.custom-marker').removeClass('custom-marker-96');
    $('.custom-marker').removeClass('custom-marker-88');
    $('.custom-marker').removeClass('custom-marker-80');
    $('.custom-marker').removeClass('custom-marker-72');
    $('.custom-marker').removeClass('custom-marker-64');
    $('.custom-marker').removeClass('custom-marker-56');
    $('.custom-marker').removeClass('custom-marker-48');
}

function markersBounds()
{
    if (map == null)
        return;

    var leftBound = 180;
    var rightBound = -180;
    var topBound = -90;
    var bottomBound = 90;

    for (var i = 0; i < markers.length; i++)
    {
        var x = markers[i].getPosition().lng();
        var y = markers[i].getPosition().lat();

        if (x < leftBound)
            leftBound = x;
        if (x > rightBound)
            rightBound = x;

        if (y < bottomBound)
            bottomBound = y;
        if (y > topBound)
            topBound = y;
    }

    var sw = new google.maps.LatLng(bottomBound - 0.0006, leftBound - 0.0006);
    var ne = new google.maps.LatLng(topBound + 0.0006, rightBound + 0.0006);

    //map.panToBounds(new google.maps.LatLngBounds(sw, ne));
    map.fitBounds(new google.maps.LatLngBounds(sw, ne));
    //map.getBounds() .getNorthEast() / getSouthWest()
}

function getPostMarkerPosition()
{
    return [marker.getPosition().lat(), marker.getPosition().lng()];
}