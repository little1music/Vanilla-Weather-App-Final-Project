let now = document.querySelector("#date-time");
function dateTime() {
  let currentTime = new Date();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let month = months[currentTime.getMonth()];
  let date = currentTime.getDate();
  let hours = currentTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dateTime = `${
    days[currentTime.getDay()]
  }, ${month} ${date} ${hours}:${minutes}`;
  return dateTime;
}
document.querySelector("#date-time").innerHTML = dateTime();

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML =
    Math.round(response.data.main.temp) + "°C | °F";
  document.querySelector("#condition").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML =
    "Humidity: " + response.data.main.humidity + "% ";
  document.querySelector("#wind-speed").innerHTML =
    Math.round(response.data.wind.speed) + " km/H";
}

celsiusTemperature = response.data.main.temp;

function searchCity(city) {
  let apiKey = "321e7c1f77f8c89d8b6d1fe2e5f17d58";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  searchCity(cityInput.value);
}

function searchLocation(city) {
  let apiKey = "321e7c1f77f8c89d8b6d1fe2e5f17d58";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrentheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrentheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

searchCity("New York");
