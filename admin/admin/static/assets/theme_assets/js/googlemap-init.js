(function(){
    "use strict";
    function initialize(selector, lat, lang, style, myIcon) {
        var myCenter = new google.maps.LatLng(lat, lang);
        var mapProp = {
            center:myCenter,
            zoom: 13,
            scrollwheel: false,
            styles: style
        };

        var map = new google.maps.Map(document.getElementById(selector),mapProp);

        var marker = new google.maps.Marker({
            position:myCenter,
            icon: myIcon || 'img/markar-icon.png'
        });

        marker.setMap(map);
    }

    if($('.google-map').length){

        google.maps.event.addDomListener(window, 'load', function () {
            // init map 1
            $('#google-map-basic').length ? initialize("google-map-basic", 50.797897, -1.077641): "";

            var mapStyleLight=[
                {
                    featureType: 'water',
                    elementType: 'geometry',
                    stylers: [
                      {
                        color: '#e9e9e9',
                      },
                      {
                        lightness: 17,
                      },
                    ],
                },
                {
                    featureType: 'landscape',
                    elementType: 'geometry',
                    stylers: [
                      {
                        color: '#f5f5f5',
                      },
                      {
                        lightness: 20,
                      },
                    ],
                },
                {
                    featureType: 'road.highway',
                    elementType: 'geometry.fill',
                    stylers: [
                      {
                        color: '#ffffff',
                      },
                      {
                        lightness: 17,
                      },
                    ],
                },
                {
                    featureType: 'road.highway',
                    elementType: 'geometry.stroke',
                    stylers: [
                      {
                        color: '#ffffff',
                      },
                      {
                        lightness: 29,
                      },
                      {
                        weight: 0.2,
                      },
                    ],
                },
                {
                    featureType: 'road.arterial',
                    elementType: 'geometry',
                    stylers: [
                      {
                        color: '#ffffff',
                      },
                      {
                        lightness: 18,
                      },
                    ],
                },
                {
                    featureType: 'road.local',
                    elementType: 'geometry',
                    stylers: [
                      {
                        color: '#ffffff',
                      },
                      {
                        lightness: 16,
                      },
                    ],
                },
                {
                    featureType: 'poi',
                    elementType: 'geometry',
                    stylers: [
                      {
                        color: '#f5f5f5',
                      },
                      {
                        lightness: 21,
                      },
                    ],
                },
                {
                    featureType: 'poi.park',
                    elementType: 'geometry',
                    stylers: [
                      {
                        color: '#dedede',
                      },
                      {
                        lightness: 21,
                      },
                    ],
                },
                {
                    elementType: 'labels.text.stroke',
                    stylers: [
                      {
                        visibility: 'on',
                      },
                      {
                        color: '#ffffff',
                      },
                      {
                        lightness: 16,
                      },
                    ],
                },
                {
                    elementType: 'labels.text.fill',
                    stylers: [
                      {
                        saturation: 36,
                      },
                      {
                        color: '#333333',
                      },
                      {
                        lightness: 40,
                      },
                    ],
                },
                {
                    elementType: 'labels.icon',
                    stylers: [
                      {
                        visibility: 'off',
                      },
                    ],
                },
                {
                    featureType: 'transit',
                    elementType: 'geometry',
                    stylers: [
                      {
                        color: '#f2f2f2',
                      },
                      {
                        lightness: 19,
                      },
                    ],
                },
                {
                    featureType: 'administrative',
                    elementType: 'geometry.fill',
                    stylers: [
                      {
                        color: '#fefefe',
                      },
                      {
                        lightness: 20,
                      },
                    ],
                },
                {
                    featureType: 'administrative',
                    elementType: 'geometry.stroke',
                    stylers: [
                      {
                        color: '#fefefe',
                      },
                      {
                        lightness: 17,
                      },
                      {
                        weight: 1.2,
                      },
                    ],
                },
            ];

            // init map Light
            $('#google-map-light').length ? initialize("google-map-light", 50.797897, -1.077641, mapStyleLight):"";

            var mapStyleDark=[
                {
                    featureType: 'all',
                    elementType: 'labels.text.fill',
                    stylers: [
                      {
                        color: '#ffffff',
                      },
                    ],
                },
                {
                    featureType: 'all',
                    elementType: 'labels.text.stroke',
                    stylers: [
                      {
                        visibility: 'on',
                      },
                      {
                        color: '#424b5b',
                      },
                      {
                        weight: 2,
                      },
                      {
                        gamma: '1',
                      },
                    ],
                },
                {
                    featureType: 'all',
                    elementType: 'labels.icon',
                    stylers: [
                      {
                        visibility: 'off',
                      },
                    ],
                },
                {
                    featureType: 'administrative',
                    elementType: 'geometry',
                    stylers: [
                      {
                        weight: 0.6,
                      },
                      {
                        color: '#545b6b',
                      },
                      {
                        gamma: '0',
                      },
                    ],
                },
                {
                    featureType: 'landscape',
                    elementType: 'geometry',
                    stylers: [
                      {
                        color: '#545b6b',
                      },
                      {
                        gamma: '1',
                      },
                      {
                        weight: '10',
                      },
                    ],
                },
                {
                    featureType: 'poi',
                    elementType: 'geometry',
                    stylers: [
                      {
                        color: '#666c7b',
                      },
                    ],
                },
                {
                    featureType: 'poi.park',
                    elementType: 'geometry',
                    stylers: [
                      {
                        color: '#545b6b',
                      },
                    ],
                },
                {
                    featureType: 'road',
                    elementType: 'geometry',
                    stylers: [
                      {
                        color: '#424a5b',
                      },
                      {
                        lightness: '0',
                      },
                    ],
                },
                {
                    featureType: 'transit',
                    elementType: 'geometry',
                    stylers: [
                      {
                        color: '#666c7b',
                      },
                    ],
                },
                {
                    featureType: 'water',
                    elementType: 'geometry',
                    stylers: [
                      {
                        color: '#2e3546',
                      },
                    ],
                },
            ];

            // init map Dark
            $('#google-map-dark').length ? initialize("google-map-dark", 50.797897, -1.077641, mapStyleDark):"";

            var mapStyle2=[
                {
                    featureType: 'all',
                    elementType: 'labels.text.fill',
                    stylers: [
                      {
                        color: '#ffffff',
                      },
                    ],
                },
                {
                    featureType: 'all',
                    elementType: 'labels.text.stroke',
                    stylers: [
                      {
                        visibility: 'on',
                      },
                      {
                        color: '#424b5b',
                      },
                      {
                        weight: 2,
                      },
                      {
                        gamma: '1',
                      },
                    ],
                },
                {
                    featureType: 'all',
                    elementType: 'labels.icon',
                    stylers: [
                      {
                        visibility: 'off',
                      },
                    ],
                },
                {
                    featureType: 'administrative',
                    elementType: 'geometry',
                    stylers: [
                      {
                        weight: 0.6,
                      },
                      {
                        color: '#fff',
                      },
                      {
                        gamma: '0',
                      },
                    ],
                },
                {
                    featureType: 'landscape',
                    elementType: 'geometry',
                    stylers: [
                      {
                        color: '#5F63F2',
                      },
                      {
                        gamma: '1',
                      },
                      {
                        weight: '10',
                      },
                    ],
                },
                {
                    featureType: 'poi',
                    elementType: 'geometry',
                    stylers: [
                      {
                        color: '#5F63F290',
                      },
                    ],
                },
                {
                    featureType: 'poi.park',
                    elementType: 'geometry',
                    stylers: [
                      {
                        color: 'green',
                      },
                    ],
                },
                {
                    featureType: 'road',
                    elementType: 'geometry',
                    stylers: [
                      {
                        color: 'green',
                      },
                      {
                        lightness: '0',
                      },
                    ],
                },
                {
                    featureType: 'transit',
                    elementType: 'geometry',
                    stylers: [
                      {
                        color: '#666c7b',
                      },
                    ],
                },
                {
                    featureType: 'water',
                    elementType: 'geometry',
                    stylers: [
                      {
                        color: '#ffffff',
                      },
                    ],
                },
            ];

            // init map 2
            $('#google-map-theme').length ? initialize("google-map-theme", 50.797897, -1.077641, mapStyle2):"";
        });
    }
})();
