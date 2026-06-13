import styled from 'styled-components';

export const AppShell = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const Sidebar = styled.nav`
  width: 220px;
  min-width: 220px;
  background: #fff;
  border-right: 1px solid #e5e5e5;
  display: flex;
  flex-direction: column;
  padding: 2rem 0 1.5rem;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 10;

  @media (max-width: 640px) {
    width: 100%;
    height: auto;
    min-width: unset;
    position: static;
    flex-direction: row;
    padding: 0;
    border-right: none;
    border-bottom: 1px solid #e5e5e5;
    overflow-x: auto;
  }
`;

export const SidebarBrand = styled.div`
  font-size: 0.8rem;
  font-weight: 700;
  color: #111;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0 1.25rem 1.5rem;

  @media (max-width: 640px) {
    display: none;
  }
`;

export const SidebarSection = styled.p`
  font-size: 0.65rem;
  font-weight: 600;
  color: #bbb;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 0 1.25rem;
  margin: 1rem 0 0.4rem;

  @media (max-width: 640px) {
    display: none;
  }
`;

export const NavLink = styled.a<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.55rem 1.25rem;
  font-size: 0.875rem;
  font-weight: ${({ active }) => (active ? '600' : '400')};
  color: ${({ active }) => (active ? '#111' : '#666')};
  background: ${({ active }) => (active ? '#f5f5f5' : 'transparent')};
  border-radius: 6px;
  margin: 0 0.5rem;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.1s, color 0.1s;

  &:hover {
    background: #f5f5f5;
    color: #111;
  }

  @media (max-width: 640px) {
    border-radius: 0;
    margin: 0;
    padding: 0.75rem 1rem;
    white-space: nowrap;
    flex-shrink: 0;
  }
`;

export const NavIcon = styled.span`
  font-size: 1rem;
  line-height: 1;
`;

export const SidebarFooter = styled.div`
  margin-top: auto;
  padding: 0 0.5rem;

  @media (max-width: 640px) {
    display: none;
  }
`;

export const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0.55rem 0.75rem;
  border-radius: 6px;
  transition: background 0.1s, color 0.1s;

  &:hover {
    background: #f5f5f5;
    color: #111;
  }
`;

export const MainContent = styled.main`
  flex: 1;
  margin-left: 220px;

  @media (max-width: 640px) {
    margin-left: 0;
  }
`;
