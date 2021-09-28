import BannerTxt from './Hero-banner-txt';
import bank_tree from '../../assets/imgs/bank_tree.jpeg'
import styled from 'styled-components'
import {createMediaQueries} from '../../style/media-queries'


const BannerWrapper = styled.div(

    {
        position: "relative",
        width: "100%",
        height: "300px",
        background: "url(/assets/imgs/bank_tree.jpeg)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "0 -50px",
        backgroundSize: "cover"
    },
    ({height}) => ({
        ...createMediaQueries([
            {
                property: "height",
                values: height
            }
        ])
    })
)

;

const HeroBanner = () => {
    return (
        <BannerWrapper height={['300px', '300px', '400px']}>
            <BannerTxt />
        </BannerWrapper>
    )
}
export default HeroBanner