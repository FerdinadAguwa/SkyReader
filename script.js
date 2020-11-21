var temp = $("#temp");
// cities humidity
var hum = $("#humidity");
var windspeed = $("#windSpeed");
var uvIndex = $("#uvIndex");
var weatherName = $("#weatherName");


function weatherCall(event){
    event.preventDefault();

var city = $("#searchTerm").val();
var queryURL= "http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=43f88cf4c22e52ae2848c5fb7e859150&units=imperial";

// weather API
$.ajax({
    url:queryURL,
    method: "GET"
}).then(function(response) {
    let currTime = new Date(response.dt*1000);
    currTime.getMonth()+1/currTime.getDate()/currTime.getFullYear();
    console.log(currTime)


    var icon = (response.weather[0].icon);
    console.log(icon);
    temp.text("Temperature: "+response.main.temp+" F");
    hum.text("Humidity: "+response.main.humidity+"%");
    windspeed.text("Windspeed: "+response.wind.speed+"m/s");
    weatherName.text("Current Weather: " + currTime + " "+city);
    
   



    var lat=response.coord.lat
    var lon=response.coord.lon
    var queryUvi= "http://api.openweathermap.org/data/2.5/uvi?appid=43f88cf4c22e52ae2848c5fb7e859150&lat="+lat+"&lon="+lon
    // UVI API => pass coordinates from weather API to UVI API
    $.ajax({
        url:queryUvi,
        method: "GET"
    }).then(function(response){
        uvIndex.text("Uvi: "+response.value);
       
        $("#uvIndex").attr("background-color","yellow");

        if (uvIndex > 11) {
            uvIndex.style.backgroundcolor = "purple";
        } else if (uvIndex > 8) {
            uviSeverity = "red";
        } else if (uvIndex > 6) {
            uvIndex.style.backgroundcolor = "orange";
            
        } else if (uvIndex > 3) {
            uvIndex.style.backgroundcolor = "yellow";
         
        }
       
    
    });
var fiveDay = "http://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid=43f88cf4c22e52ae2848c5fb7e859150&units=imperial"
    // 5 day forcast 
    $.ajax({
        fiveDay,
        method: "GET"
    }).then(function(response){
        console.log(fiveDay);

    });
});
}

$("#searchButton").on("click", weatherCall);