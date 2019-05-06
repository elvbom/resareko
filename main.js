function createMap(elemId, centerLat, centerLng, zoom) {
  var world = new L.LatLngBounds([[90,-180],[-90,180]]);

  var map = new L.Map(elemId, {
    maxBounds: world,
    maxBoundsViscosity: 1,
    zoomControl: false
  });

  L.control.zoom({
    position: 'bottomright'
  }).addTo(map);

    // Data provider
    var osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib = 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';

    var osmLayer = new L.TileLayer(osmUrl, {
      minZoom: 2,
      zoomControl: false,
      attribution: osmAttrib
    });

    map.setView(new L.LatLng(centerLat, centerLng), zoom);
    map.addLayer(osmLayer);
    return map;
  }

  function addMarker(map, latLng, onClick) {
    var marker = L.marker(latLng).addTo(map);
    if (onClick !== null) {
      marker.on('click', onClick);
    }
    return marker;
  }

  document.addEventListener("DOMContentLoaded", function () {
    function onMarkerClick(e, link) {
      window.open (link, 
        '_blank');
      win.focus();
    }

    function makeMarkers(m, perRow) {
      i = 0; j = 0; 
      markers = [];

      while (i < m.length) {
        markers[j] = {coord: [m[i], m[i + 1]], uri: m[i + 2]}; 
        i = i + 3; j = j + 1;
      }
      return markers
    }

    var locations = new XMLHttpRequest();
    locations.open("GET", "loc.csv", true);
    locations.onreadystatechange = function () {
      if(locations.readyState === 4) {
        if(locations.status === 200 || locations.status == 0) {
          var map = createMap('map', 55, 15, 4);

          var markers = makeMarkers(locations.responseText.split(","));
          i = 0;
          for(i = 0; i < markers.length; i++) {
            L.marker(markers[i].coord).on('click', function(e) {
              window.open (markers[e.target._leaflet_id].uri, '_blank');
            }).addTo(map)._leaflet_id = i;
          }
        }
      }
    }
    locations.send(null);
  });