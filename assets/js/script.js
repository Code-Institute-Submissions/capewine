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