import styled, {keyframes} from "styled-components"

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

export const FormWrapper = styled.div`
    padding: 2%;
    border: 1px solid white;
    margin-top: 2%;
    animation: ${formTransitionOpen} 0.2s linear forwards;
    z-index:2;
    background-color: #12002b;
    transition: fade-out 300ms ease-in-out;
`;

export const FormInputsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    @media screen and (max-width:600px) {flex-direction: column;}
    justify-content: center;
    width: 65%;
    margin: auto;
`;

export const FormBtnsWrapper = styled.div`
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

export const InputWrapper = styled.div`
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