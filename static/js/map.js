/// <reference path="google-maps-3-vs-1-0.js" />

var marker;
var map;
var centerLocation = new google.maps.LatLng(24.9853919, 121.5865058);
var defaultLaction;
var browserSupportFlag = new Boolean();

function initialize() {

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
        }, function () {
            handleNoGeolocation(browserSupportFlag);
        });
    }
    else { // Browser doesn't support Geolocation
        browserSupportFlag = false;
        handleNoGeolocation(browserSupportFlag);
    }
    map = new google.maps.Map(document.getElementById("mapCanvas"), mapProp);
    map.setCenter(centerLocation);
    addMarker(centerLocation);

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(document.getElementById('autocomplete-group'));
    autocomplete = new google.maps.places.Autocomplete(
      /** @type {HTMLInputElement} */(document.getElementById('autocomplete')), { boundbounds: map.getBounds() });

    google.maps.event.addListener(map, 'click', function (event) {
        if (marker == null)
            addMarker(event.latLng);
        else
            moveMarker(event.latLng);
    });
    google.maps.event.addListener(autocomplete, 'places_changed', function () { });
}

function handleNoGeolocation(errorFlag) {
    if (errorFlag == true) {
        alert("Geolocation service failed.");
        centerLocation = defaultLaction;
    } else {
        alert("Your browser doesn't support geolocation. We've placed you in Siberia.");
        centerLocation = defaultLaction;
    }
    map.setCenter(initialLocation);
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