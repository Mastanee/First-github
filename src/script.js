function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function changeDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (dayForecast, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col-2">
    <div class="forecastDay">${changeDay(dayForecast.dt)}</div>
    <img src="http://openweathermap.org/img/wn/${
      dayForecast.weather[0].icon
    }@2x.png" alt="" width="48" />
    <div class="weather-forecast-temperture">
      ${Math.round(
        dayForecast.temp.max
      )}°  <span class="min-temperture">${Math.round(
          dayForecast.temp.min
        )}° </span>
    </div>
  </div>

  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "6d68aadfacdd4f5163bc273049a0cf2d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#discription");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#currentDate");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

function foundCity(city) {
  let apiKey = "29f17ba04e06138f59f013365455d9cc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function searchCity(even) {
  even.preventDefault();
  let cityInput = document.querySelector("#city-name");
  foundCity(cityInput.value);
}

let apiKey = "29f17ba04e06138f59f013365455d9cc";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=london&appid=${apiKey}&units=metric`;
console.log(apiUrl);

axios.get(apiUrl).then(displayTemperature);

let celsiusTemperature = null;

let searchForm = document.querySelector("#search-input");
searchForm.addEventListener("submit", searchCity);

showForecast();
