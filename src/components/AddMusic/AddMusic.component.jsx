import React, { useState, useRef } from "react";
import styled from "styled-components";
import SearchParam from "../Checkbox/SearchParams.component";
import { useQuery } from "react-query";
import { CreatePlaylistFormContainer } from "../CreatePlaylist/CreatePlaylist.component";
import { StyledInputComponent } from "../Input/StyledInput.component";
import { SearchRequest } from "../Search/Search.request";
import SearchResultContent from "../Search/SearchResult.content";

// const paramsList = ["album", "track", "episode"];
const paramsList = ["track"];

const AddMusicComponent = () => {
  const [params, setParams] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("");
  const { data: searchResult, refetch, isLoading } = useQuery(
    "SEARCH",
    () => SearchRequest(query, params),
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );
  const addMusicInput = useRef(null);

  const handleParams = (newParam) => {
    if (params.includes(newParam)) {
      const updatedParams = params.filter((p) => p !== newParam);
      setParams([...updatedParams]);
    } else {
      setParams([...params, newParam]);
    }
    addMusicInput.current.focus();
    addMusicInput.current.value = "";
  };

  const handleQuery = (value) => {
    if (value !== "") {
      const query = value.replace(/ /g, "%20");
      setQuery(query);
      refetch();
    } else {
      setQuery("");
    }
  };

  const searchResultKeys = searchResult ? Object.keys(searchResult) : [];

  return (
    <AddMusicContainer>
      <h2>Add Music To Your Playlist</h2>

      <AddMusicSearchContainer>
        <AddMusicCheckboxContainer>
          Choose what you want to search:
          {paramsList.map((param, index) => (
            <SearchParam
              key={index}
              param={param}
              onChange={() => handleParams(param)}
            >
              {param}
            </SearchParam>
          ))}
        </AddMusicCheckboxContainer>
        <AddMusicInput
          type="search"
          disabled={params.length === 0}
          placeholder="Search for artists, tracks or episodes"
          ref={addMusicInput}
          onChange={(e) => handleQuery(e.target.value)}
        />
      </AddMusicSearchContainer>

      {!isLoading && query !== "" && (
        <AddMusicSearchResults>
          <SearchTab>
            {searchResultKeys.map((searchResultKey, index) => (
              <SearchTabItem
                key={index}
                onClick={() => setSelectedTab(searchResultKey)}
              >
                {searchResultKey}
              </SearchTabItem>
            ))}
          </SearchTab>
          <SearchResultContent
            selectedTab={selectedTab}
            searchResult={searchResult}
          />
        </AddMusicSearchResults>
      )}
    </AddMusicContainer>
  );
};

const AddMusicContainer = styled(CreatePlaylistFormContainer)``;

const AddMusicSearchContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  gap: 1rem;
  align-items: center;
  margin-top: 20px;
`;

const AddMusicInput = styled(StyledInputComponent)`
  width: 100%;
  margin: 0;
  &:disabled {
    opacity: 0.1;
  }
`;

const AddMusicCheckboxContainer = styled.div``;

const AddMusicSearchResults = styled.div``;

const SearchTab = styled.ul`
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
`;

const SearchTabItem = styled.li`
  list-style: none;
  font-weight: bold;
  color: #1db954;
  text-transform: uppercase;
  cursor: pointer;
  padding: 16px 20px;
  border: 1px solid whitesmoke;
  width: 100%;
  text-align: center;
  gap: 1rem;
  margin-right: 0.5rem;

  &:last-child {
    margin-right: 0;
  }
`;

export default AddMusicComponent;
