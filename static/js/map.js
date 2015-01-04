/// <reference path="google-maps-3-vs-1-0.js" />
/// <reference path="richmarker-compiled.js" />

var markers = [];
var marker;
var infowindow;
var map;

$(document).ready(function () {
    /*----------------Input Clear Button-----------------*/
    $(".autocomplete").keyup(function () {
        $(this).next().toggle(Boolean($(this).val()));
    });
    $(".searchclear").toggle(Boolean($(".autocomplete").val()));
    $(".searchclear").click(function () {
        $(this).prev().val('').focus();
        $(this).hide();
    });
    /*-------------------------------------------------*/
});

function initialize() {
    var centerLocation = new google.maps.LatLng(24.9853919, 121.5865058);
    var browserSupportFlag = new Boolean();
    var mapProp = {
        center: new google.maps.LatLng(24.9853919, 121.5865058),
        zoom: 17,
        draggableCursor: 'default',
        disableDoubleClickZoom: false,

        panControl: false,
        mapMaker:false,
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_TOP
        },

        streetViewControl: false,
        scaleControl: false,
        overviewMapControl: false,
        mapTypeControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // Try W3C Geolocation (Preferred)
    //if (navigator.geolocation) {
    //    browserSupportFlag = true;
    //    navigator.geolocation.getCurrentPosition(function (position) {
    //        centerLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    //        map.setCenter(centerLocation);
    //        //addMarker(centerLocation);
    //    }, function () {
    //        handleNoGeolocation(browserSupportFlag);
    //        addMarker(centerLocation);
    //    });
    //}
    //else { // Browser doesn't support Geolocation
    //    browserSupportFlag = false;
    //    handleNoGeolocation(browserSupportFlag);
    //}
    map = new google.maps.Map(document.getElementById("mapCanvas"), mapProp);

    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(document.getElementById('mapButton-group'));
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(document.getElementById('autocomplete-group'));
    autocomplete = new google.maps.places.Autocomplete(
      /** @type {HTMLInputElement} */(document.getElementById('autocomplete')), { bounds: map.getBounds() });

    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        console.log("Autocomplete");
        //infowindow.close();
        //marker.setVisible(false);

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

        //moveMarker(place.geometry.location);
        //marker.setVisible(true);
    });
    google.maps.event.addDomListener(document.getElementById('myLocation'), 'click', naigvator);
}
google.maps.event.addDomListener(window, 'load', initialize);


function handleNoGeolocation(errorFlag) {
    if (errorFlag == true) {
        alert("Geolocation service failed.");
    } else {
        alert("Your browser doesn't support geolocation.");
    }
}

function naigvator() {
    if (navigator.geolocation) {
        browserSupportFlag = true;
        navigator.geolocation.getCurrentPosition(function (position) {
            var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.setCenter(latlng);
            map.setZoom(17);
            //addMarker(centerLocation);
        }, function () {
            handleNoGeolocation(browserSupportFlag);
        });
    }
    else { // Browser doesn't support Geolocation
        browserSupportFlag = false;
        handleNoGeolocation(browserSupportFlag);
    }
}

function postMarker(location) {

    marker = new RichMarker({
        position: location,
        map: map,
        draggable: true,
        flat: false,
        anchor: RichMarkerPosition.MIDDLE,
        zIndex: 168,
        content: '<div class="custom-marker normal-item">'+
          '<span><img class="contained-image" src="images/database/monkey.jpg"/></span>' +
          '</div>'
    });
};

function postMarker(location, img) {
    marker = new RichMarker({
        position: location,
        map: map,
        draggable: true,
        flat: false,
        anchor: RichMarkerPosition.MIDDLE,
        zIndex: 168,
        content: '<div class="custom-marker normal-item">' +
          '<span><img class="contained-image" src="' + img + '"/></span>' +
          '</div>'
    });
};

function moveMarker(location) {
    marker.setPosition(location);
};

function addMarkers(lat, lng, img, gid) {
    if (lat > 90 || lat < -90 || lng > 180 || lng < -180) {
        console.log("Uncorrect Latlng");
        return;
    }

    markers.push(new RichMarker({
        position: new google.maps.LatLng(lat, lng),
        map: map,
        draggable: false,
        flat: false,
        anchor: RichMarkerPosition.MIDDLE,
        zIndex: markers.length,
        content: '<div class="custom-marker normal-item">' +
          '<span><img class="contained-image" src="' + img + '"/></span>' +
          '</div>'
    }));

    google.maps.event.addListener(markers[markers.length - 1], 'click', function() {
        //destroy the scroll 
        $('#leftSide').perfectScrollbar('destroy');

        console.log("exchange!" + ", and gobackSearchResultDataValue is: " + gobackSearchResultDataValue);
        //push previous stage to gobackStack, but have to check if come from owner page, if so, have to not push
        if (currentStage == "seek") gobackStack.push(currentStage);
        //set currentStage to next stage, exchange
        currentStage = "exchange";

        //for goback function
        //dumb replace method ^^ when gobackSearchResultDataValueNeedToBeReplaced is false, going original way
        //if true, going tmp way
        if (gobackSearchResultDataValueNeedToBeReplaced == false) {
            val = gid;
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
                    $('#leftSideSwitch').html('<div class="row" style="background-color: silver; padding-top: 0px; margin-top: 15px"><div class="col-md-3"><button id="goback" type="button" class="btn btn-default"><span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span> Go back</button></div></div><div class="row" style="background-color: silver; padding-top: 0px; margin-top: 15px"><div class="col-md-5"><img src="' + response["photoPath"] + '" class="img-thumbnail" alt="..."></div><div class="col-md-7"><ul class="list-group" style="font-size: 70%"><li class="list-group-item">Name : ' + response["gname"] + '</li><li class="list-group-item">Genre : ' + response["categories"] + '</li><li class="list-group-item">Wanted : ' + response["want"] + '</li><li class="list-group-item owner" data-value="' + response["ownerID"] + '">Owner : ' + response["username"] + '</li></ul></div></div><div class="row" style="background-color: silver; padding-top: 0px; margin-top: 5px; font-size: 85%"><div class="col-md-12"><div class="panel panel-default"><div class="panel-heading">Description : </div><div class="panel-body"><p>Description content~</p><p>.</p><p>.</p></div></div></div></div><div class="row" style="background-color: silver; padding-top: 0px; margin-top: 15px; font-size: 70%"><div class="col-md-12"><div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">You might also check ...</h3></div><div class="panel-body"><div class="col-md-3"><img src="static/img/alt.gif" class="img-thumbnail" alt="..."></div><div class="col-md-3"><img src="static/img/alt.gif" class="img-thumbnail" alt="..."></div><div class="col-md-3"><img src="static/img/alt.gif" class="img-thumbnail" alt="..."></div><div class="col-md-3"><img src="static/img/alt.gif" class="img-thumbnail" alt="..."></div></div></div></div></div>').show('fast');

                    //Map Side
                    map.setCenter(new google.maps.LatLng(response["posY"], response["posX"]));

                },
                error: function (xhr, ajaxOption, thrownError) {
                    alert(thrownError);
                    alert(JSON.stringify(xhr));
                }
            });
        }

    });
}

function clearMarkers() {
    for (var i = 0; i < markers.length; i++) 
        markers[i].setMap(null);
    markers = [];
}

function markersBounds() {
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

    var sw = new google.maps.LatLng(bottomBound - 0.1, leftBound - 0.1);
    var ne = new google.maps.LatLng(topBound + 0.1, rightBound + 0.1);

    //map.panToBounds(new google.maps.LatLngBounds(sw, ne));
    map.fitBounds(new google.maps.LatLngBounds(sw, ne));
    //map.getBounds() .getNorthEast() / getSouthWest()
}

function getPostMarkerPosition()
{
    return [marker.getPosition().lat(), marker.getPosition().lng()];
}