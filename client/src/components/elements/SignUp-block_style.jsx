import styled from 'styled-components'

export const SignUpSection = styled.section`
    box-sizing: border-box;
    background-color: white;
    width: 300px;
    margin: 0 auto;
    @media screen and (max-width:600px) {  margin-top: 1rem; }   
    @media screen and (min-width:600px) {  margin-top: 3rem;} 

    padding: 2rem;
    h1 {
        display: block;
        font-size: 1.5em;
        font-weight: bold;
        margin: 5% 0;
        border-bottom: 1px solid #00bc77;
        border-top: 1px solid #00bc77;
    }
    button { 
        display: block;
        width: 100%;
        padding: 8px;
        font-size: 1.1rem;
        font-weight: bold;
        margin-top: 1rem;
    }
    #signup-btn {
        background-color: #00bc77;
        color: #fff;
    }
    #cancel-btn {
        border: 1px solid #00bc77;
        background-color: white;
        color: #00bc77;
    }
    span { color: red; height: 50px; width:100%;}
`

export const InputWrapper = styled.div`
    position: relative; 
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-bottom: 1rem;
    label { font-weight: bold;}
    input {
        padding: 5px;
        font-size: 1.2rem;
    }
    span { color: red; height: 50px;width:100%;}

    i {
        position: absolute;
        top: 50%;
        right: 0%;
    }
    i:hover {
        color: #00fcb6;
        cursor: pointer;
    }
`
export const RememberInput = styled.div` display: flex; label { margin-left: 0.25rem;}`
