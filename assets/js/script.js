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

        // Create the autocomplete object and associate it with the input control.
    // Restrict the search to Ireland, and to place type "cities".
    autocomplete = new google.maps.places.Autocomplete(
        (
            document.getElementById('autocomplete')), {
        types: ['(cities)'],
        componentRestrictions: countryRestrict
    });
    places = new google.maps.places.PlacesService(map);

    autocomplete.addListener('place_changed', onPlaceChanged);

}
//Event listener that targets when a div is clicked & sets the option to the relevant filter on map
//Then calls the Search function to filter the pins on the map. 
document.getElementById("Eat").addEventListener("click", Eat);
document.getElementById("Stay").addEventListener("click", Stay);
document.getElementById("Drink").addEventListener("click", Drink);
function Eat() {
    option = "restaurant";
    search(option);
}
function Stay() {
    option = "lodging";
    search(option);
}
function Drink() {
    option = "bar";
    search(option);
}
// When the user selects a city, get the place details for the city and
// zoom the map in on the city.
function onPlaceChanged() {
    var place = autocomplete.getPlace();
    if (place.geometry) {
        map.panTo(place.geometry.location);
        map.setZoom(15);
    } else {
        document.getElementById('autocomplete').placeholder = 'Enter a city';
    }
}
// Search for activity in the selected city, within the viewport of the map.
function search(option) {
    var search = {
        bounds: map.getBounds(),
        types: [option]
    };

    places.nearbySearch(search, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            clearResults();
            clearMarkers();
            // Create a marker for each hotel found, and
            // assign a letter of the alphabetic to each marker icon.
            for (var i = 0; i < results.length; i++) {
                var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
                var markerIcon = MARKER_PATH + markerLetter + '.png';
                // Use marker animation to drop the icons incrementally on the map.
                markers[i] = new google.maps.Marker({
                    position: results[i].geometry.location,
                    animation: google.maps.Animation.DROP,
                    icon: markerIcon
                });
                // If the user clicks a hotel marker, show the details of that hotel
                // in an info window.
                markers[i].placeResult = results[i];
                google.maps.event.addListener(markers[i], 'click', showInfoWindow);
                setTimeout(dropMarker(i), i * 100);
                addResult(results[i], i);
            }
        }
    });
}
//Clears the marks off the map
function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
        if (markers[i]) {
            markers[i].setMap(null);
        }
    }
    markers = [];
}
//Drops marks on map when filter is selected
function dropMarker(i) {
    return function () {
        markers[i].setMap(map);
    };
}

