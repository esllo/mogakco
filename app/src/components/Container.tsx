import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';

const ContainerDiv = styled.div`
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
`;

const Container = ({ children }: PropsWithChildren) => {
  return <ContainerDiv>{children}</ContainerDiv>;
};

export default Container;
