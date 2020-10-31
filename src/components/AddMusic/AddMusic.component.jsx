import React from "react";
import styled from "styled-components";
import { StyledButton } from "../Button/StyledButton.component";
import { CreatePlaylistFormContainer } from "../CreatePlaylist/CreatePlaylist.component";
import { StyledInputComponent } from "../Input/StyledInput.component";

const AddMusicComponent = () => {
  return (
    <AddMusicContainer>
      <h2>Add Music To Your Playlist</h2>

      <AddMusicSearchContainer>
        <AddMusicInput
          type="search"
          placeholder="Search music, artist, styles, etc."
        />
        <AddMusicButton>Search</AddMusicButton>
      </AddMusicSearchContainer>
    </AddMusicContainer>
  );
};

const AddMusicContainer = styled(CreatePlaylistFormContainer)``;

const AddMusicSearchContainer = styled.div`
  display: grid;
  grid-template-columns: 70% 25%;
  gap: 3%;
  align-items: center;
  margin-top: 20px;
`;

const AddMusicInput = styled(StyledInputComponent)`
  width: 100%;
  margin: 0;
`;

const AddMusicButton = styled(StyledButton)`
  margin-top: 0;
  height: 49px;
`;

export default AddMusicComponent;
