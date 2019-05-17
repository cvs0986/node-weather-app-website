const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(address)}.json?access_token=pk.eyJ1IjoiY3ZzMDk4NjciLCJhIjoiY2p2a3NweDcyMHNqNzN6czJnc3R4cmVhNyJ9.4WCvFr-ifNMxluPEOrupYA`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Can not connect to the server. Please check your internet connection!', undefined)
    } else if (response.body.features.length == 0) {
      callback('Can not find this location. Please enter correct address!');
    } else {
      callback(undefined, {
        lat: response.body.features[0].center[1],
        lng: response.body.features[0].center[0],
        place: response.body.features[0].place_name
      });
    }
  });

}

module.exports = {
  geocode: geocode
}