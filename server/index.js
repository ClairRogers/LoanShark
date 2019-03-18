let express = require "express"
let bp = require("body-parser")
var server = express()
var cors = require('cors')

var port = process.env.PORT || 3000
server.use(express.static(__dirname + '/../client/dist'))

var whitelist = ['http://localhost:8080']
var corsOptions = {
  origin: function (origin, callback) {
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  credentials: true
};
server.use(cors(corsOptions))

//database connection
require('./server-assets/db/gearhost-config')


//REGISTER MIDDLEWEAR
server.use(bp.json())
server.use(bp.urlencoded({
  extended: true
}))

//ROUTES




//error handler
server.use('*', (err, req, res, next) => {
  res.status(500).send(err)
  return
})


//Catch all
server.use('*', (req, res, next) => {
  res.status(404).send({
    error: 'No matching routes'
  })
  return
})


server.listen(port, () => {
  console.log('server running on port', port)
})