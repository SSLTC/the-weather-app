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

elCity.addEventListener("change", () => {
    const selectedCity = elCity.options[elCity.selectedIndex].text;
    // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
    //const queryUrl = `https://api.openweathermap.org/data/2.5/weather?lat=57&lon=-2.15&appid=${apiKey}`;
    const queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${apiKey}`;
    fetch(queryUrl)
    .then((response) => response.json())
    .then((data) => console.log(data));
})

let timestamp = 1674572400;
let date = new Date(Date.UTC(1970, 0, 1, 0, 0, timestamp));
let hour = date.getUTCHours();
let minute = date.getUTCMinutes();
console.log(`Hour: ${hour}, Minute: ${minute}`);