# osm-offline-maps-playing
This is the test project with offline maps which use [Open Street Maps](https://www.openstreetmap.org) as a map source and [Leaflet](http://leafletjs.com/) as a tool for interactive maps.

##Project goal
Show possibility of usage offline maps.

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

Then your new atlas will be saved to the directory: `/your_mobac_extraction_directory/atlases/your_atlas_name`

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

## Map styling

For online maps you can use [this](https://github.com/leaflet-extras/leaflet-providers) plugin or [mapbox](https://www.mapbox.com).

I'll use mapbox for both cases.

### Prepearing styled map
* Register at https://www.mapbox.com and get your `map ID` and `API access token`.
* Choose among existing map styles (for example I choze `Wheatpaste` style), then for your online map source for tiles would be:
```js
.....
TILE_SRC: 'https://a.tiles.mapbox.com/v4/' + MAP_BOX.MAP_ID + '/{z}/{x}/{y}.png?access_token=' + MAP_BOX.API_TOKEN
.....
```
* Also you can edit one of the existing styles or create your own in the mapbox studio. You can load it from [here](https://www.mapbox.com/mapbox-studio) or [install from source via nmp](https://www.npmjs.com/package/mapbox-studio).
* Edit or create new style for your map. See more [here](https://www.mapbox.com/guides/style-quickstart/#add-a-stylesheet-tab) and [here](https://www.mapbox.com/guides/cartocss-in-studio/).
* Save project with new map styles.
* Upload your project to the MOBAC. For this  you need to create custom map source. Create file customMapSource.xml and put it to the `MOBAC/mapsources` folder. Use the following XML (replacing user, project ID and access token) for this:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<customMapSource>
 <name>Custom MapBox Source</name>
 <minZoom>0</minZoom>
 <maxZoom>18</maxZoom>
 <tileType>png</tileType>
 <tileUpdate>None</tileUpdate>
 <url>https://a.tiles.mapbox.com/v4/sheenigami.n9a5aip6/{$z}/{$x}/{$y}.png?access_token=pk.eyJ1Ijoic2hlZW5pZ2FtaSIsImEiOiIzMjMwYTQ4MThiMGRhNjhkZjFlZjUzYzNhNjU5YTdjMCJ9.pZkij_cFCIleZdUg9ChwVg#11</url> 
 <backgroundColor>#000000</backgroundColor>
</customMapSource>
```
* Repeat `Map tiles prepearing` section steps. 
