
var app = angular.module('starter.directives', []);

app.directive(
    "bnFadeHelper",
    function() {
        function compile( element, attributes, transclude ) {
            element.prepend( "<div class='fader image'></div>" );
            return( link );
        }
        function link( $scope, element, attributes ) {
            var fader = element.find( "div.fader" );
            var primary = element.find( "div.main" );

            $scope.$watch(
                "image.source",
                function( newValue, oldValue ) {
                    if ( newValue === oldValue ) {
                        return;
                    }
                    if ( isFading() ) {
                        return;
                    }
                    initFade( oldValue );
                }
            );
            function initFade( fadeSource ) {
                fader
                    .css( "background-image", 'url("' + fadeSource + '")' )
                    .addClass("show").show()
                ;
                var img = new Image();
                img.onload = function() {
                    startFade();
                };
                img.src = $("div.main").css('backgroundImage').replace('url("', '').replace('")', '');
            }
            function isFading() {
                return fader.hasClass("show");
            }
            function startFade() {
                //fader.fadeOut("slow", teardownFade);
            }
            function teardownFade() {
                fader.removeClass( "show" );

            }
        }
        // Return the directive configuration.
        return({
            compile: compile,
            restrict: "A"
        });
    }
);