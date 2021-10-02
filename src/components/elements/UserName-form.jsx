import styled, {keyframes} from "styled-components"

const formTransition = keyframes`
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
    animation: ${formTransition} 0.2s linear forwards;
    z-index:2;
    background-color:black;
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
`;

const InputWrapper = styled.div`
    width: 100%;
    
    margin: 1rem;
    input {
        padding: 5px;
        font-size: 1.2rem;
        color: lightgrey;
    }
    span { color: red; height: 50px;width:100%;}
`;

const UserNameform = ({firstName,lastName} ) => {

    const handleSubmit = (event) => { }
    const handleChange = (event) => { }
    const handleBlur = (event) => { }
    
    return (

        <FormWrapper>
            <form onSubmit={handleSubmit} autoComplete="off">
                <FormInputsWrapper>
                    <InputWrapper>
                        <input
                            type="text"
                            name="firstName"
                            defaultValue={firstName}
                            onBlur={handleBlur}
                            onChange={handleChange}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <input
                            type="text"
                            name="lastName"
                            defaultValue={lastName}
                            onBlur={handleBlur}
                            onChange={handleChange}
                        />
                    </InputWrapper>
                </FormInputsWrapper>

                <FormBtnsWrapper>
                    <button>Save</button>
                    <button>Cancel</button>
                </FormBtnsWrapper>
            </form>
        </FormWrapper>
    )
}

export default UserNameform