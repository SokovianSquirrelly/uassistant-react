const weatherSection = document.querySelector("#weather");

var geocoder;

/*****************************************************************************
 * CHECK TIME
 *
 * This JavaScript file is designed to only call APIs once per hour.  This
 * function will only allow APIs to be called after either one hour past the
 * last saved timestamp or if the timestamp does not exist in local storage.
 *****************************************************************************/
function checkTime() {
  if (localStorage.getItem("visitTimestamp")) {
    lastTimestamp = parseInt(localStorage.getItem("visitTimestamp"));
    let currentTimestamp = Date.now();
    timeDifference = currentTimestamp - lastTimestamp;

    if (timeDifference > 3600000) {
      checkLocation();
      lastTimestamp = currentTimestamp;
      localStorage.setItem("visitTimestamp", lastTimestamp);
    } else {
      displayResults(JSON.parse(localStorage.getItem("recentWeatherData")));
    }
  } else {
    localStorage.setItem("visitTimestamp", Date.now());
    checkLocation();
  }
}

/*****************************************************************************
 * CHECK LOCATION
 *
 * Very simply, this function checks to see if we have a valid geolocation.
 * If it is valid, we will go ahead and call the APIs.  If not, an error
 * message will appear.
 *****************************************************************************/
function checkLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
  }
}

/*****************************************************************************
 * SUCCESS FUNCTION
 *
 * If checking the location was successful, we grab the latitude and longitude
 * to use for finding out which city and/or region the user is in as well as
 * the local weather.
 *****************************************************************************/
function successFunction(position) {
  var lat = position.coords.latitude;
  var lng = position.coords.longitude;
  getLocation(lat, lng);
}

/*****************************************************************************
 * ERROR FUNCTION
 *
 * On the other hand, if checking the location didn't work, then we will just
 * have an error message being displayed.
 *****************************************************************************/
function errorFunction() {
  const errorMessage = document.createElement("p");
  errorMessage.textContent = "Sorry, we couldn't load the weather.";
  weatherSection.appendChild(errorMessage);
}

/*****************************************************************************
 * GET LOCATION
 *
 * We will be using this to get the name of the city or region that the user
 * is in.  Once this happens, we will then pass the latitude and longitude
 * to another function to call the weather API.
 *****************************************************************************/
async function getLocation(lat, lng) {
  const geoURL = `http://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`;
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=c2448f82676f1c51f8aad097f7b429bc&units=imperial`;
  try {
    const response = await fetch(geoURL);
    if (response.ok) {
      const data = await response.json();
      const cityOrCounty =
        data.address.village ||
        data.address.town ||
        data.address.city ||
        data.address.county;
      const state = data.address.state;

      localStorage.setItem("cityLabel", `${cityOrCounty}, ${state}`);

      fetchWeather(weatherURL);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

/*****************************************************************************
 * FETCH WEATHER
 *
 * Now we want to get the API call for the local weather and store it for the
 * next hour.
 *****************************************************************************/
async function fetchWeather(url) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      localStorage.setItem("recentWeatherData", JSON.stringify(data));
      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

/*****************************************************************************
 * DISPLAY RESULTS
 *
 * Whether we made an API call or not, this will get called.  Either the JSON
 * data from the API or the JSON data from the local storage will populate the
 * HTML element with information about the weather.
 *****************************************************************************/
function displayResults(data) {
  const city = document.createElement("h4");
  city.textContent = localStorage.getItem("cityLabel");

  const temperature = document.createElement("h4");
  temperature.textContent = `${data.main.temp}°F`;

  const weatherIcon = document.createElement("image");
  const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  weatherIcon.setAttribute("src", iconsrc);
  weatherIcon.setAttribute("alt", data.weather[0].description);

  const weatherDesc = document.createElement("h4");
  weatherDesc.textContent = data.weather[0].main;

  weatherSection.appendChild(city);
  weatherSection.appendChild(temperature);
  weatherSection.appendChild(weatherIcon);
  weatherSection.appendChild(weatherDesc);
}

checkTime();
