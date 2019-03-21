function initialize() {
    var mapOptions = {
            center: new google.maps.LatLng(54, 15),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoom: 3
          };	 
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
};