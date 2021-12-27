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

const SearchBtn = styled.button`
  width: 100px;
  height: 40px;
  border: none;
  border-radius: 5px;
  background-color: #00b6d8;
  color: white;
`;

interface ISearchBarProps {
  setKeyWord: Dispatch<SetStateAction<string>>;
  onClickSearch: () => void;
}

const SearchBar = (props: ISearchBarProps) => {
  const onChagneKeyWord = (event: ChangeEvent<HTMLInputElement>) => {
    event.target instanceof Element && props.setKeyWord(event.target.value);
  };

  return (
    <>
      <SearchInput onChange={onChagneKeyWord} placeholder="검색어" />
      <SearchBtn onClick={props.onClickSearch}>검색</SearchBtn>
    </>
  );
};

export default SearchBar;
