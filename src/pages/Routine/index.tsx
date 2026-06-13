import React from 'react';
import styled from 'styled-components';

const PageWrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 2.5rem 1.25rem 4rem;
`;

const PageTitle = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111;
  margin-bottom: 0.5rem;
`;

const PageSubtitle = styled.p`
  font-size: 0.875rem;
  color: #888;
`;

export default function Routine() {
  return (
    <PageWrapper>
      <PageTitle>Rotina</PageTitle>
      <PageSubtitle>Em breve.</PageSubtitle>
    </PageWrapper>
  );
}
