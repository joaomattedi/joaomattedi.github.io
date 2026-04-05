import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 16px;
    color: #111;
    background: #fafafa;
    -webkit-font-smoothing: antialiased;
  }

  button {
    font-family: inherit;
  }

  input, select {
    font-family: inherit;
  }
`;
