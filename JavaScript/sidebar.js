const forecastList = document.querySelector("#forecast");

const degreeChangeC = document.querySelector("#degreeC");
const degreeChangeF = document.querySelector("#degreeF");

let q = "Lviv";
let units = "metric";

if (localStorage.getItem("units")) {
  units = localStorage.getItem("units");
}

if (units === "metric") {
  degreeChangeC.checked = true;
} else {
  degreeChangeF.checked = true;
}

function createCurrent(dt, temp, icon, description, city) {
  const arraymonth = [
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
  const date = new Date(dt * 1000);
  const time = date.toLocaleTimeString("ua");
  const day = new Intl.DateTimeFormat("en", { weekday: "long" }).format(date);
  const month = date.getMonth();
  const monthDay = date.getDate();
  const wordArray = description.split("");
  const firstLetter = wordArray[0].toUpperCase();
  const letterRest = [...wordArray];
  letterRest.splice(0, 1);
  const finalDescription = [firstLetter, ...letterRest].join("");

  return `<div class="icon_deg_block">
    <img
      src="http://openweathermap.org/img/wn/${icon}@4x.png"
      alt=""
      class="current_icon"
    />
    <p class="current_degree">${temp}°</p>
  </div>
  <div class="current_city_date">
    <h1 class="city_title">${city}</h1>
    <div class="date_text">
      <h2 class="current_day">${day},</h2>
      <p class="current_month">${arraymonth[month]} ${monthDay}</p>
    </div>
  </div>
  <hr class="line" />
  <div class="current_icon_day">
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke-width="2" 
      stroke="currentColor" 
      aria-hidden="true" 
      class="h-6 w-6">
    <path 
      stroke-linecap="round" 
      stroke-linejoin="round" 
      d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z">
  </path></svg>
  <h3 class="current_time_text">${finalDescription}</h3>
  </div>
  <div class="current_time">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      aria-hidden="true"
      class="h-6 w-6 icon_color"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      ></path>
    </svg>
    <h3 class="current_time_text">${time}</h3>
  </div>`;
}

const formCitySumbit = document.querySelector("#searchForm");
formCitySumbit.onsubmit = function (e) {
  e.preventDefault();
  sumbitFunc();
};

function sumbitFunc() {
  q = document.querySelector("#searchCity").value;
  requestWeather();
}

const citySearch = document.querySelector("#buttonSubmit");
citySearch.onclick = myClick;
function myClick() {
  q = document.querySelector("#searchCity").value;
  requestWeather();
}

degreeChangeF.oninput = degreeClickF;
degreeChangeC.oninput = degreeClickC;

function degreeClickC() {
  if (degreeChangeC.checked) {
    units = "metric";
    localStorage.setItem("units", units);
    requestWeather();
  }
}

function degreeClickF() {
  if (degreeChangeF.checked) {
    units = "imperial";
    localStorage.setItem("units", units);
    requestWeather();
  }
}

function requestWeather() {
  handleApiRequest(q, units);
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${q}&units=${units}&appid=8abba83ab8f518e7f932c74ac200adb8`
  )
    .then(function (resp) {
      return resp.json();
    })
    .then(function (dataCurrent) {
      console.log(dataCurrent);
      const currentHTML = createCurrent(
        dataCurrent.dt,
        Math.round(dataCurrent.main.temp),
        dataCurrent.weather[0].icon,
        dataCurrent.weather[0].description,
        dataCurrent.name
      );
      forecastList.innerHTML = currentHTML;
    });
}

requestWeather();
