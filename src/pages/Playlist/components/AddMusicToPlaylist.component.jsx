import React from "react";
import styled from "styled-components";
import AddMusicComponent from "../../../components/AddMusic/AddMusic.component";
import { CreatePlaylistButton } from "../../../components/CreatePlaylist/CreatePlaylist.component";
import { useModal } from "../../../components/Modal/Modal.context";

const AddMusicToPlaylist = () => {
  const { openModal } = useModal();

  return (
    <AddMusicToPlaylistContainer>
      <h3>Add some music to your playlist</h3>
      <AddMusicToPlaylistButton
        onClick={() => openModal(<AddMusicComponent />)}
      >
        Add Music
      </AddMusicToPlaylistButton>
    </AddMusicToPlaylistContainer>
  );
};

const AddMusicToPlaylistContainer = styled.div`
  text-align: center;
  h3 {
    font-size: 2rem;
    text-align: center;
  }
`;

const AddMusicToPlaylistButton = styled(CreatePlaylistButton)``;

export default AddMusicToPlaylist;
