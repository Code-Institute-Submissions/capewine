var map, places, infoWindow, option;
var markers = [];
var autocomplete;
var countryRestrict = { 'country': 'za' };
var MARKER_PATH = 'https://developers.google.com/maps/documentation/javascript/images/marker_green';
var hostnameRegexp = new RegExp('^https?://.+?/');

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.270836, lng: 18.459778 },
        zoom: 6.8
    });

    infoWindow = new google.maps.InfoWindow({
        content: document.getElementById('info-content')
    });