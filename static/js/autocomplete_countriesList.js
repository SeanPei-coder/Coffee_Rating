let countries=[]

d3.json("/csvFile", function(csv) {
    
    
    for (i=0;i<csv.length;i++) {
        countries.push(csv[i].country);
    }
    console.log(countries);
})
console.log(countries);