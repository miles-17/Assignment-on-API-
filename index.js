var lat, lon;
var dt = [];
var temp = [];
var des = [];
var icon = [];
var day = [];
var capital;
function connect() {
  var searchTerm = document.getElementById("searchBox").value;
  document.getElementById("searchBox").value = "";
  // var url = `https://restcountries.com/v3.1/name/${searchTerm}`;
  var url = `https://restcountries.com/v3.1/name/${searchTerm}?fullText=true`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data); // Log the data received from the API
      if (data && data.length > 0) {
        display(data[0]);
      } else {
        console.error("No data found for the provided search term.");
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function display(items) {
  var oldContent = document.getElementById("container");
  oldContent.textContent = "";

  var oldContent_1 = document.getElementById("container_upper");
  oldContent_1.textContent = "";

  var newDiv = document.createElement("div");

  // newDiv.innerHTML = `      <div class="card">
  //       <img src="img_avatar.png" alt="Avatar" style="width: 100%" />
  //       <div class="container">
  //         <h4><b>John Doe</b></h4>
  //         <p>${items.capital[0]}</p>
  //       </div>
  //     </div>`;

  lat = items.latlng[0];
  lon = items.latlng[1];
  capital = items.capital[0];

  // newDiv.innerHTML = `
  //   <div class="card">
  //     <img src="${items.flags.png}" alt="Flag" style="width: 100%" />
  //     <div class="container">
  //       <h4><b>${items.name.common}</b></h4>
  //       <p>Official Name: ${items.name.official}</p>
  //       <p>Region: ${items.region}</p>
  //       <p>Capital: ${items.capital[0]}</p>
  //       <p>Language: ${items.languages.ben}</p>
  //       <p>Population: ${items.population}</p>
  //       <p>Area: ${items.area}</p>
  //       <p> Map:  <a href="${items.maps.googleMaps}">Link</a> </p>
  //       <p>Currencies: ${items.currencies.BDT.name} (${items.currencies.BDT.symbol})</p>
  //       <p>Timezone: ${items.timezones[0]}</p>
  //       <h4>Weather upfates of ${items.name.common}</h4>
  //       <div class="search_box">
  //     <button onclick="connect_2()">Weather</button>
  //   </div>
  //     </div>
  //   </div>`;

  // oldContent.appendChild(newDiv);

  newDiv.innerHTML = `<div class="container">
  <div class="row">
    <div class="col-6">
      <img src="${items.flags.png}" alt="Flag" style="width: 100%" />
    </div>
    <div class="col">
      <h4><b>${items.name.common}</b></h4>
         <p>Official Name: ${items.name.official}</p>
         <p>Region: ${items.region}</p>
         <p>Capital: ${items.capital[0]}</p>
         <p>Language: ${items.languages.ben}</p>
         <p>Population: ${items.population}</p>
         <p>Area: ${items.area}</p>
         <p> Map:  <a href="${items.maps.googleMaps}">Link</a> </p>

         <p>Timezone: ${items.timezones[0]}</p>
         <h4>Weather updates of ${items.name.common}</h4>
         <div class="search_box">

       <button onclick="connect_2()">Weather data</button>
    </div>
  </div>
  </div>
`;

  oldContent.appendChild(newDiv);
}

function getDayNameFromUnixTimestamp(timestamp) {
  // Convert the Unix timestamp to milliseconds
  let unixMilliseconds = timestamp * 1000;

  // Create a new Date object with the Unix timestamp
  let date = new Date(unixMilliseconds);

  // Get the name of the day from the Date object
  let dayName = date.toLocaleString("en-US", { weekday: "long" });

  return dayName;
}
function getTimeFromUnixTimestamp(timestamp) {
  // Convert the Unix timestamp to milliseconds
  let unixMilliseconds = timestamp * 1000;

  // Create a new Date object with the Unix timestamp
  let date = new Date(unixMilliseconds);

  // Get the time from the Date object
  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  let seconds = date.getSeconds().toString().padStart(2, "0");

  // Combine hours, minutes, and seconds into HH:MM:SS format
  let time = `${hours}:${minutes}:${seconds}`;

  return time;
}

function connect_2() {
  var url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=e3bc9d1e92afe12accae799af3de8496&units=metric`;
  var url_2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e3bc9d1e92afe12accae799af3de8496&units=metric`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      display_2(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  fetch(url_2)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      display_3(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function display_3(data) {
  var oldContent = document.getElementById("container_upper");
  oldContent.textContent = "";

  var newDiv = document.createElement("div");
  newDiv.innerHTML = `<section class="current-weather">
  <h1>${data.name}'s capital ${capital}'s current weather forcast</h1>
        <div class="container">
          <div class="row">
            <h1 class="col temp-title" id="current-temperature" style="padding-bottom: 10px;">${
              data.main.temp
            }°</h1>
            
            <div class="col todays-info">
              <p id="current-time">${getTimeFromUnixTimestamp(data.dt)}</p>
              <h2 id="current-day" style="margin-right: 100px;">${getDayNameFromUnixTimestamp(
                data.dt
              )}</h2>
              <p id="weather-type">${data.weather[0].description}</p>
            </div>
            <div class="col d-flex align-items-center side-info">
              <ul>
                <li>Humidity: <span id="humidity">${
                  data.main.humidity
                }</span></li>
                <li>Wind: <span id="wind">${data.wind.speed}</span></li>
              </ul>
            </div>
          </div>
        </div>
        <hr />
      </section>`;
  oldContent.appendChild(newDiv);
}
function display_2(data) {
  var oldContent = document.getElementById("container");
  oldContent.textContent = "";

  const forecastList = data.list;
  forecastList.forEach((entry) => {
    dt.push(entry.dt);
    day.push(getDayNameFromUnixTimestamp(entry.dt));
    temp.push(entry.main.temp);
    des.push(entry.weather[0].description);
    icon.push(entry.weather[0].icon);

    // Accessing the temperature data from the main object
    const temperature = entry.main.temp;
  });
  // Create a new div element for each temperature
  var newDiv = document.createElement("div");
  newDiv.innerHTML = `

      5 day forecast
      <section class="container">
        <div class="row week-forecast">
          <div class="col">
            <h3>${getDayNameFromUnixTimestamp(dt[7])}</h3>
            <br /><img
              src="https://openweathermap.org/img/w/${icon[7]}.png"
            /><br />
            <p class="weather">${des[7]}</p>
            <span>${temp[7]}°</span>
          </div>
          <div class="col">
            <h3>${getDayNameFromUnixTimestamp(dt[14])}</h3>
            <br /><img
              src="https://openweathermap.org/img/w/${icon[14]}.png"
            /><br />
            <p class="weather">${des[14]}</p>
            <span>${temp[14]}°</span>
          </div>
          <div class="col">
            <h3>${getDayNameFromUnixTimestamp(dt[21])}</h3>
            <br /><img
              src="https://openweathermap.org/img/w/${icon[21]}.png"
            /><br />
            <p class="weather">Partly cloudy</p>
            <span>${temp[21]}°</span>
          </div>
          <div class="col">
            <h3>${getDayNameFromUnixTimestamp(dt[28])}</h3>
            <br /><img
              src="https://openweathermap.org/img/w/${icon[28]}.png"
            /><br />
            <p class="weather">${des[28]}</p>
            <span>${temp[28]}°</span>
          </div>
          <div class="col">
            <h3>${getDayNameFromUnixTimestamp(dt[38])}</h3>
            <br /><img
              src="https://openweathermap.org/img/w/${icon[38]}.png"
            /><br />
            <p class="weather">${des[38]}</p>
            <span>${temp[38]}°</span>
          </div>
        </div>
      </section>`;
  oldContent.appendChild(newDiv);
  console.log(day);
}
