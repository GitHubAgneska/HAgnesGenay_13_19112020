import { useState } from "react";
import { validate } from "../../utils/form_validation";
import styled from "styled-components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'


const SignInSection = styled.section`
    box-sizing: border-box;
    background-color: white;
    width: 300px;
    margin: 0 auto;
        margin-top: 0px;
    margin-top: 3rem;
    padding: 2rem;
    h1 {
        display: block;
        font-size: 1.5em;
        font-weight: bold;
        margin-block-start: .83em;
        margin-block-end: .83em;
    }
    button { 
        display: block;
        width: 100%;
        padding: 8px;
        font-size: 1.1rem;
        font-weight: bold;
        margin-top: 1rem;
        border-color: #00bc77;
        background-color: #00bc77;
        color: #fff;
    }
`;
const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-bottom: 1rem;
    label { font-weight: bold; }
    input {
        padding: 5px;
        font-size: 1.2rem;
    }
    span { color: red; height: 50px;width:100%;}
`;
const RememberInput = styled.div` display: flex; label { margin-left: 0.25rem;}`;

const SignInBlock = () => {

    let isFormValid = false;
    let isFieldValid = true;

    /**  
     * @function checkFormValid 
     * @param {string} userName - state
     * @param {string} pw - state
     * @returns {boolean} isFormValid
    */
    //const checkFormValid = (userName,pw) => { return userName && pw ? isFormValid = true: isFormValid = false; }
    //const activateValidators = (userName,pw) => {   }
    const [ errors, setErrors ] = useState({});
    const [ touched, setTouched ] = useState({});

    /**  HANDLING INPUT DATA ALTOGETHER  */
    /** ---------------------------------------------------------------------  */
    const [values, setValues] = useState({userName: '', userPassword:'', rememberMe: false})
    
    const handleInputChange = (event) => {
/*      const target = event.target;
        const value = target.type === 'checkbox'?
        target.checked: target.value; console.log(value)
        const name = target.name; console.log(name);
    
        setValues({ ...values, [name]: value });
        console.log(values); */

        const { name, value: newValue, type } = event.target;
        const value = event.target.type === 'checkbox'? event.target.checked : event.target.value;

        setValues({ ...values, [name]: value });
        setTouched({ ...touched, [name]: true });
    }

    const handleBlur = (event) => { 
        const { name, value } = event.target;

        // remove error msg if any
        const { [name]: removedError, ...rest } = errors;

        // check new error
        const error = validate[name](value);

        // validate field if val touched
        setErrors({ ...rest, ...(error && { [name]: touched[name] && error }) });
    }

    // const handleSubmit = (event)  => { event.preventDefault(); console.log('submitting'); console.log(values)}
    const handleSubmit = (event) => { 
        event.preventDefault();

        // validate form
        console.log('FORM values=',values); // { userName: "agnes", userPassword: "xxxx", rememberMe: true }
        console.log('FORM Object.keys(values)=', Object.keys(values)); // [ "userName", "userPassword", "rememberMe" ]
        console.log('FORM Object.entries(values)=', Object.entries(values)); // [ [ "userName", "agnes" ], [ "userPassword", xxxx" ],[ "rememberMe", true" ] ]
        
        const formValidation = Object.keys(values).reduce(
            (acc, key) => {

                    console.log('key=>',key, 'values[key]=>', values[key]);
                    let fieldName = key, fieldVal = values[key];
                    
                    const newError = validate[key](values[key]);
                    console.log('newError==', newError);
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
            alert(JSON.stringify(values, null, 2));
        }
    }
    

    /**   HANDLING INPUT DATA INDIVIDUALLY */
    /** ---------------------------------------------------------------------  */
    const [userName, setUserName] = useState('');
    const [userPassword, setPw] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    
    const handleUserNameChange = (event) => { setUserName({userName: event.target.value}); console.log('userName:',event.target.value); }
    const handleUserPwChange = (event) => { setPw({userPassword: event.target.value}); console.log('userPassword:',event.target.value);}
    const handleRememberMe = (event) => { setRememberMe({rememberMe: event.target.value}); console.log('rememberMe:',event.target.value);}
    
    const handleSubmit2 = (event)  => {
        event.preventDefault(); 
    }
    /** ---------------------------------------------------------------------  */
    

    return (
        <SignInSection>

            <FontAwesomeIcon icon={faUserCircle} />
            <h1>Sign In</h1>
            <form
                /* errors={errors}
                touched={touched} */
                onSubmit={handleSubmit}
                /* onSubmit={handleSubmit2} */
                autoComplete="off"
            >
                <InputWrapper>
                    <label htmlFor="userName-input">UserName
                        <input 
                            type="text"
                            name="userName"
                            id="userName-input"
                            required
                            onBlur={handleBlur}
                            onChange={handleInputChange}
                            /* onBlur={handleUserNameChange} */
                            touched={touched}
                            errors={errors}
                        />    
                        { touched.userName && errors.userName?
                            <span>Please enter a valid user name</span>
                            : null 
                            }
                    </label>
                </InputWrapper>
                <InputWrapper>
                    <label htmlFor="pw-input">Password
                        <input 
                            type="text" 
                            name="userPassword"
                            id="pw-input"
                            required
                            onBlur={handleBlur}
                            onChange={handleInputChange}
                            touched={touched}
                            errors={errors}
                            /* onBlur={handleUserPwChange} */
                            />
                            { touched.userPassword && errors.userPassword ?
                                <span>Please enter a valid password</span>
                                : null 
                            }
                    </label>
                </InputWrapper>

                <RememberInput>
                    <label>Remember me
                        <input 
                            type="checkbox" 
                            name="rememberMe"
                            onChange={handleInputChange}
                            /* onChange={handleRememberMe} */
                            /* onChange={handleInputChange} */
                            >
                        </input>
                    </label>
                </RememberInput>

                <button>Sign In</button>
            </form>

        </SignInSection>
    )
}
export default SignInBlock