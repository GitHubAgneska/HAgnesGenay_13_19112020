import { fetchUserData } from '../../features/userData-feature'
import styled from "styled-components"
import UserIntro from "../elements/User-intro"
import { SrOnlyH2 } from "../../style/global_style"
import Accounts from "../elements/Accounts"
import { useSelector, useStore } from 'react-redux'
import { useEffect } from 'react'
import { userDataState } from "../../state/store"

const UserPageSection = styled.main`
    background-color: #12002b;
    display: flex; flex-direction: column;
`;

const UserProfile = () => {
    const store = useStore()
    // const state = useSelector((state) => state);

    // launch api request at component load
    useEffect(() => { 
        fetchUserData(store)
    }, [store]); // --- ! Dependencies array = very important ! : prevents request from looping indefinitely
    
    const user = useSelector(userDataState); // --- ! do not use 'store.getState() / useStore() => won't be sync with store changes
    // console.log('userData===', user);

    const profileData = user?.data ?? {} ;   // ------- ! very important for runtime ! (else data = null )
    const  { firstName, lastName } = profileData

    return (
        <UserPageSection>
            <UserIntro firstName={firstName} lastName={lastName} />
            <SrOnlyH2>Accounts</SrOnlyH2>
            <Accounts />
        </UserPageSection>
    )
}
export default UserProfile