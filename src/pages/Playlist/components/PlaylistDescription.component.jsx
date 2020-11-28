import React from "react";
import styled from "styled-components";
import AddMusicComponent from "../../../components/AddMusic/AddMusic.component";
import { useModal } from "../../../components/Modal/Modal.context";
import TextLoading from "../../../components/TextLoading/TextLoading.component";

const PlaylistDescriptionComponent = ({
  PlaylistDescription,
  OwnerName,
  hasTracksInfo,
}) => {
  const { openModal } = useModal();
  return (
    <div className="playlist-description">
      <h3>Description:</h3>
      <h4>
        {PlaylistDescription !== ""
          ? PlaylistDescription ?? (
              <TextLoading width="100%" height="18px" minWidth="395px" />
            )
          : "There is no description for this playlist."}
      </h4>

      <h3>Owner:</h3>
      <h4>
        {OwnerName ?? (
          <TextLoading width="125px" height="18px" minWidth="125px" />
        )}
      </h4>
      {hasTracksInfo && (
        <AddItemsToPlaylistButton
          onClick={() => openModal(<AddMusicComponent />)}
        >
          Add Items to Playlist
        </AddItemsToPlaylistButton>
      )}
    </div>
  );
};

const AddItemsToPlaylistButton = styled.button`
  height: 30px;
  border-radius: 3px;
  border: 1px solid whitesmoke;
  background-color: #0f0f0f;
  font-weight: bold;
  color: #1db954;
  cursor: pointer;
`;

export default PlaylistDescriptionComponent;
