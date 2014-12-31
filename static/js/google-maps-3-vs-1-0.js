// <copyright project="gmapvsdoc.codeplex.com" file="google.maps.3.vs.1.0.js" company="Sky Sanders">
// This source is subject to the Microsoft Public License (Ms-PL).
// Please see http://gmapvsdoc.codeplex.com/license for details.
// All other rights reserved.
// </copyright>


/*
* This file triggers Visual Studio to parse google-maps-3-vs-1-0-vsdoc.js for intellisense
* in-line documentation and code completion and, optionally, provides run-time constructors
* for various object literals.
*
* It must be in the same directory as google-maps-3-vs-1-0-vsdoc.js
*
* Place a script tag referencing this file FOLLOWING the maps api tag.

    <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>

    <!-- deploy this script AFTER the maps api-->

    <script src="scripts/google-maps-3-vs-1-0.js" type="text/javascript"></script>

*

The functions in this file are not officially part of the API. 

They are constructors for the numerous object literals present in the api. Supported by xml doc comments 
in google-maps-3-vs-1-0-vsdoc.js they can enable both code completion and in-line documentation thus 
eliminating guess work and typos in constructing json literals. This is a win-win in my book.

e.g. 

// with intellisense and code completion:
var opts = new google.maps.MapOptions();
opts.center = new google.maps.LatLng(1, 2);
opts.disableDefaultUI = true;
var map = new google.maps.Map("map_canvas", opts);
        
VS

// no code completion 
var map = new google.maps.Map("map_canvas", {
center: new google.maps.LatLng(1, 1),
disableDefaultUI: true
});


They may also be used without 'new' to 'cast' an object literal in order to trigger intellisense
and code completion. This is especially useful for coding against the JSON literals returned
by Geocoder and DirectionsService.

e.g. 

var response = google.maps.GeocoderResponse(result);
    
        
If you feel that you would use object literals exclusively you may delete the contents of this 
file and it will simply act as a trigger for the -vsdoc.js file. 

    
If you choose to extend the api, you must define the methods and xml doc comments in -vsdoc.js
and the concrete implementation in this file. A Geocoder example is shown. The method body is
here and an empty documented version is in -vsdoc.
    
If you have extensions you wish to share please submit or a patch to http://gmapvsdoc.codeplex.com/
    
*/




// convenience and casting constructors for api literals
google = google || {};
google.maps = google.maps || {};
google.maps.NavigationControlOptions = function() { if (arguments.length > 0) { return arguments[0] } };
google.maps.ScaleControlOptions = function() { if (arguments.length > 0) { return arguments[0] } };
google.maps.MapTypeControlOptions = function() { if (arguments.length > 0) { return arguments[0] } };
google.maps.MapOptions = function() { if (arguments.length > 0) { return arguments[0] } };
google.maps.MarkerOptions = function() { if (arguments.length > 0) { return arguments[0] } };
google.maps.PolylineOptions = function() { if (arguments.length > 0) { return arguments[0] } };
google.maps.PolygonOptions = function() { if (arguments.length > 0) { return arguments[0] } };
google.maps.InfoWindowOptions = function() { if (arguments.length > 0) { return arguments[0] } };
google.maps.CircleOptions = function() { if (arguments.length > 0) { return arguments[0] } };
google.maps.RectangleOptions = function() { if (arguments.length > 0) { return arguments[0] } };
google.maps.ImageMapTypeOptions = function() { if (arguments.length > 0) { return arguments[0] } };
google.maps.GeocoderRequest = function() { if (arguments.length > 0) { return arguments[0] } };
google.maps.GeocoderResponse = function() { if (arguments.length > 0) { return arguments[0] } };
google.maps.GeocoderResponseAddressComponent = function() { if (arguments.length > 0) { return arguments[0] } };
google.maps.GeocoderResponseGeometryComponent = function() { if (arguments.length > 0) { return arguments[0] } };
google.maps.DirectionsRequest = function() { if (arguments.length > 0) { return arguments[0] } };
google.maps.DirectionsResult = function() { if (arguments.length > 0) { return arguments[0] } };
google.maps.DirectionsWaypoint = function() { if (arguments.length > 0) { return arguments[0] } };
google.maps.DirectionsTrip = function() { if (arguments.length > 0) { return arguments[0] } };
google.maps.DirectionsRoute = function() { if (arguments.length > 0) { return arguments[0] } };
google.maps.DirectionsStep = function() { if (arguments.length > 0) { return arguments[0] } };
google.maps.DirectionsDistance = function() { if (arguments.length > 0) { return arguments[0] } };
google.maps.DirectionsDuration = function() { if (arguments.length > 0) { return arguments[0] } };


// an example of documenting extensions
// you will find the meta comments in -vsdoc.js, search 'g.Geocoder.prototype.geocodeAddress'
google.maps.Geocoder.prototype.geocodeAddress = function(address, callback) {
    var gcr = new google.maps.GeocoderRequest();
    gcr.address = address;
    this.geocode(gcr, callback);
};
