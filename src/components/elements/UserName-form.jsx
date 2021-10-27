import { useState } from "react";
import { validateEdit } from "../../utils/form_validation";
import styled, {keyframes} from "styled-components"
import { editUserData } from "../../features/userData-edit-feature"
import { store } from "../../state/store"
import { fetchUserData } from '../../features/userData-feature'
import PropTypes from "prop-types"

const formTransitionOpen = keyframes`
    from {
        transform: opacity(0);
        transform: translateY(-20px);
    }
    to {
        transform: opacity(1);
        transform: translateY(-55px);
    }
`;

const FormWrapper = styled.div`
    padding: 2%;
    border: 1px solid white;
    margin-top: 2%;
    animation: ${formTransitionOpen} 0.2s linear forwards;
    z-index:2;
    background-color: #12002b;
    transition: fade-out 300ms ease-in-out;
`;


const FormInputsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    @media screen and (max-width:600px) {flex-direction: column;}
    justify-content: center;
    width: 65%;
    margin: auto;
`;

const FormBtnsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 45%;
    margin: auto;
    
    button:nth-child(1) {
        
        transition: background-color 0.2s; 
       /*  background-color: ${(props) => props.disabled? `grey`: `orange`}; */
       /*  &:hover { background-color: salmon; };  */
    }
    button:nth-child(1):not(disabled) { background-color: orange; }
    button:nth-child(1):disabled { background-color: grey }
`;

const InputWrapper = styled.div`
    width: 100%;
    text-align: left;
    margin: 1rem;
    input {
        padding: 5px;
        font-size: 1.2rem;
        &:focus { font-weight: bold; }
    }
    ::placeholder { font-weight: light; opacity: 0.8; }  
    span { color: red; height: 50px; width:100%;}
`;

const UserNameform = ({firstName,lastName, toggleForm} ) => {
    
    const [ values, setValues ] = useState({ firstName: firstName, lastName:lastName });
    const [ errors, setErrors ] = useState({});
    const [ touched, setTouched ] = useState({});
    const [ disabled, setDisabled ] = useState(true);
    const [ successMessage, setSuccessMessage ] = useState(false);
    
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
        if (! error ) { 
            // if all ok : enable save btn
            setDisabled(false);
        } else {  setDisabled(true);}
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
            setDisabled(false);
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
                        { touched.firstName && errors.firstName? <span>Please enter a valid first name<br /><small>(name must be at least 3 characters long)</small></span>: null }
                    </InputWrapper>
                    <InputWrapper>
                        <input
                            type="text"
                            name="lastName"
                            placeholder={lastName}
                            onBlur={handleBlur}
                            onChange={handleInputChange}
                            />
                        { touched.lastName && errors.lastName? <span>Please enter a valid last name<br /><small>(name must be at least 3 characters long)</small></span>: null }
                    </InputWrapper>
                </FormInputsWrapper>

                <FormBtnsWrapper>
                    <button disabled={disabled}>Save</button>
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