//import cities from './city.list.json' assert {type: 'json'};
/*
cities.forEach(city => {
    const elOption = document.createElement("option");
    elOption.value = city.id;
    elOption.innerHTML = city.name + "(" + city.country + ")";
    elCity.appendChild(elOption);
});
*/
//console.log(cities[0].name);

function setCookie(cookieName, cookieValue, expireDays) {
    const expireDate = new Date();
    expireDate.setTime(expireDate.getTime() + (expireDays * 24 * 60 * 60 * 1000));

    let expires = "expires=" + expireDate.toUTCString();

    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
  }
  
  function getCookie(cookieName) {
    let name = cookieName + "=";
    let cookies = document.cookie.split(';');

    for(let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) == ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) == 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return "";
  }
  
  function checkCookie() {
    let city = getCookie("city");

    if (city != "") {
      const elSelect = document.querySelector("#city");
      elSelect.selectedValue = city;
    }
  }

const apiKey = "1ff8b4b537e2648831257bbfbba69d93";

let unit;

checkCookie();

const elCity = document.querySelector("#city");
elCity.addEventListener("change", (event) => {
  event.preventDefault();

  //const cityName = document.querySelector('.city-input').value;
  const cityName = elCity.options[elCity.selectedIndex].text;

  setCookie("city", cityName, 365);

  getWeatherRelatedImage(cityName);

  let geoData = fetchGeoData(cityName);

  let weatherData = fetchWeatherData(geoData);

  let hourlyForecastData = fetchHourlyForecastData(geoData);

  showWeatherInfo(weatherData, hourlyForecastData);
    
})

const getWeatherRelatedImage = async (cityName) => {
    const queryUrl = `https://api.unsplash.com/search/photos?client_id=kffooHDtQGZv7a36Az_EaHeWT4CW4D8W3ZINMVOn0hM&query='${cityName}'`;

    try {
        const result = await fetch(queryUrl);
        const data = await result.json();

        const elMain = document.querySelector("main");
        elMain.style.background = `url(${data.results[0].urls.regular}) no-repeat`;
        elMain.style.backgroundSize = "cover";

        const elPhotographer = document.querySelector("#photographer");
        elPhotographer.innerHTML = `Photo by <a href ='https://unsplash.com/@${data.results[0].user.username}'>
                                    ${data.results[0].user.last_name} ${data.results[0].user.first_name}</a>`;

    } catch (err) {
        console.error(err);
    }
}

getWeatherRelatedImage();

let fetchGeoData = async (cityName) => {
  try {
    let result = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&units=${unit}&appid=${apiKey}`);
    let geoData = await result.json();

    unit = "metric";

    console.log(geoData);

    return geoData;

  } catch (err) {
    console.error(err);
  }
}

const fetchWeatherData = async (geoData) => {
  try {
    const queryUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${geoData[0].lat}&lon=${geoData[0].lon}&units=${unit}&appid=${apiKey}`;

    let result = await fetch(queryUrl);
    let weatherData = await result.json();

    console.log(weatherData);

    return weatherData;

  } catch (err) {
    console.error(err);
  }
}

const fetchHourlyForecastData = async (geoData) => {

  const queryUrl = `https://api.openweathermap.org/data/2.5/hourly?lat=${geoData[0].lat}&lon=${geoData[0].lon}&units=${unit}&appid=${apiKey}`;

  try {
      const result = await fetch(queryUrl);
      const hourlyForecastData = await result.json();

      console.log(hourlyForecastData);

    } catch (err) {
      console.error(err);
  }
}

const showWeatherInfo = (weatherData, hourlyForecastData) => {
  const elH1WeatherInfo = document.createElement("h1");
  elH1WeatherInfo.innerHTML = weatherData.name 
      + " (" + weatherData.sys.country + ") " + weatherData.weather[0].main + "<br/>"
      + "min: " + weatherData.main.temp_min + "° max: " + weatherData.main.temp_max + "°"  
      + "<br/>" + getDateTime(weatherData.dt);

  const iconcode = weatherData.weather[0].icon;
  const iconUrl = "http://openweathermap.org/img/w/" + iconcode + ".png";

  const elWeatherIcon = document.createElement("img");
  elWeatherIcon.setAttribute("src", iconUrl);

  const elWeatherInfo = document.createElement("p");
  elWeatherInfo.innerHTML = weatherData.weather[0].description + "<br/>" 
      + weatherData.main.temp + "° feels like: " + weatherData.main.feels_like + "°";

  const elCanvas = document.createElement("canvas");
  elCanvas.setAttribute("id", "myChart");

  const elDiv = document.querySelector("#weatherInfo");
  elDiv.innerHTML = "";
  elDiv.append(elH1WeatherInfo, elWeatherIcon, elWeatherInfo, elCanvas);
  
  const elChart = document.querySelector("#myChart");

  var xValues = [100,200,300,400,500,600,700,800,900,1000];

  let myChart = new Chart(elChart, {
    type: "line",
    data: {
      labels: xValues,
      datasets: [{ 
        data: [860,1140,1060,1060,1070,1110,1330,2210,7830,2478],
        borderColor: "red",
        fill: false
      }, { 
        data: [1600,1700,1700,1900,2000,2700,4000,5000,6000,7000],
        borderColor: "green",
        fill: false
      }, { 
        data: [300,700,2000,5000,6000,4000,2000,1000,200,100],
        borderColor: "blue",
        fill: false
      }]
    },
    options: {
      legend: {display: false}
    }
  });
}

/*
let weatherData;

const showWeatherInfo = () => {
    
    const iconcode = weatherData.weather[0].icon;
    const iconUrl = "http://openweathermap.org/img/w/" + iconcode + ".png";

    const elWeatherIcon = document.createElement("img");
    elWeatherIcon.setAttribute("src", iconUrl);

    const elDiv = document.querySelector("#weatherInfo");
    elDiv.appendChild(elWeatherIcon);
}
*/

const getDateTime = (dt) => {
    const date = new Date(Date.UTC(1970, 0, 1, 0, 0, dt));

    const currentDate = date.toLocaleDateString("en-BE", {
        weekday: "short",
        year: "numeric",
        month: "long",
        day: "2-digit"
    })

    const currentTime = date.toLocaleTimeString("en-BE", {
        hour: "2-digit",
        minute: "2-digit"
    })

    return currentDate + ' ' + currentTime;
}

/*
const date = new Date()
const currentDate = date.toLocaleDateString("en-u-ca-chinese", {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "2-digit",
    timeZone: "CST"
})

console.log(Intl.DateTimeFormat("en-u-ca-chinese").format(date));
const currentTime = date.toLocaleTimeString("en-u-ca-chinese", {timeZone: "CST"});
console.log(currentDate + ' ' + currentTime);
*/