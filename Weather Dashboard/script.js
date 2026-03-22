const apiKey = "fdcbc4bf4b026be27c5541ce19cac0aa";

async function getWeather() {

const city = document.getElementById("cityInput").value;

if(city === ""){
alert("Please enter a city name");
return;
}

const loading = document.getElementById("loading");
const error = document.getElementById("error");
const result = document.getElementById("weatherResult");

loading.classList.remove("hidden");
error.classList.add("hidden");
result.classList.add("hidden");

try {

// Current Weather
const response = await fetch(
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
);

if(!response.ok){
throw new Error("City not found");
}

const data = await response.json();

document.getElementById("cityName").innerText = data.name;

document.getElementById("temperature").innerText =
"Temperature: " + data.main.temp + "°C";

document.getElementById("description").innerText =
"Condition: " + data.weather[0].description;


// Weather Icon
const icon = data.weather[0].icon;

document.getElementById("weatherIcon").src =
`https://openweathermap.org/img/wn/${icon}@2x.png`;

result.classList.remove("hidden");


// 5 Day Forecast
const forecastResponse = await fetch(
`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
);

const forecastData = await forecastResponse.json();

const forecastContainer = document.getElementById("forecastContainer");

forecastContainer.innerHTML = "";

for(let i = 0; i < forecastData.list.length; i += 8){

const day = forecastData.list[i];

const date = new Date(day.dt_txt).toLocaleDateString();

const icon = day.weather[0].icon;

const temp = day.main.temp;

forecastContainer.innerHTML += `
<div class="forecast-card">
<p>${date}</p>
<img src="https://openweathermap.org/img/wn/${icon}.png">
<p>${temp}°C</p>
</div>
`;
}

document.getElementById("forecast").classList.remove("hidden");

}

catch(err){

error.innerText = err.message;
error.classList.remove("hidden");

}

finally{

loading.classList.add("hidden");

}

}


// ENTER KEY SEARCH
document.getElementById("cityInput").addEventListener("keypress", function(event){

if(event.key === "Enter"){
getWeather();
}

});
function getLocationWeather(){

if(navigator.geolocation){

navigator.geolocation.getCurrentPosition(async function(position){

const lat = position.coords.latitude;
const lon = position.coords.longitude;

const loading = document.getElementById("loading");
loading.classList.remove("hidden");

try{

const response = await fetch(
`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
);

const data = await response.json();

document.getElementById("cityName").innerText = data.name;

document.getElementById("temperature").innerText =
"Temperature: " + data.main.temp + "°C";

document.getElementById("description").innerText =
"Condition: " + data.weather[0].description;

const icon = data.weather[0].icon;

document.getElementById("weatherIcon").src =
`https://openweathermap.org/img/wn/${icon}@2x.png`;

document.getElementById("weatherResult").classList.remove("hidden");

}

catch(err){
document.getElementById("error").innerText = "Location weather failed";
}

loading.classList.add("hidden");

});

}
else{
alert("Geolocation not supported");
}

}