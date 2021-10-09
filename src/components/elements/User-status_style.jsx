import styled from 'styled-components'

export const StatusWrapper = styled.div`
    /* border: 2px dotted green; */
    display: flex; flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
`;

export const SignInWrapper = styled(StatusWrapper)`
    justify-content: end;
    margin-left:1%;
    white-space: nowrap;
    p { 
        margin: 0;
        white-space: nowrap;
        font-weight: bold;
        &:hover { text-decoration: underline; }
    }
    svg { margin-right:2%; }
`;