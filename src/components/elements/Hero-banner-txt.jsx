import styled from 'styled-components'
import {SrOnlyH2} from '../../style/global_style'

const BannerTxtSection = styled.section`
    position: relative;
    width: 200px;
    top: 2rem;
    width: 200px;
    background: white;
    padding: 2rem;
    text-align: left;
    margin: 0 auto;

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
`;

const BannerTxt = () => {
    return (
        <BannerTxtSection>
            <SrOnlyH2>Promoted Content</SrOnlyH2>
            <p>No fees.</p>
            <p>No minimum deposit.</p>
            <p>High interest rates.</p>
            <p>Open a savings account with Argent Bank today!</p>
        </BannerTxtSection>
    )
}
export default BannerTxt