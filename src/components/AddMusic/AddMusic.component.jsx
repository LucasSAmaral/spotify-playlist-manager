import React, { useState, useRef } from "react";
import styled from "styled-components";
import SearchParam from "../Checkbox/SearchParams.component";
// import { StyledButton } from "../Button/StyledButton.component";
import { CreatePlaylistFormContainer } from "../CreatePlaylist/CreatePlaylist.component";
import { StyledInputComponent } from "../Input/StyledInput.component";

const paramsList = ["album", "artist", "playlist", "track", "show", "episode"];

const AddMusicComponent = () => {
  const [params, setParams] = useState([]);
  const addMusicInput = useRef(null);

  const handleParams = (newParam) => {
    if (params.includes(newParam)) {
      const updatedParams = params.filter((p) => p !== newParam);
      setParams([...updatedParams]);
    } else {
      setParams([...params, newParam]);
    }
    addMusicInput.current.focus();
  };

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
          placeholder="Search"
          ref={addMusicInput}
        />
      </AddMusicSearchContainer>
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

// const AddMusicButton = styled(StyledButton)`
//   margin-top: 0;
//   height: 49px;
// `;

export default AddMusicComponent;
