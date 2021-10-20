// import { useFetchUserProfile } from '../../utils/hooks'
// import { useState } from "react"
import { fetchUserData } from '../../features/userData-feature'
import styled from "styled-components"
import UserIntro from "../elements/User-intro"
import { SrOnlyH2 } from "../../style/global_style"
import Accounts from "../elements/Accounts"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { store } from '../../state/store'
import { userDataState } from "../../state/store"

const UserPageSection = styled.main`
    background-color: #12002b;
    display: flex; flex-direction: column;
`;

const UserProfile = () => {
    
    const state = useSelector((state) => state);
    // const token = useSelector((state) => state.login.token);

    // launch api request at component load
    useEffect(() => { 
        fetchUserData(store).then(
            userDataState.data ?
                console.log(userDataState.data): 'hhj'
        )
    });

    
/*   const userInfos = userData.data;
    const { firstName, lastName } = userInfos; */
    let firstName = 'fdfdfd', lastName= 'hjjqs';

    return (

        <UserPageSection>
            <UserIntro firstName={firstName} lastName={lastName} />
            <SrOnlyH2>Accounts</SrOnlyH2>
            <Accounts />
        </UserPageSection>

    )
}
export default UserProfile