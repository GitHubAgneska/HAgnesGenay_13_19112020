const User = require('../database/models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.createUser = async serviceData => {
  try {
    const user = await User.findOne({ email: serviceData.email })
    if (user) {
      throw new Error('Email already exists')
    }

    // ISSUE HERE : 'await' makes password NULL and prevents request to succeed
    // Postman err : '400 - Error: data and salt arguments required' 
    // ( see https://stackoverflow.com/questions/45015613/error-data-and-salt-arguments-required/45015918)
    // const hashPassword = await bcrypt.hash(serviceData.password, 12)
    // => removing the 'await' keyword allows request to succeed (200 - user created)
    const hashPassword = bcrypt.hash(serviceData.password, 12)

    const newUser = new User({
      email: serviceData.email,
      password: serviceData.password,
      /* password: hashPassword, */ 
      firstName: serviceData.firstName,
      lastName: serviceData.lastName
    })

    let result = await newUser.save()

    return result
  } catch (error) {
    console.error('Error in userService.js', error)
    throw new Error(error)
  }
}

module.exports.getUserProfile = async serviceData => {
  try {
    const jwtToken = serviceData.headers.authorization.split('Bearer')[1].trim()
    const decodedJwtToken = jwt.decode(jwtToken)
    const user = await User.findOne({ _id: decodedJwtToken.id })

    if (!user) {
      throw new Error('User not found!')
    }

    return user.toObject()
  } catch (error) {
    console.error('Error in userService.js', error)
    throw new Error(error)
  }
}

module.exports.loginUser = async serviceData => {
  try {
    const user = await User.findOne({ email: serviceData.email })

    if (!user) {
      throw new Error('User not found!')
    }
    
    // SAME ISSUE AS MENTIONED ABOVE : 'await' make request fail
    //const isValid = await bcrypt.compare(serviceData.password, user.password)
    const isValid = bcrypt.compare(serviceData.password, user.password)

    if (!isValid) { throw new Error('Password is invalid') }

    const token =   jwt.sign(
      { id: user._id },
      'abcdefg123',
      { expiresIn: '1d' }
    )

    return { token }
  } catch (error) {
    console.error('Error in userService.js', error)
    // console.log('==COMPARING==', 'ServiceData.password=>', serviceData.password,'user.password=>', user.password )
    throw new Error(error)
  }
}

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

    if (!user) {
      throw new Error('User not found!')
    }

    return user.toObject()
  } catch (error) {
    console.error('Error in userService.js', error)
    throw new Error(error)
  }
}
