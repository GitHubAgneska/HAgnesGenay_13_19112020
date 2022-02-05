import styled from 'styled-components'

export const StatusWrapper = styled.div`
    /* border: 2px dotted green; */
    display: flex; flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
`

export const SignInWrapper = styled(StatusWrapper)`
    
    ${(isConnected) => !isConnected && 'min-width: 100px;'}
    
    justify-content: end;
    margin-left:1%;
    white-space: nowrap;
    p { 
        margin: 0;
        white-space: nowrap;
        font-weight: bold;
        &:hover { text-decoration: underline; }
    }
    svg { margin-right:2%; }
`
export const UserId = styled(StatusWrapper)`

    justify-content: start;
    margin-right:1%;
    flex-basis:20%;

    ${(isConnected) => isConnected && 'min-width:70px'}
    ${(isConnected) => !isConnected && 'min-width:0px'}
    min-width: ${isConnected => isConnected && '70px'}
    min-width: ${isConnected => !isConnected && '0px'}
    
    p {
        white-space: nowrap;
        margin: 0;
        font-weight: bold;
    }
    svg { margin-right:2%; }
`
