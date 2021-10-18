import { useFetchUserProfile } from '../../utils/hooks'
import { useState } from "react"
import styled from "styled-components"
import UserIntro from "../elements/User-intro"
import { SrOnlyH2 } from "../../style/global_style"
import Accounts from "../elements/Accounts"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

const UserPageSection = styled.main`
    background-color: #12002b;
    display: flex; flex-direction: column;
`;

const UserProfile = () => {
    
    const [ getUserProfile, isLoading, userData ] = useFetchUserProfile();
    const state = useSelector(state=>(state));
    const token = state.login.token;

    useEffect(() => { 
        if (token) { 
            getUserProfile(token);
        } else { setTimeout(() => {getUserProfile(token); }, 2000)}
        console.log('userData=', userData);
    }, [token]);

    console.log('STATE after fetch==>', state)
    
    return (
        <UserPageSection>
            <UserIntro />
            <SrOnlyH2>Accounts</SrOnlyH2>
            <Accounts />
        </UserPageSection>
    )
}
export default UserProfile