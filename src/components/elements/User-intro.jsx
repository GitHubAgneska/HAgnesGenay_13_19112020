import { useState } from "react";
import styled from "styled-components"
import UserNameform from "./UserName-form";


const UserIntroDiv = styled.div`
    flex: 1;
    color: #fff;
    margin-bottom: 2rem;
    display: flex; flex-direction: column;
    
    h1 {
        display: block;
        font-size: 2em;
        font-weight: bold;
        margin-block-start: .67em;
        margin-block-end: .67em;
        span{  white-space: pre-line;}
    }
    button {
        width:100px;margin: auto;
        border-color: #00bc77;
        background-color: #00bc77;
        color: #fff;
        font-weight: bold;
        padding: 10px;
        transition: all 0.2s;
        &:hover { 
            background-color: #00bc99;
            color: #12002b;
        }
    }
`;

let user = { firstName:'Bojack' , lastName:'Horseman' };

const UserIntro = ({props}) => {

    const [formDisplay, SetFormDisplay ] = useState();
    
    const toggleForm = () => { if ( formDisplay === false ) { SetFormDisplay(true)} else { SetFormDisplay(false)} 
    }

    return (

        <UserIntroDiv>
            <h1>Welcome back <br /> {user.firstName} {user.lastName}!</h1>
            <button onClick={toggleForm}>Edit name</button>

            { formDisplay &&
                <UserNameform firstName={user.firstName} lastName={user.lastName}/>
            }

        </UserIntroDiv>
    )
}
UserIntro.defaultProps = {
    formDisplay: false
}
export default UserIntro

