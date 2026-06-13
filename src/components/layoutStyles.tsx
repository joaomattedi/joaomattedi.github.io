import styled from 'styled-components';

export const AppShell = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const Sidebar = styled.nav`
  width: 200px;
  min-width: 200px;
  background: #fff;
  border-right: 1px solid #e5e5e5;
  display: flex;
  flex-direction: column;
  padding: 2rem 0;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
`;

export const SidebarName = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
  color: #111;
  padding: 0 1.25rem 1.75rem;
  letter-spacing: 0.01em;
`;

export const NavItem = styled.a<{ active?: boolean }>`
  display: block;
  padding: 0.6rem 1.25rem;
  font-size: 0.875rem;
  color: \${({ active }) => (active ? '#111' : '#666')};
  font-weight: \${({ active }) => (active ? '500' : '400')};
  text-decoration: none;
  cursor: pointer;
  transition: color 0.1s;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 2px;
    height: 60%;
    background: #111;
    border-radius: 0 2px 2px 0;
    opacity: \${({ active }) => (active ? '1' : '0')};
    transition: opacity 0.1s;
  }

  &:hover {
    color: #111;
  }
`;

export const SidebarFooter = styled.div`
  margin-top: auto;
  padding: 0 1.25rem;
`;

export const LogoutButton = styled.button`
  background: none;
  border: none;
  color: #bbb;
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0;
  transition: color 0.1s;

  &:hover {
    color: #111;
  }
`;

export const MainContent = styled.main`
  flex: 1;
  margin-left: 200px;
`;
