import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { fetchLogin } from '../../features/login-feature'
import { loginState } from '../../state/store'
import Button from './Button/Button'
import { validate } from '../../utils/form_validation'

import { SignInSection, InputWrapper, RememberInput } from './SignIn-block_style'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faEye } from '@fortawesome/free-solid-svg-icons'
import { /* useSelector, */ useStore } from 'react-redux'
const eye = <FontAwesomeIcon icon={faEye} />

const SignInBlock = () => {
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const [errorMessage, setErrorMessage] = useState({})

  const [passwordShown, setPasswordShown] = useState(false)
  const togglePasswordVisiblity = () => { setPasswordShown(!passwordShown) }

  const history = useHistory()
  const store = useStore()
  // const loginStatus = useSelector(state =>state.login.status );
  // const _isMounted = useRef(true);  // tests for memory leak issue on navigate after state updated
  const [failureMessage] = useState(false)

  const [values, setValues] = useState({ email: '', password: '' })
  //  const [values, setValues] = useState({email: '', password:'', rememberMe: false})

  const handleInputChange = (event) => {
    /* const { name, value: newValue, type } = event.target; */
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
    // console.log('FORM values=',values); // { userName: "agnes", userPassword: "xxxx", rememberMe: true }

    const formValidation = Object.keys(values).reduce(
      (acc, key) => {
        const newError = validate[key](values[key]) // key = fieldName / values[key] = fieldValue
        const newTouched = { [key]: true }
        return {
          errors: {
            ...acc.errors,
            ...(newError && {[key]: newError })
          },
          touched: {
            ...acc.touched,
            ...newTouched
          }
        }
      },
      {
        errors: { ...errors },
        touched: { ...touched }
      }
    )
    setErrors(formValidation.errors)
    setTouched(formValidation.touched)

    if (
      !Object.values(formValidation.errors).length && // errors object = empty
            Object.values(formValidation.touched).length === Object.values(values).length && // all fields were touched
            Object.values(formValidation.touched).every(t => t === true) // every touched field is true
    ) {
      // console.log(JSON.stringify(values, null, 2));
      // postData(values);
      // history.push("/user");   // ===> !! memory leak (see https://morioh.com/p/1ab552fdf028)
      fetchLogin(store, values).then(
        // loginStatus === 'rejected'? setFailureMessage(true) : history.push("/user")
        // navigate()
        loginState.isConnected ? history.push('/user') : (setTimeout(() => history.push('/user'), 2000)) // --- TO REVIEW: action should be ASYNC
      )
    }
  }

  return (
    <SignInSection>

      <FontAwesomeIcon icon={faUserCircle} />
      <h1>Sign In</h1>
      {failureMessage && <span>Authentication failed, please check your informations</span>}
      <form
        onSubmit={handleSubmit}
        autoComplete='off'
      >
        <InputWrapper>
          <label htmlFor='userName-input'>UserName
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
