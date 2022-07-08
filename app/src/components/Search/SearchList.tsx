import useResizeObserver from '@/hooks/useResizeObserver';
import {
  queryState,
  Role,
  rolePositionFamily,
  roleIdSelected,
  rolesWithQueryState,
} from '@/recoil/grant/atom';
import SearchItem, { SearchItemPosition } from '@/components/Search/SearchItem';
import styled from '@emotion/styled';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilCallback, useRecoilValue, useRecoilState } from 'recoil';

const SearchListWrapper = styled.div`
  position: relative;
  margin: 12px 0 0;
`;
const SearchList = () => {
  const observer = useResizeObserver();
  const rolesWithQuery = useRecoilValue<Role[]>(rolesWithQueryState);
  const query = useRecoilValue<string>(queryState);
  const listRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);
  const [selected, setSelected] = useRecoilState<string[]>(roleIdSelected);
  const setPosition = useRecoilCallback(
    ({ set }) =>
      (index: number, position: SearchItemPosition) => {
        set(rolePositionFamily(rolesWithQuery[index].id), position);
      },
  );

  function calculatePosition() {
    if (listRef.current) {
      const containerComputedStyle = getComputedStyle(listRef.current);
      const containerWidth = parseFloat(containerComputedStyle.width);
      const children = [...listRef.current.children];
      const gap = 10;
      let xOffset = 0,
        yOffset = 0,
        lastHeight = 0;
      children.forEach((child, index) => {
        const computedStyle = getComputedStyle(child);
        if (rolesWithQuery[index]?.visible) {
          const width = parseInt(computedStyle.width) || 0;
          const height = parseInt(computedStyle.height) || 0;
          if (xOffset + width + gap > containerWidth) {
            // overflow
            xOffset = 0;
            yOffset += height + gap;
          }
          // calc x, y
          const left = xOffset;
          const top = yOffset;
          xOffset += width + gap;
          setPosition(index, { left, top });
          lastHeight = height;
        }
      });
      setHeight(yOffset + lastHeight);
    }
  }

  useEffect(() => {
    if (listRef.current) {
      setTimeout(calculatePosition);
      observer.observe(listRef.current, calculatePosition);
    }

    return () => {
      if (listRef.current) {
        observer.unobserve(listRef.current);
      }
    };
  }, [listRef.current]);

  useEffect(() => {
    setTimeout(calculatePosition);
  }, [query]);

  const handleItemClick = useCallback(
    (id: string) => () => {
      const newSelected = [...selected];
      if (newSelected.includes(id)) {
        const index = newSelected.indexOf(id);
        newSelected.splice(index, 1);
      } else {
        newSelected.push(id);
      }
      setSelected(newSelected);
    },
    [selected],
  );

  function isSelected(id: string): boolean {
    return selected.includes(id);
  }

  return (
    <SearchListWrapper ref={listRef} style={{ height: `${height}px` }}>
      {rolesWithQuery.map((item) => (
        <SearchItem
          item={item}
          key={item.id}
          accent={isSelected(item.id)}
          onClick={handleItemClick(item.id)}
        />
      ))}
    </SearchListWrapper>
  );
};

export default SearchList;
