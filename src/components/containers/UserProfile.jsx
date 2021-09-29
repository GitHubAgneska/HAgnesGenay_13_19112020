import styled from "styled-components"
import UserIntro from "../elements/User-intro";
import { SrOnlyH2 } from "../../style/global_style";
import Account from "../elements/Account"

const UserPageSection = styled.main`
    background-color: #12002b;
    display: flex; flex-direction: column;
`;

const UserProfile = () => {
    return (
        <UserPageSection>
            <UserIntro />
            <SrOnlyH2>Accounts</SrOnlyH2>
            <Account />
        </UserPageSection>

    )
}
export default UserProfile