import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';

const StatusWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const StatusText = styled.h1`
  font-size: 4rem;
  color: white;
`;

const Status = ({ children }: PropsWithChildren) => {
  return (
    <StatusWrapper>
      <StatusText>{children}</StatusText>
    </StatusWrapper>
  );
};

export default Status;
