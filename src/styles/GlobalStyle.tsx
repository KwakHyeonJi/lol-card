import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    padding: 0 20px;
    background: #1c1c1f;
    font-family: 'Poppins', sans-serif;
    user-select: none;
  }

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  button {
    border: none;
    background: transparent;
    cursor: pointer;
    font-family: 'Poppins', sans-serif;
  }

  input {
    border: none;
    outline: none;
    font-family: 'Poppins', sans-serif;
  }

  .hidden {
    clip: rect(0px, 0px, 0px, 0px);
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
  }
`

export default GlobalStyle
