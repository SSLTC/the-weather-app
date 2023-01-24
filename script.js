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

elCity.addEventListener("change", () => {
    const selectedCity = elCity.options[elCity.selectedIndex].text;

    const queryUrl = `https://api.openweathermap.org/data/2.5/weather?lat=57&lon=-2.15&appid=${apiKey}`;
    fetch(queryUrl)
    .then((response) => response.json())
    .then((data) => console.log(data));
})