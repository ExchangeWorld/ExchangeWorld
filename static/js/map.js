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

function addMarkers(lat, lng, img) {
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