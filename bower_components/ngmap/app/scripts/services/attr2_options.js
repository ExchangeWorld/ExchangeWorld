/**
 * @ngdoc service
 * @name Attr2Options
 * @description 
 *   Converts tag attributes to options used by google api v3 objects, map, marker, polygon, circle, etc.
 */
/* global google */
(function() {
  'use strict';

  var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
  var MOZ_HACK_REGEXP = /^moz([A-Z])/;  

  function camelCase(name) {
    return name.
      replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
        return offset ? letter.toUpperCase() : letter;
      }).
      replace(MOZ_HACK_REGEXP, 'Moz$1');
  }

  function JSONize(str) {
    try {       // if parsable already, return as it is
      JSON.parse(str);
      return str;
    } catch(e) { // if not parsable, change little
      return str
        // wrap keys without quote with valid double quote
        .replace(/([\$\w]+)\s*:/g, function(_, $1){return '"'+$1+'":'})
        // replacing single quote wrapped ones to double quote 
        .replace(/'([^']+)'/g, function(_, $1){return '"'+$1+'"'})
    }
  }

  var Attr2Options = function($parse, $timeout, NavigatorGeolocation, GeoCoder) { 

    /**
     * Returns the attributes of an element as hash
     * @memberof Attr2Options
     * @param {HTMLElement} el html element
     * @returns {Hash} attributes
     */
    var orgAttributes = function(el) {
      (el.length > 0) && (el = el[0]);
      var orgAttributes = {};
      for (var i=0; i<el.attributes.length; i++) {
        var attr = el.attributes[i];
        orgAttributes[attr.name] = attr.value;
      }
      return orgAttributes;
    };

    var toOptionValue = function(input, options) {
      var output, key=options.key, scope=options.scope;
      try { // 1. Number?
        var num = Number(input);
        if (isNaN(num)) {
          throw "Not a number";
        } else  {
          output = num;
        }
      } catch(err) { 
        try { // 2.JSON?
          if (input.match(/^[\+\-]?[0-9\.]+,[ ]*\ ?[\+\-]?[0-9\.]+$/)) { // i.e "-1.0, 89.89"
            input = "["+input+"]";
          }
          output = JSON.parse(JSONize(input));
          if (output instanceof Array) {
            var t1stEl = output[0];
            if (t1stEl.constructor == Object) { // [{a:1}] : not lat/lng ones
            } else if (t1stEl.constructor == Array) { // [[1,2],[3,4]] 
              output =  output.map(function(el) {
                return new google.maps.LatLng(el[0], el[1]);
              });
            } else if(!isNaN(parseFloat(t1stEl)) && isFinite(t1stEl)) {
              return new google.maps.LatLng(output[0], output[1]);
            }
          }
        } catch(err2) {
          // 3. Object Expression. i.e. LatLng(80,-49)
          if (input.match(/^[A-Z][a-zA-Z0-9]+\(.*\)$/)) {
            try {
              var exp = "new google.maps."+input;
              output = eval(exp); // TODO, still eval
            } catch(e) {
              output = input;
            } 
          // 4. Object Expression. i.e. MayTypeId.HYBRID 
          } else if (input.match(/^([A-Z][a-zA-Z0-9]+)\.([A-Z]+)$/)) {
            try {
              var matches = input.match(/^([A-Z][a-zA-Z0-9]+)\.([A-Z]+)$/);
              output = google.maps[matches[1]][matches[2]];
            } catch(e) {
              output = input;
            } 
          // 5. Object Expression. i.e. HYBRID 
          } else if (input.match(/^[A-Z]+$/)) {
            try {
              var capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
              if (key.match(/temperatureUnit|windSpeedUnit|labelColor/)) {
                capitalizedKey = capitalizedKey.replace(/s$/,"");
                output = google.maps.weather[capitalizedKey][input];
              } else {
                output = google.maps[capitalizedKey][input];
              }
            } catch(e) {
              output = input;
            }
          } else {
            output = input;
          }
        } // catch(err2)
      } // catch(err)
      return output;
    };

    var getAttrsToObserve = function(attrs) {
      var attrsToObserve = [];
      if (attrs["ng-repeat"] || attrs.ngRepeat) {  // if element is created by ng-repeat, don't observe any
        void(0);
      } else {
        for (var attrName in attrs) {
          var attrValue = attrs[attrName];
          if (attrValue && attrValue.match(/\{\{.*\}\}/)) { // if attr value is {{..}}
            console.log('setting attribute to observe', attrName, camelCase(attrName), attrValue);
            attrsToObserve.push(camelCase(attrName));
          }
        }
      }
      return attrsToObserve;
    };

    /**
     * filters attributes by skipping angularjs methods $.. $$..
     * @memberof Attr2Options
     * @param {Hash} attrs tag attributes
     * @returns {Hash} filterd attributes
     */
    var filter = function(attrs) {
      var options = {};
      for(var key in attrs) {
        if (key.match(/^\$/) || key.match(/^ng[A-Z]/)) {
          void(0);
        } else {
          options[key] = attrs[key];
        }
      }
      return options;
    };

    /**
     * converts attributes hash to Google Maps API v3 options  
     * ```
     *  . converts numbers to number   
     *  . converts class-like string to google maps instance   
     *    i.e. `LatLng(1,1)` to `new google.maps.LatLng(1,1)`  
     *  . converts constant-like string to google maps constant    
     *    i.e. `MapTypeId.HYBRID` to `google.maps.MapTypeId.HYBRID`   
     *    i.e. `HYBRID"` to `google.maps.MapTypeId.HYBRID`  
     * ```
     * @memberof Attr2Options
     * @param {Hash} attrs tag attributes
     * @param {scope} scope angularjs scope
     * @returns {Hash} options converted attributess
     */
    var getOptions = function(attrs, scope) {
      var options = {};
      for(var key in attrs) {
        if (attrs[key]) {
          if (key.match(/^on[A-Z]/)) { //skip events, i.e. on-click
            continue;
          } else if (key.match(/ControlOptions$/)) { // skip controlOptions
            continue;
          } else {
            options[key] = toOptionValue(attrs[key], {scope:scope, key: key});
          }
        } // if (attrs[key])
      } // for(var key in attrs)
      return options;
    };

    /**
     * converts attributes hash to scope-specific event function 
     * @memberof Attr2Options
     * @param {scope} scope angularjs scope
     * @param {Hash} attrs tag attributes
     * @returns {Hash} events converted events
     */
    var getEvents = function(scope, attrs) {
      var events = {};
      var toLowercaseFunc = function($1){
        return "_"+$1.toLowerCase();
      };
      var eventFunc = function(attrValue) {
        var matches = attrValue.match(/([^\(]+)\(([^\)]*)\)/);
        var funcName = matches[1];
        var argsStr = matches[2].replace(/event[ ,]*/,'');  //remove string 'event'
        
        var args = scope.$eval("["+argsStr+"]");
        return function(event) {
          function index(obj,i) {return obj[i];}
          var f = funcName.split('.').reduce(index, scope);
          f && f.apply(this, [event].concat(args));
          $timeout( function() {
            scope.$apply();
          });
        };
      };

      for(var key in attrs) {
        if (attrs[key]) {
          if (!key.match(/^on[A-Z]/)) { //skip if not events
            continue;
          }
          
          //get event name as underscored. i.e. zoom_changed
          var eventName = key.replace(/^on/,'');
          eventName = eventName.charAt(0).toLowerCase() + eventName.slice(1);
          eventName = eventName.replace(/([A-Z])/g, toLowercaseFunc);

          var attrValue = attrs[key];
          events[eventName] = new eventFunc(attrValue);
        }
      }
      return events;
    };

    /**
     * control means map controls, i.e streetview, pan, etc, not a general control
     * @memberof Attr2Options
     * @param {Hash} filtered filtered tag attributes
     * @returns {Hash} Google Map options
     */
    var getControlOptions = function(filtered) {
      var controlOptions = {};
      if (typeof filtered != 'object') {
        return false;
      }

      for (var attr in filtered) {
        if (filtered[attr]) {
          if (!attr.match(/(.*)ControlOptions$/)) { 
            continue; // if not controlOptions, skip it
          }

          //change invalid json to valid one, i.e. {foo:1} to {"foo": 1}
          var orgValue = filtered[attr];
          var newValue = orgValue.replace(/'/g, '"');
          newValue = newValue.replace(/([^"]+)|("[^"]+")/g, function($0, $1, $2) {
            if ($1) {
              return $1.replace(/([a-zA-Z0-9]+?):/g, '"$1":');
            } else {
              return $2; 
            } 
          });
          try {
            var options = JSON.parse(newValue);
            for (var key in options) { //assign the right values
              if (options[key]) {
                var value = options[key];
                if (typeof value === 'string') {
                  value = value.toUpperCase();
                } else if (key === "mapTypeIds") {
                  value = value.map( function(str) {
                    if (str.match(/^[A-Z]+$/)) { // if constant
                      return google.maps.MapTypeId[str.toUpperCase()];
                    } else { // else, custom map-type
                      return str;
                    }
                  });
                } 
                
                if (key === "style") {
                  var str = attr.charAt(0).toUpperCase() + attr.slice(1);
                  var objName = str.replace(/Options$/,'')+"Style";
                  options[key] = google.maps[objName][value];
                } else if (key === "position") {
                  options[key] = google.maps.ControlPosition[value];
                } else {
                  options[key] = value;
                }
              }
            }
            controlOptions[attr] = options;
          } catch (e) {
            console.error('invald option for', attr, newValue, e, e.stack);
          }
        }
      } // for

      return controlOptions;
    };

    return {
      camelCase: camelCase,
      filter: filter,
      getOptions: getOptions,
      getEvents: getEvents,
      getControlOptions: getControlOptions,
      toOptionValue: toOptionValue,
      getAttrsToObserve: getAttrsToObserve,
      orgAttributes: orgAttributes
    }; // return

  }; 

  angular.module('ngMap').service('Attr2Options', ['$parse', '$timeout', 'NavigatorGeolocation', 'GeoCoder', Attr2Options]);
})();
