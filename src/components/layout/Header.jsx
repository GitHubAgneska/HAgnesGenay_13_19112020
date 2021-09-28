import { Link } from 'react-router-dom';
import logo_main from '../../assets/logo/argentBankLogo.png'
// import NavMain from './Nav_main'
import styled from 'styled-components'
import {createMediaQueries} from '../../style/media-queries'
import Userstatus from '../elements/User-status';
import {SrOnlyH1 } from '../../style/global_style'

const HeaderWrapper = styled.div(
    {
        border: "2px solid red",
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "space-between",
        alignItems: "center"
    },
    ({width}) => ({
        ...createMediaQueries([
            {
                property: "width",
                values: width
            }
        ])
    })
);

const MainLogoWrapper = styled.div`
    width: 12.500vw; // 180px in 1440
    min-width: 135px;
`;
const MainLogo = styled.img`
    max-height:60px;  // - 4.167vw; // in viewport 1440
    max-width: 100%;
`



const Header = () => { 
    return(
        <HeaderWrapper width={['100%', '50%', 'auto']}>
            <MainLogoWrapper>
                <Link to="/"><MainLogo src={logo_main} alt="Argent Bank Logo" /></Link>
                <SrOnlyH1>Argent Bank</SrOnlyH1>
            </MainLogoWrapper>
            <Userstatus />
        </HeaderWrapper>
    )
}

export default Header