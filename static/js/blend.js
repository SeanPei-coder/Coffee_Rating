var countries = [];

d3.json("/csvFile",function(csv) {

    d3.json("/pointsData", function(pointsData) {

        for(i=0;i<csv.length;i++) {
            // customise countries list;
            countries.push(csv[i].country);
        }

        
        // define the Next Button
        var nextButton = d3.select('#country');

        // when the button is clicked;
        nextButton.on("click", function(){
            // get input value;
            var inputElement_numCountry = d3.select("#numCountry");
            var inputValue_numCountry = inputElement_numCountry.property("value");
        
            console.log(inputValue_numCountry);
        
            // where to add labels and inputs;
            var form = d3.select('#percentBody')
            // dynamic amount of selection;   
            for (i=0; i<inputValue_numCountry;i++){
                form.append('label').text('Country')
                    .append('div').attr("class",'autocomplete').attr("autocomplet",'off')
                    .append('input').attr("id",`country_${i}`).attr("type",'text').attr("placeholder",'AUTOCOMPLETE');
        
                form.append('label').text('Percent')
                    .append('input').attr("id",`percent_${i}`).attr("type",'text').attr('placeholder','0%-100%');
        
                
            }

            console.log(countries);
            for (i=0; i<inputValue_numCountry;i++){
                autocomplete(document.getElementById(`country_${i}`), countries);
            }
            
            

        
            var  blendButton = d3.select("#blend");
            blendButton.on("click", function() {
                
                var selectedCountries = [];
                var selectedPercentage = [];
                for (i=0; i<inputValue_numCountry;i++) {
                    var inputElement_selectedcountry = d3.select(`#country_${i}`);
                    var inputElement_selectedpercentage = d3.select(`#percent_${i}`);
        
                    var inputValue_selectedcountry = inputElement_selectedcountry.property("value");
                    var inputValue_selectedpercentage = inputElement_selectedpercentage.property("value");
                
                    // console.log(inputValue_selectedcountry);
                    // console.log(inputValue_selectedpercentage);
                    selectedCountries.push(inputValue_selectedcountry);
                    selectedPercentage.push(inputValue_selectedpercentage);
                }
                console.log(selectedCountries);
                console.log(selectedPercentage);
                console.log(pointsData);


                var points_array = [];
                for(i=0;i<selectedCountries.length;i++) {
                    for(l=0;l<pointsData.length;l++) {
                        if(selectedCountries[i] == pointsData[l].Country_of_Origin) {
                            var point = selectedPercentage[i]/100 * pointsData[l].Avg_Cup_Points;
                            points_array.push(point);
                        }
                    }

                }
                console.log(points_array);
                var cup_points = 0;
                for(i=0;i<points_array.length;i++) {
                    cup_points = cup_points + points_array[i];
                }
                cup_points = cup_points / points_array.length;

                console.log(cup_points);

                var predict_content = d3.select("#predict_content");

                points_div = predict_content.append("div")
                                            .attr("class",'points')
                                            .html(`<p>Your Own Blend Points: ${cup_points.toFixed(2)}</p>`)
                
            })   
        
            

        })
    })
    
})


function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
  }



  $('[data-dismiss=modal]').on('click', function (e) {
    var $t = $(this),
        target = $t[0].href || $t.data("target") || $t.parents('.modal') || [];
    
  $(target)
    .find("input,textarea,select")
       .val('')
       .end()
    .find("input[type=checkbox], input[type=radio]")
       .prop("checked", "")
       .end();
})