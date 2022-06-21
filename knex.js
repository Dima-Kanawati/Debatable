const environment = "development";
const config = require('./knexfile')[environment];

modul.exports= require('knex')(config);