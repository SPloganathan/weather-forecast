/* query selecting search button to add a click event. On clicking fetch happens! */
document.querySelector("#search-button").addEventListener("click", function () {
  let cityName = document.querySelector("#search-city-name").value;
  console.log(cityName);
  var coordinatesRequestUrl =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    cityName +
    "&limit=1&appid=c4d8aa17891ee763b028f523635c2fad";
  /*  using fetch we are getting the latitude and longitude
    of a city.*/
  let lat = "";
  let lon = "";
  fetch(coordinatesRequestUrl)
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
});
