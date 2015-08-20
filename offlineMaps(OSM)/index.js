(function() {
    var mapsSettings = {
            city: {
                // for usual rendering of tileLayer source should be http://{s}.tile.osm.org/{z}/{x}/{y}.png
                // for offline - images/mapTiles/city/{z}/{x}/{y}.png.tile (where .png.tile - type of tile
                // can be .png, .jpeg, .png.tile, .jpeg.tile, ect.).
                // tiles were created by Atlas Creator.
                TILE_SRC: 'images/mapTiles/city/{z}/{x}/{y}.png.tile',
                popupMessage: 'This is the center of Kharkiv!',
                currentZoom: 13,
                latLng: [49.99, 36.23],
                options: {
                    minZoom: 8,
                    maxZoom: 16
                }
            },
            street: {
                TILE_SRC: 'images/mapTiles/street/{z}/{x}/{y}.jpg.tile',
                popupMessage: 'This is the Space Hall location!',
                currentZoom: 16,
                latLng: [50.015, 36.220518],
                options: {
                    minZoom: 14,
                    maxZoom: 18
                }
            }
        },
        city = mapsSettings.city,
        street = mapsSettings.street,
        cityMap = L.map('city').setView(city.latLng, city.currentZoom),
        streetMap = L.map('street').setView(street.latLng, street.currentZoom);

    L.tileLayer(city.TILE_SRC, city.options).addTo(cityMap);
    L.marker(city.latLng).addTo(cityMap)
        .bindPopup(city.popupMessage)
        .openPopup();

    L.tileLayer(street.TILE_SRC, street.options).addTo(streetMap);
    L.marker(street.latLng).addTo(streetMap)
        .bindPopup(street.popupMessage)
        .openPopup();
}());
