"use strict";
const todayLocation = document.getElementById("todayLocation");
const todayTemp = document.getElementById("todayTemp");
const todayConditionImg = document.getElementById("todayConditionImg");
const todayConditionText = document.getElementById("todayConditionText");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const windDirection = document.getElementById("windDirection");
const nextDayDate = document.getElementById("nextDayDate");
const nextDayImg = document.getElementById("nextDayImg");
const nextDayMaxTemp = document.getElementById("nextDayMaxTemp");
const nextDayMinTemp = document.getElementById("nextDayMinTemp");
const nextDayConditionText = document.getElementById("nextDayConditionText");
const thirdDayDate = document.getElementById("thirdDayDate");
const thirdDayImg = document.getElementById("thirdDayImg");
const thirdDayMaxTemp = document.getElementById("thirdDayMaxTemp");
const thirdDayMinTemp = document.getElementById("thirdDayMinTemp");
const thirdDayConditionText = document.getElementById("thirdDayConditionText");
const todayDateDayNumber = document.getElementById("todayDateDayNumber");
const todayDateMonth = document.getElementById("todayDateMonth");
const todayDateDayName = document.getElementById("todayDateDayName");
const searchInput = document.getElementById("search");


async function getWeatherData(cityName) {
  let res = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=d7cb905c812440e4800124547250707&q=${cityName}&days=7`
  );
  let weatherData = await res.json();

  return weatherData;
}

async function displayTodayData(data) {
  const { location, current } = data;
  const date = new Date();
const dayNum = date.getDate();
const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
const monthName = date.toLocaleDateString("en-US", { month: "long" });
  todayLocation.innerHTML = location.name;
  todayTemp.innerHTML = `${current.temp_c}° C`;
  todayConditionImg.setAttribute("src", `https:${current.condition.icon}`);
  todayConditionText.innerHTML = current.condition.text;
  humidity.innerHTML = `${current.humidity}%`;
  wind.innerHTML = `${current.wind_kph}km/h `;
  windDirection.innerHTML = current.wind_dir;
  todayDateDayNumber.innerHTML = dayNum;
  todayDateMonth.innerHTML = monthName;
  todayDateDayName.innerHTML=dayName
}

async function getNextData(data) {
  const forecastDay = data.forecast.forecastday[1];
  const date =new Date(forecastDay.date)
  nextDayDate.innerHTML = date.toLocaleDateString("en-US", { weekday: "long" });
 
  nextDayImg.setAttribute("src", `https:${forecastDay.day.condition.icon}`);
  nextDayMaxTemp.innerHTML = `${forecastDay.day.maxtemp_c}° C`;
  nextDayMinTemp.innerHTML = `${forecastDay.day.mintemp_c}°`;
  nextDayConditionText.innerHTML = forecastDay.day.condition.text;
}
async function getThirdData(data) {
  const forecastDay = data.forecast.forecastday[2];
  const date =new Date(forecastDay.date)
  thirdDayDate.innerHTML = date.toLocaleDateString("en-US", { weekday: "long" });
 
  thirdDayImg.setAttribute("src", `https:${forecastDay.day.condition.icon}`);
  thirdDayMaxTemp.innerHTML = `${forecastDay.day.maxtemp_c}° C`;
  thirdDayMinTemp.innerHTML = `${forecastDay.day.mintemp_c}°`;
  thirdDayConditionText.innerHTML = forecastDay.day.condition.text;
}

async function startApp(city='cairo') { 
  let weatherData = await getWeatherData(city);
  if(!weatherData.error){
  displayTodayData(weatherData);
  getNextData(weatherData);
  getThirdData(weatherData);
  }

 
}
startApp();

searchInput.addEventListener("input",()=>{
    console.log();
    startApp(searchInput.value)
    
})
