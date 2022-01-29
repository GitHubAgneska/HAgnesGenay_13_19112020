const express = require('express')
require('dotenv').config()
const PORT = process.env.PORT || 3001
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express')
const yaml = require('yamljs')
const swaggerDocs = yaml.load('./swagger2.yaml')


// orginal config for OC api/db => DEV
// const dbConnection = require('./database/connection')
// dbConnection()

// DB Config (personal DB) => PROD
const mongoose = require('mongoose')
const DBURL = process.env.DATABASE_URI_PROD
// Connect to Mongo
mongoose
  .connect(DBURL, {
    useNewUrlParser: true
  }) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));


const app = express()
app.use(bodyParser.json())
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))


const userRoutes =require('./routes/userRoutes');
app.use('/api/v1/user', userRoutes)


// Serve the static if in production
if ( process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/build/'))
  // any other request than '/api/' => load 'index.html'
  app.get('*', (_, res) => { res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))})
} else { 
  //api doc
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}

app.listen(PORT, () => { console.log(`Server listening on ${PORT}`)})