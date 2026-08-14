import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './globalStyle';
import AllRoutes from './routes/Routes';
import Layout from './components/Layout';
import Login from './pages/Login';
import { useAuth } from './hooks/useAuth';

function App() {
  const { loading, isAllowed } = useAuth();

  if (loading) return null;

  return (
    <BrowserRouter>
      <GlobalStyle />
      {isAllowed ? (
        <Layout>
          <AllRoutes />
        </Layout>
      ) : (
        <Login />
      )}
    </BrowserRouter>
  );
}

export default App;
