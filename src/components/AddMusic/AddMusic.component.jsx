import React from "react";
import styled from "styled-components";
import SearchParam from "../Checkbox/SearchParams.component";
// import { StyledButton } from "../Button/StyledButton.component";
import { CreatePlaylistFormContainer } from "../CreatePlaylist/CreatePlaylist.component";
import { StyledInputComponent } from "../Input/StyledInput.component";

const AddMusicComponent = () => {
  return (
    <AddMusicContainer>
      <h2>Add Music To Your Playlist</h2>

      <AddMusicSearchContainer>
        <AddMusicCheckboxContainer>
          Choose what you want to search:
          <SearchParam param="album">Album</SearchParam>
          <SearchParam param="artist">Artist</SearchParam>
          <SearchParam param="playlist">Playlist</SearchParam>
          <SearchParam param="track">Track</SearchParam>
          <SearchParam param="show">Show</SearchParam>
          <SearchParam param="episode">Episode</SearchParam>
        </AddMusicCheckboxContainer>
        <AddMusicInput type="search" placeholder="Search" />
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
`;

const AddMusicCheckboxContainer = styled.div``;

// const AddMusicButton = styled(StyledButton)`
//   margin-top: 0;
//   height: 49px;
// `;

export default AddMusicComponent;
