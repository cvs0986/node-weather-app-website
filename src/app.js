const path = require('path');
const express = require('express');
const hbs = require('hbs');
const map = require('./utils/geocode');
const forcast = require('./utils/weather');


const port = process.env.PORT || 7777;
const app = express();

// define paths for express config
const publicDirPath = path.join(__dirname, '../public/');
const viewsPath = path.join(__dirname, '../public/templates/views/');
const partialsPath = path.join(__dirname, '../public/templates/partials/');


// Setup handlebars engine and views locations
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


// Setup static directory to serve
app.use(express.static(publicDirPath));


app.get('', (req, res) => {
  res.render('index', {
    title: 'Home',
    name: 'Veer Singh'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Veer Singh'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Veer Singh'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'No address found',
      msg: 'You must provide the address'
    })
  }

  map.geocode(req.query.address, (error, data) => {
    if (error) {
      return res.send({
        error
      })
    }

    forcast.getWeather(data, (error, forcastData) => {
      if (error) {
        return res.send({error});
      }
      res.send({
        forcast: forcastData,
        location: data.place,
        address: req.query.address
      });
    });
  });
  
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 Error'
  })
});


app.listen(port, () => {
  console.log('Server is running on port ' + port);
});