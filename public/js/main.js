// List of places with properties
// (If working back-end exist = > Should be in json file)  
places = [{
        place: "Миэ",
        typeOfPlace: "Префектура",
        country: "Япония",
        img: "images/content/places/mie/mie-icon.png",
        url: "pages/places/mie.html",
        lat: 34.377651,
        lng: 136.587258
    },
    {
        place: "Котор",
        typeOfPlace: "Город",
        country: "Черногория",
        img: "images/content/places/kotor/kotor-icon.png",
        url: "pages/places/kotor.html",
        lat: 42.4248917,
        lng: 18.7696750    
    },
    {
        place: "Кито",
        typeOfPlace: "Город",
        country: "Эквадор",
        img: "images/content/places/quito/quito-icon.png",
        url: "#",
        lat: -0.21861,
        lng: -78.50972    
    },
    {
        place: "Дублин",
        typeOfPlace: "Город",
        country: "Ирландия",
        img: "images/content/places/dublin/dublin-icon.png",
        url: "#",
        lat: 53.34250,
        lng: -6.26583    
    },
    {
        place: "Джорджтаун",
        typeOfPlace: "Город",
        country: "Малайзия",
        img: "images/content/places/georgetown/georgetown-icon.png",
        url: "#",
        lat: 5.41667,
        lng: 100.31667    
    }
]


// Typeahead search
$(document).ready(function() {

// Set the Options for "Bloodhound" Engine
        var my_Suggestion_class = new Bloodhound({
            limit: 10,
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: $.map(places, function(item) {
                //console.log(item.city);
                return {
                    value: item.place,
                    country: item.country,
                    img: item.img,
                    url: item.url
                };
            })
        });

//Initialize the Suggestion Engine
        my_Suggestion_class.initialize();

        var typeahead_elem = $('.typeahead');
        typeahead_elem.typeahead({
            hint: true,
            highlight: true,
            minLength: 1
        },
        {
            name: 'value',
            displayKey: 'value',
            source: my_Suggestion_class.ttAdapter(),
            templates: {
                empty: [
                    '<div class="noitems">',
                    'No Items Found',
                    '</div>'
                ].join('\n'),
                suggestion: function (data) {
                    return '<a href="' + data.url + '"><img src="' + data.img + '"><span>' + data.value + ', ' + data.country + '</span></a>';
                }
            }
        });
    });



window.onload = function() {

// Mobile nav chevron rotation
var menuElem = document.getElementById('collapseListGroupHeading1');

    menuElem.onclick = function() {
      this.classList.toggle('open');
    };

// Mobile search
var mobSearchTrigger = document.getElementById('search-trigger');
var mobSearchForm = document.getElementById('header__search-form');

    mobSearchTrigger.addEventListener("click", function() {
      document.getElementById('header__logo').classList.toggle('hide');
      document.getElementById('nav-trigger-label').classList.toggle('hide');
      mobSearchForm.classList.toggle('search-form_mob');
      this.classList.toggle('active');
      document.getElementById('main-container').classList.toggle('active');
    });
}

// Map

var map;
var infoWindow;

// This function will iterate over markersData array
// creating markers with createMarker function
function displayMarkers(){

   // this variable sets the map bounds according to markers position
   var bounds = new google.maps.LatLngBounds();
      
   for (var i = 0; i < places.length; i++){
      var latlng = new google.maps.LatLng(places[i].lat, places[i].lng);
      var place = places[i].place;
      var typeOfPlace = places[i].typeOfPlace;
      var country = places[i].country;
      var ref = places[i].url;
      var img = places[i].img;

      createMarker(latlng, place, typeOfPlace, country, ref, img);
      bounds.extend(latlng);  
   }

   map.fitBounds(bounds);
}

// This function creates each marker and it sets their Info Window content
function createMarker(latlng, place, typeOfPlace, country, ref, img){
   var marker = new google.maps.Marker({
      map: map,
      position: latlng,
      title: place
   });

   google.maps.event.addListener(marker, 'click', function() {
    
      var iwContent = '<div id="iw_container">' +
            '<div class="iw_title">' + typeOfPlace + ' ' + place + ', ' + country + '</div>' +
         '<div class="iw_content">' + '<img class="iw_img" src="' + img + '">' + '<a href="' +
         ref + '">Перейти >></a>' + '</div></div>';
      
      infoWindow.setContent(iwContent);
      infoWindow.open(map, marker);
   });
}
function initMap() {
   var mapOptions = {
      center: new google.maps.LatLng(25,0),
      zoom: 2,
   };

   map = new google.maps.Map(document.getElementById('map'), mapOptions);

   infoWindow = new google.maps.InfoWindow();

   // Event that closes the Info Window with a click on the map
   google.maps.event.addListener(map, 'click', function() {
      infoWindow.close();
   });

   displayMarkers();
}