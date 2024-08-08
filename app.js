window.addEventListener('load', () => {
    const TemV = document.getElementById('temperatura-valor');
    const TemDesc = document.getElementById('temperatura-descripcion');
    const ubi = document.getElementById('ubicacion');
    const iconoA = document.getElementById('icono-animado');
    const VientVel = document.getElementById('viento-velocidad');
    
    const ciudadInput = document.getElementById('ciudad-input');
    const buscarBtn = document.getElementById('buscar-btn');
  
    function obtenerClima(lat, lon) {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=1de021b9851cb03443c26bffcd9fd398`;
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
    }
  
    function buscarCiudad() {
      const ciudad = ciudadInput.value;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=1de021b9851cb03443c26bffcd9fd398`;
      fetch(url)
          .then(response => response.json())
          .then(data => {
              if (data.cod === '404') {
                  alert('Ciudad no encontrada');
                  return;
              }
              obtenerClima(data.coord.lat, data.coord.lon);
          })
          .catch(error => {
              console.log(error);
          });
    }
  
    buscarBtn.addEventListener('click', buscarCiudad);
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(posicion => {
            obtenerClima(posicion.coords.latitude, posicion.coords.longitude);
        });
    }
  });
  