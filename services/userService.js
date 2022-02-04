const User = require('../database/models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// CREATE USER REQUEST
module.exports.createUser = async serviceData => {
  try {
    const user = await User.findOne({ email: serviceData.email })
    if (user) {
      throw new Error('Email already exists')
    }
    const hashPassword = bcrypt.hash(serviceData.password, 12) // no 'await' -> no issue

    const newUser = new User({
      firstName: serviceData.firstName,
      lastName: serviceData.lastName,
      email: serviceData.email,
      password: serviceData.password
      /* password: hashPassword, */  // no 'bcrypt'->  no issue
    })

    let result = await newUser.save()

    return result
  } catch (error) {
    console.error('Error in userService.js', error)
    throw new Error(error)
  }
}

// GET USER PERSO INFO REQUEST
module.exports.getUserProfile = async serviceData => {
  try {
    const jwtToken = serviceData.headers.authorization.split('Bearer')[1].trim()
    const decodedJwtToken = jwt.decode(jwtToken)

    const user = await User.findOne({ _id: decodedJwtToken.id}, 'firstName lastName')

    if (!user) { throw new Error('User not found!') }

    const userId = serviceData.userId
    
    return user.toObject()

  } catch (error) {
    console.error('Error in userService.js', error)
    throw new Error(error)
  }
}

// POST USER LOGIN REQUEST
module.exports.loginUser = async serviceData => {
  try {
    const user = await User.findOne({ email: serviceData.email })

    if (!user) { throw new Error('User not found!') }
    
    // SAME ISSUE AS MENTIONED ABOVE : 'await' make request fail
    //const isValid = await bcrypt.compare(serviceData.password, user.password)
    const isValid = bcrypt.compare(serviceData.password, user.password)

    if (!isValid) { throw new Error('Password is invalid') }

    const token = jwt.sign(
      { id: user._id },
      process.env.SECRET_KEY || 'default-secret-key',
      { expiresIn: '1d' }
    )
    const id = user._id

    return { token, id }
  
  } catch (error) {
      console.error('Error in userService.js', error)
      throw new Error(error)
  }
}


// EDIT USER PERS INFO REQUEST
module.exports.updateUserProfile = async serviceData => {
  try {
    const jwtToken = serviceData.headers.authorization.split('Bearer')[1].trim()
    const decodedJwtToken = jwt.decode(jwtToken)
    const user = await User.findOneAndUpdate(
      { _id: decodedJwtToken.id },
      {
        firstName: serviceData.body.firstName,
        lastName: serviceData.body.lastName
      },
      { new: true }
    )

    if (!user) { throw new Error('User not found!') }

    return user.toObject()

  } catch (error) {
      console.error('Error in userService.js', error)
      throw new Error(error)
  }
}
