import SearchInput from '@/components/Search/SearchInput';
import SearchList from '@/components/Search/SearchList';
import styled from '@emotion/styled';

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  transition: height 0.2s;
  padding: 18px;
  border-radius: 12px;
  background: var(--background-floating);
  min-height: 134px;
  box-sizing: border-box;
  margin: 0 16px;
`;

const Search = () => {
  return (
    <SearchWrapper>
      <SearchInput />
      <SearchList></SearchList>
    </SearchWrapper>
  );
};

export default Search;
