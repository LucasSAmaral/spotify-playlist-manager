import React from "react";
import { queryCache } from "react-query";
import styled from "styled-components";
import AddMusicComponent from "../../../components/AddMusic/AddMusic.component";
import { useModal } from "../../../components/Modal/Modal.context";
import TextLoading from "../../../components/TextLoading/TextLoading.component";

const PlaylistDescriptionComponent = ({
  description,
  owner,
  hasTracksInfo,
}) => {
  const { openModal } = useModal();
  const userInfo = queryCache.getQueryData("USER_INFO");
  const userId = userInfo.id;
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

const AddItemsToPlaylistButton = styled.button`
  height: 30px;
  border-radius: 3px;
  max-width: 200px;
  border: 1px solid whitesmoke;
  background-color: #0f0f0f;
  font-weight: bold;
  color: #1db954;
  cursor: pointer;
`;

export default PlaylistDescriptionComponent;
