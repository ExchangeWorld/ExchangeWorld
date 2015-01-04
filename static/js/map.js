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
        //center: new google.maps.LatLng(24.9853919, 121.5865058),
        zoom: 17,
        draggableCursor: 'crosshair',

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
    //map.setOptions({draggableCursor: default});

    // Try W3C Geolocation (Preferred)
    if (navigator.geolocation) {
        browserSupportFlag = true;
        navigator.geolocation.getCurrentPosition(function (position) {
            centerLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.setCenter(centerLocation);
            //addMarker(centerLocation);
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

        moveMarker(place.geometry.location);
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
    //    '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="480px" height="480px" viewBox="0 0 480 480" style="enable-background:new 0 0 480 480;" xml:space="preserve">'+
	//'<path style="fill-rule:evenodd;clip-rule:evenodd;" d="M240,159.909c-44.235,0-80.091,35.859-80.091,80.091s35.855,80.091,80.091,80.091c44.231,0,80.091-35.859,80.091-80.091S284.231,159.909,240,159.909z M400,226.667h-25.694c-6.267-63.891-57.086-114.701-120.973-120.967V80c0-7.363-5.97-13.333-13.333-13.333S226.667,72.637,226.667,80v25.701c-63.889,6.266-114.705,57.075-120.971,120.966H80c-7.363,0-13.333,5.97-13.333,13.333s5.97,13.333,13.333,13.333h25.696c6.266,63.891,57.082,114.7,120.971,120.966V400c0,7.363,5.97,13.333,13.333,13.333s13.333-5.97,13.333-13.333v-25.701c63.888-6.266,114.707-57.075,120.974-120.966H400c7.363,0,13.333-5.97,13.333-13.333S407.363,226.667,400,226.667z M240,347.669c-59.463,0-107.666-48.209-107.666-107.669S180.537,132.331,240,132.331c59.466,0,107.669,48.209,107.669,107.669S299.466,347.669,240,347.669z"/>'+'</svg>'
    
    });

    //return marker.getPosition();
};

function moveMarker(location) {
    marker.setPosition(location);
};

google.maps.event.addDomListener(window, 'load', initialize);