import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './globalStyle';
import AllRoutes from './routes/Routes';
import Layout from './components/Layout';
import Login from './pages/Login';
import { useAuth } from './hooks/useAuth';
import { migrateLegacyData } from './lib/migrateLegacyData';

function App() {
  const { user, loading, isAllowed } = useAuth();

  useEffect(() => {
    if (!isAllowed || !user) return;
    if (new URLSearchParams(window.location.search).get('migrate') !== '1') return;
    if (localStorage.getItem('legacyMigrationDone') === '1') return;
    migrateLegacyData(user.uid).then((results) => {
      localStorage.setItem('legacyMigrationDone', '1');
      alert(`Migração concluída: ${JSON.stringify(results)}`);
    });
  }, [isAllowed, user]);

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
