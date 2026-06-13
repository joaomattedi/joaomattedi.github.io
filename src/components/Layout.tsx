import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
  AppShell,
  Sidebar,
  ToggleButton,
  ToggleIcon,
  SidebarName,
  NavItem,
  NavLabel,
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
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logOut } = useAuth();

  return (
    <AppShell>
      <Sidebar collapsed={collapsed}>
        <ToggleButton onClick={() => setCollapsed((c) => !c)}>
          <ToggleIcon collapsed={collapsed}>←</ToggleIcon>
        </ToggleButton>
        <SidebarName collapsed={collapsed}>Joao Mattedi</SidebarName>
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.path}
            active={location.pathname.startsWith(item.path)}
            onClick={() => navigate(item.path)}
          >
            <NavLabel collapsed={collapsed}>{item.label}</NavLabel>
          </NavItem>
        ))}
        <SidebarFooter>
          <LogoutButton collapsed={collapsed} onClick={logOut}>
            Sair
          </LogoutButton>
        </SidebarFooter>
      </Sidebar>
      <MainContent collapsed={collapsed}>{children}</MainContent>
    </AppShell>
  );
}
