import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../hooks/useAuth';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 1.5rem;
  background: #fafafa;
`;

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111;
`;

const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  color: #111;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.65rem 1.25rem;
  transition: box-shadow 0.15s;

  &:hover {
    box-shadow: 0 1px 4px rgba(0,0,0,0.12);
  }
`;

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48">
    <path fill="#4285F4" d="M44.5 20H24v8.5h11.8C34.7 33.9 29.9 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/>
    <path fill="#34A853" d="M6.3 14.7l7 5.1C15 16.1 19.2 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2c-7.6 0-14.2 4.5-17.7 11.2-.1 0 0 1.5 0 1.5z"/>
    <path fill="#FBBC05" d="M24 46c5.5 0 10.5-1.9 14.3-5l-6.6-5.4C29.6 37.5 26.9 38.5 24 38.5c-5.8 0-10.7-3.9-12.4-9.2l-7 5.4C8 41.5 15.4 46 24 46z"/>
    <path fill="#EA4335" d="M44.5 20H24v8.5h11.8c-1 3-3.2 5.5-6.1 7l6.6 5.4C40.5 37 44.5 31 44.5 24c0-1.3-.2-2.7-.5-4z"/>
  </svg>
);

const DeniedMessage = styled.p`
  font-size: 0.875rem;
  color: #dc2626;
`;

const SignOutLink = styled.button`
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  font-size: 0.8rem;
  text-decoration: underline;
`;

export default function Login() {
  const { user, signIn, logOut } = useAuth();

  if (user) {
    return (
      <Wrapper>
        <Title>Acesso negado</Title>
        <DeniedMessage>{user.email} não tem permissão.</DeniedMessage>
        <SignOutLink onClick={logOut}>Sair e tentar outra conta</SignOutLink>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Title>Finanças</Title>
      <GoogleButton onClick={signIn}>
        <GoogleIcon />
        Entrar com Google
      </GoogleButton>
    </Wrapper>
  );
}
