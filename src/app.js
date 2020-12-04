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
now.innerHTML = dateTime();

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML =
    Math.round(response.data.main.temp) + "°C | °F";
  document.querySelector("#condition").innerHTML = response.data.main.condition;
  document.querySelector("#humidity").innerHTML =
    "Precipitation: " + response.data.main.humidity + "% ";
  document.querySelector("#wind-speed").innerHTML =
    Math.round(response.data.main.wind) + "mph";
}

function searchCity(city) {
  let apiKey = "321e7c1f77f8c89d8b6d1fe2e5f17d58";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "321e7c1f77f8c89d8b6d1fe2e5f17d58";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", handleSubmit);

searchCity("New York");
