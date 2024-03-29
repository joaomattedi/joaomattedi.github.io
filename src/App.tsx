import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import AllRoutes from './routes/Routes';

function App() {
  return (
    <BrowserRouter>
      <AllRoutes />
      <NavBar />
    </BrowserRouter>
  );
}

export default App;
