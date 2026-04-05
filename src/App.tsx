import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './globalStyle';
import AllRoutes from './routes/Routes';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <AllRoutes />
    </BrowserRouter>
  );
}

export default App;
