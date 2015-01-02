/// <reference path="google-maps-3-vs-1-0.js" />

var marker;
var infowindow;
var map;

$(document).ready(function () {
    $(".autocomplete").keyup(function () {
        $(this).next().toggle(Boolean($(this).val()));
    });
    $(".searchclear").toggle(Boolean($(".autocomplete").val()));
    $(".searchclear").click(function () {
        $(this).prev().val('').focus();
        $(this).hide();
    });
});

function initialize() {
    var centerLocation = new google.maps.LatLng(24.9853919, 121.5865058);
    var browserSupportFlag = new Boolean();
    var mapProp = {
        //center: new google.maps.LatLng(24.9853919, 121.5865058),
        zoom: 17,
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
    if (navigator.geolocation) {
        browserSupportFlag = true;
        navigator.geolocation.getCurrentPosition(function (position) {
            centerLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.setCenter(centerLocation);
            addMarker(centerLocation);
        }, function () {
            handleNoGeolocation(browserSupportFlag);
            addMarker(centerLocation);
        });
    }
    else { // Browser doesn't support Geolocation
        browserSupportFlag = false;
        handleNoGeolocation(browserSupportFlag);
    }
    map = new google.maps.Map(document.getElementById("mapCanvas"), mapProp);

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(document.getElementById('autocomplete-group'));
    autocomplete = new google.maps.places.Autocomplete(
      /** @type {HTMLInputElement} */(document.getElementById('autocomplete')), { bounds: map.getBounds() });

    google.maps.event.addListener(map, 'click', function (event) {
        if (marker == null)
            addMarker(event.latLng);
        else
            moveMarker(event.latLng);
    });
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        console.log("Autocomplete");
        //infowindow.close();
        marker.setVisible(false);

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

        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
    });
}

function handleNoGeolocation(errorFlag) {
    if (errorFlag == true) {
        alert("Geolocation service failed.");
    } else {
        alert("Your browser doesn't support geolocation.");
    }
}

function addMarker(location) {
    //var image = {
    //  url: place.icon,
    //  size: new google.maps.Size(71, 71),
    //  origin: new google.maps.Point(0, 0),
    //  anchor: new google.maps.Point(17, 34),
    //  scaledSize: new google.maps.Size(25, 25)
    //};

    marker = new google.maps.Marker({
        position: location,
        map: map,
        draggable: true,
        //icon: image,
        animation: google.maps.Animation.DROP,
        //title: 'Hello World!'
    });

    marker.setMap(map);
};
function moveMarker(location) {
    marker.setPosition(location);
};

google.maps.event.addDomListener(window, 'load', initialize);

