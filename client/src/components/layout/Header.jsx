import { Link } from 'react-router-dom'
import Userstatus from '../elements/User-status'
import logo_main from '../../assets/logo/argentBankLogo.png'
import styled from 'styled-components'
import { SrOnlyH1 } from '../../style/global_style'

const StyledNav = styled.nav`
    display: flex;
    flexFlow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 5px 20px;
`

const MainLogoWrapper = styled.div`
    width: 12.5rem; // 200px;
    min-width: 135px;
`

const MainLogo = styled.img`
    max-width: 100%;
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
