// Creating a link to local files
var link = 'static/countries.geojson'

// Creating a map Object and zoomed out to show the world
var myMap = L.map("map", {
  center: [-5.067383325760818, 77.08252432997061],
  zoom: 2
});

// Adding a base map tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
}).addTo(myMap);

var geoJson;

d3.json("/tableData", function(tableData) {

  console.log(tableData);

  var columns = ['Species', 'Owner','Country of Origin','Aroma','Flavor','Aftertaste', 'Acidity', 'Body', 'Balance', 'Uniformity','Clean Cup', 'Sweetness', 'Cupper Points', 'Total Cup Points'];
  createTable(tableData,columns);

  d3.json(link, function(data){

    // Loading country_points.csv
    d3.json("/pointsData", function(pointsData){

      var features = data.features;

      console.log(features);
      console.log(pointsData);

      // Loading country_list.csv
      d3.json("/csvFile", function(csvFile) {

        console.log(csvFile);
        
        var countryList = [];
        for (var i=0; i<csvFile.length; i++) {

          countryList.push(csvFile[i].country);

        }
        // console.log(countryList);
        var newFeatures = [];
        for (var i=0; i < features.length; i++) {

          var answer = countryList.includes(features[i].properties.ADMIN);
          // console.log(answer);
          if(answer == true) {
            newFeatures.push(features[i])
          }
        }
        console.log(newFeatures);

        for (i=0; i<pointsData.length; i++) {

          for (j=0; j<newFeatures.length; j++) {
            if (newFeatures[j].properties.ADMIN == pointsData[i].Country_of_Origin) {
              newFeatures[j]['points'] = parseFloat(pointsData[i].Avg_Cup_Points);
              newFeatures[j]['species'] = pointsData[i].Species;
            };
          }
        }
        console.log(newFeatures);


        geoJson = L.geoJson(newFeatures, {

          onEachFeature: function (feature, layer) {
            layer.bindPopup('<h2>Avg Cup Points</h2><hr><p>'+'Country: '+feature.properties.ADMIN+'</br>'+'Species: '+feature.species+'</br>'+'Points: '+feature.points.toFixed(2)+'</p>');
          },

          // Adding style to the layer
          style: function(feature){
            return{
                    color: 'white',

            // Calling the choose color function to add to the continents
                    fillColor: getColors(feature.points),
                    fillOpacity: 0.5,
                    weight: 1.5,
                  };
          } 
        }).addTo(myMap);

        geoJson.on('click', function(e){
          let chosenCountry = e.layer.feature.properties.ADMIN;
           
          console.log(chosenCountry);

          console.log(tableData);

          var filteredtableData=[];
          for (i=0; i<tableData.length; i++) {
            if(tableData[i]['Country of Origin'] == chosenCountry) {
              filteredtableData.push(tableData[i]);
            }
          }

          console.log(filteredtableData);

          // delete table before update
          deleteRows();
          updateTable(filteredtableData,columns);


        })

        var legend = L.control({ position:'bottomleft' });
        legend.onAdd = function(myMap) {

          var div = L.DomUtil.create("div", "info legend"),
              grades = [73,80,82,84],
              labels = [];

          for (var i = 0; i < grades.length; i++) {
              div.innerHTML +=
                  '<i style="background:' + getColors(grades[i] ) + '"></i> ' +
                  grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
          }

          return div;
        }
        legend.addTo(myMap);
    })  
    })

    function getColors(points) {
      return points >= 84 ? '#4f0b76' : // Means: if (mag >= 5) return '#ef551a' else…
      points >= 82 ? '#c74956' : // if (mag >= 4) return '#d77430' else etc…
      points >= 80 ?  '#ea7434':
      points >= 73 ? '#f6a50b' : 
      '#f6a50b';
    }
  });
})


















