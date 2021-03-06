// List of places with properties
// (If working back-end exist = > Should be in json file)  
places = [{
        place: "Миэ",
        typeOfPlace: "Префектура",
        country: "Япония",
        img: "assets/images/content/places/mie/mie-icon.png",
        url: "assets/pages/places/mie.html",
        lat: 34.377651,
        lng: 136.587258
    },
    {
        place: "Котор",
        typeOfPlace: "Город",
        country: "Черногория",
        img: "assets/images/content/places/kotor/kotor-icon.png",
        url: "assets/pages/places/kotor.html",
        lat: 42.4248917,
        lng: 18.7696750    
    },
    {
        place: "Кито",
        typeOfPlace: "Город",
        country: "Эквадор",
        img: "assets/images/content/places/quito/quito-icon.png",
        url: "#",
        lat: -0.21861,
        lng: -78.50972    
    },
    {
        place: "Дублин",
        typeOfPlace: "Город",
        country: "Ирландия",
        img: "assets/images/content/places/dublin/dublin-icon.png",
        url: "#",
        lat: 53.34250,
        lng: -6.26583
    },
    {
        place: "Джорджтаун",
        typeOfPlace: "Город",
        country: "Малайзия",
        img: "assets/images/content/places/georgetown/georgetown-icon.png",
        url: "#",
        lat: 5.41667,
        lng: 100.31667    
    }
]





// JQuery

$(document).ready(function() {

   


    // Typeahead search

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


    // Slick carousel
    $('.experiences__list').slick({
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4
    });
});

// Tabs on place page
$('#myTab a[href="#main-info"]').tab('show')
$('#myTab a[href="#when"]').tab('show')
$('#myTab a[href="#how"]').tab('show')
$('#myTab a[href="#hotels"]').tab('show')
$('#myTab a[href="#what-to-do"]').tab('show')
$('#myTab a[href="#photo"]').tab('show')


// Vanilla Javascript

window.onload = function() {

    // Mobile nav chevron rotation
    var menuElem = document.getElementById('collapseListGroupHeading1');

        menuElem.onclick = function() {
        this.classList.toggle('open');
        };

    // Mobile search
    var mobSearchTrigger = document.getElementById('search-trigger'),
        mobSearchForm = document.getElementById('header__search-form');

        mobSearchTrigger.addEventListener("click", function() {
        document.getElementById('header__logo').classList.toggle('hide');
        document.getElementById('nav-trigger-label').classList.toggle('hide');
        mobSearchForm.classList.toggle('search-form_mob');
        this.classList.toggle('active');
        document.getElementById('main-container').classList.toggle('active');
        });

    // Top cities
    var topCitiesBtn = document.getElementById('top-cities-btn'),
        topCities = document.getElementById('top-cities'),
        topCitiesClose = document.getElementById('top-cities-close');

        // Open
        topCitiesBtn.addEventListener('click', function() {
            topCities.classList.add('top-cities_visible');
            document.getElementById('main-container').classList.add('active');
        })
        // Close
        topCitiesClose.addEventListener('click', function() {
            topCities.classList.remove('top-cities_visible');
            document.getElementById('main-container').classList.remove('active');
        })
}


// Map

var map,
    infoWindow;

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