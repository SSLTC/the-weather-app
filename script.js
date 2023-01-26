//import Chart from 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.2.0/chart.min.js/auto';

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
const elCity = document.querySelector("#city");

checkCookie();

elCity.addEventListener("change", () => {

    setCookie("city", elCity.selectedValue, 365);
    
    getData();
    //showWeatherInfo();
    
})

const getWeatherRelatedImage = async (city, weather) => {
    const queryUrl = `https://api.unsplash.com/search/photos?client_id=kffooHDtQGZv7a36Az_EaHeWT4CW4D8W3ZINMVOn0hM&query='${city}+${weather}'`;

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

getWeatherRelatedImage("belgium", "map");

const getData = async () => {
    const selectedCity = elCity.options[elCity.selectedIndex].text;
    const unit = "metric";
    // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
    //const queryUrl = `https://api.openweathermap.org/data/2.5/weather?lat=57&lon=-2.15&appid=${apiKey}`;
    const queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&units=${unit}&appid=${apiKey}`;

    try {
        const result = await fetch(queryUrl);
        const data = await result.json();
        console.log(data);

        const elH1WeatherInfo = document.createElement("h1");
        elH1WeatherInfo.innerHTML = data.name 
            + " (" + data.sys.country + ") " + data.weather[0].main + "<br/>"
            + "min: " + data.main.temp_min + "° max: " + data.main.temp_max + "°"  
            + "<br/>" + getDateTime(data.dt);

        const iconcode = data.weather[0].icon;
        const iconUrl = "http://openweathermap.org/img/w/" + iconcode + ".png";

        const elWeatherIcon = document.createElement("img");
        elWeatherIcon.setAttribute("src", iconUrl);

        const elWeatherInfo = document.createElement("p");
        elWeatherInfo.innerHTML = data.weather[0].description + "<br/>" 
            + data.main.temp + "° feels like: " + data.main.feels_like + "°";

        const elDiv = document.querySelector("#weatherInfo");
        elDiv.innerHTML = "";
        elDiv.append(elH1WeatherInfo, elWeatherIcon, elWeatherInfo);
/*
        var xValues = [50,60,70,80,90,100,110,120,130,140,150];
        var yValues = [7,8,8,9,9,9,10,11,14,14,15];

        const elChart = document.getElementById("myChart");
        new Chart(elChart, {
            type: "line",
            data: {
                labels: xValues,
                datasets: [{
                  backgroundColor: "rgba(0,0,0,1.0)",
                  borderColor: "rgba(0,0,0,0.1)",
                  data: yValues
                }]
            },
            options: {}
          });
*/
        getWeatherRelatedImage(selectedCity, data.weather[0].main);

    } catch (err) {
        console.error(err);
    }
    
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