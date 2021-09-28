import { Link } from 'react-router-dom';
import Userstatus from '../elements/User-status';
import logo_main from '../../assets/logo/argentBankLogo.png'
import styled from 'styled-components'
import {createMediaQueries} from '../../style/media-queries'
import {SrOnlyH1 } from '../../style/global_style'

const HeaderWrapper = styled.nav(
    {
        border: "2px solid red",
        padding: "5px 20px",
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
    width: 12.5rem; // 200px;
    min-width: 135px;
`;

const MainLogo = styled.img`
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