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
    return (population) * 20000;
  }
  function markerColor(color) {
    
    if (color> -10 && color<= 10 ){
      return("green");
    } else if(color>10 && color<=30){
      return("lime");
    } else if(color>30 && color<=50){
      return("yellow");
    } else if(color>50 && color<=70){
      return("orange");
    }else if(color>70 && color<=90){
      return("pink");
    }else if(color>90){
      return("red");
    } 
    
  }

d3.json(url).then(createMarkers);

function createMarkers(response){
    let earthquakeMarkers = [];

    for (let i = 0; i < response.features.length; i++) {
        let earthquake = response.features[i];

        coord = [earthquake.geometry.coordinates[1],earthquake.geometry.coordinates[0]]

        let marker = L.circle(coord,{
            color: "black",
            fillColor: markerColor(earthquake.geometry.coordinates[2]),
            opacity: .3,
            fillOpacity: 1, 
            radius: markerSize(earthquake.properties.mag)
             });

        marker.bindPopup(`<h2>Earthquake: ${earthquake.properties.title}<hr>Depth: ${earthquake.geometry.coordinates[2]} </h2><hr><p>More details: ${earthquake.properties.detail}</p>`);     

        earthquakeMarkers.push(marker);
        
    }

    let earthquakes = L.layerGroup(earthquakeMarkers);
    createMap(earthquakes);

    console.log(markerColor(response.features[0].geometry.coordinates[2]))

    // Create a legend control
    let legend = L.control({position: 'bottomright'});

    legend.onAdd = function (myMap) {
     let div = L.DomUtil.create("div","info legend");
     let colors = ['green', 'lime', 'yellow','orange','pink','red'];
     let labels = ['-10-10','10-30','30-50','50-70','70-90','90+'];

     //add items 
     for (var i = 0; i < colors.length; i++) {
      div.innerHTML += '<i style=\"background-color:' + colors[i] + '"></i> ' + labels[i] + '<br>';
      }
  

     return div;
     };

  legend.addTo(myMap);
     
    
}

