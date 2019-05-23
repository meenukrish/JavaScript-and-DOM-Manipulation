// from data.js
var tableData = data;


var searchdate;
var searchcity; 
var searchstate;
var searchcountry; 
var searchshape;

var datetimearr =[];
var cityarr = [];
var statearr = [];
var countryarr = [];
var shapearr = [];

var uniquedatetimevalues=[];
var uniquecityvalues = [];
var uniquestatevalues = [];
var uniquecountryvalues = [];
var uniqueshapevalues = [];

let button = d3.select("#filter-btn");

function fillvalues()
{

  /* This function does 4 steps for all the 5 selction dropdowns on the form
  1. collect all the attribute(for example datetime, city, country etc)
  2. Remove the duplicates and make it as a array with unique values
  3. select the dropdown element to bind the values
  4. bind the values to the dropdown.
  */

  datetimearr = data.map(function(ufosighting){ return ufosighting.datetime; });  
  uniquedatetimevalues  = datetimearr.filter(remove_duplicates); 
  var datetimesel = d3.select("#datetime")  
  bind_array_to_select(uniquedatetimevalues,datetimesel);

  cityarr = data.map(function(ufosighting){ return ufosighting.city; }); 
  uniquecityvalues  = cityarr.filter(remove_duplicates); 
  var citysel = d3.select("#city")
  bind_array_to_select(uniquecityvalues,citysel);
  

  statearr = data.map(function(ufosighting){ return ufosighting.state; }); 
  uniquestatevalues  = statearr.filter(remove_duplicates); 
  var statesel = d3.select("#state")
  bind_array_to_select(uniquestatevalues,statesel);

  countryarr = data.map(function(ufosighting){ return ufosighting.country; }); 
  uniquecountryvalues  = countryarr.filter(remove_duplicates); 
  var countrysel = d3.select("#country")
  bind_array_to_select(uniquecountryvalues,countrysel);

  shapearr = data.map(function(ufosighting){ return ufosighting.shape; }); 
  uniqueshapevalues  = shapearr.filter(remove_duplicates); 
  var shapesel = d3.select("#shape")
  bind_array_to_select(uniqueshapevalues,shapesel);

};

// Helper method to remove the duplicates in the array
function remove_duplicates(item,index,arr)
{
   return arr.indexOf(item) >= index;  //if the index of the item is less than the current index, then it exists in the array.
};

//Helper method to bind the values to the <Select> tag

function bind_array_to_select(arr, selID)
{
  /*set the default option selected as "Please Select*/
  var defopt = selID.append("option")
  defopt.attr("value", "Please Select") ;
  defopt.text("Please Select");
  defopt.attr("selected");

  for (i=0;i<arr.length;i++)
  {
    var opt = selID.append("option")
    opt.attr("value", arr[i]) ;
    opt.text(arr[i]);

  }

};

fillvalues();  // Find the unique values and fill the values to the selection dropdown. 


function searchUFOData(sighting)
{
    return (sighting.datetime === searchdate)|
           (sighting.city===searchcity)|
           (sighting.state===searchstate)|
           (sighting.country===searchcountry)|
           (sighting.shape===searchshape);
};


button.on("click", function()
{
    d3.event.preventDefault();
   
    //get the value from input field
    searchdate = d3.select("#datetime").property("value");   
    searchcity = d3.select("#city").property("value"); 
    searchstate =d3.select("#state").property("value"); 
    searchcountry = d3.select("#country").property("value"); 
    searchshape = d3.select("#shape").property("value"); 

        
    // Find the results matching with the searchDate
    let FilteredUFOSightings = tableData.filter(searchUFOData); 
   
      
    tbody = d3.select("tbody"); 
    // Remove existing search results from the table grid
    tbody.text("");         

    //Bind the new result to the table grid
    FilteredUFOSightings.forEach((filteredufo) => {
        var row = tbody.append("tr");
        Object.entries(filteredufo).forEach(([key, value]) => {
          var cell = row.append("td");
          cell.text(value);
        });
      });
});



