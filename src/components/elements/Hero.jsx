import HeroContent from './Hero-content';
// import bank_tree from '../../assets/imgs/bank_tree.jpeg'
import styled from 'styled-components'
import {createMediaQueries} from '../../style/media-queries'

const WrapperDiv = styled.div(
    {   position: "relative",
        width: "100%",
        height: "300px",
        background: "url(/assets/imgs/bank_tree.jpeg)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "0 -50px",
        backgroundSize: "cover"
    },
    ({height, backgroundPosition}) => ({
        ...createMediaQueries([
            {
                property: "height",
                values: height
            },
            {
                property: "backgroundPosition",
                values: backgroundPosition
            }
        ])
    })
) ;

const Hero = () => {
    return (
        <WrapperDiv height={['300px', '300px', '400px']} backgroundPosition={['0 -50px', '0 -50px', '0 33%']}>
            <HeroContent />
        </WrapperDiv>
    )
}
export default Hero