window.addEventListener('load', () => {
  let long;
  let lat;
  // Main Temp Elements
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationUser = document.querySelector('.location-user');
  let temperatureSection = document.querySelector('.temperature');
  let temperatureSpan = document.querySelector('.temperature span');

  //Forecast Elements
  let forecastSection = document.querySelector('.forecast-section');
  let forecastTodayWeekday = document.querySelector('.forecast-section .today .weekday');
  let forecastTodayWeekdayPlus1 = document.querySelector('.forecast-section .todayPlus1 .weekday');
  let forecastTodayWeekdayPlus2 = document.querySelector('.forecast-section .todayPlus2 .weekday');
  let forecastTodayWeekdayPlus3 = document.querySelector('.forecast-section .todayPlus3 .weekday');
  let forecastTodayWeekdayPlus4 = document.querySelector('.forecast-section .todayPlus4 .weekday');

  let forecastTodayHigh = document.querySelector('.forecast-section .today .forecast-temp-high');
  let forecastTodayLow = document.querySelector('.forecast-section .today .forecast-temp-low');
  let forecastTodayPlus1High = document.querySelector('.forecast-section .todayPlus1 .forecast-temp-high');
  let forecastTodayPlus1Low = document.querySelector('.forecast-section .todayPlus1 .forecast-temp-low');
  let forecastTodayPlus2High = document.querySelector('.forecast-section .todayPlus2 .forecast-temp-high');
  let forecastTodayPlus2Low = document.querySelector('.forecast-section .todayPlus2 .forecast-temp-low');
  let forecastTodayPlus3High = document.querySelector('.forecast-section .todayPlus3 .forecast-temp-high');
  let forecastTodayPlus3Low = document.querySelector('.forecast-section .todayPlus3 .forecast-temp-low');
  let forecastTodayPlus4High = document.querySelector('.forecast-section .todayPlus4 .forecast-temp-high');
  let forecastTodayPlus4Low = document.querySelector('.forecast-section .todayPlus4 .forecast-temp-low');
  
  if(navigator.geolocation) {
    
    //Get user lat/long cooirdinates
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      
      const mapsApiKey = 'AIzaSyC5F_0mFT0p5ghk9q34dOe8NlpIcurTJd0';
      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const weatherApi = `${proxy}https://api.darksky.net/forecast/3f92d2cdc9874209ce9f199eaeab5524/${lat},${long}`;
      const mapsApi = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${mapsApiKey}`;
      let location;
      
      //Fetch reverse geocoordinates from Google Maps
      fetch(mapsApi)
        .then(mapsResponse => {
          return mapsResponse.json();
        })
        .then(mapsData => {
          
          const city = mapsData.results[0].address_components[3].short_name;
          const state = mapsData.results[0].address_components[5].short_name;
          location = city + ", " + state;
          locationUser.textContent = location;
        })

      //Fetch weather information from DarkSky
      fetch(weatherApi)
      .then(response => {
        return response.json();
      })
      .then(data => {

        const { temperature, summary, icon, time } = data.currently;

        const calcDate = (timestamp, increment) => {
          // multiply days by one day's worth of milliseconds
          const incrementer = increment * 86400000;

          return new Date(timestamp + incrementer).toString().substring(0, 3);
        }
        const todayTimestamp = time * 1000;
        const weekdayToday = calcDate(todayTimestamp, 0);
        const weekdayTodayPlus1 = calcDate(todayTimestamp, 1);
        const weekdayTodayPlus2 = calcDate(todayTimestamp, 2);
        const weekdayTodayPlus3 = calcDate(todayTimestamp, 3);
        const weekdayTodayPlus4 = calcDate(todayTimestamp, 4);

        const weekdayTodayIcon = data.daily.data[0].icon;
        const weekdayTodayPlus1Icon = data.daily.data[1].icon;
        const weekdayTodayPlus2Icon = data.daily.data[2].icon;
        const weekdayTodayPlus3Icon = data.daily.data[3].icon;
        const weekdayTodayPlus4Icon = data.daily.data[4].icon;

        const forecastTodayHighTemp = data.daily.data[0].temperatureMax;
        const forecastTodayLowTemp = data.daily.data[0].temperatureMin;
        const forecastTodayPlus1HighTemp = data.daily.data[1].temperatureMax;
        const forecastTodayPlus1LowTemp = data.daily.data[1].temperatureMin;
        const forecastTodayPlus2HighTemp = data.daily.data[2].temperatureMax;
        const forecastTodayPlus2LowTemp = data.daily.data[2].temperatureMin;
        const forecastTodayPlus3HighTemp = data.daily.data[3].temperatureMax;
        const forecastTodayPlus3LowTemp = data.daily.data[3].temperatureMin;
        const forecastTodayPlus4HighTemp = data.daily.data[4].temperatureMax;
        const forecastTodayPlus4LowTemp = data.daily.data[4].temperatureMin;
        
        //Set DOM elements from the APIs
        temperatureDegree.textContent = Math.round(temperature);
        temperatureDescription.textContent = summary;
        forecastTodayWeekday.textContent = weekdayToday;
        forecastTodayWeekdayPlus1.textContent = weekdayTodayPlus1;
        forecastTodayWeekdayPlus2.textContent = weekdayTodayPlus2;
        forecastTodayWeekdayPlus3.textContent = weekdayTodayPlus3;
        forecastTodayWeekdayPlus4.textContent = weekdayTodayPlus4;
        forecastTodayHigh.textContent = Math.round(forecastTodayHighTemp);
        forecastTodayLow.textContent = Math.round(forecastTodayLowTemp);  
        forecastTodayPlus1High.textContent = Math.round(forecastTodayPlus1HighTemp);
        forecastTodayPlus1Low.textContent = Math.round(forecastTodayPlus1LowTemp);
        forecastTodayPlus2High.textContent = Math.round(forecastTodayPlus2HighTemp);
        forecastTodayPlus2Low.textContent = Math.round(forecastTodayPlus2LowTemp);
        forecastTodayPlus3High.textContent = Math.round(forecastTodayPlus3HighTemp);
        forecastTodayPlus3Low.textContent = Math.round(forecastTodayPlus3LowTemp);
        forecastTodayPlus4High.textContent = Math.round(forecastTodayPlus4HighTemp);
        forecastTodayPlus4Low.textContent = Math.round(forecastTodayPlus4LowTemp);
          
        //Formula for Celsius
          let celcius = (temperature - 32) * (5 / 9);
          
          //Set icons
          setIcons(icon, document.querySelector(".icon"));
          setIcons(weekdayTodayIcon, document.querySelector('.forecast-section .today .icon'));
          setIcons(weekdayTodayPlus1Icon, document.querySelector('.forecast-section .todayPlus1 .icon'));
          setIcons(weekdayTodayPlus2Icon, document.querySelector('.forecast-section .todayPlus2 .icon'));
          setIcons(weekdayTodayPlus3Icon, document.querySelector('.forecast-section .todayPlus3 .icon'));
          setIcons(weekdayTodayPlus4Icon, document.querySelector('.forecast-section .todayPlus4 .icon'));
          
          //Show information
          document.querySelector('.location .icon').className = 'icon';
          temperatureDegree.className = 'temperature-degree';
          temperatureSpan.className = '';
          locationUser.className = 'location-user';
          forecastSection.className = 'forecast-section';
          
          
          //Change temperature to Celsius/Farenheight
          temperatureSection.addEventListener('click', () => {
            if(temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.round(celcius);
            } else {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = Math.round(temperature);
            }
          });
      });
    });
  }
  
  function setIcons(icon, iconID) {
    const skycons = new Skycons({color: "white"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
  
});