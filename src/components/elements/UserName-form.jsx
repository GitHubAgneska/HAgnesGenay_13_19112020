import styled from "styled-components"

const FormWrapper = styled.div`
    div { display: flex; flex-direction: row;}
`;

const UserNameform = () => {
    return (
        <FormWrapper>
            <div>
                <input type="text" placeholder="firstName"></input>
                <input type="text" placeholder="lastName"></input>
            </div>
            <div>
                <button>Save</button>
                <button>Cancel</button>
            </div>
        </FormWrapper>
    )
}

export default UserNameform