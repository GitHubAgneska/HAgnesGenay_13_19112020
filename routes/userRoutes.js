const express = require('express')
const router = express.Router()
const userKontroller = require('../controllers/userController')
const tokeNValidation = require('../middleware/tokenValidation')

router.post('/signup', userKontroller.createUser)

router.post('/login', userKontroller.loginUser)

router.post('/profile', tokeNValidation.validateToken, userKontroller.getUserProfile)

router.put('/profile', tokeNValidation.validateToken, userKontroller.updateUserProfile)

module.exports = router
