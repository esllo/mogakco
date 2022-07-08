import { Role } from '@/recoil/grant/atom';
import { int2hexColor } from '@/utils/convert';
import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {
  large?: boolean;
  border?: boolean;
  item: Role;
}

interface ColorProps {
  color: string;
}

const TagString = styled.div<Props>`
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  gap: ${(props) => (props.large ? 8 : 4)}px;
  border-radius: 4px;
  padding: ${(props) => (props.large ? '8px 12px' : '4px 8px')};
  font-size: ${(props) => (props.large ? '1.1rem' : '0.75rem')};
  color: white;
  background: var(--background-secondary);
  box-sizing: border-box;
  cursor: ${(props) => (props.large ? 'pointer' : 'default')};
`;

const TagColor = styled.div<ColorProps>`
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background: var(--background, ${(props) => props.color});
`;

const Tag = ({ className, large, item }: Props) => {
  return (
    <TagString className={className} large={large} item={item}>
      <TagColor color={int2hexColor(item.color)} />
      {item.name}
    </TagString>
  );
};

export default Tag;
