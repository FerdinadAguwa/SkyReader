// Ferdinad Aguwa J/S_____________________

var searchButton = $(".searchButton");

var apiKey = "43f88cf4c22e52ae2848c5fb7e859150";

// Forloop for HMTL data page
for (var i = 0; i < localStorage.length; i++) {

    var city = localStorage.getItem(i);
    
    var cityName = $(".foreCastList").addClass("forcastList");

    cityName.append("<li>" + city + "</li>");
}
// Key count for local storage curtousy of Fernando
var keyCount = 0;
// Search button click event
searchButton.click(function () {

    var searchInput = $(".searchInput").val();

    // Variable for current weather working 
    var urlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&Appid=" + apiKey + "&units=imperial";
    // Variable for 5 day forecast working
    var urlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&Appid=" + apiKey + "&units=imperial";


    if (searchInput == "") {
        console.log(searchInput);
    } else {
        $.ajax({
            url: urlCurrent,
            method: "GET"
        }).then(function (response) {
            // foreCastlist append an li to it with just set text
            // console.log(response.name);
            var cityName = $(".foreCastList").addClass("listGroupItem");
            cityName.append("<li>" + response.name + "</li>");
            // Local storage
            var local = localStorage.setItem(keyCount, response.name);
            keyCount = keyCount + 1;

            // Start Current Weather append 
            var currentCard = $(".currentCard").append("<div>").addClass("card-body");
            currentCard.empty();
            var currentName = currentCard.append("<p>");
            // .addClass("card-text");
            currentCard.append(currentName);

            // Date adjustments
            var dateUTC = new Date(response.dt * 1000);
            currentName.append(response.name + " " + dateUTC.toLocaleDateString("en-US"));
            currentName.append(`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`);
            // Add Temp 
            var currentStat = currentName.append("<p>");
            // .addClass("card-text");
            currentName.append(currentStat);

            currentStat.append("<p>" + "Temperature: " + response.main.temp + "</p>");
            // Add Humidity
            currentStat.append("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>");
            // // Add Wind Speed: 
            currentStat.append("<p>" + "Wind Speed: " + response.wind.speed + "</p>");

            // UV Index URL
            var uvIndex = `https://api.openweathermap.org/data/2.5/uvi?appid=43f88cf4c22e52ae2848c5fb7e859150&lat=${response.coord.lat}&lon=${response.coord.lon}`;

            // UV Index
            $.ajax({
                url: uvIndex,
                method: "GET"
            }).then(function (response) {

                var currentUvIndex = currentTemp.append("<p>" + "UV Index: " + response.value + "</p>").addClass("card-text");
                currentUvIndex.addClass("UV");
                currentTemp.append(currentUvIndex);
                // currentUvIndex.append("UV Index: " + response.value);
            });

        });

});