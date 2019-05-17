const request = require('request');

const getWeather = (geocode, callback) => {
  const url = `https://api.darksky.net/forecast/ea9f53f6da2700fe32d3d18fa7b2878a/${geocode.lat},${geocode.lng}?units=ca`;

  request({url: url, json: true}, (error, response) => {
    if (error) {
      callback('Could not connect to the server. Please check your internet connection!', undefined);
    } else if (response.body.error) {
      callback('Given lat and lng is not found! Please try with diffrent one.', undefined);
    } else {
      callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degree out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
    }
  });
}

module.exports = {
  getWeather: getWeather
}