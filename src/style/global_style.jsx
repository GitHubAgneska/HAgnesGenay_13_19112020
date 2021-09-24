import {createGlobalStyle} from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        scroll-behavior: smooth;
    }
    html {
        font-size: 100%; /* = 16px default */
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    body {
        font-family: 'Roboto', Helvetica, sans-serif;
        margin: 0;
        
        a { text-decoration: none; }
        input { border: transparent; }
        ul { margin: 0; padding: 0;}
        ul li { list-style: none; }
        button { display: block; border: none; }
    }
`