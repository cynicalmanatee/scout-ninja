let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 49.074329, lng: -122.559319 },
    zoom: 15,
  });

  

  const boundCircle = new google.maps.Circle({
    strokeColor: "green",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#green",
    fillOpacity: 0.35,
    map,
    center: {lat: 49.074329, lng: -122.559319 },
    radius: 500,
    draggable: true,
    geodesic: true,
    editable: true,
  });

 

  console.log('working');
}

