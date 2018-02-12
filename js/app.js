function initMap() {
  let laboratoriaLima = {
    lat: -12.1191427,
    lng: -77.0349046
  };
  let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 18,
    center: laboratoriaLima
  });
  let markerLaboratoria = new google.maps.Marker({
    // Indica el lugar donde pondrá
    position: laboratoriaLima,
    // Se indica el mapa en el que aparecerá el marcador
    map: map
  });

  function locationMe() {
  // Devuelve un objeto Geolocation que proporciona acceso web a la ubicación de un dispositivo
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
    }
  }
  let latitud, longitud;

  let funcionExito = function(posicion) {
  // Obtiene la latitud
    latitud = posicion.coords.latitude;
    // Obtiene la longitud
    longitud = posicion.coords.longitude;

    let locationMy = new google.maps.Marker({
      position: {lat: latitud,
        lng: longitud
      },
      map: map
    });
    // Acercamos el mapa
    map.setZoom(18);
    // Asignamos un nuevo centro del mapa
    map.setCenter({
      lat: latitud,
      lng: longitud
    });
  };
 
  let funcionError = function(error) {
    alert('Tenemos un problema con encontrar tu ubicación');
  };

  document.getElementById('find').addEventListener('click', locationMe);

  // Llamamos a nuestros inputs que van tener el autocompletado
  let inputStart = document.getElementById('input-split');
  let inputDestination = document.getElementById('input-destination');
  // Por medio de la clase "autocomplete" indicamos que este inpur va tener esta funcionalidad
  new google.maps.places.Autocomplete(inputStart);
  new google.maps.places.Autocomplete(inputDestination);

  // Trazar ruta

  let directionsService = new google.maps.DirectionsService;
  let directionsDisplay = new google.maps.DirectionsRenderer;

  let calculateAndDisplayRoute = function(directionsService, directionsDisplay) {
  // Nos devolverá un DirectionsRequest, el cual, será un objeto literal
    directionsService.route({
      origin: inputStart.value,
      destination: inputDestination.value,
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('No encontramos una ruta.');
      }
    });
  };

  directionsDisplay.setMap(map);

  let traceRoute = function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  document.getElementById('route').addEventListener('click',traceRoute);
};

