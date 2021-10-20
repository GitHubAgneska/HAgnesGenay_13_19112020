import { useState } from "react";
import { validate } from "../../utils/form_validation";
import { SignInSection, InputWrapper, RememberInput } from './SignIn-block_style'
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { useStore } from "react-redux";
import { fetchLogin } from '../../features/login-feature'
import { loginState } from "../../state/store";

const SignInBlock = () => {

    const [ errors, setErrors ] = useState({});
    const [ touched, setTouched ] = useState({});
    const history = useHistory();
    const store = useStore();
    // const _isMounted = useRef(true);  // tests for memory leak issue on navigate after state updated
    
    /** ---------------------------------------------------------------------  */  
    /**  HANDLING INPUT DATA ALTOGETHER  */
    /** ---------------------------------------------------------------------  */
    const [values, setValues] = useState({email: '', password:'', rememberMe: false})

    const handleInputChange = (event) => {
        const { name, value: newValue, type } = event.target;
        const value = event.target.type === 'checkbox'? event.target.checked : event.target.value;
        setValues({ ...values, [name]: value });
        setTouched({ ...touched, [name]: true });
    }

    const handleBlur = (event) => { 
        const { name, value } = event.target;
        const { [name]: removedError, ...rest } = errors; // remove error msg if any
        const error = validate[name](value); // check new error
        if ( error )console.log('error ==', error)
        // validate field if val touched
        setErrors({ ...rest, ...(error && { [name]: touched[name] && error }) });
    }

    const handleSubmit = (event) => { 
        event.preventDefault();
        //console.log('FORM values=',values); // { userName: "agnes", userPassword: "xxxx", rememberMe: true }
        
        const formValidation = Object.keys(values).reduce(
            (acc, key) => {
                    
                    const newError = validate[key](values[key]); // key = fieldName / values[key] = fieldValue
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
            console.log(JSON.stringify(values, null, 2));
            // postData(values);
            // history.push("/user");   // ===> !! memory leak (see https://morioh.com/p/1ab552fdf028)
            fetchLogin(store, values).then(
                loginState.isConnected ?  history.push("/user"): (setTimeout(() => history.push("/user") ,2000))
            )
        }
    }

    /** ---------------------------------------------------------------------  */    
    /**   HANDLING INPUT DATA INDIVIDUALLY */
    /** ---------------------------------------------------------------------  */
    // const [userName, setUserName] = useState('');
    // const [userPassword, setPw] = useState('');
    // const [rememberMe, setRememberMe] = useState(false);
    
    // const handleUserNameChange = (event) => { setUserName({userName: event.target.value}); console.log('userName:',event.target.value); }
    // const handleUserPwChange = (event) => { setPw({userPassword: event.target.value}); console.log('userPassword:',event.target.value);}
    // const handleRememberMe = (event) => { setRememberMe({rememberMe: event.target.value}); console.log('rememberMe:',event.target.value);}
    /** ---------------------------------------------------------------------  */
    
    return (
        <SignInSection>

            <FontAwesomeIcon icon={faUserCircle} />
            <h1>Sign In</h1>
            <form
                onSubmit={handleSubmit}
                autoComplete="off"
            >
                <InputWrapper>
                    <label htmlFor="userName-input">UserName
                        <input 
                            type="text"
                            name="email"
                            id="userName-input"
                            required
                            onBlur={handleBlur}
                            onChange={handleInputChange}
                            /* onBlur={handleUserNameChange} */
                            touched={touched}
                            errors={errors}
                            />    
                            { touched.email && errors.email? <span>Please enter a valid user name(email)</span>: null }
                    </label>
                </InputWrapper>
                <InputWrapper>
                    <label htmlFor="pw-input">Password
                        <input 
                            type="text" 
                            name="password"
                            id="pw-input"
                            required
                            onBlur={handleBlur}
                            onChange={handleInputChange}
                            touched={touched}
                            errors={errors}
                            /* onBlur={handleUserPwChange} */
                            />
                            { touched.password && errors.password ? <span>Please enter a valid password</span> : null }
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
SignInBlock.propTypes = {}
export default SignInBlock