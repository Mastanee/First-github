let date = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[date.getDay()];
let weekDay = document.querySelector("#day");
weekDay.innerHTML = currentDay;
let currentTimeHoure = date.getHours();
let todayTimeHoure = document.querySelector("#timeHour");
todayTimeHoure.innerHTML = currentTimeHoure;
let currentTimeMinute = date.getMinutes();
let todayTimeMinute = document.querySelector("#timeMinute");
todayTimeMinute.innerHTML = currentTimeMinute;

function showUser(response) {
  let weatherDiv = document.querySelector("#currentDegreeToday");
  let temperature = Math.round(response.data.main.temp);
  weatherDiv.innerHTML = temperature;
}

function searchCities(event) {
  event.preventDefault();
  let cityNameSearch = document.querySelector("#searchCity");
  let currentCityName = document.querySelector("#currentCity");
  currentCityName.innerHTML = `${cityNameSearch.value}`;
  let apiKey = "29f17ba04e06138f59f013365455d9cc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityNameSearch.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showUser);
}
let searchCity = document.querySelector("#searchCityForm");
searchCity.addEventListener("submit", searchCities);

function showCurrentWeather(response) {
  console.log(response);
  let currentTempShow = document.querySelector("#currentDegreeToday");
  let temperature = Math.round(response.data.main.temp);
  currentTempShow.innerHTML = temperature;
  let cityName = document.querySelector("#currentCity");
  let city = response.data.name;
  cityName.innerHTML = city;
}
function searchLocation(position) {
  let apiKey = "29f17ba04e06138f59f013365455d9cc";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showCurrentWeather);
  console.log(url);
}
function changeToCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let exactWeather = document.querySelector("#currentButton");
exactWeather.addEventListener("click", changeToCurrent);
