import { queryState } from '@/recoil/grant/atom';
import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';

const SearchQueryInput = styled.input`
  background: var(--background-tertiary);
  border: none;
  height: 30px;
  border-radius: 4px;
  color: #dcddde;
  font-size: 1.25rem;
  padding: 12px;
  outline: 0;
`;

const SearchInput = () => {
  const [inputQuery, setInputQuery] = useRecoilState<string>(queryState);

  function queryChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputQuery(e.target.value);
  }

  return (
    <SearchQueryInput
      value={inputQuery}
      onChange={queryChange}
      placeholder="역할 검색..."
    />
  );
};

export default SearchInput;
