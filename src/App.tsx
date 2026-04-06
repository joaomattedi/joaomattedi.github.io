import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './globalStyle';
import AllRoutes from './routes/Routes';
import Login from './pages/Login';
import { useAuth } from './hooks/useAuth';

function App() {
  const { loading, isAllowed } = useAuth();

  if (loading) return null;

  if (!isAllowed) return <Login />;

  return (
    <BrowserRouter>
      <GlobalStyle />
      <AllRoutes />
    </BrowserRouter>
  );
}

export default App;
