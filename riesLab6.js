//Function to generate random coordinates within a specified range
//'from' and 'to' define the range, 'fixed' determines the number of decimals
function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
    }

function newMap () {

    //Center the US coordinates
    var map = L.map('map').setView([37.0902, -95.7129], 4);

    //Code from the Library 
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    //Empty array to hold the markers 
   let markers = []

   //Loop 3 times to create the 3 random markers 
    for(let i =1; i <=3; i++){

        //Use the function to generate random lat and lon within the range 
        let lat = getRandomInRange(30, 35, 3); // Latitude Range
        let lon = getRandomInRange(-90, -100, 3); // Longitude Range

        //Add marker to the map with the random coordinates
        let marker = L.marker([lat, lon]).addTo(map);
        markers.push({lat, lon, marker, id:i})

        //Update the div with marker's coordinates
        document.getElementById(`marker${i}`).innerHTML = `<h2>Marker${i}: Latitude ${lat}, Longiude: ${lon}</h2>`;

        //Fetch the locality information using the API
        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`)
            .then(response => response.json())
            .then(data => {
                let locality = data.locality 
                
                //Update the div wit the marker's locality
                document.getElementById(`locality${i}`).innerHTML = `<h4>Locality: ${locality}</h4>`
            })
    }
}
//Initialize the map when the page loads
window.onload = newMap;