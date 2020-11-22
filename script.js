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

