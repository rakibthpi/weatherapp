const apiKey = "c10778e4099edc413bae5be778c2dd6d"; // Replace with your OpenWeatherMap API key

// Function to convert country code to full country name using Intl.DisplayNames
function convertCountryCode(countryCode) {
  let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  return regionNames.of(countryCode);
}

// Set default city
const defaultCity = "Dhaka";

// Set the default city in the input field when the page loads and fetch weather
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("city-input").value = defaultCity;
  getWeather(defaultCity); // Get weather for the default city
});

// Trigger the getWeather function when Enter is pressed
document
  .getElementById("city-input")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      const city = document.getElementById("city-input").value;
      getWeather(city); // Get weather for the entered city
    }
  });

// Trigger getWeather on button click
document
  .getElementById("get-weather-btn")
  .addEventListener("click", function () {
    const city = document.getElementById("city-input").value;
    getWeather(city); // Get weather for the entered city
  });

async function getWeather(city) {
  if (!city) {
    alert("Please enter a city name!");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found!");
    }
    const weatherData = await response.json();
    displayWeather(weatherData);
  } catch (error) {
    alert(error.message);
  }
}

function displayWeather(data) {
  const countryCode = data.sys.country;
  const countryName = convertCountryCode(countryCode); // Use the new function to convert the country code

  const weatherInfo = document.getElementById("weather-info");
  weatherInfo.innerHTML = `
      <div> ${
        data.weather[0].description === "clear sky"
          ? `<img src="./c.png" alt="Clear Sky" />`
          : '<img src="./r.png" alt="Cloudy Sky" />'
      }</div>
      <h1>${data.main.temp} °C</h1>
       <p> ${data.name}, ${countryName}</p>
      <div class="weatherBottom">
        <div class="weatherBottomleft"> 
            <div><img src="./humidity-sensor.png" alt="Wind" /></div>
            <div><h3>Humidity</h3> ${data.main.humidity}%</div>
        </div>
        <div class="weatherBottomright"> 
             <div><img src="./storm.png" alt="Wind" /></div>
            <div><h3>Wind Speed</h3> ${data.wind.speed}m/s</div>
        </div>
      </div>
    `;
}
