###
	- interface for all markers to derrive from
 	- to enforce a minimum set of requirements
 		- attributes
 			- coords
 			- icon
		- implementation needed on watches
###
angular.module("uiGmapgoogle-maps.directives.api.models.parent")
.factory "uiGmapIMarkerParentModel", ["uiGmapModelKey","uiGmapLogger", (ModelKey, Logger) ->
  class IMarkerParentModel extends ModelKey
    DEFAULTS: {}
    constructor: (@scope, @element, @attrs, @map) ->
      super(@scope)
      @$log = Logger
      # Validate required properties
      throw new String("Unable to construct IMarkerParentModel due to invalid scope") unless @validateScope scope
      @doClick = angular.isDefined attrs.click
      if scope.options?
        @DEFAULTS = scope.options
      # Wrap marker initialization inside a $timeout() call to make sure the map is created already
      @watch 'coords', @scope
      @watch 'icon', @scope
      @watch 'options', @scope
      scope.$on "$destroy", =>
        @onDestroy(scope)

    validateScope: (scope)=>
      unless scope?
        @$log.error(@constructor.name + ": invalid scope used")
        return false
      ret = scope.coords?
      unless ret
        @$log.error(@constructor.name + ": no valid coords attribute found")
        return false
      ret

    watch: (propNameToWatch, scope, equalityCheck = true) =>
      scope.$watch propNameToWatch, (newValue, oldValue) =>
        if ! _.isEqual newValue,oldValue
          @onWatch(propNameToWatch, scope, newValue, oldValue)
      , equalityCheck

    onWatch: (propNameToWatch, scope, newValue, oldValue) =>

    onDestroy: (scope) =>
      throw new String("OnDestroy Not Implemented!!")

  return IMarkerParentModel
]
