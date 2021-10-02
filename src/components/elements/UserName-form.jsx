import styled from "styled-components"

const FormWrapper = styled.div`
    border: 1px dotted yellow;
    padding: 5%;
`;

const FormInputsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const FormBtnsWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

const InputWrapper = styled.div`
    text-align: left;
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