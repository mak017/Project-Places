// Search
places = [{
    "city": "Mie",
    "country": "Japan",
    "img": "images/content/places/mie/mie-icon.png",
    "url": "pages/places/mie.html"
    },
    {}
]


$(document).ready(function() {

        // Set the Options for "Bloodhound" Engine
                var my_Suggestion_class = new Bloodhound({
                    limit: 10,
                    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
                    queryTokenizer: Bloodhound.tokenizers.whitespace,
                    local: $.map(places, function(item) {
                        //console.log(item.city);
                        return {
                            value: item.city,
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