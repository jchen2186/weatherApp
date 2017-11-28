var x = document.getElementById("weatherDetails");

// basic format is taken from w3schools
// https://www.w3schools.com/html/html5_geolocation.asp
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showWeather, showError);
    }
    else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showWeather(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;

    var url = "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + long;
    // console.log(url);

    $.getJSON(url, function(data) {
        console.log(data.main.temp);

        var temp = document.getElementById("temp");
        temp.innerHTML = data.main.temp + 'C';
        temp.innerHTML += '<br><button class="button" onclick="toggleUnits()">Toggle F/C</button><br>';

        var loc = document.getElementById("location");
        loc.innerHTML = data.name + ", " + data.sys.country;

        var weather = document.getElementById("weather");
        weather.innerHTML = data.weather[0].main;
    });
}

function toggleUnits() {

}

// handling errors function is taken from w3schools
// https://www.w3schools.com/html/html5_geolocation.asp
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation";
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable";
            break;
        case error.TIMOUT:
            x.innerHTML = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred.";
            break;
    }
}