import React from "react";
import styled from "styled-components";
import Cookie from "js-cookie";
import AddMusicComponent from "../../../components/AddMusic/AddMusic.component";
import TextLoading from "../../../components/TextLoading/TextLoading.component";
import { useModal } from "../../../components/Modal/Modal.context";
import { StyledButton } from "../../../components/Button/StyledButton.component";

const PlaylistDescriptionComponent = ({
  description,
  owner,
  hasTracksInfo,
}) => {
  const { openModal } = useModal();
  const { userId } = Cookie.get();
  return (
    <div className="playlist-description">
      <h3>Description:</h3>
      <h4>
        {description !== ""
          ? description ?? (
              <TextLoading width="100%" height="18px" minWidth="395px" />
            )
          : "There is no description for this playlist."}
      </h4>

      <h3>Owner:</h3>
      <h4>
        {owner?.name ?? (
          <TextLoading width="125px" height="18px" minWidth="125px" />
        )}
      </h4>
      {owner?.id === userId && hasTracksInfo && (
        <AddItemsToPlaylistButton
          onClick={() => openModal(<AddMusicComponent />)}
        >
          Add Items to Playlist
        </AddItemsToPlaylistButton>
      )}
    </div>
  );
};

const AddItemsToPlaylistButton = styled(StyledButton)``;

export default PlaylistDescriptionComponent;
