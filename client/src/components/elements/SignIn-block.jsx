import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { fetchLogin } from '../../features/login-feature'
import { Link } from 'react-router-dom'

import {validate} from '../../utils/form_validation'

import { SignInSection, InputWrapper, RememberInput } from './SignIn-block_style'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faEye } from '@fortawesome/free-solid-svg-icons'

const eye = <FontAwesomeIcon icon={faEye} />

const SignInBlock = () => {

  const dispatch = useDispatch()
  const history = useHistory()

  const [ isLoading, setIsLoading ] = useState(false)

  // form
  const [values, setValues] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [passwordShown, setPasswordShown] = useState(false)
  const togglePasswordVisiblity = () => { setPasswordShown(!passwordShown) }

  // error login
  const [loginErrorMessage, setErrorMessage] = useState('')
  const [loginSuccessMessage, setLoginSuccessMessage] = useState('')

  const handleInputChange = (event) => {
    const { name } = event.target
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    setValues({ ...values, [name]: value })
    setTouched({ ...touched, [name]: true })
  }

  const handleBlur = (event) => {
    const { name, value } = event.target
    const { [name]: removedError, ...rest } = errors // remove error msg if any
    const error = validate[name](value) // check new error
    if (error)console.log('error ==', error)
    // validate field if val touched
    setErrors({ ...rest, ...(error && { [name]: touched[name] && error }) })
  }

  const handleSubmit = (event) => {
    
    event.preventDefault()
    setIsLoading(true)
  
    const formValidation = Object.keys(values).reduce(
      (acc, key) => {
        const newError = validate[key](values[key]) // key = fieldName / values[key] = fieldValue
        const newTouched = { [key]: true }
        return {
            errors: { ...acc.errors, ...(newError && {[key]: newError }) },
            touched: { ...acc.touched, ...newTouched }
          }
      },
      { errors: { ...errors }, touched: { ...touched }}
    )
    setErrors(formValidation.errors)
    setTouched(formValidation.touched)

    if (
        !Object.values(formValidation.errors).length // errors object = empty
        && Object.values(formValidation.touched).length === Object.values(values).length // all fields were touched
        && Object.values(formValidation.touched).every(t => t === true) // every touched field is true
    ) {
      let userInfo = {...values}
      dispatch(fetchLogin(userInfo))
      .then( response => handleResponse(response))
    }
  }

  const handleResponse = (res) => {
    console.log('HANDLING response=>', res)
    if (res.status === 200) { 
      setLoginSuccessMessage('Login successful')
      navigateToUser()
    }
    else {
      setErrorMessage({error: res.message })
    }
    setIsLoading(false)
  } 

  const navigateToUser = (userId) => {
    history.push('./user/'+ userId)
  }

  return (
    <SignInSection>

      <FontAwesomeIcon icon={faUserCircle} />
      <h1>Sign In</h1>
      {loginErrorMessage && <span>{loginErrorMessage}</span>}
      {loginSuccessMessage && <span>{loginSuccessMessage}</span>}
      <form
        onSubmit={handleSubmit}
        autoComplete='off'
      >
        <InputWrapper>
          <label htmlFor='userName-input'>User email
            <input
              type='text'
              name='email'
              id='userName-input'
              required
              onBlur={handleBlur}
              onChange={handleInputChange}
              touched={touched}
              errors={errors}
            />
            {touched.email && errors.email ? <span>{errors.email}</span> : null}
          </label>
        </InputWrapper>
        <InputWrapper>
          <label htmlFor='pw-input'>Password
            <input
              type={passwordShown ? 'text' : 'password'}
              name='password'
              id='pw-input'
              required
              onBlur={handleBlur}
              onChange={handleInputChange}
              touched={touched}
              errors={errors}
            />
          </label>
          <i onClick={togglePasswordVisiblity}>{eye}</i>
          {touched.password && errors.password ? <span>{errors.password}</span> : null}
        </InputWrapper>

        <RememberInput>
          <label>Remember me
            <input
              type='checkbox'
              name='rememberMe'
              onChange={handleInputChange}
            />
          </label>
        </RememberInput>

        <button>Sign In</button>
      </form>
      <Link to='/signup'>Sign Up</Link>

    </SignInSection>
  )
}
SignInBlock.propTypes = {}
export default SignInBlock
