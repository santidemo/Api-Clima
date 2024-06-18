window.addEventListener('load', () => {
  let lon;
  let lat;

  let TemV = document.getElementById('temperatura-valor');
  let TemDesc = document.getElementById('temperatura-descripcion');

  let ubi = document.getElementById('ubicacion');
  let iconoA = document.getElementById('icono-animado');

  let VientVel = document.getElementById('viento-velocidad');

  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(posicion => {
          lon = posicion.coords.longitude;
          lat = posicion.coords.latitude;

          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lang=es&lon=${lon}&appid=00d8796f6b1fe5e20a03accd855fe883`;
          fetch(url)
              .then(response => response.json())
              .then(data => {
                  let temp = Math.round(data.main.temp - 273.15);  
                  TemV.textContent = `${temp} °C`;
                  let desc = data.weather[0].description;
                  TemDesc.textContent = desc.toUpperCase();
                  ubi.textContent = data.name;
                  VientVel.textContent = `${data.wind.speed} m/s`;

                  switch (data.weather[0].main) {
                      case 'Thunderstorm':
                          iconoA.src = 'animated/thunder.svg';
                          break;
                      case 'Drizzle':
                          iconoA.src = 'animated/rainy-2.svg';
                          break;
                      case 'Rain':
                          iconoA.src = 'animated/rainy-7.svg';
                          break;
                      case 'Snow':
                          iconoA.src = 'animated/snowy-6.svg';
                          break;
                      case 'Clear':
                          iconoA.src = 'animated/day.svg';
                          break;
                      case 'Atmosphere':
                          iconoA.src = 'animated/weather.svg';
                          break;
                      case 'Clouds':
                          iconoA.src = 'animated/cloudy-day-1.svg';
                          break;
                      default:
                          iconoA.src = 'animated/cloudy-day-1.svg';
                          break;
                  }
              })
              .catch(error => {
                  console.log(error);
              });
      });
  }
});
