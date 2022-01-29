const express = require('express')
const dotEnv = require('dotenv')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const yaml = require('yamljs')
const swaggerDocs = yaml.load('./swagger2.yaml')
// const swaggerDocs = yaml.load('./swagger.yaml')
const path = require('path')
const dbConnection = require('./database/connection')
const http = require('http')
const favicon = require('serve-favicon')

dotEnv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Connect to the database
dbConnection()

// Handle CORS issues
app.use(cors())

// Request payload middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

express.static(path.join(__dirname, '/client/build/'))
// Handle custom routes
app.use('/api/v1/user', require('./routes/userRoutes'))

// API Documentation
/* if (process.env.NODE_ENV !== 'production') {
} */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.get('/', (req, res, next) => {
  //res.send('Hello from my Express server v2!')
  res.sendFile(__dirname+'/client/public/index.html')
})

app.use(favicon(path.join(__dirname, 'client/build/', 'favicon.ico')))

// express.static(path.join(__dirname, '/client/public'))

// send to '5000:/' ----------------------> /index.html
/* app.get('/', (_, res) => { res.sendFile(__dirname, '/client/public/index.html') })
 */
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
