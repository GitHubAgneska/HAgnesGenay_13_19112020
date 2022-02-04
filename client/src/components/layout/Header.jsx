import { Link } from 'react-router-dom'
import Userstatus from '../elements/User-status'
import logo_main from '../../assets/logo/argentbank_logo_bright.png'
import styled from 'styled-components'
import { SrOnlyH1 } from '../../style/global_style'

const StyledNav = styled.nav`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 5px 20px;
`

const MainLogoWrapper = styled.div`
    a { display: block;}
    width: 6rem; // 200px;
    min-width: 100px;
    a img {  max-width: 100%; display:block; height:auto; }
`

const MainLogo = styled.img`
`

const Header = () => {
  return (
    <StyledNav>
      <MainLogoWrapper>
        <Link to='/'><MainLogo src={logo_main} alt='Argent Bank Logo' /></Link>
        <SrOnlyH1>Argent Bank</SrOnlyH1>
      </MainLogoWrapper>
      <Userstatus />
    </StyledNav>
  )
}

export default Header
