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
function showForecast() {
  let forecastElement = document.querySelector("#weather-forecast");
  console.log(forecastElement);
  let forecastHTML = `<div class="row">`;
  let days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Fri"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
  <div class="col-2">
    <div class="forecastDay">${day}</div>
    <img src="http://openweathermap.org/img/wn/03n@2x.png" alt="" width="48" />
    <div class="weather-forecast-temperture">
      19 <span class="min-temperture">10</span>
    </div>
  </div>

  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
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

function displaycelsiusTemp(event) {
  event.preventDefault();
  celsiusTemp.classList.add("active");
  fahrenhietTemp.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayFahrenhietTemp(event) {
  event.preventDefault();
  celsiusTemp.classList.remove("active");
  fahrenhietTemp.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}
let celsiusTemperature = null;

let searchForm = document.querySelector("#search-input");
searchForm.addEventListener("submit", searchCity);

let fahrenhietTemp = document.querySelector("#fahrenheit");
fahrenhietTemp.addEventListener("click", displayFahrenhietTemp);

let celsiusTemp = document.querySelector("#celsius");
celsiusTemp.addEventListener("click", displaycelsiusTemp);

showForecast();
