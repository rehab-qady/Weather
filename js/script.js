let navBtn = document.getElementById("navBarBtn");
let navLinks = document.getElementById("navMob");
let country = document.getElementById("country");
let search = document.getElementById("search");

navBtn.addEventListener("click", function () {
  if (navLinks.classList.contains("d-none")) {
    navLinks.classList.replace("d-none", "d-block");
  } else {
    navLinks.classList.replace("d-block", "d-none");
  }
});

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } 
}
async function showPosition(position) {
 let Latitude= position.coords.latitude ;
 let Longitude= position.coords.longitude;
 let apiResponse1 = await fetch(`http://api.weatherapi.com/v1/search.json?key=c4f55199c8c442e9a68114827240201&q=${Latitude},${Longitude}`);
 let finalResult1 = await apiResponse1.json();
 let name2=finalResult1[0].country;
 console.log(Latitude);
 console.log(Longitude);
 getWeather(name2);
}
let countryName;
let data;
async function getWeather(letter) {
  var apiResponse = await fetch(`http://api.weatherapi.com/v1/search.json?key=c4f55199c8c442e9a68114827240201&q=${letter}`);
  var finalResult = await apiResponse.json();
  countryName = finalResult[0].country;
  document.getElementById("country").innerHTML = countryName;
  console.log(countryName);
  console.log(finalResult);
  console.log("ali");
  data = await getThreeDay();
}

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

async function getThreeDay() {
  var apiResponse2 = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=c4f55199c8c442e9a68114827240201&q=${countryName}&days=7`);
  var finalResult2 = await apiResponse2.json();
  console.log(finalResult2);
  let currentIcon = finalResult2.current.condition.icon;
  let secIcon = finalResult2.forecast.forecastday[1].day.condition.icon;
  let thirdIcon = finalResult2.forecast.forecastday[2].day.condition.icon;
  let today = new Date(finalResult2.current.last_updated);
  let day = days[today.getDay()];
  let month = months[today.getMonth()];
  let todayDate = today.getDate();
  let tomorrow = new Date(finalResult2.forecast.forecastday[1].date);
  let tomorrowDay = days[tomorrow.getDay()];
  let thirdDay= new Date(finalResult2.forecast.forecastday[2].date);
  let thirdDay2=days[thirdDay.getDay()];


 

  document.getElementById("today").innerHTML = day;
  document.getElementById("date").innerHTML = todayDate + month;
  document.getElementById("currentTemp").innerHTML =finalResult2.current.temp_c + `<sup>o</sup>C`;
  document.getElementById("currentIcon").setAttribute("src", currentIcon);

  document.getElementById('tommorrowDay').innerHTML=tomorrowDay;
  document.getElementById("condition").innerHTML = finalResult2.current.condition.text;
  document.getElementById("tomMaxTemp").innerHTML =finalResult2.forecast.forecastday[1].day.maxtemp_c + `<sup>o</sup>C`;
  document.getElementById("tomMinTemp").innerHTML =finalResult2.forecast.forecastday[1].day.mintemp_c + `<sup>o</sup>C`;
  document.getElementById("tomCondition").innerHTML =finalResult2.forecast.forecastday[1].day.condition.text;
  document.getElementById("secIcon").setAttribute("src", secIcon);

  document.getElementById('thirdDay').innerHTML=thirdDay2;
  document.getElementById("secDayMaxTemp").innerHTML =finalResult2.forecast.forecastday[2].day.maxtemp_c + `<sup>o</sup>C`;
  document.getElementById("secDayMinTemp").innerHTML =finalResult2.forecast.forecastday[2].day.mintemp_c + `<sup>o</sup>C`;
  document.getElementById("secDayCondition").innerHTML =finalResult2.forecast.forecastday[2].day.condition.text;
  document.getElementById("thirdIcon").setAttribute("src", thirdIcon);



console.log("rere");
}