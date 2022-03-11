(function ($) {
    
    // Leaflet Basic
    const leafletBasic = document.getElementById('leaflet-basic');
    const leafletMultiIcon = document.getElementById('leaflet-multiIcon');
    const leafletCustomIcon = document.getElementById('leaflet-customIcon');
    const leafletCluster = document.getElementById('leaflet-cluster');
    if(leafletBasic){
        var a = L.map(leafletBasic).setView([51.505, -.09], 13);
  
        L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw", {
        maxZoom: 30,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery Â© <a href="https://www.mapbox.com/">Mapbox</a>',
        id: "mapbox/streets-v11"
        }).addTo(a)
        var marker = L.marker([51.5, -0.09]).addTo(a);
    }

    // Leaft MultiIcon
    if(leafletMultiIcon){
        var b = L.map("leaflet-multiIcon").setView([51.505, -.09], 13);
        L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw", {
          maxZoom: 30,
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery Â© <a href="https://www.mapbox.com/">Mapbox</a>',
          id: "mapbox/streets-v11"
        }).addTo(b)
    
        let g1 = L.marker([51.509, -.08]).bindPopup('This is Littleton, CO.'),
            g2 = L.marker([51.503, -.06]).bindPopup('This is Littleton, CO.'),
            g3 = L.marker([51.51, -.09]).bindPopup('This is Littleton, CO.')
    
        let cities = L.layerGroup([g1,g2,g3]).addTo(b);
    }
    
    // Leaflet Custom Ico
    if(leafletCustomIcon){
        var c = L.map("leaflet-customIcon").setView([51.505, -.09], 13);
        L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw", {
            maxZoom: 30,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery Â© <a href="https://www.mapbox.com/">Mapbox</a>',
            id: "mapbox/streets-v11"
        }).addTo(c)
    
        // create custom icon
        var firefoxIcon = L.icon({
            iconUrl: '../img/svg/clock.svg',
            iconSize: [38, 95], // size of the icon
        });
    
        // create marker object, pass custom icon as option, add to map         
        var marker = L.marker([51.5, -0.09], {icon: firefoxIcon}).addTo(c);
    }
    

    // Leaflet Clusters
    if(leafletCluster){
        let addressList = [
            [-37.8210922667, 175.2209316333, "Striking Dash Title"],
            [-37.8210819833, 175.2213903167, "Striking Dash Title"],
            [-37.8210881833, 175.2215004833, "Striking Dash Title"],
            [-37.8211946833, 175.2213655333, "Striking Dash Title"],
            [-37.8209458667, 175.2214051333, "Striking Dash Title"],
            [-37.8208292333, 175.2214374833, "Striking Dash Title"],
            [-37.8325816, 175.2238798667, "Striking Dash Title"],
            [-37.8315855167, 175.2279767, "Striking Dash Title"],
            [-37.8096336833, 175.2223743833, "Striking Dash Title"],
            [-37.80970685, 175.2221815833, "Striking Dash Title"],
            [-37.8102146667, 175.2211562833, "Striking Dash Title"],
            [-37.8088037167, 175.2242227, "Striking Dash Title"],
            [-37.8112330167, 175.2193425667, "Striking Dash Title"],
            [-37.8116368667, 175.2193005167, "Striking Dash Title"],
            [-37.80812645, 175.2255449333, "Striking Dash Title"],
            [-37.8080231333, 175.2286383167, "Striking Dash Title"],
            [-37.8089538667, 175.2222222333, "Striking Dash Title"],
            [-37.8080905833, 175.2275400667, "Striking Dash Title"]
        ]
    
        let d = L.map('leaflet-cluster').setView([-37.82, 175.23], 13);
    
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery Â© <a href="https://www.mapbox.com/">Mapbox</a>',
            id: "mapbox/streets-v11",
            maxZoom: 30
        }).addTo(d);
    
        var markers = L.markerClusterGroup();
    
        for (var i = 0; i < addressList.length; i++) {
            var a = addressList[i];
            var title = a[2];
            var marker = L.marker(new L.LatLng(a[0], a[1]), {
                title: title
            });
            marker.bindPopup(title);
            markers.addLayer(marker);
        }
    
        d.addLayer(markers);
    }

})(jQuery);