import Feature from './Feature'
import styled from 'styled-components'
import featuresData from '../../data/features'

const FeaturesSection = styled.section`
    display: flex;
    flex-flow: column nowrap;
    
    @media (min-width: 992px) {
        flex-flow: row nowrap;
    }
`

const Features = () => {
  return (
    <FeaturesSection>
      {featuresData.map(f => (
        <Feature key={f.title} feature={f} />
      ))}
    </FeaturesSection>
  )
}
export default Features
