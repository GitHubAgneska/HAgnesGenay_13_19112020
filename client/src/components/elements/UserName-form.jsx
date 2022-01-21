import { useState } from "react";
import { validateEdit } from "../../utils/form_validation";
import { editUserData } from "../../features/userData-edit-feature"
import { store } from "../../state/store"
import { fetchUserData } from '../../features/userData-feature'
import PropTypes from "prop-types"
import { FormWrapper, FormInputsWrapper, FormBtnsWrapper, InputWrapper} from './UserName-form-style'

const UserNameform = ({firstName,lastName, toggleForm} ) => {
    
    const [ values, setValues ] = useState({ firstName: firstName, lastName:lastName });
    const [ errors, setErrors ] = useState({});
    const [ touched, setTouched ] = useState({});
    const [ successMessage, setSuccessMessage ] = useState(false);
    
    // const [ disabled, setDisabled ] = useState(true);
    // => replaced with: 
    const allFieldsOk =
        Object.values(touched).every(t => t === true )
        && Object.values(touched).length === Object.values(values).length
        && Object.values(errors).every(t => t === null );

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
        setTouched({ ...touched, [name]: true });
    }

    const handleBlur = (event) => {        
        const { name, value } = event.target;
        const { [name]: removedError, ...rest } = errors; // remove error msg if any
        const error = validateEdit[name](value); // check new error
        // validate field if val touched
        setErrors({ ...rest, ...(error && { [name]: touched[name] && error }) });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log('FORM values=',values); // { userName: "agnes", userPassword: "xxxx", rememberMe: true }
        
        const formValidation = Object.keys(values).reduce(
            (acc, key) => {
                    
                    const newError = validateEdit[key](values[key]); // key = fieldName / values[key] = fieldValue
                    const newTouched = { [key]: true };
                    return { 
                        errors: {
                            ...acc.errors,
                            ...(newError && { [key]: newError })
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
        );
        setErrors(formValidation.errors);
        setTouched(formValidation.touched);

        if (
            !Object.values(formValidation.errors).length // errors object = empty
            && Object.values(formValidation.touched).length === Object.values(values).length // all fields were touched
            && Object.values(formValidation.touched).every(t => t === true ) // every touched field is true
        ) {
            // alert(JSON.stringify(values, null, 2));
                // enable save btn
                // setDisabled(false);
            // call put request with form values
            editUserData(store, values);
            // call fetch user data to refresh component with new values
            fetchUserData(store);
            setSuccessMessage(true);
            // close form after success message display
            setTimeout(() => { toggleForm()}, 2000);
        }
    }
    
    return (

        <FormWrapper>
            { successMessage && <span>Your informations were successfully updated</span> }
            <form onSubmit={handleSubmit} autoComplete="off">
                <FormInputsWrapper>
                    <InputWrapper>
                        <input
                            type="text"
                            name="firstName"
                            placeholder={firstName}
                            onBlur={handleBlur}
                            onChange={handleInputChange}
                            />
                        { touched.firstName && errors.firstName? <span>{errors.firstName}</span>: null }
                    </InputWrapper>
                    <InputWrapper>
                        <input
                            type="text"
                            name="lastName"
                            placeholder={lastName}
                            onBlur={handleBlur}
                            onChange={handleInputChange}
                            />
                        { touched.lastName && errors.lastName? <span>{errors.lastName}</span>: null }
                    </InputWrapper>
                </FormInputsWrapper>

                <FormBtnsWrapper>
                    <button disabled={!allFieldsOk}>Save</button>
                    <button onClick={() => toggleForm()}>Cancel</button>
                </FormBtnsWrapper>
            </form>
        </FormWrapper>
    )
}

export default UserNameform

UserNameform.defaultProps = { disabled: true }
UserNameform.propTypes = { 
    firstName: PropTypes.string,
    lastName:PropTypes.string,
    toggleForm: PropTypes.func
}