"use strict";

const scrollModule = require('./scrollHide.module');
scrollModule.directive('scrollHide', scrollHide);

/** @ngInject */
function scrollHide($window) {
    return {
        scope: {
            h: '='
        },
        link: function(scope, elem, attr) {
            var e = elem[0];
            var hideClass = ' ' + attr.hideclass + ' ';
            var showClass = ' ' + attr.showclass + ' ';
            var target = document.getElementById(attr.eleid);
     

            elem.bind('scroll', function() {

                console.log(target.className, scope.h);
                if (e.scrollTop >= scope.h) {
                    if (target.className.indexOf(showClass.trim()) !== -1) {
                        target.className.replace(showClass.trim(), '');
                        target.className = e.className + hideClass;
                    }
                } else {
                    if (target.className.indexOf(hideClass.trim()) !== -1) {
                        target.className.replace(hideClass.trim(), '');
                        target.className = e.className + showClass;
                    }
                }
                if (Math.abs(e.scrollTop - scope.h) > 30) scope.h = e.scrollTop;
            });
        }
    };
}
