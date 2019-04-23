function createMap(elemId, centerLat, centerLng, zoom) {
    var map = new L.Map(elemId);
 
    // Data provider
    var osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib = 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
 
    // Layer
    var osmLayer = new L.TileLayer(osmUrl, {
        minZoom: 2,
        zoomControl: false,
        attribution: osmAttrib
    });
 
    // Map
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
    markersLatLng = [
        [46.056946, 14.505751]
    ];

    function onMarkerClick(e) {
        window.open ('https://www.instagram.com/p/BvrN4pqh_hv/', 
            '_blank');
        win.focus();
    }

    var markerInfos = document.getElementById("markerInfos");
    var map = createMap('map', 55, 15, 4);
    markersLatLng.forEach(function(latLng) {
        addMarker(map, latLng, onMarkerClick);
    });
});
