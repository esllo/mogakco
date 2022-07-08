import Tag from '@/components/Tag';
import { Role, rolePositionFamily } from '@/recoil/grant/atom';
import styled from '@emotion/styled';
import { HTMLProps, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

export interface SearchItemPosition {
  left: number;
  top: number;
}

interface Props extends HTMLProps<HTMLDivElement> {
  position?: SearchItemPosition;
  item: Role;
  accent?: boolean;
}

const SearchItemWrapper = styled.div<Props>`
  @keyframes show {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }
  position: absolute;
  animation: show 0.2s;
  transition: all 0.2s;
  filter: ${(props) => (props.accent ? 'brightness(0.6)' : 'brightnesS(1)')};
  left: ${(props) => (props.position ? props.position.left + 'px' : 0)};
  top: ${(props) => (props.position ? props.position.top + 'px' : 0)};
  opacity: ${(props) => (props.item.visible ? 1 : 0)};
  transform: ${(props) => (props.item.visible ? 'scale(1)' : 'scale(0)')};
  &:hover {
    filter: ${(props) => (props.accent ? 'brightness(0.7)' : 'brightness(1.2)')};
  }
`;

const SearchItem = ({ item, accent, onClick }: Props) => {
  const [hidden, setHidden] = useState(false);
  const position = useRecoilValue(rolePositionFamily(item.id));

  useEffect(() => {
    if (item.visible) {
      setHidden(false);
    }
  }, [item.visible]);

  return (
    <SearchItemWrapper
      accent={accent}
      onClick={onClick}
      position={position}
      item={item}
      hidden={hidden}
      data-id={item.id}
      onTransitionEnd={(e: React.TransitionEvent<HTMLDivElement>) => {
        const { propertyName } = e;
        if (propertyName === 'opacity') {
          if (!item.visible) {
            setHidden(true);
          }
        }
      }}
    >
      <Tag large border item={item}></Tag>
    </SearchItemWrapper>
  );
};

SearchItem.defaultProps = {
  visible: true,
};

export default SearchItem;
