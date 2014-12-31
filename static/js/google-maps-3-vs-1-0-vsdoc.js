// <copyright project="gmapvsdoc.codeplex.com" file="google.maps.3.vs.1.0-vsdoc.js" company="Sky Sanders">
// This source is subject to the Microsoft Public License (Ms-PL).
// Please see http://gmapvsdoc.codeplex.com/license for details.
// All other rights reserved.
// </copyright>

/*
* This file contains documented stubs to support Visual Studio Intellisense.
* You should not reference this file in a page at design time or runtimee.
* 
* It must be in the same directory as google-maps-3-vs-1-0.js
*
* Place a script tag referencing 'google-maps-3-vs-1-0.js' FOLLOWING the maps api
* tag.

    <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>

    <!-- deploy this script AFTER the maps api-->

    <script src="scripts/google-maps-3-vs-1-0.js" type="text/javascript"></script>
*






-----------------------------------

-----------------------------------
Api classes

Circle - verified
DirectionsRenderer - verified
DirectionsService - verified
Geocoder - verified
ImageMapType - verified
InfoWindow - verified
LatLng - verified
LatLngBounds - verified
MVCArray - verified
MVCObject - verified
Map - verified
MapCanvasProjection - verified
MapsEventListener - verified
Marker - verified
MarkerImage - verified
MouseEvent - verified
OverlayView - verified
Point - verified
Polygon - verified
Polyline - verified
Rectangle - verified
Size - verified
events - verified

Object literal constructors

CircleOptions - verified
DirectionsDistance - verified
DirectionsDuration - verified
DirectionsRendererOptions - verified
DirectionsRequest - verified
DirectionsResult - verified
DirectionsRoute - verified
DirectionsStep - verified
DirectionsTrip - verified
DirectionsWaypoint - verified
GeocoderRequest - verified
GeocoderResponse - verified
GeocoderResponseAddressComponent - verified
GeocoderResponseGeometryComponent - verified
ImageMapTypeOptions - verified
InfoWindowOptions - verified
MapOptions - verified
MapPanes - verified
MapType - verified
MapTypeControlOptions - verified
MarkerOptions - verified
NavigationControlOptions - verified
PolygonOptions - verified
PolylineOptions - verified
Projection - verified
RectangleOptions - verified
ScaleControlOptions - verified

Enumerated constants

ControlPosition - verified
DirectionsStatus - verified
DirectionsTravelMode - verified
DirectionsUnitSystem - verified
GeocoderLocationType - verified
GeocoderStatus - verified
MapTypeControlStyle - verified
MapTypeId verified
NavigationControlStyle - verified
ScaleControlStyle - verified

*/

(function(window) {
    // where multiple possible types are specified the most structured type is documented. all options are documented in the summary.
    // e.g.  DirectionsWaypoint.location can be LatLng|string, the type documented is LatLng
    // enum fields do not provide code completion e.g. DirectionsRequest.travelMode. does not provide code completion
    // Reference Table of Contents

    window.google = {
        maps: {
            MapPanes: function() {
                /// <summary>This object contains the DOM elements in which overlays are rendered. They are listed below in the
                /// order in which they appear from bottom to top.</summary>
                /// <field name="floatPane" domElement="true">This pane contains the info window. It is above all map overlays.</field>
                /// <field name="floatShadow" domElement="true">This pane contains the info window shadow. It is above the overlayImage,
                /// so that markers can be in the shadow of the info window.</field>
                /// <field name="mapPane" domElement="true">This pane is the lowest pane and is above the tiles.</field>
                /// <field name="overlayImage" domElement="true">This pane contains the marker foreground images.</field>
                /// <field name="overlayLayer" domElement="true">This pane contains polylines, polygons, ground overlays and tile layer overlays.</field>
                /// <field name="overlayMouseTarget" domElement="true">This pane contains transparent elements that receive DOM mouse events for
                /// the markers. It is above the floatShadow, so that markers in the shadow of the info window can be clickable.</field>
                /// <field name="overlayShadow" domElement="true">This pane contains the marker shadows.</field>
                /// <returns type="google.maps.MapPanes"/>
            },
            DirectionsStatus: function() {
                /// <summary>The status returned by the DirectionsService on the completion of a call to route().</summary>
                /// <field type="String" static="true" name="INVALID_REQUEST">The DirectionsRequest provided was invalid.</field>
                /// <field type="String" static="true" name="MAX_WAYPOINTS_EXCEEDED">Too many DirectionsWaypoints were provided in the DirectionsRequest.
                /// The total allowed waypoints is 23, plus the origin, and destination.</field>
                /// <field type="String" static="true" name="NOT_FOUND">At least one of the origin, destination, or waypoints could not be geocoded.</field>
                /// <field type="String" static="true" name="OK">The response contains a valid DirectionsResult.</field>
                /// <field type="String" static="true" name="OVER_QUERY_LIMIT">The webpage has gone over the requests limit in too short a period of time.</field>
                /// <field type="String" static="true" name="REQUEST_DENIED">The webpage is not allowed to use the directions service.</field>
                /// <field type="String" static="true" name="UNKNOWN_ERROR">A directions request could not be processed due to a server error.
                /// The request may succeed if you try again.</field>
                /// <field type="String" static="true" name="ZERO_RESULTS">No route could be found between the origin and destination.</field>
                /// <returns type="google.maps.DirectionsStatus"/>
            },
            DirectionsUnitSystem: function() {
                /// <summary>The valid unit systems that can be specified in a DirectionsRequest.</summary>
                /// <field type="Number" static="true" name="IMPERIAL">Specifies that distances in the DirectionsResult should be expressed in imperial units.</field>
                /// <field type="Number" static="true" name="METRIC">Specifies that distances in the DirectionsResult should be expressed in metric units.</field>
                /// <returns type="google.maps.DirectionsUnitSystem"/>
            },
            DirectionsTravelMode: function() {
                /// <summary>The valid travel modes that can be specified in a DirectionsRequest as well as the travel modes returned in a DirectionsStep.</summary>
                /// <field type="String" static="true" name="DRIVING">Specifies a driving directions request.</field>
                /// <field type="String" static="true" name="WALKING">Specifies a walking directions request.</field>
                /// <returns type="google.maps.DirectionsTravelMode"/>
            },
            GeocoderLocationType: function() {
                /// <summary>Describes the type of location returned from a geocode.</summary>
                /// <field type="String" static="true" name="APPROXIMATE">The returned result is approximate.</field>
                /// <field type="String" static="true" name="GEOMETRIC_CENTER">The returned result is the geometric center of a result such a line
                /// (e.g. street) or polygon (region).</field>
                /// <field type="String" static="true" name="RANGE_INTERPOLATED">The returned result reflects an approximation (usually on a road)
                /// interpolated between two precise points (such as intersections). Interpolated results are generally returned when rooftop
                /// geocodes are unavilable for a street address.</field>
                /// <field type="String" static="true" name="ROOFTOP">The returned result reflects a precise geocode.</field>
                /// <returns type="google.maps.GeocoderLocationType"/>
            },
            GeocoderStatus: function() {
                /// <summary>The status returned by the Geocoder on the completion of a call to geocode().</summary>
                /// <field type="String" static="true" name="ERROR">There was a problem contacting the Google servers.</field>
                /// <field type="String" static="true" name="INVALID_REQUEST">This GeocoderRequest was invalid.</field>
                /// <field type="String" static="true" name="OK">The response contains a valid GeocoderResponse.</field>
                /// <field type="String" static="true" name="OVER_QUERY_LIMIT">The webpage has gone over the requests limit in too short a period of time.</field>
                /// <field type="String" static="true" name="REQUEST_DENIED">The webpage is not allowed to use the geocoder.</field>
                /// <field type="String" static="true" name="UNKNOWN_ERROR">A geocoding request could not be processed due to a server error.
                /// The request may succeed if you try again.</field>
                /// <field type="String" static="true" name="ZERO_RESULTS">No result was found for this GeocoderRequest.</field>
                /// <returns type="google.maps.GeocoderStatus"/>
            },
            ControlPosition: function() {
                /// <summary>Identifiers used to specify the placement of controls on the map. Controls are positioned relative to other controls in the same
                /// layout position. Controls that are added first are positioned closer to the edge of the map. Elements in the top or bottom row flow towards
                /// the middle. Elements at the left or right sides flow downwards</summary>
                /// <field type="String" static="true" name="BOTTOM">Elements are positioned in the center of the bottom row.</field>
                /// <field type="String" static="true" name="BOTTOM_LEFT">Elements are positioned in the bottom left and flow towards the middle.
                /// Elements are positioned to the right of the Google logo.</field>
                /// <field type="String" static="true" name="BOTTOM_RIGHT">Elements are positioned in the bottom right and flow towards the middle.
                /// Elements are positioned to the left of the copyrights.</field>
                /// <field type="String" static="true" name="LEFT">Elements are positioned on the left, below top-left elements, and flow downwards.</field>
                /// <field type="String" static="true" name="RIGHT">Elements are positioned on the right, below top-right elements, and flow downwards.</field>
                /// <field type="String" static="true" name="TOP">Elements are positioned in the center of the top row.</field>
                /// <field type="String" static="true" name="TOP_LEFT">Elements are positioned in the top left and flow towards the middle.</field>
                /// <field type="String" static="true" name="TOP_RIGHT">Elements are positioned in the top right and flow towards the middle.</field>
                /// <returns type="google.maps.ControlPosition"/>
            },
            ScaleControlStyle: function() {
                /// <summary>Identifiers for scale control ids.</summary>
                /// <field type="Number" static="true" name="DEFAULT">The standard scale control.</field>
                /// <returns type="google.maps.ScaleControlStyle"/>
            },
            NavigationControlStyle: function() {
                /// <summary>Identifiers for common types of navigation controls.</summary>
                /// <field type="Number" static="true" name="ANDROID">The small zoom control similar to the one used by the native Maps application on Android.</field>
                /// <field type="Number" static="true" name="DEFAULT">The default navigation control. The control which DEFAULT maps to will vary according to
                /// map size and other factors. It may change in future versions of the API.</field>
                /// <field type="Number" static="true" name="SMALL">The small, zoom only control.</field>
                /// <field type="Number" static="true" name="ZOOM_PAN">The larger control, with the zoom slider and pan directional pad.</field>
                /// <returns type="google.maps.NavigationControlStyle"/>
            },
            NavigationControlOptions: function() {
                /// <summary>
                /// Options for the rendering of the navigation control. HELPER
                /// </summary>
                /// <field name="position" type="google.maps.ControlPosition">Position id. Used to specify the position of the control on the map. The default position is TOP_LEFT.</field>
                /// <field name="style" type="google.maps.NavigationControlStyle">Style id. Used to select what style of navigation control to display.</field>
                /// <returns type="google.maps.NavigationControlOptions"/>
            },
            MapTypeControlStyle: function() {
                /// <summary>Identifiers for common MapTypesControls</summary>
                /// <field type="Number" static="true" name="DEFAULT">Uses the default map type control. The control which DEFAULT maps to will vary according to
                /// window size and other factors. It may change in future versions of the API.</field>
                /// <field type="Number" static="true" name="DROPDOWN_MENU">A dropdown menu for the screen realestate conscious.</field>
                /// <field type="Number" static="true" name="HORIZONTAL_BAR">The standard horizontal radio buttons bar.</field>
                /// <returns type="google.maps.MapTypeControlStyle"/>
            },
            ScaleControlOptions: function() {
                /// <summary>Options for the rendering of the scale control.</summary>
                /// <field name="position" type="google.maps.ControlPosition">Position id. Used to specify the position of the control on the map.
                /// The default position is BOTTOM_LEFT.</field>
                /// <field name="style" type="google.maps.ScaleControlStyle">Style id. Used to select what style of scale control to display.</field>
                /// <returns type="google.maps.ScaleControlOptions"/>
            },
            MapTypeControlOptions: function() {
                /// <summary>
                /// Options for the rendering of the map type control. HELPER
                /// </summary>
                /// <field name="mapTypeIds" type="Array">Array.&lt;MapTypeId>|string>IDs  of map types to show in the control.</field>
                /// <field name="position" type="google.maps.ControlPosition">Position id. Used to specify the position of the control on the map. The default position is TOP_RIGHT.</field>
                /// <field name="style" type="google.maps.MapTypeControlStyle">Style id. Used to select what style of map type control to display.</field>
                /// <returns type="google.maps.MapTypeControlOptions"/>
            },
            MapTypeId: function() {
                /// <summary>Identifiers for common MapTypes</summary>
                /// <field type="String" static="true" name="HYBRID">This map type displays a transparent layer of major streets on satellite images.</field>
                /// <field type="String" static="true" name="ROADMAP">This map type displays a normal street map.</field>
                /// <field type="String" static="true" name="SATELLITE">This map type displays satellite images.</field>
                /// <field type="String" static="true" name="TERRAIN">This map type displays maps with physical features such as terrain and vegetation.</field>
                /// <returns type="google.maps.MapTypeId"/>
            },
            LatLng: function(lat, lng, noWrap) {
                /// <summary>
                /// LatLng is a point in geographical coordinates, latitude and longitude.
                /// Notice that although usual map projections associate longitude with the x-coordinate of the map, and latitude with the y-coordinate,
                /// the latitude coordinate is always written first, followed by the longitude.
                /// Notice also that you cannot modify the coordinates of a LatLng. If you want to compute another point, you have to create a new one.
                /// Notice the ordering of latitude and longitude. If the noWrap flag is true, then the numbers will be used as passed, otherwise
                /// latitude will be clamped to lie between -90 degrees and +90 degrees, and longitude will be wrapped to lie between -180 degrees and +180 degrees.
                /// </summary>
                /// <param name="lat" type="Number"></param>
                /// <param name="lng" type="Number"></param>
                /// <param name="noWrap" type="Boolean?"></param>
                /// <returns type="google.maps.LatLng"/>
            },
            MapOptions: function() {
                /// <summary>
                /// This is a helper. must deploy script if used.
                /// </summary>
                /// <field name="backgroundColor" type="String">Color used for the background of the Map div. This color will be visible when tiles have
                /// not yet loaded as the user pans. This option can only be set when the map is initialized.</field>
                /// <field name="center" type="google.maps.LatLng">The initial Map center. Required.</field>
                /// <field name="disableDefaultUI" type="Boolean">Enables/disables all default UI. May be overridden individually.</field>
                /// <field name="disableDoubleClickZoom" type="Boolean">Enables/disables zoom and center on double click. Enabled by default.</field>
                /// <field name="draggable" type="Boolean">If false, prevents the map from being dragged. Dragging is enabled by default.</field>
                /// <field name="draggableCursor" type="String">The name or url of the cursor to display on a draggable object.</field>
                /// <field name="draggingCursor" type="String">The name or url of the cursor to display when an object is dragging.</field>
                /// <field name="keyboardShortcuts" type="Boolean">If false, prevents the map from being controlled by the keyboard. Keyboard shortcuts are
                /// enabled by default.</field>
                /// <field name="mapTypeControl" type="Boolean">The initial enabled/disabled state of the Map type control.</field>
                /// <field name="mapTypeControlOptions" type="google.maps.MapTypeControlOptions">The initial display options for the Map type control.</field>
                /// <field name="mapTypeId" type="google.maps.MapTypeId">The initial Map mapTypeId. Required.</field>
                /// <field name="navigationControl" type="Boolean">The initial enabled/disabled state of the navigation control.</field>
                /// <field name="navigationControlOptions" type="google.maps.NavigationControlOptions">The initial display options for the navigation control.</field>
                /// <field name="noClear" type="Boolean">If true, do not clear the contents of the Map div.</field>
                /// <field name="scaleControl" type="Boolean">The initial enabled/disabled state of the scale control.</field>
                /// <field name="scaleControlOptions" type="google.maps.ScaleControlOptions">The initial display options for the scale control.</field>
                /// <field name="scrollwheel" type="Boolean">If false, disables scrollwheel zooming on the map. The scrollwheel is enabled by default.</field>
                /// <field name="zoom" type="Number">The initial Map zoom level. Required.</field>
                /// <returns type="google.maps.MapOptions"/>
            },
            LatLngBounds: function(sw, ne) {
                /// <summary>
                /// A LatLngBounds instance represents a rectangle in geographical coordinates, including one that crosses the 180 degrees longitudinal meridian.
                /// Constructs a rectangle from the points at its south-west and north-east corners.
                /// </summary>
                /// <param name="sw" type="LatLng?"></param>
                /// <param name="ne" type="LatLng?"></param>
                /// <returns type="google.maps.LatLngBounds"/>
            },
            Point: function(x, y) {
                /// <summary>
                /// A point on a two-dimensional plane.
                /// </summary>
                /// <param name="x" type="Number"></param>
                /// <param name="y" type="Number"></param>
                /// <field name="x" type="Number">The X coordinate</field>
                /// <field name="y" type="Number">The Y coordinate</field>
                /// <returns type="google.maps.Point"/>
            },
            Size: function(width, height, widthUnit, heightUnit) {
                /// <summary>
                /// Two-dimensonal size, where width is the distance on the x-axis, and height is the distance on the y-axis.
                /// </summary>
                /// <param name="width" type="Number"></param>
                /// <param name="height" type="Number"></param>
                /// <param name="widthUnit" type="String?"></param>
                /// <param name="heightUnit" type="String?"></param>
                /// <field name="height" type="Number">The height along the y-axis, in pixels.</field>
                /// <field name="width" type="Number">The width along the x-axis, in pixels.</field>
                /// <returns type="google.maps.Size"/>
            },
            MapsEventListener: function() {
                /// <summary>
                /// This class is opaque. It has no methods and no constructor. Its instances are returned from addListener(), addDomListener()
                /// and are eventually passed back to removeListener().
                /// </summary>
                /// <returns type="google.maps.MapsEventListener"/>
            },
            MouseEvent: function() {
                /// <summary>This object is returned from various mouse events on the map and overlays, and contains all the fields shown below.</summary>
                /// <field name="latLng" type="google.maps.LatLng">The latitude/longitude that was below the cursor when the event occurred.</field>
            },
            events: {
                addDomListener: function(instance, eventName, handler) {
                    /// <summary>
                    /// Cross browser event handler registration. This listener is removed by calling eventRemoveListener(handle) for the handle that is
                    /// returned by this function.
                    /// </summary>
                    /// <param name="instance" type="Object"></param>
                    /// <param name="eventName" type="String"></param>
                    /// <param name="handler" type="Function"></param>
                    /// <returns type="google.maps.MapsEventListener"/>
                },
                addDomListenerOnce: function(instance, eventName, handler) {
                    /// <summary>
                    /// Wrapper around addDomListener that removes the listener after the first event.
                    /// </summary>
                    /// <param name="instance" type="Object"></param>
                    /// <param name="eventName" type="String"></param>
                    /// <param name="handler" type="Function"></param>
                    /// <returns type="google.maps.MapsEventListener"/>
                },
                addListener: function(instance, eventName, handler) {
                    /// <summary>
                    /// Adds the given listener function to the the given event name for the given object instance. Returns an identifier for this
                    /// listener that can be used with eventRemoveListener().
                    /// </summary>
                    /// <param name="instance" type="Object"></param>
                    /// <param name="eventName" type="String"></param>
                    /// <param name="handler" type="Function"></param>
                    /// <returns type="google.maps.MapsEventListener"/>
                },
                addListenerOnce: function(instance, eventName, handler) {
                    /// <summary>
                    /// Like eventAddListener, but the handler removes itself after handling the first event.
                    /// </summary>
                    /// <param name="instance" type="Object"></param>
                    /// <param name="eventName" type="String"></param>
                    /// <param name="handler" type="Function"></param>
                    /// <returns type="google.maps.MapsEventListener"/>
                },
                clearInstanceListeners: function(instance) {
                    /// <summary>
                    /// Removes all listeners for all events for the given instance.
                    /// </summary>
                    /// <param name="instance" type="Object"></param>
                },
                clearListeners: function(instance, eventName) {
                    /// <summary>
                    /// Removes all listeners for the given event for the given instance.
                    /// </summary>
                    /// <param name="instance" type="Object"></param>
                    /// <param name="eventName" type="String"></param>
                },
                removeListener: function(listener) {
                    /// <summary>
                    /// Removes the given listener, which should have been returned by eventAddListener above.
                    /// </summary>
                    /// <param name="listener" type="MapsEventListener"></param>
                },
                trigger: function(instance, eventName, var_args) {
                    /// <summary>
                    /// Triggers the given event. All arguments after eventName are passed as arguments to the listeners.
                    /// </summary>
                    /// <param name="instance" type="Object"></param>
                    /// <param name="eventName" type="String"></param>
                    /// <param name="var_args" type="Object"></param>
                }
            },
            MapCanvasProjection: function() {
                /// <summary></summary>
                /// <returns type="google.maps.MapCanvasProjection"/>
            },
            MVCObject: function() {
                /// <summary>
                /// Base class implementing KVO.
                /// </summary>
                /// <returns type="google.maps.MVCObject"/>
            },
            MVCArray: function(array) {
                /// <summary>
                /// A mutable MVC Array.
                /// </summary>
                /// <param name="array" type="Array"></param>
                /// <returns type="google.maps.MVCArray"/>
            },
            MapTypeRegistry: function() {
                /// <summary>
                /// NOTE: this is an undocumented class. The current definition is derived from reflection.
                /// TODO: find docs
                /// </summary>
                /// <returns type="google.maps."/>
            },
            Map: function(mapDiv, opts) {
                /// <summary>
                /// Creates a new map inside of the given HTML container, which is typically a DIV element.
                /// This class extends MVCObject.
                /// </summary>
                /// <param name="mapDiv" domElement="true"></param>
                /// <param name="opts" type="MapOptions?"></param>
                /// <field name="controls" type="Array">Array.&lt;MVCArray.&lt;Node>> Additional controls to attach to the map.
                /// To add a control to the map, add the control's to the MVCArray corresponding to the ControlPosition where it should be rendered.</field>
                /// <field name="mapTypes" type="google.maps.MapTypeRegistry">A registry of MapType instances by string ID.</field>
                /// <field name="overlayMapTypes" type="google.maps.MVCArray">MVCArray.&lt;MapType> Additional map types to overlay.</field>
                /// <field name="bounds_changed" type="Function">This event is fired when the viewport bounds have changed.</field>
                /// <field name="center_changed" type="Function">This event is fired when the map center property changes.</field>
                /// <field name="click" type="Function">Function(MouseEvent)  This event is fired when the user clicks on the map (but not when they click on a marker
                /// or infowindow).</field>
                /// <field name="dblclick" type="Function">Function(MouseEvent) This event is fired when the user double-clicks on the map. Note that the click
                /// event will also fire, right before this one.</field>
                /// <field name="drag" type="Function">This event is repeatedly fired while the user drags the map.</field>
                /// <field name="dragend" type="Function">This event is fired when the user stops dragging the map.</field>
                /// <field name="dragstart" type="Function">This event is fired when the user starts dragging the map.</field>
                /// <field name="idle" type="Function">This event is fired when the map becomes idle after panning or zooming.</field>
                /// <field name="maptypeid_changed" type="Function">This event is fired when the mapTypeId property changes.</field>
                /// <field name="mousemove" type="Function">Function(MouseEvent) This event is fired whenever the user's mouse moves over the map container.</field>
                /// <field name="mouseout" type="Function">Function(MouseEvent) This event is fired when the user's mouse exits the map container.</field>
                /// <field name="mouseover" type="Function">Function(MouseEvent) This event is fired when the user's mouse enters the map container.</field>
                /// <field name="resize" type="Function">Developers should trigger this event on the map when the div changes
                /// size: google.maps.event.trigger(map, 'resize') .</field>
                /// <field name="rightclick" type="Function">Function(MouseEvent) This event is fired when the DOM contextmenu event is fired on the map container.</field>
                /// <field name="tilesloaded" type="Function">This event is fired when the visible tiles have finished loading.</field>
                /// <field name="zoom_changed" type="Function">This event is fired when the map zoom property changes.</field>
                /// <returns type="google.maps.Map"/>
            },
            Marker: function(opts) {
                /// <summary>
                /// Creates a marker with the options specified. If a map is specified, the marker is added to the map upon construction.
                /// Note that the position must be set for the marker to display.
                /// This class extends MVCObject.
                /// </summary>
                /// <param name="opts" type="MarkerOptions?" ></param>
                /// <field name="click" type="Function">Function(Event) This event is fired when the marker icon was clicked.</field>
                /// <field name="clickable_changed" type="Function">This event is fired when the marker's clickable property changes.</field>
                /// <field name="cursor_changed" type="Function">This event is fired when the marker's cursor property changes.</field>
                /// <field name="dblclick" type="Function">Function(Event) This event is fired when the marker icon was double clicked.</field>
                /// <field name="drag" type="Function">Function(MouseEvent) This event is repeatedly fired while the user drags the marker.</field>
                /// <field name="dragend" type="Function">Function(MouseEvent) This event is fired when the user stops dragging the marker.</field>
                /// <field name="draggable_changed" type="Function">This event is fired when the marker's draggable property changes.</field>
                /// <field name="dragstart" type="Function">Function(MouseEvent) This event is fired when the user starts dragging the marker.</field>
                /// <field name="flat_changed" type="Function">This event is fired when the marker's flat property changes.</field>
                /// <field name="icon_changed" type="Function">This event is fired when the marker icon property changes.</field>
                /// <field name="mousedown" type="Function">Function(Event) This event is fired when the DOM mousedown event is fired on the marker icon.</field>
                /// <field name="mouseout" type="Function">Function(Event) This event is fired when the mouse leaves the area of the marker icon.</field>
                /// <field name="mouseover" type="Function">Function(Event) This event is fired when the mouse enters the area of the marker icon.</field>
                /// <field name="mouseup" type="Function">Function(Event) This event is fired for the DOM mouseup on the marker.</field>
                /// <field name="position_changed" type="Function">This event is fired when the marker position property changes.</field>
                /// <field name="rightclick" type="Function">Function(Event) This event is fired when the marker is right clicked on.</field>
                /// <field name="shadow_changed" type="Function">This event is fired when the marker's shadow property changes.</field>
                /// <field name="shape_changed" type="Function">This event is fired when the marker's shape property changes.</field>
                /// <field name="title_changed" type="Function">This event is fired when the marker title property changes.</field>
                /// <field name="visible_changed" type="Function">This event is fired when the marker's visible property changes.</field>
                /// <field name="zindex_changed" type="Function">This event is fired when the marker's zIndex property changes.</field>
                /// <returns type="google.maps.Marker"/>
            },
            Polyline: function(opts) {
                /// <summary>
                /// Create a polyline using the passed Polyline options, which specify both the path of the polyline and the stroke style to use when
                /// drawing the polyline. You may pass either an array of LatLngs or an MVCArray of LatLngs when constructing a polyline, though simple arrays
                /// are converted to MVCArrays within the polyline upon instantiation.
                /// A polyline is a linear overlay of connected line segments on the map.
                /// This class extends MVCObject.
                /// </summary>
                /// <param name="opts" type="PolylineOptions?"></param>
                /// <field name="click" type="Function">Function(MouseEvent) This event is fired when the DOM click event is fired on the Polyline.</field>
                /// <field name="dblclick" type="Function">Function(MouseEvent) This event is fired when the DOM dblclick event is fired on the Polyline.</field>
                /// <field name="mousedown" type="Function">Function(MouseEvent) This event is fired when the DOM mousedown event is fired on the Polyline.</field>
                /// <field name="mousemove" type="Function">Function(MouseEvent) This event is fired when the DOM mousemove event is fired on the Polyline.</field>
                /// <field name="mouseup" type="Function">Function(MouseEvent) This event is fired when the DOM mouseup event is fired on the Polyline.</field>
                /// <field name="rightclick" type="Function">Function(MouseEvent) This event is fired when the Polyline is right-clicked on.</field>
                /// <returns type="google.maps.Polyline"/>
            },
            Polygon: function(opts) {
                /// <summary>
                /// Create a polygon using the passed Polygon options, which specify the polygon's path, the stroke style for the polygon's edges, and the fill
                /// style for the polygon's interior regions. A polygon may contain one or more paths, where each path consists of an array of LatLngs.
                /// You may pass either an array of LatLngs or an MVCArray of LatLngs when constructing these paths. Arrays are converted to
                /// MVCArrays within the polygon upon instantiation.
                /// A polygon (like a polyline) defines a series of connected coordinates in an ordered sequence; additionally, polygons
                /// form a closed loop and define a filled region.
                /// This class extends MVCObject.
                /// </summary>
                /// <param name="opts" type="PolygonOptions?"></param>
                /// <field name="click" type="Function">Function(MouseEvent) This event is fired when the DOM click event is fired on the Polygon.</field>
                /// <field name="dblclick" type="Function">Function(MouseEvent) This event is fired when the DOM dblclick event is fired on the Polygon.</field>
                /// <field name="mousedown" type="Function">Function(MouseEvent) This event is fired when the DOM mousedown event is fired on the Polygon.</field>
                /// <field name="mousemove" type="Function">Function(MouseEvent) This event is fired when the DOM mousemove event is fired on the Polygon.</field>
                /// <field name="mouseup" type="Function">Function(MouseEvent) This event is fired when the DOM mouseup event is fired on the Polygon.</field>
                /// <field name="rightclick" type="Function">Function(MouseEvent) This event is fired when the Polygon is right-clicked on.</field>
                /// <returns type="google.maps.Polygon"/>
            },
            InfoWindow: function(opts) {
                /// <summary>
                /// Creates an info window with the given options. An InfoWindow can be placed on a map at a particular position or above a marker,
                /// depending on what is specified in the options. Unless auto-pan is disabled, an InfoWindow will pan the map to make itself visible when
                /// it is opened. After constructing an InfoWindow, you must call open to display it on the map.
                /// The user can click the close button on the InfoWindow to remove it from the map, or the developer can call close() for the same effect.
                /// An overlay that looks like a bubble and is often connected to a marker. This class extends MVCObject.
                /// This class extends MVCObject.
                /// </summary>
                /// <param name="opts" type="InfoWindowOptions?"></param>
                /// <field name="closeclick" type="Function">This event is fired when the close button was clicked.</field>
                /// <field name="content_changed" type="Function">This event is fired when the content property changes.</field>
                /// <field name="domready" type="Function">This event is fired when the &lt;div> containing the InfoWindow's content is attached to the DOM.
                /// You may wish to monitor this event if you are building out your info window content dynamically.</field>
                /// <field name="position_changed" type="Function">This event is fired when the position property changes.</field>
                /// <field name="zindex_changed" type="Function">This event is fired when the InfoWindow's zIndex changes.</field>
                /// <returns type="google.maps.InfoWindow"/>
            },
            DirectionsRenderer: function(opts) {
                /// <summary>
                /// Creates the renderer with the given options. Directions can be rendered on a map (as visual overlays) or additionally on a &lt;div> panel
                /// (as textual instructions).
                /// Renders directions retrieved in the form of a DirectionsResult object retrieved from the DirectionsService.
                /// This class extends MVCObject.
                /// </summary>
                /// <param name="opts" type="DirectionsRendererOptions?" optional="true">optional</param>
                /// <returns type="google.maps.DirectionsRenderer"/>
            },
            OverlayView: function() {
                /// <summary>
                /// You can implement this class if you want to display custom types of overlay objects on the map.
                /// This class extends MVCObject.
                /// You should inherit from this class by setting your overlay's prototype to new OverlayView.prototype. You must implement three methods:
                /// onAdd(), draw(), and onRemove(). In the add() method, you should create DOM objects and append them as children of the panes.
                /// In the draw() method, you should position these elements. In the onRemove() method, you should remove the objects from the DOM.
                /// You must call setMap() with a valid Map object to trigger the call to the onAdd() method and setMap(null) in order to trigger the onRemove() method.
                /// The setMap() method can be called at the time of construction or at any point afterward when the overlay should be re-shown after removing.
                /// The draw() method will then be called whenever a map property changes that could change the position of the element, such as zoom, center, or map type.
                /// </summary>
                /// <returns type="google.maps.OverlayView"/>
            },
            Rectangle: function(opts) {
                /// <summary>
                /// A rectangle overlay. This class extends MVCObject.
                /// This class extends MVCObject.
                /// Create a rectangle using the passed RectangleOptions, which specify the bounds and style.
                /// </summary>
                /// <param name="opts" type="RectangleOptions?"></param>
                /// <field name="click" type="Function">Function(MouseEvent) This event is fired when the DOM click event is fired on the Rectangle.</field>
                /// <field name="dblclick" type="Function">Function(MouseEvent) This event is fired when the DOM dblclick event is fired on the Rectangle.</field>
                /// <field name="mousedown" type="Function">Function(MouseEvent) This event is fired when the DOM mousedown event is fired on the Rectangle.</field>
                /// <field name="mousemove" type="Function">Function(MouseEvent) This event is fired when the DOM mousemove event is fired on the Rectangle.</field>
                /// <field name="mouseup" type="Function">Function(MouseEvent) This event is fired when the DOM mouseup event is fired on the Rectangle.</field>
                /// <field name="rightclick" type="Function">Function(MouseEvent) This event is fired when the Rectangle is right-clicked on.</field>
                /// <returns type="google.maps.Rectangle"/>
            },
            Circle: function(opts) {
                /// <summary>
                /// A circle on the Earth's surface; also known as a "spherical cap".
                /// This class extends MVCObject.
                /// Create a circle using the passed CircleOptions, which specify the center, radius, and style.
                /// </summary>
                /// <param name="opts" type="CircleOptions?"></param>
                /// <field name="click" type="Function">Function(MouseEvent) This event is fired when the DOM click event is fired on the Circle.</field>
                /// <field name="dblclick" type="Function">Function(MouseEvent) This event is fired when the DOM dblclick event is fired on the Circle.</field>
                /// <field name="mousedown" type="Function">Function(MouseEvent) This event is fired when the DOM mousedown event is fired on the Circle.</field>
                /// <field name="mousemove" type="Function">Function(MouseEvent) This event is fired when the DOM mousemove event is fired on the Circle.</field>
                /// <field name="mouseup" type="Function">Function(MouseEvent) This event is fired when the DOM mouseup event is fired on the Circle.</field>
                /// <field name="rightclick" type="Function">Function(MouseEvent) This event is fired when the Circle is right-clicked on.</field>
                /// <returns type="google.maps.Circle"/>
            },
            MarkerOptions: function() {
                /// <summary>
                ///
                /// </summary>
                /// <field name="clickable" type="Boolean">If true, the marker can be clicked</field>
                /// <field name="cursor" type="String">Mouse cursor to show on hover</field>
                /// <field name="draggable" type="Boolean">If true, the marker can be dragged.</field>
                /// <field name="flat" type="Boolean">If true, the marker shadow will not be displayed.</field>
                /// <field name="icon" type="google.maps.Icon">for the foreground TODO:Define. if i remember correctly it is a string. check mapiconmaker</field>
                /// <field name="map" type="google.maps.Map">Map on which to display Marker.</field>
                /// <field name="position" type="google.maps.LatLng">Marker position. Required.</field>
                /// <field name="shadow" type="google.maps.Shadow">image TODO:Define if i remember correctly it is a string. check mapiconmaker</field>
                /// <field name="shape" type="Object">Image map region for drag/click. Array of x/y values that define the perimeter of the icon. TODO:check this out: should be an array or map</field>
                /// <field name="title" type="String">Rollover text</field>
                /// <field name="visible" type="Boolean">If true, the marker is visible</field>
                /// <field name="zIndex" type="Number">All Markers are displayed on the map in order of their zIndex, with higher values displaying in
                /// front of Markers with lower values. By default, Markers are displayed according to their latitude, with Markers of lower latitudes
                /// appearing in front of Markers at higher latitudes.</field>
                /// <returns type="google.maps.MarkerOptions"/>
            },
            MarkerImage: function(url, size, origin, anchor, scaledSize) {
                /// <summary>
                /// Defines an image to be used as the icon or shadow for a Marker. 'origin' and 'size' are used to select a segment of a sprite image and
                /// 'anchor' overrides the position of the anchor point from its default bottom middle position. The anchor of an image is the pixel to
                /// which the system refers in tracking the image's position. By default, the anchor is set to the bottom middle of the image (coordinates width/2, height).
                /// So when a marker is placed at a given LatLng, the pixel defined as the anchor is positioned at the specified LatLng.
                /// The MarkerImage cannot be changed once constructed.
                /// </summary>
                /// <param name="url" type="String"></param>
                /// <param name="size" type="Size?"></param>
                /// <param name="origin" type="Point?"></param>
                /// <param name="anchor" type="Point?"></param>
                /// <param name="scaledSize" type="Size?"></param>
                /// <returns type="google.maps.MarkerImage"/>
            },
            PolylineOptions: function() {
                /// <summary>
                ///
                /// </summary>
                /// <field name="path" type="google.maps.MVCArray">MVCArray.&lt;LatLng>|Array.&lt;LatLng>The  ordered sequence of coordinates of the Polyline.
                /// This path may be specified using either a simple array of LatLngs, or an MVCArray of LatLngs. Note that if you pass a simple array,
                /// it will be converted to an MVCArray Inserting or removing LatLngs in the MVCArray will automatically update the polyline on the map.</field>
                /// <field name="strokeColor" type="String">The stroke color in HTML hex style, ie. "#FFAA00"</field>
                /// <field name="strokeOpacity" type="Number">The stroke opacity between 0.0 and 1.0</field>
                /// <field name="strokeWeight" type="Number">The stroke width in pixels.</field>
                /// <returns type="google.maps.PolylineOptions"/>
            },
            PolygonOptions: function() {
                /// <summary>
                ///
                /// </summary>
                /// <field name="fillColor" type="String">The fill color in HTML hex style, ie. "#00AAFF"</field>
                /// <field name="fillOpacity" type="Number">The fill opacity between 0.0 and 1.0</field>
                /// <field name="paths" type="Array"> MVCArray.&lt;MVCArray.&lt;LatLng>>|MVCArray.&lt;LatLng>|Array.&lt;Array.&lt;LatLng>>|Array.&lt;LatLng>
                /// The ordered sequence of coordinates that designates a closed loop. Unlike polylines, a polygon may consist of one or more paths.
                /// As a result, the paths property may specify one or more arrays of LatLng coordinates. Simple polygons may be defined using a single array of LatLngs.
                /// More complex polygons may specify an array of arrays. Any simple arrays are convered into MVCArrays.
                /// Inserting or removing LatLngs from the MVCArray will automatically update the polygon on the map.</field>
                /// <field name="strokeColor" type="String">The stroke color in HTML hex style, ie. "#FFAA00"</field>
                /// <field name="strokeOpacity" type="Number">The stroke opacity between 0.0 and 1.0</field>
                /// <field name="strokeWeight" type="Number">The stroke width in pixels.</field>
                /// <returns type="google.maps.PolygonOptions"/>
            },
            InfoWindowOptions: function() {
                /// <summary>
                ///
                /// </summary>
                /// <field name="content">Content to display in the InfoWindow. This can be an HTML element, a plain-text string, or a string containing HTML. The InfoWindow will be sized according to the content. To set an explicit size for the content, set content to be a HTML element with that size.</field>
                /// <field name="disableAutoPan" type="Boolean">Disable auto-pan on open. By default, the info window will pan the map so that it is fully visible when it opens.</field>
                /// <field name="maxWidth" type="Number">Maximum width of the infowindow, regardless of content's width. This value is only considered if it is set before a call to open. To change the maximum width when changing content, call close, setOptions, and then open.</field>
                /// <field name="pixelOffset" type="google.maps.Size">The offset, in pixels, of the tip of the info window from the point on the map at whose geographical coordinates the info window is anchored. If an InfoWindow is opened with an anchor, the pixelOffset will be calculated from the top-center of the anchor's bounds.</field>
                /// <field name="position" type="google.maps.LatLng">The LatLng at which to display this InfoWindow. If the InfoWindow is opened with an anchor, the anchor's position will be used instead.</field>
                /// <field name="zIndex" type="Number">All InfoWindows are displayed on the map in order of their zIndex, with higher values displaying in front of InfoWindows with lower values. By default, InfoWinodws are displayed according to their latitude, with InfoWindows of lower latitudes appearing in front of InfoWindows at higher latitudes. InfoWindows are always displayed in front of markers.</field>
                /// <returns type="google.maps.InfoWindowOptions"/>
            },
            DirectionsRendererOptions: function() {
                /// <summary>
                /// This object defines the properties that can be set on a DirectionsRenderer object.
                /// </summary>
                /// <field name="directions" type="google.maps.DirectionsResult">The directions to display on the map and/or in a &lt;div> panel, retrieved as a DirectionsResult object from DirectionsService.</field>
                /// <field name="hideTripList" type="Boolean">This property indicates whether the renderer should provide UI to select amongst alternative trips. By default, this flag is false and a user-selectable list of trips will be shown in the directions' associated panel. To hide that list, set hideTripList to true.</field>
                /// <field name="map" type="google.maps.Map">Map on which to display the directions.</field>
                /// <field name="markerOptions" type="google.maps.MarkerOptions">Options for the markers. All markers rendered by the DirectionsRenderer will use these options.</field>
                /// <field name="panel" domElement="true">The &lt;div> in which to display the directions steps.</field>
                /// <field name="polylineOptions" type="google.maps.PolylineOptions">Options for the polylines. All polylines rendered by the DirectionsRenderer will use these options.</field>
                /// <field name="preserveViewport" type="Boolean">By default, the input map is centered and zoomed to the bounding box of this set of directions. If this option is set to true, the viewport is left unchanged, unless the map's center and zoom were never set.</field>
                /// <field name="suppressInfoWindows" type="Boolean">Suppress the rendering of info windows.</field>
                /// <field name="suppressMarkers" type="Boolean">Suppress the rendering of markers.</field>
                /// <field name="suppressPolylines" type="Boolean">Suppress the rendering of polylines.</field>
                /// <field name="tripIndex" type="Number">The index of the trip within the DirectionsResult object. The default value is 0</field>
                /// <returns type="google.maps.DirectionsRendererOptions"/>
            },
            CircleOptions: function() {
                /// <summary>
                ///
                /// </summary>
                /// <field name="center" type="google.maps.LatLng">The center</field>
                /// <field name="fillColor" type="String">The fill color in HTML hex style, ie. "#00AAFF"</field>
                /// <field name="fillOpacity" type="Number">The fill opacity between 0.0 and 1.0</field>
                /// <field name="radius" type="Number">The radius in meters on the Earth's surface</field>
                /// <field name="strokeColor" type="String">The stroke color in HTML hex style, ie. "#FFAA00"</field>
                /// <field name="strokeOpacity" type="Number">The stroke opacity between 0.0 and 1.0</field>
                /// <field name="strokeWeight" type="Number">The stroke width in pixels.</field>
                /// <returns type="google.maps.CircleOptions"/>
            },
            RectangleOptions: function() {
                /// <summary>
                ///
                /// </summary>
                /// <field name="bounds" type="google.maps.LatLngBounds">The bounds.</field>
                /// <field name="fillColor" type="String">The fill color in HTML hex style, ie. "#00AAFF"</field>
                /// <field name="fillOpacity" type="Number">The fill opacity between 0.0 and 1.0</field>
                /// <field name="strokeColor" type="String">The stroke color in HTML hex style, ie. "#FFAA00"</field>
                /// <field name="strokeOpacity" type="Number">The stroke opacity between 0.0 and 1.0</field>
                /// <field name="strokeWeight" type="Number">The stroke width in pixels.</field>
                /// <returns type="google.maps.RectangleOptions"/>
            },
            MapType: function() {
                /// <summary>
                /// This interface defines map type. This interface is typically used for base maps such as road, satellite or hybrid maps. Immutable
                /// </summary>
                /// <field name="alt" type="String">Alt text to display when this MapType's button is hovered over in the MapTypeControl. Optional.</field>
                /// <field name="maxZoom" type="Number">The maximum zoom level for the map when displaying this MapType.</field>
                /// <field name="minZoom" type="Number">The minimum zoom level for the map when displaying this MapType. Optional.</field>
                /// <field name="name" type="String">Name to display in the MapTypeControl. Optional.</field>
                /// <field name="projection" type="google.maps.Projection">The Projection used to render this MapType. Defaults to Mercator.</field>
                /// <field name="tileSize" type="google.maps.Size">The dimensions of each tile.</field>
                /// <returns type="google.maps.MapType"/>
            },
            Projection: function() {
                /// <summary>
                ///
                /// </summary>
                /// <returns type="google.maps.Projection"/>
            },
            ImageMapType: function(opts) {
                /// <summary>
                /// This class implements the MapType interface and is provided for rendering image tiles.
                /// Constructs an ImageMapType using the provided ImageMapTypeOptions.
                /// </summary>
                /// <param name="opts" type="ImageMapTypeOption"></param>
                /// <returns type="google.maps.ImageMapType"/>
            },
            ImageMapTypeOptions: function() {
                /// <summary>
                /// This class is used to create a MapType that renders image tiles
                /// </summary>
                /// <field name="alt" type="String">Alt text to display when this MapType's button is hovered over in the MapTypeControl.</field>
                /// <field name="getTileUrl" type="Function">Function(Point, number):string Returns a string (URL) for given tile coordinate (x, y) and zoom level. This function should have a signature of: getTileUrl(Point, number):string</field>
                /// <field name="isPng" type="Boolean">Is the image a PNG? This is needed by some old browsers.</field>
                /// <field name="maxZoom" type="Number">The maximum zoom level for the map when displaying this MapType.</field>
                /// <field name="minZoom" type="Number">The minimum zoom level for the map when displaying this MapType. Optional.</field>
                /// <field name="name" type="String">Name to display in the MapTypeControl.</field>
                /// <field name="opacity" type="Number">The opacity to apply to the tiles. The opacity should be specified as a float value between 0 and 1.0.</field>
                /// <field name="tileSize" type="google.maps.Size">The tile size.</field>
                /// <returns type="google.maps.ImageMapTypeOptions"/>
            },
            Geocoder: function() {
                /// <summary>
                /// A service for converting between an address and a LatLng
                /// Creates a new instance of a Geocoder that sends geocode requests to Google servers.
                /// </summary>
                /// <field name="" type=""></field>
                /// <returns type="google.maps."/>
            },
            GeocoderResponseAddressComponent: function() {
                /// <field name="short_name" type="String"></field>
                /// <field name="long_name" type="String"></field>
                /// <field name="types" type="Array" elementType="String"></field>
            },
            GeocoderResponseGeometryComponent: function() {
                /// <field name="location" type="google.maps.LatLng"></field>
                /// <field name="location_type" type="google.maps.GeocoderLocationType"></field>
                /// <field name="viewport" type="google.maps.LatLngBounds"></field>
                /// <field name="bounds" type="google.maps.LatLngBounds" mayBeNull="true">Nullable</field>
            },
            GeocoderResponse: function() {
                /// <summary>An array of these objects are returned from the geocoder. Some fields in the response may not be returned for all requests - those are marked with a "?"</summary>
                /// <field name="types" type="Array" elementType="String"></field>
                /// <field name="formatted_address" type="String"></field>
                /// <field name="address_components" type="Array">Array.&lt;GeocoderResponseAddressComponent></field>
                /// <field name="geometry" type="google.maps.GeocoderResponseGeometryComponent"></field>
                /// <returns type="google.maps.GeocoderResponse"/>
            },
            GeocoderRequest: function() {
                /// <summary>The specification for a geocoding request to be sent to the Geocoder.</summary>
                /// <field name="address" type="String">Address. Optional.</field>
                /// <field name="bounds" type="google.maps.LatLngBounds">LatLngBounds within which to search. Optional.</field>
                /// <field name="language" type="String">Preferred language for results. Optional.</field>
                /// <field name="latLng" type="google.maps.LatLng">LatLng about which to search. Optional.</field>
                /// <returns type="google.maps.GeocoderRequest"/>
                //removed from api? <field name="country" type="String">Country code top-level domain within which to search. Optional.</field>
            },
            DirectionsService: function() {
                /// <summary>
                /// A service for computing directions between two or more places.
                /// Creates a new instance of a DirectionsService that sends directions queries to Google servers
                /// </summary>
                /// <returns type="google.maps.DirectionsService"/>
            },
            DirectionsRequest: function() {
                /// <summary>
                /// The specification for a directions query to be sent to the DirectionsService.
                /// </summary>
                /// <field name="destination" type="google.maps.LatLng">(LatLng|string) Location of destination. This can be specified as either a string to be geocoded or a LatLng. Required.</field>
                /// <field name="origin" type="google.maps.LatLng">(LatLng|string) Location of origin. This can be specified as either a string to be geocoded or a LatLng. Required.</field>
                /// <field name="provideTripAlternatives" type="Boolean">Whether or not trip alternatives should be provided. Optional.</field>
                /// <field name="region" type="String">Region code used as a bias for geocoding requests. Optional.</field>
                /// <field name="travelMode" type="google.maps.DirectionsTravelMode">Type of routing requested. Required.</field>
                /// <field name="unitSystem" type="google.maps.DirectionsUnitSystem">Preferred unit system to use when displaying distance. Defaults to the unit system used in the country of origin.</field>
                /// <field name="waypoints" type="Array">Array.&lt;DirectionsWaypoint> Array of intermediate waypoints. Directions will be calculated from the origin to the destination by way of each waypoint in this array. Optional.</field>
                /// <returns type="google.maps.DirectionsRequest"/>
            },
            DirectionsWaypoint: function() {
                /// <summary>
                /// A DirectionsWaypoint represents a location between origin and destination through which the trip should be routed.
                /// </summary>
                /// <field name="location" type="google.maps.LatLng">(LatLng|string) Waypoint location. Can be an address string or LatLng. Optional.</field>
                /// <field name="stopover" type="Boolean">If true, indicates that this waypoint is a stop between the origin and destination. This has the effect of splitting the route into two. This value is true by default. Optional.</field>
                /// <returns type="google.maps.DirectionsWaypoint"/>
            },
            DirectionsResult: function() {
                /// <summary>
                /// The directions response in JSON format retrieved from the directions server. You can render these using a DirectionsRenderer or parse this object and render it yourself. You must display the warnings and copyrights as noted in the Maps API terms of service.
                /// </summary>
                /// <field name="trips" type="Array">Array.&lt;DirectionsTrip> An array of DirectionsTrips, each of which contains information about the routes and steps of which it is composed. There will only be one trip unless the DirectionsRequest was made with provideTripAlternatives set to true.</field>
                /// <returns type="google.maps.DirectionsResult"/>
            },
            DirectionsTrip: function() {
                /// <summary>
                /// A single trip containing a set of routes in JSON format in a DirectionsResult.
                /// </summary>
                /// <field name="copyrights" type="String">Copyrights text to be displayed for this trip.</field>
                /// <field name="routes" type="Array">Array.&lt;DirectionsRoute>  An array of DirectionsRoutes, each of which contains information about the steps of which it is composed. There will be one route for each waypoint or destination specified. So a trip with no waypoints will contain one DirectionsRoute and a route with one waypoint will contain two.</field>
                /// <field name="warnings" type="Array">Array.&lt;string> Warnings to be displayed when showing these directions.</field>
                /// <returns type="google.maps.DirectionsTrip"/>
            },
            DirectionsRoute: function() {
                /// <summary>
                /// A single route consisting of a set of steps in JSON format in a DirectionsResult. Some fields in the route may not be returned for all requests
                /// </summary>
                /// <field name="distance" type="google.maps.DirectionsDistance">The total distance covered by this route. This property may be undefined as the distance may be unknown.</field>
                /// <field name="duration" type="google.maps.DirectionsDuration">The total duration of this route. This property may be undefined as the duration may be unknown.</field>
                /// <field name="end_geocode" type="google.maps.GeocoderResponse">The DirectionsService calculates directions between locations by using the nearest transportation option (usually a road) at the start and end points. end_geocode indicates the actual geocoded destination, which may be different than the last step if, for example, the road is not near the destination.</field>
                /// <field name="start_geocode" type="google.maps.GeocoderResponse">The DirectionsService calculates directions between locations by using the nearest transportation option (usually a road) at the start and end points. start_geocode indicates the actual geocoded origin, which may be different than the first step if, for example, the road is not near the origin.</field>
                /// <field name="steps" type="Array">Array.&lt;DirectionsStep>  An array of DirectionsSteps, each of which contains information about the individual steps in this route.</field>
                /// <returns type="google.maps.DirectionsRoute"/>
            },
            DirectionsStep: function() {
                /// <summary>
                /// A single DirectionsStep in JSON format in a DirectionsResult. Some fields may be undefined.
                /// </summary>
                /// <field name="distance" type="google.maps.DirectionsDistance">The distance covered by this step. This property may be undefined as the distance may be unknown.</field>
                /// <field name="duration" type="google.maps.DirectionsDuration">The typical time required to perform this step in seconds and in text form. This property may be undefined as the duration may be unknown.</field>
                /// <field name="encoded_lat_lngs" type="String">The set of latlngs encoded using a compressed ASCII format as described in http://code.google.com/apis/maps/documentation/polylinealgorithm.html.</field>
                /// <field name="end_point" type="google.maps.LatLng">The ending point of this step.</field>
                /// <field name="instructions" type="String">Instructions for this step.</field>
                /// <field name="lat_lngs" type="Array" elementType="google.maps.LatLng">Array.&lt;LatLng>  The LatLng locations which indicate the vertices of the step's polyline.</field>
                /// <field name="start_point" type="google.maps.LatLng">The starting point of this step.</field>
                /// <returns type="google.maps.DirectionsStep"/>
            },
            DirectionsDistance: function() {
                /// <summary>
                /// A representation of distance as a numeric value and a display string.
                /// </summary>
                /// <field name="text" type="String">A string representation of the distance value, using the DirectionsUnitSystem specified in the request.</field>
                /// <field name="value" type="Number">The distance in meters.</field>
                /// <returns type="google.maps.DirectionsDistance"/>
            },
            DirectionsDuration: function() {
                /// <summary>
                /// A representation of duration as a numeric value and a display string.
                /// </summary>
                /// <field name="text" type="String">A string representation of the duration value.</field>
                /// <field name="value" type="Number">The duration in seconds.</field>
                /// <returns type="google.maps.DirectionsDuration"/>
            },
            __namespace: true
        },
        __namespace: true
    };

    var g = google.maps;

    function extend(a, b) {
        // a type of inheritance strategy
        for (var name in b) {
            if (b.hasOwnProperty(name)) {
                a[name] = b[name];
            }
        }
    }

    function createEnum(type, flags) {
        ///<summary>Helper function</summary>
        for (var i in type.prototype) {
            type[i] = type.prototype[i];
        }
        // __xxx props are msajax/vs talking to each other
        type.__enum = true;
        type.__flags = flags;
    }

    g.MVCObject.prototype = {
        bindTo: function(key, target, targetKey, noNotify) {
            /// <summary>
            /// Binds a View to a Model.
            /// </summary>
            /// <param name="key" type="String"></param>
            /// <param name="target" type="MVCObject"></param>
            /// <param name="targetKey" type="String?"></param>
            /// <param name="noNotify" type="Boolean?"></param>
            /// <param name="" type=""></param>
        },
        changed: function(key) {
            /// <summary>
            /// Generic handler for state changes. Override this in derived classes to handle arbitrary state changes.
            /// </summary>
            /// <param name="key" type="String"></param>
        },
        get: function(key) {
            /// <summary>
            /// Gets a value.
            /// </summary>
            /// <param name="key" type="String"></param>
            /// <returns type="Object"/>
        },
        notify: function(key) {
            /// <summary>
            /// Notify all observers of a change on this property. This notifies both objects that are bound to the object's property
            /// as well as the object that it is bound to.
            /// </summary>
            /// <param name="key" type="String"></param>
        },
        set: function(key, value) {
            /// <summary>
            /// Sets a value.
            /// </summary>
            /// <param name="key" type="String"></param>
            /// <param name="value" type="Object"></param>
        },
        setValues: function(values) {
            /// <summary>
            /// Sets a collection of key-value pairs.
            /// </summary>
            /// <param name="values" type="Object"></param>
        },
        unbind: function(key) {
            /// <summary>
            /// Removes a binding. Unbinding will set the unbound property to the current value. The object will not be notified, as the value has not changed.
            /// </summary>
            /// <param name="key" type="String"></param>
        },
        unbindAll: function() {
            /// <summary>
            /// Removes all bindings.
            /// </summary>
        }
    };

    g.MVCArray.prototype = {
        forEach: function(callback) {
            /// <summary>
            /// Iterate over each element, calling the provided callback. The callback is called for each element like: callback(element, index).
            /// </summary>
            /// <param name="callback" type="Function">function(*, number)</param>
        },
        getAt: function(i) {
            /// <summary>
            /// Get an element at the specified index.
            /// </summary>
            /// <param name="i" type="Number"></param>
            /// <returns type="Object"/>
        },
        getLength: function() {
            /// <summary>
            /// Returns the number of elements in this array.
            /// </summary>
            /// <returns type="Number"/>
        },
        insertAt: function(i, elem) {
            /// <summary>
            /// Insert an element at the specified index.
            /// </summary>
            /// <param name="i" type="Number"></param>
            /// <param name="elem" type="Object"></param>
        },
        pop: function() {
            /// <summary>
            /// Removes the last element of the array and returns that element.
            /// </summary>
            /// <returns type="Object"/>
        },
        push: function(elem) {
            /// <summary>
            /// Adds one element to the end of the array and returns the new length of the array.
            /// </summary>
            /// <param name="elem" type="Object"></param>
            /// <returns type="Number"/>
        },
        removeAt: function(i) {
            /// <summary>
            /// Remove an element from the specified index.
            /// </summary>
            /// <param name="i" type="Number"></param>
            /// <returns type="Object"/>
        },
        setAt: function(i, elem) {
            /// <summary>
            /// Set an element at the specified index.
            /// </summary>
            /// <param name="i" type="Number"></param>
            /// <param name="elem" type="Object"></param>
        }
    }
    extend(g.MVCArray.prototype, g.MVCObject.prototype);

    g.Map.prototype = {
        fitBounds: function(bounds) {
            /// <summary>
            /// Sets the maps to fit to the given bounds.
            /// </summary>
            /// <param name="bounds" type="google.maps.LatLngBounds"></param>
        },
        getBounds: function() {
            /// <summary>
            /// Returns the lat/lng bounds of the current viewport. If the map is not yet initialized (i.e. the mapType is still null),
            /// or center and zoom have not been set then the result is null.
            /// </summary>
            /// <returns type="google.maps.LatLngBounds"/>
        },
        getCenter: function() {
            /// <summary>
            ///
            /// </summary>
            /// <returns type="google.maps.LatLng"/>
        },
        getDiv: function() {
            /// <summary>
            ///
            /// </summary>
            /// <returns domElement="true"/>
        },
        getMapTypeId: function() {
            /// <summary>
            /// MapTypeId
            /// </summary>
            /// <returns type="google.maps.MapTypeId"/>
        },
        getZoom: function() {
            /// <summary>
            ///
            /// </summary>
            /// <returns type="Number"/>
        },
        panBy: function(x, y) {
            /// <summary>
            /// Changes the center of the map by the given distance in pixels. If the distance is less than both the width and height of the map,
            /// the transition will be smoothly animated. Note that the map coordinate system increases from west to east (for x values) and north to south (for y values).
            /// </summary>
            /// <param name="x" type="Number"></param>
            /// <param name="y" type="Number"></param>
        },
        panTo: function(latLng) {
            /// <summary>
            /// Changes the center of the map to the given LatLng. If the change is less than both the width and height of the map, the transition will be smoothly animated.
            /// </summary>
            /// <param name="latLng" type="google.maps.LatLng"></param>
        },
        panToBounds: function(latLngBounds) {
            /// <summary>
            /// Pans the map by the minimum amount necessary to contain the given LatLngBounds. It makes no guarantee where on the map the bounds will be,
            /// except that as much of the bounds as possible will be visible. The bounds will be positioned inside the area bounded by the map type and
            /// navigation controls, if they are present on the map. If the bounds is larger than the map, the map will be shifted to include the northwest
            /// corner of the bounds. If the change in the map's position is less than both the width and height of the map, the transition will be smoothly animated.
            /// </summary>
            /// <param name="latLngBounds" type="google.maps.LatLngBounds"></param>
        },
        setCenter: function(latlng) {
            /// <summary>
            ///
            /// </summary>
            /// <param name="latlng" type="google.maps.LatLng"></param>
        },
        setMapTypeId: function(mapTypeId) {
            /// <summary>
            ///
            /// </summary>
            /// <param name="mapTypeId" type="google.maps.MapTypeId"></param>
        },
        setOptions: function(options) {
            /// <summary>
            ///
            /// </summary>
            /// <param name="options" type="google.maps.MapOptions"></param>
        },
        setZoom: function(zoom) {
            /// <summary>
            ///
            /// </summary>
            /// <param name="zoom" type="Number"></param>
        }
    };
    extend(g.Map.prototype, g.MVCObject.prototype);

    g.Marker.prototype = {
        getClickable: function() {
            /// <summary>
            ///
            /// </summary>
            /// <returns type="Boolean"/>
        },
        getCursor: function() {
            /// <summary>
            ///
            /// </summary>
            /// <returns type="String"/>
        },
        getDraggable: function() {
            /// <summary>
            ///
            /// </summary>
            /// <returns type="Boolean"/>
        },
        getFlat: function() {
            /// <summary>
            ///
            /// </summary>
            /// <returns type="Boolean"/>
        },
        getIcon: function() {
            /// <summary>
            ///
            /// </summary>
            /// <param name="" type=""></param>
            /// <returns type="google.maps.MarkerImage">or image url</returns>
        },
        getMap: function() {
            /// <summary>
            ///
            /// </summary>
            /// <returns type="google.maps.Map"/>
        },
        getPosition: function() {
            /// <summary>
            ///
            /// </summary>
            /// <returns type="google.maps.LatLng"/>
        },
        getShadow: function() {
            /// <summary>
            ///
            /// </summary>
            /// <returns type="google.maps.MarkerImage">or image url</returns>
        },
        getShape: function() {
            /// <summary>
            ///
            /// </summary>
            /// <returns type="Object"/>
        },
        getTitle: function() {
            /// <summary>
            ///
            /// </summary>
            /// <returns type="String"/>
        },
        getVisible: function() {
            /// <summary>
            ///
            /// </summary>
            /// <returns type="Boolean"/>
        },
        getZIndex: function() {
            /// <summary>
            ///
            /// </summary>
            /// <returns type="Number"/>
        },
        setClickable: function(flag) {
            /// <summary>
            ///
            /// </summary>
            /// <param name="flag" type="Boolean"></param>
        },
        setCursor: function(cursor) {
            /// <summary>
            ///
            /// </summary>
            /// <param name="cursor" type="String"></param>
        },
        setDraggable: function(flag) {
            /// <summary>
            ///
            /// </summary>
            /// <param name="flag" type="Boolean"></param>
        },
        setFlat: function(flag) {
            /// <summary>
            ///
            /// </summary>
            /// <param name="flag" type="Boolean"></param>
        },
        setIcon: function(icon) {
            /// <summary>
            ///
            /// </summary>
            /// <param name="icon" type="String|MarkerImage"></param>
        },
        setMap: function(map) {
            /// <summary>
            /// Renders the marker on the specified map. If map is set to null, the marker will be removed.
            /// </summary>
            /// <param name="map" type="Map"></param>
        },
        setOptions: function(options) {
            /// <summary>
            ///
            /// </summary>
            /// <param name="options" type="MarkerOptions"></param>
        },
        setPosition: function(latlng) {
            /// <summary>
            ///
            /// </summary>
            /// <param name="latlng" type="LatLng"></param>
        },
        setShadow: function(shadow) {
            /// <summary>
            ///
            /// </summary>
            /// <param name="shadow" type="String|MarkerImage"></param>
        },
        setShape: function(shape) {
            /// <summary>
            ///
            /// </summary>
            /// <param name="shape" type="Object"></param>
        },
        setTitle: function(title) {
            /// <summary>
            ///
            /// </summary>
            /// <param name="title" type="String"></param>
        },
        setVisible: function(visible) {
            /// <summary>
            ///
            /// </summary>
            /// <param name="visible" type="Boolean"></param>
        },
        setZIndex: function(zIndex) {
            /// <summary>
            ///
            /// </summary>
            /// <param name="zIndex" type="Number"></param>
        }
    };
    extend(g.Marker.prototype, g.MVCObject.prototype);

    g.Polyline.prototype = {
        getMap: function() {
            /// <summary>
            /// Returns the map on which this poly is attached.
            /// </summary>
            /// <returns type="google.maps.Map"/>
        },
        getPath: function() {
            /// <summary>
            ///Retrieves the first path.
            /// </summary>
            /// <returns type="google.maps.MVCArray"/>
        },
        setMap: function(map) {
            /// <summary>
            /// Renders this Polyline or Polygon on the specified map. If map is set to null, the Poly will be removed.
            /// </summary>
            /// <param name="map" type="Map"></param>
        },
        setOptions: function(options) {
            /// <summary>
            ///
            /// </summary>
            /// <param name="options" type="PolylineOptions"></param>
        },
        setPath: function(path) {
            /// <summary>
            /// Sets the first path. See Polyline options for more details.
            /// </summary>
            /// <param name="path" type="MVCArray.&lt;LatLng>|Array.&lt;LatLng>"></param>
        }
    };
    extend(g.Polyline.prototype, g.MVCObject.prototype);

    g.Polygon.prototype = {
        getMap: function() {
            /// <summary>
            /// Returns the map on which this poly is attached.
            /// </summary>
            /// <returns type="google.maps.Map"/>
        },
        getPath: function() {
            /// <summary>
            /// Retrieves the first path.
            /// </summary>
            /// <returns type="google.maps.MVCArray"/>
        },
        getPaths: function() {
            /// <summary>
            /// Retrieves the paths for this Polygon.
            /// </summary>
            /// <returns type="google.maps.MVCArray"/>
        },
        setMap: function(map) {
            /// <summary>
            /// Renders this Polyline or Polygon on the specified map. If map is set to null, the Poly will be removed.
            /// </summary>
            /// <param name="map" type="google.maps.Map"></param>
        },
        setOptions: function(options) {
            /// <summary>
            ///
            /// </summary>
            /// <param name="options" type="PolygonOptions"></param>
        },
        setPath: function(path) {
            /// <summary>
            /// Sets the first path. See Polyline options for more details.
            /// </summary>
            /// <param name="path" type="MVCArray.&lt;LatLng>|Array.&lt;LatLng>"></param>
        },
        setPaths: function(paths) {
            /// <summary>
            /// Sets the path for this Polygon.
            /// </summary>
            /// <param name="paths" type="MVCArray.&lt;MVCArray.&lt;LatLng>>|MVCArray.&lt;LatLng>|Array.&lt;Array.&lt;LatLng>>|Array.&lt;LatLng>"></param>
        }
    };
    extend(g.Polygon.prototype, g.MVCObject.prototype);

    g.InfoWindow.prototype = {
        close: function() {
            /// <summary>
            /// Closes this InfoWindow by removing it from the DOM structure.
            /// </summary>
        },
        getContent: function() {
            /// <summary>
            ///
            /// </summary>
            /// <param name="" type=""></param>
            /// <returns domElement="true">or string</returns>
        },
        getPosition: function() {
            /// <summary>
            ///
            /// </summary>
            /// <returns type="google.maps.LatLng"/>
        },
        getZIndex: function() {
            /// <summary>
            ///
            /// </summary>
            /// <returns type="Number"/>
        },
        open: function(map, anchor) {
            /// <summary>
            /// Opens this InfoWindow on the given map. Optionally, an InfoWindow can be associated with an anchor. In the core API, the only
            /// anchor is the Marker class. However, an anchor can be any MVCObject that exposes the position property and optionally pixelBounds
            /// for calculating the pixelOffset (see InfoWindowOptions).
            /// </summary>
            /// <param name="map" type="google.maps.Map"></param>
            /// <param name="anchor" type="MVCObject?"></param>
        },
        setContent: function(content) {
            /// <summary>
            ///
            /// </summary>
            /// <param name="content" type="String|Node"></param>
        },
        setOptions: function(options) {
            /// <summary>
            ///
            /// </summary>
            /// <param name="options" type="InfoWindowOptions"></param>
        },
        setPosition: function(position) {
            /// <summary>
            ///
            /// </summary>
            /// <param name="position" type="google.maps.LatLng"></param>
        },
        setZIndex: function(zIndex) {
            /// <summary>
            ///
            /// </summary>
            /// <param name="zIndex" type="Number"></param>
        }
    };
    extend(g.InfoWindow.prototype, g.MVCObject.prototype);

    g.DirectionsRenderer.prototype = {
        getDirections: function() {
            /// <summary>
            /// Returns the renderer's current set of directions.
            /// </summary>
            /// <returns type="google.maps.DirectionsResult"/>
        },
        getMap: function() {
            /// <summary>
            /// Returns the map on which the DirectionsResult is rendered.
            /// </summary>
            /// <returns type="google.maps.Map"/>
        },
        getPanel: function() {
            /// <summary>
            /// Returns the panel &lt;div> in which the DirectionsResult is rendered.
            /// </summary>
            /// <returns domElement="true"/>
        },
        getTripIndex: function() {
            /// <summary>
            /// Returns the current trip index in use by this DirectionsRenderer object.
            /// </summary>
            /// <returns type="Number"/>
        },
        setDirections: function(directions) {
            /// <summary>
            /// Set the renderer to use the result from the DirectionsService. Setting a valid set of directions in this manner will display
            /// the directions on the renderer's designated map and panel.
            /// </summary>
            /// <param name="directions" type="DirectionsResult"></param>
        },
        setMap: function(map) {
            /// <summary>
            /// This method specifies the map on which directions will be rendered. Pass null to remove the directions from the map.
            /// </summary>
            /// <param name="map" type="Map"></param>
        },
        setPanel: function(panel) {
            /// <summary>
            /// This method renders the directions in a &lt;div>. Pass null to remove the content from the panel.
            /// </summary>
            /// <param name="panel" domElement="true"></param>
        },
        setTripIndex: function(tripIndex) {
            /// <summary>
            /// Set the index of the trip in the DirectionsResult object to render. By default, the first trip in the array will be rendered.
            /// </summary>
            /// <param name="tripIndex" type="Number"></param>
        }
    };
    extend(g.DirectionsRenderer.prototype, g.MVCObject.prototype);

    g.OverlayView.prototype = {
        draw: function() {
            /// <summary>
            /// Implement this method to draw or update the overlay. This method is called after onAdd() and when the position from projection.fromLatLngToPixel()
            /// would return a new value for a given LatLng. This can happen on change of zoom, center, or map type. It is not necessarily called on drag or resize.
            /// </summary>
        },
        getMap: function() {
            /// <summary>
            ///
            /// </summary>
            /// <returns type="google.maps.Map"/>
        },
        getPanes: function() {
            /// <summary>
            /// Returns the panes in which this OverlayView can be rendered. Only available after draw has been called.
            /// </summary>
            /// <returns type="google.maps.MapPanes"/>
        },
        getProjection: function() {
            /// <summary>
            /// Returns the MapCanvasProjection object associated with this OverlayView. Only available after draw has been called.
            /// </summary>
            /// <returns type="google.maps.MapCanvasProjection"/>
        },
        onAdd: function() {
            /// <summary>
            /// Implement this method to initialize the overlay DOM elements. This method is called once after setMap() is called with a valid map.
            /// At this point, panes and projection will have been initialized.
            /// </summary>
        },
        onRemove: function() {
            /// <summary>
            /// Implement this method to remove your elements from the DOM. This method is called once following a call to setMap(null).
            /// </summary>
        },
        setMap: function(map) {
            /// <summary>
            /// Adds the overlay to the map.
            /// </summary>
            /// <param name="map" type="Map"></param>
        }
    };
    extend(g.OverlayView.prototype, g.MVCObject.prototype);

    g.Rectangle.prototype = {
        getBounds: function() {
            /// <summary>
            /// Returns the bounds of this rectangle.
            /// </summary>
            /// <returns type="google.maps.LatLngBounds"/>
        },
        getMap: function() {
            /// <summary>
            /// Returns the map on which this rectangle is displayed.
            /// </summary>
            /// <returns type="google.maps.Map"/>
        },
        setBounds: function(bounds) {
            /// <summary>
            /// Sets the bounds of this rectangle.
            /// </summary>
            /// <param name="bounds" type="LatLngBounds"></param>
        },
        setMap: function(map) {
            /// <summary>
            /// Renders the rectangle on the specified map. If map is set to null, the rectangle will be removed.
            /// </summary>
            /// <param name="map" type="Map"></param>
        },
        setOptions: function(options) {
            /// <summary>
            ///
            /// </summary>
            /// <param name="options" type="RectangleOptions"></param>
        }
    };
    extend(g.Rectangle.prototype, g.MVCObject.prototype);

    g.Circle.prototype = {
        getCenter: function() {
            /// <summary>
            /// Returns the center of this circle.
            /// </summary>
            /// <returns type="google.maps.LatLng"/>
        },
        getMap: function() {
            /// <summary>
            /// Returns the map on which this circle is displayed.
            /// </summary>
            /// <returns type="google.maps.Map"/>
        },
        getRadius: function() {
            /// <summary>
            /// Returns the radius of this circle (in meters).
            /// </summary>
            /// <returns type="Number"/>
        },
        setCenter: function(center) {
            /// <summary>
            /// Sets the center of this circle.
            /// </summary>
            /// <param name="center" type="LatLng"></param>
        },
        setMap: function(map) {
            /// <summary>
            /// Renders the circle on the specified map. If map is set to null, the circle will be removed.
            /// </summary>
            /// <param name="map" type="Map"></param>
        },
        setOptions: function(options) {
            /// <summary>
            ///
            /// </summary>
            /// <param name="options" type="CircleOptions"></param>
        },
        setRadius: function(radius) {
            /// <summary>
            /// Sets the radius of this circle (in meters).
            /// </summary>
            /// <param name="radius" type="Number"></param>
        }
    };
    extend(g.Circle.prototype, g.MVCObject.prototype);

    g.LatLng.prototype = {
        equals: function(other) {
            /// <summary>
            /// Comparison function.
            /// </summary>
            /// <param name="other" type="google.maps.LatLng"></param>
            /// <returns type="Boolean"/>
        },
        lat: function() {
            /// <summary>
            /// Returns the latitude in degrees.
            /// </summary>
            /// <returns type="Number"/>
        },
        lng: function() {
            /// <summary>
            /// Returns the longitude in degrees.
            /// </summary>
            /// <returns type="Number"/>
        },
        toString: function() {
            /// <summary>
            /// Converts to string representation.
            /// </summary>
            /// <returns type="String"/>
        },
        toUrlValue: function(precision) {
            /// <summary>
            /// Returns a string of the form "lat,lng" for this LatLng. We round the lat/lng values to 6 decimal places by default.
            /// </summary>
            /// <param name="precision" type="Number?"></param>
            /// <returns type="String"/>
        }
    };

    g.LatLngBounds.prototype = {
        contains: function(point) {
            /// <summary>
            /// Returns true if the given lat/lng is in this bounds.
            /// </summary>
            /// <param name="point" type="google.maps.LatLng"></param>
            /// <returns type="Boolean"/>
        },
        equals: function(other) {
            /// <summary>
            /// Returns true if this bounds approximately equals the given bounds.
            /// </summary>
            /// <param name="other" type="google.maps.LatLngBounds"></param>
            /// <returns type="Boolean"/>
        },
        extend: function(point) {
            /// <summary>
            /// Extends this bounds to contain the given point.
            /// </summary>
            /// <param name="point" type="google.maps.LatLng"></param>
            /// <returns type="google.maps.LatLngBounds"/>
        },
        getCenter: function() {
            /// <summary>
            /// Computes the center of this LatLngBounds
            /// </summary>
            /// <returns type="google.maps.LatLng"/>
        },
        getNorthEast: function() {
            /// <summary>
            /// Returns the north-east corner of this bounds.
            /// </summary>
            /// <returns type="google.maps.LatLng"/>
        },
        getSouthWest: function() {
            /// <summary>
            /// Returns the south-west corner of this bounds.
            /// </summary>
            /// <returns type="google.maps.LatLng"/>
        },
        intersects: function(other) {
            /// <summary>
            /// Returns true if this bounds shares any points with this bounds.
            /// </summary>
            /// <param name="other" type="google.maps.LatLngBounds"></param>
            /// <returns type="Boolean"/>
        },
        isEmpty: function() {
            /// <summary>
            /// Returns if the bounds are empty.
            /// </summary>
            /// <returns type="Boolean"/>
        },
        toSpan: function() {
            /// <summary>
            /// Converts the given map bounds to a lat/lng span.
            /// </summary>
            /// <returns type="google.maps.LatLng"/>
        },
        toString: function() {
            /// <summary>
            /// Converts to string.
            /// </summary>
            /// <returns type="String"/>
        },
        toUrlValue: function(precision) {
            /// <summary>
            /// Returns a string of the form "lat_lo,lng_lo,lat_hi,lng_hi" for this bounds, where "lo" corresponds to the southwest corner of the
            /// bounding box, while "hi" corresponds to the northeast corner of that box.
            /// </summary>
            /// <param name="precision" type="Number?"></param>
            /// <returns type="String"/>
        },
        union: function(other) {
            /// <summary>
            /// Extends this bounds to contain the union of this and the given bounds.
            /// </summary>
            /// <param name="other" type="google.maps.LatLngBounds"></param>
            /// <returns type="google.maps.LatLngBounds"/>
        }
    };

    g.Point.prototype = {
        equals: function(other) {
            /// <summary>
            /// Compares two Points.
            /// </summary>
            /// <param name="other" type="Point"></param>
            /// <returns type="Boolean"/>
        },
        toString: function() {
            /// <summary>
            /// Returns a string representation of this Point.
            /// </summary>
            /// <returns type="String"/>
        }
    };

    g.Size.prototype = {
        equals: function(other) {
            /// <summary>
            /// Compares two Sizes.
            /// </summary>
            /// <param name="other" type="google.maps.Size"></param>
            /// <returns type="Boolean"/>
        },
        toString: function() {
            /// <summary>
            /// Returns a string representation of this Size.
            /// </summary>
            /// <returns type="String"/>
        }
    };

    g.MapTypeId.prototype = {
        HYBRID: "hybrid",
        ROADMAP: "roadmap",
        SATELLITE: "satellite",
        TERRAIN: "terrain"
    };
    createEnum(g.MapTypeId, false);

    g.MapTypeControlStyle.prototype = {
        DEFAULT: 0,
        DROPDOWN_MENU: 2,
        HORIZONTAL_BAR: 1
    };
    createEnum(g.MapTypeControlStyle, false);

    g.NavigationControlStyle.prototype = {
        ANDROID: 2,
        DEFAULT: 0,
        SMALL: 1,
        ZOOM_PAN: 3
    };
    createEnum(g.NavigationControlStyle, false);

    g.ScaleControlStyle.prototype = {
        DEFAULT: 0
    };
    createEnum(g.ScaleControlStyle, false);

    g.ControlPosition.prototype = {
        BOTTOM: "B",
        BOTTOM_LEFT: "BL",
        BOTTOM_RIGHT: "BR",
        LEFT: "L",
        RIGHT: "R",
        TOP: "T",
        TOP_LEFT: "TL",
        TOP_RIGHT: "TR"
    };
    createEnum(g.ControlPosition, false);

    g.GeocoderStatus.prototype = {
        ERROR: "ERROR",
        INVALID_REQUEST: "INVALID_REQUEST",
        OK: "OK",
        OVER_QUERY_LIMIT: "OVER_QUERY_LIMIT",
        REQUEST_DENIED: "REQUEST_DENIED",
        UNKNOWN_ERROR: "UNKNOWN_ERROR",
        ZERO_RESULTS: "ZERO_RESULTS"
    };
    createEnum(g.GeocoderStatus, false);

    g.GeocoderLocationType.prototype = {
        APPROXIMATE: "APPROXIMATE",
        GEOMETRIC_CENTER: "GEOMETRIC_CENTER",
        RANGE_INTERPOLATED: "RANGE_INTERPOLATED",
        ROOFTOP: "ROOFTOP"
    };
    createEnum(g.GeocoderLocationType, false);

    g.DirectionsTravelMode.prototype = {
        DRIVING: "DRIVING",
        tp: "TRANSIT",
        WALKING: "WALKING"
    };
    createEnum(g.DirectionsTravelMode, false);

    g.DirectionsUnitSystem.prototype = {
        IMPERIAL: 1,
        METRIC: 0
    };
    createEnum(g.DirectionsUnitSystem, false);

    g.DirectionsStatus.prototype = {
        INVALID_REQUEST: "INVALID_REQUEST",
        MAX_WAYPOINTS_EXCEEDED: "MAX_WAYPOINTS_EXCEEDED",
        NOT_FOUND: "NOT_FOUND",
        OK: "OK",
        OVER_QUERY_LIMIT: "OVER_QUERY_LIMIT",
        REQUEST_DENIED: "REQUEST_DENIED",
        UNKNOWN_ERROR: "UNKNOWN_ERROR",
        ZERO_RESULTS: "ZERO_RESULTS"
    };
    createEnum(g.DirectionsStatus, false);

    g.MapCanvasProjection.prototype = {
        fromContainerPixelToLatLng: function(pixel) {
            /// <summary>
            /// Computes the geographical coordinates from pixel coordinates in the map's container.
            /// </summary>
            /// <param name="pixel" type="Point"></param>
            /// <returns type="google.maps.LatLng"/>
        },
        fromDivPixelToLatLng: function(pixel) {
            /// <summary>
            /// Computes the geographical coordinates from pixel coordinates in the div that holds the draggable map.
            /// </summary>
            /// <param name="pixel" type="Point"></param>
            /// <returns type="google.maps.LatLng"/>
        },
        fromLatLngToContainerPixel: function(latLng) {
            /// <summary>
            /// Computes the pixel coordinates of the given geographical location in the DOM element the map's outer container.
            /// </summary>
            /// <param name="latLng" type="google.maps.LatLng"></param>
            /// <returns type="google.maps.Point"/>
        },
        fromLatLngToDivPixel: function(latLng) {
            /// <summary>
            /// Computes the pixel coordinates of the given geographical location in the DOM element that holds the draggable map.
            /// </summary>
            /// <param name="latLng" type="google.maps.LatLng"></param>
            /// <returns type="google.maps.Point"/>
        },
        getWorldWidth: function() {
            /// <summary>
            /// The width of the world in pixels in the current zoom level.
            /// </summary>
            /// <param name="" type=""></param>
            /// <returns type="Number"/>
        }
    };

    g.MapType.prototype = {
        getTile: function(tileCoord, zoom, ownerDocument) {
            /// <summary>
            /// Returns a tile for the given tile coordinate (x, y) and zoom level. This tile will be appended to the given ownerDocument.
            /// </summary>
            /// <param name="tileCoord" type="Point"></param>
            /// <param name="zoom" type="Number"></param>
            /// <param name="ownerDocument" domElement="true"></param>
            /// <returns domElement="true"/>
        },
        releaseTile: function(tile) {
            /// <summary>
            /// Releases the given tile, performing any necessary cleanup. The provided tile will have already been removed from the document. Optional.
            /// </summary>
            /// <param name="tile" domElement="true"></param>
        }
    };

    g.Projection.prototype = {
        fromLatLngToPoint: function(latLng, point) {
            /// <summary>
            /// Translates from the LatLng cylinder to the Point plane. This interface specifies a function which implements translation from given LatLng values to world coordinates on the map projection. The Maps API calls this method when it needs to plot locations on screen. Projection objects must implement this method.
            /// </summary>
            /// <param name="latLng" type="google.maps.LatLng"></param>
            /// <param name="point" type="Point?"></param>
            /// <returns type="google.maps.Point"/>
        },
        fromPointToLatLng: function(pixel, nowrap) {
            /// <summary>
            /// This interface specifies a function which implements translation from world coordinates on a map projection to LatLng values. The Maps API calls this method when it needs to translate actions on screen to positions on the map. Projection objects must implement this method.
            /// </summary>
            /// <param name="pixel" type="Point"></param>
            /// <param name="nowrap" type="Boolean?"></param>
            /// <returns type="google.maps.LatLng"/>
        }
    };

    g.Geocoder.prototype = {
        geocode: function(request, callback) {
            /// <summary>
            /// Geocode a request.
            /// </summary>
            /// <param name="request" type="GeocoderRequest"></param>
            /// <param name="callback" type="Function">Function(Array.&lt;GeocoderResponse>, GeocoderStatus)</param>
        }
    };

    g.Geocoder.prototype.geocodeAddress = function(address, callback) {
        /// <summary>
        /// Geocode an address. An example of documenting your extensions.
        /// NOTE: if you remove this method or choose not to deploy the convenience
        /// constructors, you may wish to remove the definition for this method
        /// from -vsdoc.js
        /// </summary>
        /// <param name="address" type="String"></param>
        /// <param name="callback" type="Function">Function(Array.&lt;GeocoderResponse>, GeocoderStatus)</param>
    };


    g.DirectionsService.prototype = {
        route: function(request, callback) {
            /// <summary>
            /// Issue a directions search request.
            /// </summary>
            /// <param name="request" type="google.maps.DirectionsRequest"></param>
            /// <param name="callback" type="Function">Function(DirectionsResult, DirectionsStatus)</param>
        }
    };

    g.MapTypeRegistry.prototype = {
        bindTo: function(a, b, c, d) {
            /// <summary>
            ///
            /// </summary>
            /// <param name="a" type=""></param>
            /// <param name="b" type=""></param>
            /// <param name="c" type=""></param>
            /// <param name="d" type=""></param>
        },
        changed: function() {
            /// <summary>
            ///
            /// </summary>
        },
        get: function(a) {
            /// <summary>
            ///
            /// </summary>
            /// <param name="a" type=""></param>
        },
        notify: function(a) {
            /// <summary>
            ///
            /// </summary>
            /// <param name="a" type=""></param>
        },
        set: function(a, b) {
            /// <summary>
            ///
            /// </summary>
            /// <param name="a" type=""></param>
            /// <param name="b" type=""></param>
        },
        setValues: function(a) {
            /// <summary>
            ///
            /// </summary>
            /// <param name="a" type=""></param>
        },
        unbind: function(a) {
            /// <summary>
            ///
            /// </summary>
            /// <param name="a" type=""></param>
        },
        unbindAll: function() {
            /// <summary>
            ///
            /// </summary>
        }
    };

    g.LatLng.__class = true;
    g.LatLngBounds.__class = true;
    g.Point.__class = true;
    g.Size.__class = true;
    g.Map.__class = true;
    g.MapCanvasProjection.__class = true;
    g.Marker.__class = true;
    g.MarkerImage.__class = true;
    g.Polyline.__class = true;
    g.Polygon.__class = true;
    g.InfoWindow.__class = true;
    g.OverlayView.__class = true;
    g.Projection.__class = true;
    g.ImageMapType.__class = true;
    g.Rectangle.__class = true;
    g.Circle.__class = true;
    g.MapsEventListener.__class = true;
    g.events.__class = true;
    g.MouseEvent.__class = true;
    g.MVCObject.__class = true;
    g.MVCArray.__class = true;
    g.Geocoder.__class = true;
    g.DirectionsRenderer.__class = true;
    g.DirectionsService.__class = true;
})(this);