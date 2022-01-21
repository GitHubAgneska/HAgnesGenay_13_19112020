import PropTypes from "prop-types"
import styled from "styled-components"

const AccountSection = styled.section`
    width: 80%;
    display: flex;
    flex-direction: column;
    @media(min-width: 720px) { flex-direction: row; }
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    margin-bottom: 0px;
    margin-bottom: 2rem;
    border: 1px solid black;
    background-color: #fff;
    padding: 1.5rem;
    box-sizing: border-box;
    text-align: left;

`;
const AccountContentWrapper = styled.div`
    width: 100%;
    flex: 1;
    h3 {
        margin: 0;
        padding: 0;
        font-size: 1rem;
        font-weight: normal;
    }
    p { margin: 0; }

    p:nth-of-type(1) { 
        font-size: 2.5rem;
        font-weight: bold;
    }
`;
const AccountContentWrapperBottom = styled.div`
    width: 100%;
    flex: 1;
    @media(min-width: 720px) { flex: 0;}
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
        transition: all 0.2s;
        &:hover { 
            background-color: #00bc99;
            color: #12002b;
        }
        @media(min-width: 720px) {
            width: 200px;
        }
    }
`;

const Account = ({type, balance}) => { 
    return (
        <AccountSection>
            <AccountContentWrapper>
                <h3>Argent Bank {type} (x8349)</h3>
                <p>${balance}</p>
                <p>Available Balance</p>
            </AccountContentWrapper>

            <AccountContentWrapperBottom>
                <button>View transactions</button>
            </AccountContentWrapperBottom>
        </AccountSection>
    )
}
Account.propTypes = { type: PropTypes.string, balance: PropTypes.string }
export default Account