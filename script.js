//import cities from './city.list.json' assert {type: 'json'};

//console.log(cities[0].name);

const apiKey = "1ff8b4b537e2648831257bbfbba69d93";

const elCity = document.querySelector("#city");
/*
cities.forEach(city => {
    const elOption = document.createElement("option");
    elOption.value = city.id;
    elOption.innerHTML = city.name + "(" + city.country + ")";
    elCity.appendChild(elOption);
});
*/
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

let weatherData;

elCity.addEventListener("change", () => {
    
    getData();
    showWeatherInfo();
    
})

const getWeatherRelatedImage = async (city, weather) => {
    const queryUrl = `https://api.unsplash.com/search/photos?client_id=kffooHDtQGZv7a36Az_EaHeWT4CW4D8W3ZINMVOn0hM&query='${city}+${weather}'`;

    try {
        const result = await fetch(queryUrl);
        const data = await result.json();

        document.body.style.background = `url(${data.results[0].urls.regular})`;

    } catch (err) {
        console.error(err);
    }
}

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
            + " (" + data.sys.country + ")" + "<br/>"
            + data.weather[0].main + " " + data.main.temp_min + " deg. - " + data.main.temp_max + " deg."  
            + "<br/>" + getDateTime(data.dt);

        const iconcode = data.weather[0].icon;
        const iconUrl = "http://openweathermap.org/img/w/" + iconcode + ".png";

        const elWeatherIcon = document.createElement("img");
        elWeatherIcon.setAttribute("src", iconUrl);

        const elWeatherInfo = document.createElement("p");
        elWeatherInfo.innerHTML = data.weather[0].description + "<br/>" 
            + data.main.temp + "degrees" + "<br/>" 
            + "feels like: " + data.main.feels_like;

        const elDiv = document.querySelector("#weatherInfo");
        elDiv.append(elH1WeatherInfo, elWeatherIcon, elWeatherInfo);

        getWeatherRelatedImage(selectedCity, data.weather[0].main);

    } catch (err) {
        console.error(err);
    }
    
}

const showWeatherInfo = () => {
    
    const iconcode = weatherData.weather[0].icon;
    const iconUrl = "http://openweathermap.org/img/w/" + iconcode + ".png";

    const elWeatherIcon = document.createElement("img");
    elWeatherIcon.setAttribute("src", iconUrl);

    const elDiv = document.querySelector("#weatherInfo");
    elDiv.appendChild(elWeatherIcon);
}

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