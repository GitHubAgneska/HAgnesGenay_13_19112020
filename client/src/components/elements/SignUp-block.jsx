import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"

import { createEmployee } from '../../features/signup-feature'
import { userDataState } from '../../state/store'

import { validateCreate } from '../../utils/form_validation'

import { SignUpSection, InputWrapper } from './SignUp-block_style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faEye } from '@fortawesome/free-solid-svg-icons'

import ModalComp from '../elements/Modal/Modal'
import useModal from '../elements/Modal/useModal'

const eye = <FontAwesomeIcon icon={faEye} />


const SignUpBlock = () => {

  const dispatch = useDispatch()
  const history = useHistory()
  
  const initialState = {firstName: '', lastName:'', email:'', password: '' };
  const [values, setValues] = useState({ firstName: '', lastName: '', email: '', password: '' })
  const [touched, setTouched] = useState({})
  const [errors, setErrors] = useState({})
  const [ isLoading, setIsLoading ] = useState(false)
  const [ justCreated, setJustCreated ] = useState({})
  const [ existing, setExisting ] = useState({ ...initialState})
  const [ errorCreation, setErrorCreation ] = useState({error: '', firstName: '', lastName:'', department: ''})

  const [passwordShown, setPasswordShown] = useState(false)
  const togglePasswordVisiblity = () => { setPasswordShown(!passwordShown) }

  const [failureMessage] = useState(false)

  const allFieldsOk = // acts on submit disabled/!disabled
        Object.values(touched).every(t => t === true )
        && Object.values(touched).length === Object.values(values).length
        && Object.values(errors).every(t => t === null );

  const formDirty = Object.values(touched).some(t => t === true );

  const handleInputChange = (event) => {
    /* const { name, value: newValue, type } = event.target; */
    const { name } = event.target
    const value = event.target.value
    setValues({ ...values, [name]: value })
    setTouched({ ...touched, [name]: true })
  }

  const handleBlur = (event) => {
    const { name, value } = event.target
    const {[name]: removedError, ...rest } = errors // remove error msg if any
    const error = validateCreate[name](value) // check new error
    // validate field if val touched
    setErrors({ ...rest, ...(error && { [name]: touched[name] && error }) })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('FORM values=',values)
    setIsLoading(true)

    const formValidation = Object.keys(values).reduce(
      (acc, key) => {
        const newError = validateCreate[key](values[key]) // key = name / values[key] = fieldValue
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
      let newUser = {...values}
      dispatch(createEmployee(newUser))
          .then(response => handleRes(response))
    }
  }

  const handleRes = (myRes)  => {
    // console.log('MYRES==>', myRes)
    if (myRes.status === 200) { setJustCreated({...values});  confirmCreation(); }

    else if (myRes.status === 400) { 
        setExisting({...values});
        setErrorCreation({error: 'exists', firstName:values.firstName, lastName:values.lastName })
        toggleWarningModal()
    }
    else { setErrorCreation({error: myRes.message}); }
    setIsLoading(false)
  }
  
  const navigateToSignIn = () => {
    history.push('./signIn')
  }

  const handleCancel = event => {
    event.preventDefault()
    toggleConfirmModal()
  }

  // cancel form modal : confirm yes (reset form)
  const resetForm = () => { 
      document.getElementById('myform').reset()
      setValues(() => initialState)
      setJustCreated(null)
      setExisting({...initialState})
      setErrorCreation({error: '', firstName: '', lastName:'', email: '', password: ''})
      setErrors({})
      setTouched({})
  }

  const cancelReset = () => { toggleConfirmModal() }
      const confirmReset = () => { 
          resetForm()
          isModalSuccessShowed? toggleSuccessModal()
          : isModalConfirmShowed? toggleConfirmModal()
          : toggleWarningModal()
  }
  // modal successful creation
  const confirmCreation = () => { toggleSuccessModal() }

  const { isShowing: isModalSuccessShowed, toggle: toggleSuccessModal } = useModal();
  let confirmSuccessModal = {
      modalType: 'success',
      message: `Your account creation was successful!`,
      modalBtns: [
          { btntype: 'action', name: 'go to sign in', action: () => navigateToSignIn() }
      ]
  }
  const { isShowing: isWarningModalShowed, toggle: toggleWarningModal } = useModal();
  let warningModal = {
      modalType: 'warning',
      message: `We found an existing account with this name:`,
      action: 'Please create a different account',
      modalBtns: [
          { btntype: 'action', name: 'create', action: () => confirmReset() },
          { btntype: 'cancel', name: 'sign in', action: () => navigateToSignIn() }
      ]
  }
  const { isShowing: isModalConfirmShowed, toggle: toggleConfirmModal } = useModal();
  let modalConfirmReset = {
      modalType: 'confirmResetForm',
      message: `Are you sure you want to`,
      action: 'reset the form?',
      modalBtns: [
          { btntype: 'action', name: 'reset', action: () => confirmReset()  },
          { btntype: 'cancel', name: 'cancel',action: () => cancelReset() }
      ]
  }

  if ( isLoading ) { return ('loading...') }


  return (
    <SignUpSection>
      
      <h1>Sign up</h1>
      {failureMessage && <span>Authentication failed, please check your informations</span>}
      <form id='myform'
        onSubmit={handleSubmit}
        autoComplete='off'
      >
        <InputWrapper>
          <label htmlFor='userFirsrName-input'>First name
            <input
              type='text'
              name='firstName'
              id='userFirsrName-input'
              required
              onBlur={handleBlur}
              onChange={handleInputChange}
              touched={touched}
              errors={errors}
            />
            {touched.firstName && errors.firstName ? <span>{errors.firstName}</span> : null}
          </label>
        </InputWrapper>
        <InputWrapper>
          <label htmlFor='userLastName-input'>Last name
            <input
              type='text'
              name='lastName'
              id='userLastName-input'
              required
              onBlur={handleBlur}
              onChange={handleInputChange}
              touched={touched}
              errors={errors}
            />
            {touched.lastName && errors.lastName ? <span>{errors.lastName}</span> : null}
          </label>
        </InputWrapper>
        <InputWrapper>
          <label htmlFor='userEmail-input'>Email
            <input
              type='text'
              name='email'
              id='userEmail-input'
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
          <label htmlFor='pw-input'>Choose a password
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

        <button id='signup-btn' onClick={handleSubmit} >Sign up!</button>
        { formDirty && 
          <button id='cancel-btn' onClick={handleCancel}>Cancel</button>
        }

      </form>

      { justCreated?.firstName && 
                    <ModalComp
                    props={confirmSuccessModal}
                    content={justCreated}
                    isShowing={isModalSuccessShowed}
                    confirmReset={confirmReset}
                    navigateToSignIn={navigateToSignIn}
                    />
                }
                { errorCreation && 
                    <ModalComp
                    props={warningModal}
                    content={errorCreation}
                    isShowing={isWarningModalShowed}
                    confirmReset={confirmReset}
                    navigateToSignIn={navigateToSignIn}
                />
                }
                
                <ModalComp
                    props={modalConfirmReset}
                    isShowing={isModalConfirmShowed}
                    cancelReset={cancelReset}
                    confirmReset={confirmReset}
                />

    </SignUpSection>
  )
}
SignUpBlock.propTypes = {}
export default SignUpBlock
