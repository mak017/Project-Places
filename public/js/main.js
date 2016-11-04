// Search (under construction)
places = [{
"city": "Mie",
"country": "Japan",
"url": "../pages/places/mie.html"
},
{}
]
$(document).ready(function(){
    $(function () {
    $('.header__search-box').typeahead({
        name: 'Location',
        local: [{
            value: 'Bangkok',
            tokens: ['Bang', 'Cock'],
            id: 2
        }, {
            value: 'Kuala Lumpur',
            tokens: ['Kuala', 'Lumpur', 'la'],
            id: 3
        }]
    });

    $('.header__search-box').on('header__search-box:selected', function (e, datum) {
        $('.fake-hidden').val(datum.id);
    
}); 






var places = []
places.filter(findPlace)
function findPlace(str, item) {
    item.place.isInclude(str)
}
var results = places.filter()