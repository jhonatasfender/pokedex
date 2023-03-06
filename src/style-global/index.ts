import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    &::before,
    &::after {
      box-sizing: inherit;
    }
  }

  html {
    font-size: 62.5%;
  }
  
  body {
    font-family: 'Roboto', sans-serif;
    overflow: hidden;
    
    #root{
      display: flex;
      flex-direction: column;
      max-height:100vh;
      padding-bottom: 1rem;
    }
  }
`;

export default GlobalStyles;
