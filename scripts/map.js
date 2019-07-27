function createMap(elemId, centerLat, centerLng, zoom) {
  var world = new L.LatLngBounds([[90,-180],[-90,180]]);

  // set map style and attribute creator
  var baseLayer = new L.TileLayer('https://{s}.tile.openstreetmap.se/hydda/base/{z}/{x}/{y}.png', {
    minZoom: 2,
    zoomControl: false,
    attribution: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OSM Sweden</a>, Map data &copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors'
  });

  var satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    minZoom: 2,
    zoomControl: false,
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  });

  var watercolorLayer = new L.TileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png', {
    minZoom: 2,
    zoomControl: false,
    attribution: 'Watercolor tiles: <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors'
  });

  var railwayLayer = L.tileLayer('https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png', {
    minZoom: 2,
    zoomControl: false,
    attribution: 'Railway tiles: &copy; <a href="https://www.OpenRailwayMap.org">ORM</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  var borderLayer = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lines/{z}/{x}/{y}{r}.png', {
    minZoom: 2,
    zoomControl: false,
    attribution: 'Border tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>'
  });

  var namesLayer = L.tileLayer('https://{s}.tile.openstreetmap.se/hydda/roads_and_labels/{z}/{x}/{y}.png', {
    minZoom: 2,
    zoomControl: false,
    attribution: ''
  });

  var nighttrainLayer = L.imageOverlay('img/night_trains.png', [[35.5, -16], [70, 45]]);

  var request = new XMLHttpRequest();  
  request.open("GET", 'loc.csv', false);   
  request.send(null);  

  var parsed = new Array();
  var jsonObject = request.responseText.split('\n');
  for (var i = 0; i < jsonObject.length; i++) {
    var s = jsonObject[i].split(',');
    /*
    i = 0; j = 0; 
    markers = [];
    while (i < m.length) {
      markers[j] = {coord: [m[i], m[i + 1]], uri: m[i + 2]}; 
      i = i + 3; j = j + 1;
    }*/
    parsed.push(jsonObject[i].split(','));
  }

  var markers = new Array();
  for (i = 0; i < parsed.length; i++) {
    var p = parsed[i];
    var coord = [parseFloat(p[0]), parseFloat(p[1])];
    var link = '<a href="' + p[2] + '" target="_blank">' + p[3] + '</a>';
    var m = L.marker(coord).bindPopup(link);
    markers.push(m);
  }

  var markerLayer = L.layerGroup(markers);

  var map = new L.Map(elemId, {
    maxBounds: world,
    maxBoundsViscosity: 1,
    zoomControl: false,
    layers: [baseLayer, markerLayer]
  });

  map.setView(new L.LatLng(centerLat, centerLng), zoom);
  map.addLayer(baseLayer);

  var layers = {
    "Standard": baseLayer,
    "Satellit": satelliteLayer,
    "Vattenfärg": watercolorLayer
  };

  var overLayers = {
    "Järnväg": railwayLayer,
    "Nattåg": nighttrainLayer,
    "Gränser": borderLayer,
    "Ortnamn": namesLayer,
    "Markörer": markerLayer
  };

  L.control.zoom({position: 'bottomright'}).addTo(map);
  L.control.layers(layers, overLayers, {position: 'bottomright'}).addTo(map);

  return map;
}

document.addEventListener("DOMContentLoaded", function () {
  var map = createMap('map', 55, 15, 4);
  
  /*var popup = L.popup();
  function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("<a href=''>Klicka här</a> för att lägga till ett resmål på kartan")
        .openOn(map);
  }
  map.on('click', onMapClick);*/

  var modal = document.getElementById("modalLocation");
  var btn = document.getElementById("add_location");
  var span = document.getElementsByClassName("close")[0];
  btn.onclick = function() {
    modal.style.display = "block";
  }

  span.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  /*
  var cloudmadeAttribution = 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade',
    cloudmade = new L.TileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {attribution: cloudmadeAttribution});
  var map = new L.Map('map').addLayer(cloudmade).setView(new L.LatLng(48.5, 2.5), 15);
  var osmGeocoder = new L.Control.OSMGeocoder();
  map.addControl(osmGeocoder);
  */
}); 