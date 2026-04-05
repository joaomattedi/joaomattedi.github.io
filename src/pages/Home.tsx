import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 1rem;
`;

const Name = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #111;
`;

const FinanceLink = styled(Link)`
  font-size: 1rem;
  color: #2563eb;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default function Home() {
  return (
    <Wrapper>
      <Name>João Mattedi</Name>
      <FinanceLink to="/finance">Finanças pessoais →</FinanceLink>
    </Wrapper>
  );
}
