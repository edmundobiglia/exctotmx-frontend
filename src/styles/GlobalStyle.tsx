import { createGlobalStyle } from "styled-components";

import colors from "./colors";

const { lightGrey } = colors;

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${lightGrey};
  }

  body, button, input, select, option {
    font-family: 'Fira Sans', sans-serif;
  }

  button {
    cursor: pointer;
    
    &:focus {
      border: 0;
      outline: 0;
    }
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  h1, h2, h3, strong {
    font-weight: 600;
  }

  .App {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100%;
  }
`;

export default GlobalStyle;
