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
      
      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const api = `${proxy}https://api.darksky.net/forecast/3f92d2cdc9874209ce9f199eaeab5524/${lat},${long}`;
      
      fetch(api)
      .then(response => {
        return response.json();
      })
      .then(data => {
        
        const { temperature, summary, icon } = data.currently;
        
        //Set DOM elements from the API
        temperatureDegree.textContent = Math.floor(temperature);
        temperatureDescription.textContent = summary;
        locationTimezone.textContent = data.timezone;
          
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