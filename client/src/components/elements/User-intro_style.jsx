import styled from 'styled-components'

export const UserIntroDiv = styled.div`
    flex: 1;
    color: #fff;
    margin-bottom: 2rem;
    display: flex; flex-direction: column;
    
    h1 {
        display: block;
        font-size: 2em;
        font-weight: bold;
        margin-block-start: .67em;
        margin-block-end: .67em;
        span{  white-space: pre-line;}
    }
    button {
        width:100px;margin: auto;
        border-color: #00bc77;
        background-color: #00bc77;
        color: #fff;
        font-weight: bold;
        padding: 10px;
        transition: all 0.2s;
        &:hover { 
            background-color: #00bc99;
            color: #12002b;
        }
        &:active { background-color: #12002b;}
        transition: background-color 2s;
    }
`
