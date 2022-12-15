/* query selecting search button to add a click event. On clicking fetch happens! */
document
  .querySelector("#search-button")
  .addEventListener("click", async function () {
    let cityName = document.querySelector("#search-city-name").value;
    console.log(cityName);
    let coordinatesRequestUrl =
      "http://api.openweathermap.org/geo/1.0/direct?q=" +
      cityName +
      "&limit=1&appid=c4d8aa17891ee763b028f523635c2fad";
    /*  using fetch we are getting the latitude and longitude
    of a city.*/
    /* setting empty string to lat and lon variable so that we can assign the actual data from the api response later */
    let lat = "";
    let lon = "";
    /* 'await' holds the current execution till we get the response back.Once we get the response it moves to next line (which is line 31 here ). 
    Awaits can only be used inside asynchronous functions */
    await fetch(coordinatesRequestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        if (data && data.length) {
          lat = data[0].lat;
          lon = data[0].lon;
        }
      });
    /* using if condition checking if we have a valid lon and lat value and using it to fetch the actual weather details */

    if (lat && lon) {
      let weatherData = "";
      let weatherRequestUrl =
        "https://api.openweathermap.org/data/2.5/forecast?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=c4d8aa17891ee763b028f523635c2fad&units=imperial";
      await fetch(weatherRequestUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          weatherData = data;
        });
      /* once we get a valid weather data then query selecting and assigning the values in the elements */
      if (weatherData) {
        let currentDayWeather = weatherData.list[0];
        let temperature = currentDayWeather.main.temp;
        let wind = currentDayWeather.wind.speed;
        let humidity = currentDayWeather.main.humidity;
        let icon = currentDayWeather.weather[0].icon;
        console.log(temperature, wind, humidity, icon);
        document.querySelector("#city-name").textContent =
          cityName + " (" + dayjs().format("MM/DD/YYYY") + ")";
        document.querySelector("#current-temp").textContent =
          "Temp: " + temperature + "\xB0 F";
        document.querySelector("#current-wind").textContent =
          "Wind: " + wind + " MPH";
        document.querySelector("#current-humidity").textContent =
          "Humidity: " + humidity + " %";
        /* weather api icon url */
        document.querySelector("#current-weather-image").src =
          "http://openweathermap.org/img/wn/" + icon + ".png";
        /* Iterating for next 5 days weather forecast */
        for (let i = 1; i <= 5; i++) {
          /* adding one day to current date using "i" */
          let nextDay = dayjs().add(i, "day");
          /* Finding the "nextDay" weather by comparing the date from the list using dayjs format function, since the time varies */
          let nextDateWeather = weatherData.list.find(
            (eachDay) =>
              dayjs(eachDay.dt_txt).format("YYYY-M-D") ===
              nextDay.format("YYYY-M-D")
          );
          console.log(nextDateWeather);
        }
      }
    }
    document.querySelector(".weather-column").style.display = "block";
  });
