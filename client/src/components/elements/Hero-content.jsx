import styled from 'styled-components'
import { SrOnlyH2 } from '../../style/global_style'
import { useHistory } from 'react-router-dom'

const HeroSection = styled.section`
    position: relative;
    top: 2rem;
    width: 300px;
    background: white;
    padding: 2rem;
    text-align: left;
    margin: 0 auto;
    transition: all 0.3s;

    p {
        font-weight: bold;
        font-size: 1rem;
        margin: 0;
    }
    p:nth-child(5) {
        margin-top: 5%;
        margin-bottom: 0;
        font-size: 0.9rem;
        font-weight: normal;
    }
    p:nth-child(5):hover { cursor: pointer; text-decoration: underline;}

    @media (min-width: 992px) {
        position: absolute;
        top: 50px;
        right: 50px;
        width: 400px;
        margin: 2rem;
        p { font-size: 1.5rem; }
        p:nth-child(5) {font-size: 1.2rem;}
    }
`

const HeroContent = () => {
  const history = useHistory()
  const navigateToSignup = () => { history.push('./signup')}
  return (
    <HeroSection>
      <SrOnlyH2>Promoted Content</SrOnlyH2>
      <p>No fees.</p>
      <p>No minimum deposit.</p>
      <p>High interest rates.</p>
      <p onClick={navigateToSignup}>Open a savings account with Argent Bank today!</p>
    </HeroSection>
  )
}
export default HeroContent
