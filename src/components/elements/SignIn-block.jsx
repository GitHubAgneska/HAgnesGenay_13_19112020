import { useState } from "react";
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
    const checkFormValid = (userName,pw) => { return userName && pw ? isFormValid = true: isFormValid = false; }
    //const activateValidators = (userName,pw) => {   }

    /**  handling input data altogether (! issue : submit = partial object )   */
    const [values, setValues] = useState({userName: '', pw:'', rememberMe: false})
    
    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox'?
        target.checked: target.value; console.log(value)
        const name = target.name; console.log(name);
    
        setValues({ [name]: value });
        console.log(values);
    }
    const handleSubmit = (event)  => { event.preventDefault(); console.log('submitting'); console.log(values)}
    

    /**  handling input data individually */
    const [userName, setUserName] = useState('');
    const [pw, setPw] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    
    const handleUserNameChange = (event) => { setUserName({userName: event.target.value}); console.log('userName:',event.target.value); }
    const handleUserPwChange = (event) => { setPw({pw: event.target.value}); console.log('pw:',event.target.value);}
    const handleRememberMe = (event) => { setRememberMe({rememberMe: event.target.value}); console.log('pw:',event.target.value);}
    
    const handleSubmit2 = (event)  => {
        event.preventDefault(); 
        isFormValid = checkFormValid();
        
        // isFormValid? console.log('submitting:', userName,pw, rememberMe) : activateValidators();
    }
    

    return (
        <SignInSection>

            <FontAwesomeIcon icon={faUserCircle} />
            <h1>Sign In</h1>
            <form 
                onSubmit={handleSubmit2}
                /* onSubmit={handleSubmit} */
                autoComplete="off"
            >
                <InputWrapper>
                    <label htmlFor="userName-input">UserName
                        <input 
                            type="text"
                            name="userName"
                            id="userName-input"
                            required
                            onBlur={handleUserNameChange}
                            /* onChange={handleInputChange} */
                            >    
                        </input>
                    </label>
                </InputWrapper>
                <InputWrapper>
                    <label htmlFor="pw-input">Password
                        <input 
                            type="text" 
                            name="pw"
                            id="pw-input"
                            required
                            onBlur={handleUserPwChange}
                            /* onChange={handleInputChange} */
                            >
                        </input>
                    </label>
                </InputWrapper>

                <RememberInput>
                    <label>Remember me
                        <input 
                            type="checkbox" 
                            name="rememberMe"
                            onChange={handleRememberMe}
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