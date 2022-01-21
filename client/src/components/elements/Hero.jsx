import HeroContent from './Hero-content';
// import bank_tree from '../../assets/imgs/bank_tree.jpeg'
import styled from 'styled-components'
import {createMediaQueries} from '../../style/media-queries'
import bankTree from '../../assets/imgs/bank_tree.png'

const WrapperDiv = styled.div(
    {   position: "relative",
        width: "100%",
        height: "300px",
        backgroundImage: `url(${bankTree})`, // ====> PROD
        /* background: "url(/assets/imgs/bank_tree.png)",  ===> DEV */
        backgroundRepeat: "no-repeat",
        backgroundPosition: "0 -50px",
        backgroundSize: "cover"
    },
    ({backgroundPosition, height}) => ({
        ...createMediaQueries([
            {
                property: "backgroundPosition",
                values: backgroundPosition
            },
            {
                property: "height",
                values: height
            }
        ])
    })
) ;

const Hero = () => {
    return (
        <WrapperDiv  backgroundPosition={['0 -50px', '0 -50px', '0 33%']} height={['300px','350px','400px' ]}>
            <HeroContent />
        </WrapperDiv>
    )
}
export default Hero