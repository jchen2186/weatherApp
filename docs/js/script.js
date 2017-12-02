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

    $.getJSON(url, function(data) {
        console.log(data.main.temp);

        var temp = document.getElementById("temp");
        temp.innerHTML = data.main.temp.toFixed(2) + '&degC';

        var toggler = document.getElementById("toggler");
        toggler.innerHTML += '<button class="button" onclick="toggleUnits()">Toggle F/C</button><br>';

        var loc = document.getElementById("location");
        loc.innerHTML = data.name + ", " + data.sys.country;

        var weather = document.getElementById("weather");
        weather.innerHTML = data.weather[0].main;
        setBackground(data.weather[0].main);
    });
}

function toggleUnits() {
    var temp = document.getElementById("temp");
    var tempContents = temp.innerHTML;
    var degrees = parseFloat(tempContents);

    if (tempContents[tempContents.length - 1] == 'C') {
        temp.innerHTML = (degrees * 9 / 5 + 32).toFixed(2) + '&degF';
    }
    else {
        temp.innerHTML = ((degrees - 32) * 5 / 9).toFixed(2) + '&degC';
    }
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

function setBackground(weather) {
    var html = document.getElementsByTagName('html')[0];
    
    switch (weather) {
        case 'Drizzle':
            html.style.backgroundImage = 'url(img/drizzle.jpg)';
            break;
        case 'Clear':
            html.style.backgroundImage = 'url(img/clear.jpg)';
            break;
        case 'Clouds':
            html.style.backgroundImage = 'url(img/clouds.jpg)';
            break;
        case 'Mist':
            html.style.backgroundImage = 'url(img/mist.jpg)';
            break;
        case 'Rain':
            html.style.backgroundImage = 'url(img/rain.jpg)';
            break;
        case 'Snow':
            html.style.backgroundImage = 'url(img/snow.jpg)';
            break;
        case 'Thunderstorm':
            html.style.backgroundImage = 'url(img/thunderstorm.jpg)';
            break;
    }
}