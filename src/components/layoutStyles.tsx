import styled from 'styled-components';

export const AppShell = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const Sidebar = styled.nav<{ collapsed: boolean }>`
  background: #fff;
  border-right: 1px solid #e5e5e5;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 20;
  width: ${({ collapsed }) => (collapsed ? '48px' : '200px')};
  transition: width 0.2s ease;
  overflow: hidden;
`;

export const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 48px;
  background: none;
  border: none;
  border-bottom: 1px solid #e5e5e5;
  cursor: pointer;
  color: #888;
  flex-shrink: 0;
  transition: color 0.1s;

  &:hover {
    color: #111;
  }
`;

export const ToggleIcon = styled.span<{ collapsed: boolean }>`
  font-size: 0.85rem;
  display: inline-block;
  transition: transform 0.2s ease;
  transform: ${({ collapsed }) => (collapsed ? 'rotate(180deg)' : 'rotate(0deg)')};
  flex-shrink: 0;
`;

export const SidebarName = styled.div<{ collapsed: boolean }>`
  font-size: 0.8rem;
  font-weight: 600;
  color: #111;
  padding: 1.25rem 1.25rem 1rem;
  white-space: nowrap;
  opacity: ${({ collapsed }) => (collapsed ? '0' : '1')};
  transition: opacity 0.15s;
`;

export const NavItem = styled.a<{ active?: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.65rem 0 0.65rem 1.25rem;
  font-size: 0.875rem;
  color: ${({ active }) => (active ? '#111' : '#666')};
  font-weight: ${({ active }) => (active ? '500' : '400')};
  cursor: pointer;
  position: relative;
  white-space: nowrap;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  text-decoration: none;
  transition: color 0.1s;

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
    opacity: ${({ active }) => (active ? '1' : '0')};
    transition: opacity 0.1s;
  }

  &:hover {
    color: #111;
  }
`;

export const NavLabel = styled.span<{ collapsed: boolean }>`
  opacity: ${({ collapsed }) => (collapsed ? '0' : '1')};
  transition: opacity 0.15s;
`;

export const SidebarFooter = styled.div`
  margin-top: auto;
  padding: 1rem 1.25rem;
`;

export const LogoutButton = styled.button<{ collapsed: boolean }>`
  font-size: 0.8rem;
  color: #bbb;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  white-space: nowrap;
  opacity: ${({ collapsed }) => (collapsed ? '0' : '1')};
  transition: color 0.1s, opacity 0.15s;

  &:hover {
    color: #111;
  }
`;

export const MainContent = styled.main<{ collapsed: boolean }>`
  flex: 1;
  margin-left: ${({ collapsed }) => (collapsed ? '48px' : '200px')};
  transition: margin-left 0.2s ease;
`;
