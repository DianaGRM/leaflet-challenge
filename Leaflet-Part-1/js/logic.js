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

d3.json(url).then(createMarkers);

function createMarkers(response){
    let earthquakeMarkers = [];

    for (let i = 0; i < response.features.length; i++) {
        let earthquake = response.features[i];

        coord = [earthquake.geometry.coordinates[0],earthquake.geometry.coordinates[1]]

        let marker = L.circle(coord,{
            color: earthquake.geometry[2],
            radius: earthquake.properties.mag
             });

        earthquakeMarkers.push(marker);
        
    }

    let earthquakes = L.layerGroup(earthquakeMarkers);
    createMap(earthquakes);

    console.log(coord)
}

