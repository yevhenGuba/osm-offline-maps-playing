(function() {
    var MAP_BOX = {
            MAP_ID: 'sheenigami.n9a5aip6',
            API_TOKEN: 'pk.eyJ1Ijoic2hlZW5pZ2FtaSIsImEiOiIzMjMwYTQ4MThiMGRhNjhkZjFlZjUzYzNhNjU5YTdjMCJ9.pZkij_cFCIleZdUg9ChwVg#11'
        },
        mapsCreationSettings = [
            {
                // for usual rendering of tileLayer source should be http://{s}.tile.osm.org/{z}/{x}/{y}.png
                // for offline - images/mapTiles/city/{z}/{x}/{y}.png.tile (where .png.tile - type of tile
                // can be .png, .jpeg, .png.tile, .jpeg.tile, ect.).
                // tiles were created by Atlas Creator.
                selector: 'city-online-standard',
                TILE_SRC: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
                popupMessage: 'This is the center of Kharkiv, online standard map.',
                currentZoom: 15,
                latLng: [49.99, 36.23],
                options: {
                    minZoom: 10,
                    maxZoom: 18
                }
            },
            {
                selector: 'city-online-custom',
                TILE_SRC: 'https://a.tiles.mapbox.com/v4/' + MAP_BOX.MAP_ID + '/{z}/{x}/{y}.png?access_token=' + MAP_BOX.API_TOKEN,
                popupMessage: 'This is the center of Kharkiv, online custom styled map.',
                currentZoom: 14,
                latLng: [49.99, 36.23],
                options: {
                    minZoom: 8,
                    maxZoom: 18
                }
            },
            {
                selector: 'city-offline-standard',
                TILE_SRC: 'images/mapTiles/city/{z}/{x}/{y}.png.tile',
                popupMessage: 'This is the center of Kharkiv, offline standard map.',
                currentZoom: 13,
                latLng: [49.99, 36.23],
                options: {
                    minZoom: 8,
                    maxZoom: 16
                }
            },
            {
                selector: 'city-offline-custom',
                TILE_SRC: 'images/mapTiles/cityCustom/{z}/{x}/{y}.png.tile',
                popupMessage: 'This is the center of Kharkiv, offline custom styled map.',
                currentZoom: 13,
                latLng: [49.99, 36.23],
                options: {
                    minZoom: 9,
                    maxZoom: 16
                }
            }
        ],
        maps = [],
        markers = [];

    function initAllMaps() {
        mapsCreationSettings.forEach(initMap);
    }

    function initMap(options) {
        var map = L.map(options.selector).setView(options.latLng, options.currentZoom);

        L.tileLayer(options.TILE_SRC, options.options).addTo(map);
        initMarker(options, map);
        maps.push(map);
    }

    function initMarker(options, map) {
        var marker =  L.marker(options.latLng).addTo(map)
            .bindPopup(options.popupMessage)
            .openPopup();

        markers.push(marker);
    }

    initAllMaps();
}());
