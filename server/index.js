let express = require('express')
let bp = require('body-parser')
var server = express()
var cors = require('cors')
var port = process.env.PORT || 3000

server.use(express.static(__dirname + '/../client/dist'))

var whitelist = ['http://localhost:8080', 'https://theloanshark.herokuapp.com/']
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

//REGISTER YOUR AUTH ROUTES BEFORE YOUR GATEKEEPER, OTHERWISE YOU WILL NEVER GET LOGGED IN
let auth = require('./server-assets/auth/routes')
server.use(auth.session)
server.use(auth.router)

//Gate Keeper Must login to access any route below this code
server.use((req, res, next) => {
  if (!req.session.uid) {
    return res.status(401).send({
      error: 'please login to continue'
    })
  }
  next()
})

//ROUTES
let userRoutes = require('./server-assets/routes/user')
server.use('/api/users', userRoutes)
let agsRoutes = require('./server-assets/routes/agreement')
server.use('/api/agreements', agsRoutes)




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