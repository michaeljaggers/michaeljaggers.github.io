window.addEventListener('load', () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let temperatureSection = document.querySelector('.temperature');
  let temperatureSpan = document.querySelector('.temperature span');
  
  if(navigator.geolocation) {
    
    //Get user lat/long cooirdinates
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      
      const mapsApiKey = 'AIzaSyC5F_0mFT0p5ghk9q34dOe8NlpIcurTJd0';
      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const api = `${proxy}https://api.darksky.net/forecast/3f92d2cdc9874209ce9f199eaeab5524/${lat},${long}`;
      const mapsApi = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${mapsApiKey}`;
      let location;
      
      //Fetch reverse geocoordinates from Google Maps
      fetch(mapsApi)
        .then(mapsResponse => {
          return mapsResponse.json();
        })
        .then(mapsData => {
          console.log(mapsData);

          const { long_name } = mapsData.results[0].address_components[3];
          const { short_name } = mapsData.results[0].address_components[5];
          location = long_name + ", " + short_name;
          
        })

      //Fetch weather information from DarkSky
      fetch(api)
      .then(response => {
        return response.json();
      })
      .then(data => {
        
        const { temperature, summary, icon } = data.currently;
        
        //Set DOM elements from the APIs
        temperatureDegree.textContent = Math.floor(temperature);
        temperatureDescription.textContent = summary;
        locationTimezone.textContent = location;
        
          
        //Formula for Celsius
          let celcius = (temperature - 32) * (5 / 9);
          
          //Set icon
          setIcons(icon, document.querySelector(".icon"));
          
          //Show icon
          document.querySelector('.location .icon').className = 'icon';
          
          //Change temperature to Celsius/Farenheight
          temperatureSection.addEventListener('click', () => {
            if(temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(celcius);
            } else {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = Math.floor(temperature);
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