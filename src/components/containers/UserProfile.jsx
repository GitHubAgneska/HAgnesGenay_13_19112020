import styled from "styled-components"
import UserIntro from "../elements/User-intro";
import { SrOnlyH2 } from "../../style/global_style";
import Accounts from "../elements/Accounts"

const UserPageSection = styled.main`
    background-color: #12002b;
    display: flex; flex-direction: column;
`;

const UserProfile = () => {
    return (
        <UserPageSection>
            <UserIntro />
            <SrOnlyH2>Accounts</SrOnlyH2>
            <Accounts />
        </UserPageSection>

    )
}
export default UserProfile