// Submit optionChange function, read the data from json file and 
//assign the selected parameter to the buildPlot fuction

function optionChange() {

  d3.json("/coffeedata").then((data) => {
    // Drop down list data prepare
    // var subjectId = importedData.names;
    console.log(data);


    // Fill the drop down option list
    var arr = [2012,2013,2014,2015,2016];
    d3.select("#selDataset")
    .selectAll("option")
    .data(arr)
    .enter()
    .append("option")
    .text((d)=>d);

  // // // Prevent the page from refreshing
  // // d3.event.preventDefault();  -------------???
  // Select the input value from the dropdown list
  var year = d3.select("#selDataset").node().value;
  console.log(year);
  // // d3.select("#selDataset").node().value = "";  ---------???
  buildPlots(year);

  });

}

// Add event listener for change the dropdrown list then call a fuction
d3.select("#selDataset").on("change", optionChange);
optionChange()

// Build the plots with the new selected year
function buildPlots(year) {
  d3.json("/coffeedata").then((data) => {

//-------------------------Radar Chart build up -------------------------
    // Filter the data by the selected year
    var year_data = data.filter(x=>x.harvest_year==year);
    console.log(year_data);

    // Sort and slice the data to get the Top and Bottom 4 coffee
    var topThreeCoffee = year_data.sort(function (a,b) {
      return d3.descending(a.total_cup_points, b.total_cup_points);}).slice(0,4);
      // console.log(topThreeCoffee[0]);
    var bottomThreeCoffee = year_data.sort(function (a,b) {
      return d3.ascending(a.total_cup_points, b.total_cup_points);}).slice(0,4);
    // console.log(bottomThreeCoffee);
//-------------------------Radar Chart 1 build up -------------------------
    // Get the array data ready for the Radar Chart 1
    var featuresT1 = [];
    var scoresT1 = [];
    var countryT1 = [];
    Object.entries(topThreeCoffee[0]).forEach(([key,value])=>{
    featuresT1.push(key);
    scoresT1.push(value);
    if (key === "country"){
      countryT1.push(value) ;
    }
    });

    var featuresB1 = [];
    var scoresB1 = [];
    var countryB1 = [];
    Object.entries(bottomThreeCoffee[0]).forEach(([key,value])=>{
    featuresB1.push(key);
    scoresB1.push(value);
    if (key === "country"){
      countryB1.push(value) ;
    }
    });

    var removeIndex = [6,9,10,12];
    for (var i = removeIndex.length -1; i >= 0; i--) {
    featuresT1.splice(removeIndex[i],1);
    scoresT1.splice(removeIndex[i],1);
    featuresB1.splice(removeIndex[i],1);
    scoresB1.splice(removeIndex[i],1);
    }
    console.log(featuresB1);
    console.log(scoresB1);
    console.log(countryB1);

    pdata1 = [{
      type: 'scatterpolar',
      name: `${countryT1}`,
      r: scoresT1,
      theta: featuresT1,
      fill: 'toself',
      fillcolor: '#d27025',
      opacity: 0.4
    },
    {
      type: 'scatterpolar',
      // line:{
      //   color:'#E9E9E9',
      // },
      name: `${countryB1}`,
      r: scoresB1,
      theta: featuresB1,
      fill: 'toself',
      fillcolor: '#8ac5d2',
      opacity: 0.4
    }
  ]
    
    layout1 = {
      title: {
        text: `Top1 VS. Bottom1`,
        font: {
          family: 'Courier New, monospace',
          size: 18
        }
        },
        margin: {"t": 50, "b": 0, "l": 70, "r": 50},
        // automargin: true,
      polar: {
        radialaxis: {
          visible: true,
          range: [0, 10],
          color:'#E9E9E9',
        },
        bgcolor:'#2E3842',
      },
      paper_bgcolor: '#2E3842',
      plot_bgcolor:  '#2E3842',
    
      
      font: {
        size:11,
        color:'#E9E9E9',
    
      },
      showlegend: true,
      legend: {"orientation": "h"}
    }
    
    Plotly.newPlot("radar1", pdata1, layout1,{displayModeBar: false});

//-------------------------Radar Chart 2 build up -------------------------
// Get the array data ready for the Radar Chart 2
var featuresT2 = [];
var scoresT2 = [];
var countryT2 = [];
Object.entries(topThreeCoffee[1]).forEach(([key,value])=>{
featuresT2.push(key);
scoresT2.push(value);
if (key === "country"){
  countryT2.push(value) ;
}
});

var featuresB2 = [];
var scoresB2 = [];
var countryB2 = [];
Object.entries(bottomThreeCoffee[1]).forEach(([key,value])=>{
featuresB2.push(key);
scoresB2.push(value);
if (key === "country"){
  countryB2.push(value) ;
}
});

var removeIndex = [6,9,10,12];
for (var i = removeIndex.length -1; i >= 0; i--) {
featuresT2.splice(removeIndex[i],1);
scoresT2.splice(removeIndex[i],1);
featuresB2.splice(removeIndex[i],1);
scoresB2.splice(removeIndex[i],1);
}
console.log(featuresB2);
console.log(scoresB2);
console.log(countryB2);

pdata2 = [{
  type: 'scatterpolar',
  name: `${countryT2}`,
  r: scoresT2,
  theta: featuresT2,
  fill: 'toself',
  fillcolor: '#d27025',
  opacity: 0.4
},
{
  type: 'scatterpolar',
  name: `${countryB2}`,
  r: scoresB2,
  theta: featuresB2,
  fill: 'toself',
  fillcolor: '#8ac5d2',
  opacity: 0.4
}
]

layout2 = {
  title: {
    text: `Top2 VS. Bottom2`,
    font: {
      family: 'Courier New, monospace',
      size: 18
    }
    },
    margin: {"t": 50, "b": 0, "l": 70, "r": 50},
    // automargin: true,
  polar: {
    radialaxis: {
      visible: true,
      range: [0, 10],
      color:'#E9E9E9',
    },
    bgcolor:'#2E3842',
  },
  paper_bgcolor: '#2E3842',
  plot_bgcolor:  '#2E3842',

  
  font: {
    size:11,
    color:'#E9E9E9',

  },
  showlegend: true,
  legend: {"orientation": "h"}
}

Plotly.newPlot("radar2", pdata2, layout2,{displayModeBar: false});

//-------------------------Radar Chart 3 build up -------------------------
// Get the array data ready for the Radar Chart 3
var featuresT3 = [];
var scoresT3 = [];
var countryT3 = [];
Object.entries(topThreeCoffee[2]).forEach(([key,value])=>{
featuresT3.push(key);
scoresT3.push(value);
if (key === "country"){
  countryT3.push(value) ;
}
});

var featuresB3 = [];
var scoresB3 = [];
var countryB3 = [];
Object.entries(bottomThreeCoffee[2]).forEach(([key,value])=>{
featuresB3.push(key);
scoresB3.push(value);
if (key === "country"){
  countryB3.push(value) ;
}
});

var removeIndex = [6,9,10,12];
for (var i = removeIndex.length -1; i >= 0; i--) {
featuresT3.splice(removeIndex[i],1);
scoresT3.splice(removeIndex[i],1);
featuresB3.splice(removeIndex[i],1);
scoresB3.splice(removeIndex[i],1);
}
console.log(featuresB3);
console.log(scoresB3);
console.log(countryB3);

pdata3 = [{
  type: 'scatterpolar',
  name: `${countryT3}`,
  r: scoresT3,
  theta: featuresT3,
  fill: 'toself',
  fillcolor: '#d27025',
  opacity: 0.4
},
{
  type: 'scatterpolar',
  name: `${countryB3}`,
  r: scoresB3,
  theta: featuresB3,
  fill: 'toself',
  fillcolor: '#8ac5d2',
  opacity: 0.4
}
]

layout3 = {
  title: {
    text: `Top3 VS. Bottom3`,
    font: {
      family: 'Courier New, monospace',
      size: 18
    }
    },
    margin: {"t": 50, "b": 0, "l": 70, "r": 50},
    // automargin: true,
  polar: {
    radialaxis: {
      visible: true,
      range: [0, 10],
      color:'#E9E9E9',
    },
    bgcolor:'#2E3842',
  },
  paper_bgcolor: '#2E3842',
  plot_bgcolor:  '#2E3842',

  
  font: {
    size:11,
    color:'#E9E9E9',

  },
  showlegend: true,
  legend: {"orientation": "h"}
}

Plotly.newPlot("radar3", pdata3, layout3,{displayModeBar: false});



  });

}


