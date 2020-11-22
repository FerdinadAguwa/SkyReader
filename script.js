// Ferdinad Aguwa J/S_____________________

var searchButton = $(".searchButton");

var apiKey = "43f88cf4c22e52ae2848c5fb7e859150";

// Forloop for HMTL data page
for (var i = 0; i < localStorage.length; i++) {

    var city = localStorage.getItem(i);
    
    var cityName = $(".foreCastList").addClass("listGroupItem");

    cityName.append("<li>" + city + "</li>");
}