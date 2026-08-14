import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './globalStyle';
import AllRoutes from './routes/Routes';
import Layout from './components/Layout';
import Login from './pages/Login';
import { useAuth } from './hooks/useAuth';
import { migrateLegacyData } from './lib/migrateLegacyData';

function App() {
  const { user, loading, isAllowed } = useAuth();
  // Captured at render time, before router effects can rewrite the URL (e.g. Navigate stripping the query string).
  const [shouldMigrate] = useState(
    () => new URLSearchParams(window.location.search).get('migrate') === '1',
  );

  useEffect(() => {
    if (!shouldMigrate || !isAllowed || !user) return;
    if (localStorage.getItem('legacyMigrationDone') === '1') return;
    migrateLegacyData(user.uid).then((results) => {
      localStorage.setItem('legacyMigrationDone', '1');
      alert(`Migração concluída: ${JSON.stringify(results)}`);
    });
  }, [shouldMigrate, isAllowed, user]);

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
