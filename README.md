# osm-offline-maps-playing
This is the test project with offline maps which use [Open Street Maps](https://www.openstreetmap.org) as a map source and [Leaflet](http://leafletjs.com/) as a tool for interactive maps.

##Project goal
Show possibility of usage offline map.

##Install
Install bower:  `$ npm install -g bower`

Bower depends on Node.js and npm. Also make sure that git is installed as some bower packages require it to be fetched and installed.

##Quick start
* Clone repository. 
* Use `bower` to install necessary dependencies: `$ bower install`.
* Open index.html in your browser.

##Development
For better understanding of code in the `index.js` please read first [basics of leaflet](http://leafletjs.com/examples/quick-start.html).

The only difference of creating offline maps is that we should prepare our map [tiles](http://wiki.openstreetmap.org/wiki/Tiles?setlang=en) first. For this purpose you can use Mobile Atlas Creator([MOBAC](http://mobac.sourceforge.net/)).

### Map tiles prepearing:
* start MOBAC and choose a desired atlas format(for example: OSMAND tile storage);
* select a map source(for example: OpenStreetMap MapQuest);
* select a piece of map(for example: Kosmichna street in the Kharkiv city);
* select zoom levels (for example: 14-18);
* add selection to your atlas;
* create atlas;

Then your new atlas will be saved to the directory: `/'MOBAC extraction directory'/atlases/'your atlas name'`

Now, when you have tiles, you just should to put them to some directory in your project(for example for current project: `images/mapTiles/street`) and use a reference to them as tile src when you add a tile layer to your map via leaflet.

``` js
var mapsSettings = {
      street: {
                TILE_SRC: 'images/mapTiles/street/{z}/{x}/{y}.jpg.tile',
                // for usual rendering of tileLayer your source should be
                // http://{s}.tile.osm.org/{z}/{x}/{y}.png
                // for offline - 'your way to map'/{z}/{x}/{y}.png.tile
                // (where .png.tile - type of tile can be .png, .jpeg, .png.tile, .jpeg.tile, ect.).
                popupMessage: 'This is the Space Hall location!',
                currentZoom: 16,
                latLng: [50.015, 36.220518],
                options: {
                    minZoom: 14,
                    maxZoom: 18
                }
            }
    },
    street = mapsSettings.street,
    streetMap = L.map('street').setView(street.latLng, street.currentZoom);
    
    L.tileLayer(street.TILE_SRC, street.options).addTo(streetMap);
    L.marker(street.latLng).addTo(streetMap)
        .bindPopup(street.popupMessage)
        .openPopup();
```
The code above shows you the simplest way how to render an offline map via leaflet.

