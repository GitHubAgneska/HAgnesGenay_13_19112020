const express = require('express')
const router = express.Router()
const userKontroller = require('../controllers/userController')
const tokeNValidation = require('../middleware/tokenValidation')

/**
 * @route   POST api/signup
 * @desc    Post create new user request
 * @access  Public
 */ 
router.post('/signup', userKontroller.createUser)

/**
 * @route   POST api/login
 * @desc    Post login request
 * @access  Public
 * @returns token
 * @returns userId
 */
router.post('/login', userKontroller.loginUser)

/**
 * @route   POST api/profile/:id
 * @desc    Post GET user data request
 * @param   userId
 * @access  Private (token)
 */
router.post('/profile/:id', tokeNValidation.validateToken, userKontroller.getUserProfile)

/**
 * @route   PUT api/profile/:id
 * @desc    Put EDIT user data request
 * @param   userId
 * @param   object with modified props
 * @access  Private (token)
 */
router.put('/profile/:id', tokeNValidation.validateToken, userKontroller.updateUserProfile)

module.exports = router
