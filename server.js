const express = require('express')
const dotEnv = require('dotenv')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const yaml = require('yamljs')
const swaggerDocs = yaml.load('./swagger2.yaml')
// const swaggerDocs = yaml.load('./swagger.yaml')
const path = require('path')
const dbConnection = require('./api/database/connection')

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


// Handle custom routes
app.use('/api/v1/user', require('./api/routes/userRoutes'))

// API Documentation
/* if (process.env.NODE_ENV !== 'production') {
} */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

express.static(path.join(__dirname, '../client/build'))

// send to '5000:/' ----------------------> /index.html
app.get('/', (_, res) => { res.sendFile(__dirname, '/client/public/index.html') })

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
