import styled from "styled-components";

const FooterSection = styled.section`
    display: flex;
    justify-content: center;
    border-top: 2px solid #ccc;
    padding: 2rem 0 1.5rem;
    p {
        margin: 0;
        padding: 0;
    }
`;

const Footer = () => { 
    return (
        <FooterSection>
            <p>Copyright 2020 Argent Bank</p>
        </FooterSection>
    )
}
export default Footer