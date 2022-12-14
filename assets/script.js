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

    if (lat !== "" && lon !== "") {
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
    }
  });
