import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';

interface Props extends React.HTMLProps<PropsWithChildren<HTMLButtonElement>> {
  large?: boolean;
}

const DefaultButton = styled.button`
  align-self: stretch;
  height: 32px;
  color: #fff;
  background: hsl(235, 85.6%, 64.7%);
  outline: 0;
  padding: 2px 16px;
  border-radius: 6px;
  font-size: 1rem;
  border: none;
  transition: filter 0.25s;
  &:hover {
    filter: brightness(1.05);
  }
  &:active {
    filter: brightness(0.9);
  }
  cursor: pointer;
`;

const Button = ({ children, onClick }: Props) => (
  <DefaultButton onClick={onClick}>{children}</DefaultButton>
);

export default Button;
