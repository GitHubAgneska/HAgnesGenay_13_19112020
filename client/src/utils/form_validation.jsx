/* eslint-disable no-unused-vars */

/* * BASE TEMPLATE FOR A CLASSIC FORM VALIDATION
* ------------------------------------------------------
* Only 2 types of fields are in use in the current app :
* userName & Password  (SIGN IN component)
* Which only require not to be empty
*
* A form component will use the following by using
* @type {Object} 'VALIDATE'  as a PROP
* and (optionally)
* @type {Object} 'initialValues' as a PROP
*/

const error = { type: ['emptyField', 'invalidChars', 'length', 'unsafePw'] }

const emailValidation = email => {
  if (/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
    return null
  }
  if (email.trim() === '') {
    return 'Email is required'
  }
  return 'Please enter a valid email'
}

const passwordValidation = password => {
  if (password.trim() === '') {
    return error.type[0]
    // return `userPassword is required`;
  }
  return null
}

// fake validator for checkbox ---- to review
const rememberMeValidation = rememberMe => {
  return null
}

/*  Currently used in : Edit UserName feature  */
const nameValidation = (fieldName, fieldValue) => {

  if (/[^a-zA-Z -]/.test(fieldValue)) {
    // return error.type = 'invalidChars';
    return 'Invalid characters'
  }
  if (fieldValue.trim().length >= 1 && fieldValue.trim().length < 3) {
    // return error.type = 'length';
    return `${fieldName} needs to be at least three characters`
  } else return null
}

const ageValidation = age => {
  if (!age) {
    return 'Age is required'
  }
  if (age < 18) {
    return 'Age must be at least 18'
  }
  return null
}

const createPasswordValidation = password => {
  if (!password) {
    return 'password is required'
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters long'
  }
  return null
}

/**
* @Object Validate
* with:
* @property {userName} : is a @method :
*       * taking as @param name  ( = fieldName)
*       * and @calls @function userNameValidation(@param fieldName, @param fieldValue)
*
*   @example validate[userName]('someName')
*/
export const validate = {
  email: emailValidation,
  password: passwordValidation
  /* rememberMe: rememberMeValidation */
}

export const validateCreate = {
  firstName: name => nameValidation('firstName', name),
  lastName: name => nameValidation('lastName', name),
  email: emailValidation,
  password: passwordValidation
}

// used to validate edit user name form
export const validateEdit = {
  firstName: name => nameValidation('firstName', name),
  lastName: name => nameValidation('lastName', name)
}
