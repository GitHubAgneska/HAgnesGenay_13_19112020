import styled from 'styled-components'
import iconchat from '../../assets/icons/icon-chat.png'

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

const Feature = () => { 
    return (
        <FeatureItem>
            <img src={iconchat} alt="" ></img>
            <h3>You are our #1 priority</h3>
            <p>Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes</p>
        </FeatureItem>

    )
}

export default Feature