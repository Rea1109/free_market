import styled from "@emotion/styled";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

const SearchInput = styled.input`
  width: 50%;
  height: 40px;
  border-radius: 10px;
  background-color: #e4e6e7;
  border: none;
  padding: 20px;
`;

interface ISearchBarProps {
  setKeyWord: Dispatch<SetStateAction<string>>;
}

const SearchBar = (props: ISearchBarProps) => {
  const onChagneKeyWord = (event: ChangeEvent<HTMLInputElement>) => {
    event.target instanceof Element && props.setKeyWord(event.target.value);
  };

  return <SearchInput onChange={onChagneKeyWord} placeholder="검색어" />;
};

export default SearchBar;
