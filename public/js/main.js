// Search
var places = []
places.filter(findPlace)
function findPlace(str, item) {
    item.place.isInclude(str)
}
var results = places.filter()