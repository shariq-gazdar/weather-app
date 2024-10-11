let triggerBtn = document.querySelector("#triggerBtn");

triggerBtn.addEventListener("click", async () => {
  let apiKey = `662a084d5f26412ca1e153450241807`;
  let weatherSection = document.querySelector("#weatherSection");
  weatherSection.classList.remove("hidden");
  let cityName = document.querySelector("#cityName").value;
  let baseUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&aqi=no`;

  async function weatherUpdate(x, y) {
    if (cityName !== "") {
      console.log(cityName);

      try {
        let response = await fetch(baseUrl);
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        let name = document.querySelector("#cityNameDisplay");
        let temp = document.querySelector("#temperatureDisplay");
        let humidity = document.querySelector("#humidityDisplay");
        let weatherIcon = document.querySelector("#weatherIcon");
        let windDisplay = document.querySelector("#windDisplay");
        let resultJson = await response.json();
        console.log(resultJson);
        name.innerText = resultJson.location.name;
        temp.innerText = `${resultJson.current.temp_c}°C`;
        humidity.innerText = `${resultJson.current.humidity}%`;
        windDisplay.innerText = `${resultJson.current.wind_kph}kph`;
        weatherIcon.src = `https:${resultJson.current.condition.icon}`;
        forecastUpdate();
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      let apiKey = `662a084d5f26412ca1e153450241807`;
      let weatherSection = document.querySelector("#weatherSection");
      weatherSection.classList.remove("hidden");
      let baseUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${x},${y}&aqi=no&days=2`;
      let name = document.querySelector("#cityNameDisplay");
      name.innerText = `Fetching weather data for your current location...`;

      try {
        let response = await fetch(baseUrl);
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        let name = document.querySelector("#cityNameDisplay");
        let condition = document.querySelector("#conditionDisp");
        let temp = document.querySelector("#temperatureDisplay");
        let humidity = document.querySelector("#humidityDisplay");
        let weatherIcon = document.querySelector("#weatherIcon");
        let windDisplay = document.querySelector("#windDisplay");
        let FeelLike = document.querySelector("#feelLikeDisplay");
        let resultJson = await response.json();
        console.log(resultJson);
        name.innerText = resultJson.location.name;
        condition.innerText = `${resultJson.current.condition.text}`;
        temp.innerText = `${resultJson.current.temp_c}°C / ${resultJson.current.temp_f}°F`;
        humidity.innerText = `${resultJson.current.humidity}%`;
        weatherIcon.src = `https:${resultJson.current.condition.icon}`;
        windDisplay.innerText = `${resultJson.current.wind_kph}kph`;
        FeelLike.innerText = `${resultJson.current.wind_kph}°C`;
      } catch (error) {
        console.error("Error:", error);
        let name = document.querySelector("#cityNameDisplay");
        name.innerText =
          "Unable to fetch weather data for your current location.";
      }
    }
  }

  navigator.geolocation.getCurrentPosition((position) => {
    let cityName = document.querySelector("#cityName").value;
    weatherUpdate(position.coords.latitude, position.coords.longitude);
    if (cityName == "") {
      forecastUpdate(position.coords.latitude, position.coords.longitude);
    }
  });
});

let forecastUpdate = async (x, y) => {
  let cityName = document.querySelector("#cityName").value;
  if (cityName !== "") {
    let cityName = document.querySelector("#cityName").value;
    let apiKey = `662a084d5f26412ca1e153450241807`;
    let forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&aqi=no&days=2`;
    let weatherIcon = document.querySelector("#weatherIconFore");
    let forecastDay = document.querySelector("#foreDateDisplay");
    let conditionFore = document.querySelector("#conditionDispFore");
    let temperature = document.querySelector("#temperatureDisplayFore");
    let chanceRain = document.querySelector("#chanceOfRainDisplay");
    let response = await fetch(forecastUrl);
    let data = await response.json();
    let dataArr = data.forecast.forecastday[1];
    weatherIcon.src = `https:${dataArr.day.condition.icon}`;
    forecastDay.innerText = `${dataArr.date}`;
    conditionFore.innerText = `${dataArr.day.condition.text}`;
    temperature.innerText = `${dataArr.day.maxtemp_c} / ${dataArr.day.mintemp_c} °C  `;
    chanceRain.innerText = `${dataArr.day.daily_chance_of_rain} %`;
  } else {
    let apiKey = `662a084d5f26412ca1e153450241807`;
    let forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${x},${y}&aqi=no&days=2`;
    let weatherIcon = document.querySelector("#weatherIconFore");
    let forecastDay = document.querySelector("#foreDateDisplay");
    let conditionFore = document.querySelector("#conditionDispFore");
    let temperature = document.querySelector("#temperatureDisplayFore");
    let chanceRain = document.querySelector("#chanceOfRainDisplay");
    let response = await fetch(forecastUrl);
    let data = await response.json();
    let dataArr = data.forecast.forecastday[1];
    weatherIcon.src = `https:${dataArr.day.condition.icon}`;
    forecastDay.innerText = `${dataArr.date}`;
    conditionFore.innerText = `${dataArr.day.condition.text}`;
    temperature.innerText = `${dataArr.day.maxtemp_c} / ${dataArr.day.mintemp_c} °C  `;
    chanceRain.innerText = `${dataArr.day.daily_chance_of_rain} %`;
    hourForecastUpdate(dataArr);
  }
};
let hourForecastUpdate = async (dataArr) => {
  let hourArr = dataArr.hour;
  for (let i = 0; i < hourArr.length; i++) {
    let tempHour = document.querySelectorAll(".tempHour");
    let icons = document.querySelectorAll(".weatherIconFore");
    let times = document.querySelectorAll(".timeFore");
    let hourArr = dataArr.hour;
    let hour = hourArr[i];
    let temp = tempHour[i];
    let icon = icons[i];
    let time = times[i];
    let timeStr = hour.time;
    let timeArr = timeStr.split(" ");
    let timeHour = timeArr[1];
    if (i >= 13) {
      let firstArr = timeHour.split(":");
      let first = firstArr[0];
      first = first - 12;
      time.innerText = `${first}:00 P.M`;
    } else if (i == 0) {
      time.innerText = `12:00 A.M`;
    } else {
      time.innerText = `${timeHour} A.M`;
    }
    console.log(i);
    console.log(hour);
    temp.innerText = `${hour.temp_c}°C /${hour.temp_f}°F `;
    console.log(icon);
    icon.src = `https:${hour.condition.icon}`;
  }
};
document.addEventListener("DOMContentLoaded", () => {
  let clickBtn = document.querySelector("#triggerBtn");
  console.log(clickBtn);
  clickBtn.click();
});
