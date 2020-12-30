function weatherCall(event) {
    event.preventDefault();

    var city = $("#searchTerm").val();

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=43f88cf4c22e52ae2848c5fb7e859150&units=imperial";
    // console.log(queryURL)
    // weather API
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        $("#nameName").text(response.name);
        $("#iconIcon").text(response.weather[0].icon);
        $("#windSpeed").text("WindSpeed: " + response.wind.speed + " mph");
        $("#tempTemp").text("Temperature: " + response.main.temp + " F");
        $("#humidity").text("Humidity: " + response.main.humidity);

        // console.log(response);

        var lat = response.coord.lat
        var lon = response.coord.lon
        var queryUvi = "http://api.openweathermap.org/data/2.5/uvi?appid=43f88cf4c22e52ae2848c5fb7e859150&lat=" + lat + "&lon=" + lon
        // UVI API => pass coordinates from weather API to UVI API
        // console.log(queryUvi)
        $.ajax({
            url: queryUvi,
            method: "GET"
        }).then(function (response) {
            $("#uvIndex").text("UV Index: " + response.value)

            // console.log(response)
        });


        var fiveDay = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=43f88cf4c22e52ae2848c5fb7e859150&units=imperial"
        // 5 day forcast 

        $.ajax({
            url: fiveDay,
            method: "GET"
        }).then(function (response) {

             
            for ( i = 0; i < 5; i++) {
                let humidity = response.list[i * 8].main.humidity  
                let temp = response.list[i * 8].main.temp
                let wind = response.list[i*8].wind.speed    
                console.log (humidity, temp, wind ) 
                
               $(".day1").text("Humidity: "+ humidity+  "\n Temperature: "+ temp + "\n Wind: "+wind)




            //    var fiveDayForecast = $("<div>");
            //    var p = $("<p>").text("Humidity: " + humidity);
            //    fiveDayForecast.text(p);
              }
            
            
          
            
            
        });
    });
}

$("#searchButton").on("click", weatherCall);
