import PropTypes from "prop-types"
import styled from 'styled-components'
import iconChat from '../../assets/icons/icon-chat.png'
import iconMoney from '../../assets/icons/icon-money.png'
import iconSecurity from '../../assets/icons/icon-security.png'

const FeatureItem = styled.div`

    flex: 1;
    padding: 2.5rem;

    img {
        width: 150px;
        border: 10px solid #00bc77;
        border-radius: 50%;
        padding: 1rem;
    }
    h3 { 
        color: #222;
        font-size: 1.25rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
    }
    p { 
        display: block;
        margin-block-start: 1em;
        margin-block-end: 1em;
    }
`;

const Feature = ({feature}) => {

    return (
        <FeatureItem>
            { feature.icon === 'iconChat' ?  <img src={iconChat} alt="chat icon" /> 
                :feature.icon === 'iconMoney' ?  <img src={iconMoney} alt="chat icon" />
                :  <img src={iconSecurity} alt="security icon" />
            }
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
        </FeatureItem>

    )
}
Feature.propTypes = { feature: PropTypes.object }
export default Feature