const mongoose = require('mongoose')
const dbUrl = 'mongodb://127.0.0.1:27017/argentBankDB'
const databaseUrl = process.env.DATABASE_URL || dbUrl  

module.exports = async () => {
  try {
    await mongoose.connect(databaseUrl, { useNewUrlParser: true })
    console.log('Database successfully connected')
  } catch (error) {
    console.error(`Database Connectivity Error: ${error}`)
    throw new Error(error)
  }
}
