
$(document).ready(() => {
    grabLocal()
})

function grabLocal() {
    let array = JSON.parse(localStorage.getItem("city"));
    for (let i = 0; i < array.length; i++){
    $(".localCity").append(`<li> ${array[i]} <br />`)
    console.log(array)
    }

}

allcities = []



function weatherCall(event) {
    event.preventDefault();

    // allcities =[]
    // function displayData() {
    //     for( i = 0; i < allcities.length; i++) {
    //     allcities.push(city);
    //     localStorage.getItem(allcities)
    //     console.log(localStorage)
    //     }

    //   }




    $(".localCity").empty()
    let localCity = document.querySelector(".localCity")
    var city = $("#searchTerm").val();
    // set in local storage
    allcities.push(city)
    const saveToLocalStorage = function Local() {
        localStorage.setItem('city', JSON.stringify(allcities))
    }
    $(".localCity").empty()
   
    let appendLocal = function getLocal() {
        for (let i = 0; i < allcities.length; i++) {
            //  let key = localStorage.key(i);

            //  const value = localStorage.getItem(key);

            localCity.innerHTML += `<li> ${allcities[i]} <br />`;
        }
    }

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

        // callining of my functions
        saveToLocalStorage()
        appendLocal()
        // displayData()

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


            for (i = 0; i < 33; i += 8) {
                let humidity = response.list[i].main.humidity
                let temp = response.list[i].main.temp
                let wind = response.list[i].wind.speed
                // console.log (humidity, temp, wind ) 

                //    $(".day1").text("Humidity: "+ humidity+  "\n Temperature: "+ temp + "\n Wind: "+wind)
                if (i === 0) {
                    $(".day1").text("Humidity: " + humidity + "\n" + "\n Temperature: " + temp + "\n Wind: " + wind)
                } else if (i === 8) {
                    $(".day2").text("Humidity: " + humidity + "\n Temperature: " + temp + "\n Wind: " + wind)
                } else if (i === 16) {
                    $(".day3").text("Humidity: " + humidity + "\n Temperature: " + temp + "\n Wind: " + wind)
                } else if (i === 24) {
                    $(".day4").text("Humidity: " + humidity + "\n Temperature: " + temp + "\n Wind: " + wind)
                } else if (i === 32) {
                    $(".day5").text("Humidity: " + humidity + "\n Temperature: " + temp + "\n Wind: " + wind)
                }




                //    var fiveDayForecast = $("<div>");
                //    var p = $("<p>").text("Humidity: " + humidity);
                //    fiveDayForecast.text(p);
            }





        });
    });
}

$("#searchButton").on("click", weatherCall);
