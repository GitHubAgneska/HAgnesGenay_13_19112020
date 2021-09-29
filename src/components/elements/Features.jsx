import Feature from './Feature';
import styled from 'styled-components'


const FeaturesSection = styled.section`
    display: flex;
    flex-flow: column nowrap;
    
    @media (min-width: 992px) {
        flex-flow: row nowrap;
    }
`;

const Features = () => {
    return (
        <FeaturesSection>
            <Feature />
            <Feature />
            <Feature />
        </FeaturesSection>
    )
}
export default Features