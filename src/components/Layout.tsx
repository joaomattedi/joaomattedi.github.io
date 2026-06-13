import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
  AppShell,
  Sidebar,
  SidebarBrand,
  SidebarSection,
  NavLink,
  NavIcon,
  SidebarFooter,
  LogoutButton,
  MainContent,
} from './layoutStyles';

const NAV_ITEMS = [
  { label: 'Finanças', icon: '💰', path: '/finance' },
  { label: 'Treinos', icon: '🏋️', path: '/workout' },
  { label: 'Rotina', icon: '📅', path: '/routine' },
  { label: 'Dieta', icon: '🥗', path: '/diet' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logOut } = useAuth();

  return (
    <AppShell>
      <Sidebar>
        <SidebarBrand>João Mattedi</SidebarBrand>
        <SidebarSection>Menu</SidebarSection>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            active={location.pathname.startsWith(item.path)}
            onClick={() => navigate(item.path)}
          >
            <NavIcon>{item.icon}</NavIcon>
            {item.label}
          </NavLink>
        ))}
        <SidebarFooter>
          <LogoutButton onClick={logOut}>↩ Sair</LogoutButton>
        </SidebarFooter>
      </Sidebar>
      <MainContent>{children}</MainContent>
    </AppShell>
  );
}
