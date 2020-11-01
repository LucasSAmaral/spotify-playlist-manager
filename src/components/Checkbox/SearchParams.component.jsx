import React from "react";
import styled from "styled-components";

const SearchParam = ({ children, param }) => {
  return (
    <SearchParamLabel htmlFor={param}>
      <SearchParamInput type="checkbox" name={param} id={param} />
      <span>{children}</span>
    </SearchParamLabel>
  );
};

const SearchParamLabel = styled.label`
  margin-left: 0.5rem;
  span {
    font-weight: bold;
    color: #1db954;
    cursor: pointer;
    position: relative;
    display: inline-block;
    &:after {
      content: "";
      position: absolute;
      height: 2px;
      background: #1db954;
      width: 0;
      left: 50%;
      display: block;
      transition: width 0.3s ease 0s, left 0.3s ease 0s;
    }
  }
`;

const SearchParamInput = styled.input`
  display: none;

  &:checked + span {
    &:after {
      width: 100%;
      left: 0;
    }
  }
`;

export default SearchParam;
