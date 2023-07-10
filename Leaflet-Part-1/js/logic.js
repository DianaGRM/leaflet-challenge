let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
  });

//Creates the map and the markers
function createMap(earthquakes) {

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);
    earthquakes.addTo(myMap);
    
  
  }

  //create markers
  function markerSize(population) {
    return (population) * 10000;
  }
  function markerColor(color) {
    let num = Math.ceil(color)
    
    var b = num & 0xFF,
        g = (num & 0xFF00) >>> 8,
        r = (num & 0xFF0000) >>> 16,
        a = ( (num & 0xFF000000) >>> 24 ) / 255 ;
    return "rgb(" + [r, g, b].join(",") + ")";
    
    //return (`#${num.toString(16).padStart(6,"0")}`);
  }

d3.json(url).then(createMarkers);

function createMarkers(response){
    let earthquakeMarkers = [];

    for (let i = 0; i < response.features.length; i++) {
        let earthquake = response.features[i];

        coord = [earthquake.geometry.coordinates[1],earthquake.geometry.coordinates[0]]

        let marker = L.circle(coord,{
            color: "#000000",
            fillcolor: markerColor(earthquake.geometry.coordinates[2]),
            opacity: 1,
            fillOpacity: 1,
            radius: markerSize(earthquake.properties.mag)
             });

        earthquakeMarkers.push(marker);
        
    }

    let earthquakes = L.layerGroup(earthquakeMarkers);
    createMap(earthquakes);

    console.log(markerColor(response.features[0].geometry.coordinates[2]))
}

