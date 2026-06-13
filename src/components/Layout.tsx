import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
  AppShell,
  Sidebar,
  SidebarName,
  NavItem,
  SidebarFooter,
  LogoutButton,
  MainContent,
} from './layoutStyles';

const NAV_ITEMS = [
  { label: 'Financas', path: '/finance' },
  { label: 'Treinos', path: '/workout' },
  { label: 'Rotina', path: '/routine' },
  { label: 'Dieta', path: '/diet' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logOut } = useAuth();

  return (
    <AppShell>
      <Sidebar>
        <SidebarName>Joao Mattedi</SidebarName>
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.path}
            active={location.pathname.startsWith(item.path)}
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </NavItem>
        ))}
        <SidebarFooter>
          <LogoutButton onClick={logOut}>Sair</LogoutButton>
        </SidebarFooter>
      </Sidebar>
      <MainContent>{children}</MainContent>
    </AppShell>
  );
}
