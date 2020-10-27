import React from "react";
import { queryCache, useMutation } from "react-query";
import styled from "styled-components";
import { CreatePlaylistButton } from "../CreatePlaylist/CreatePlaylist.component";
import { useModal } from "../Modal/Modal.context";
import { RemovePlaylistRequest } from "./RemovePlaylist.request";

const RemovePlaylistComponent = ({ id, name }) => {
  const { closeModal } = useModal();
  const [mutate] = useMutation(RemovePlaylistRequest, {
    onSuccess: () => {
      queryCache.invalidateQueries("USER_PLAYLISTS");
      closeModal();
    },
  });
  return (
    <RemovePlaylistContainer>
      <h2>Are you sure you want to remove the playlist {name}?</h2>

      <RemovePlaylistButtonWrapper>
        <RemovePlaylistButton onClick={() => mutate(id)}>
          Yes
        </RemovePlaylistButton>
        <RemovePlaylistButton onClick={() => closeModal()}>
          No
        </RemovePlaylistButton>
      </RemovePlaylistButtonWrapper>
    </RemovePlaylistContainer>
  );
};

const RemovePlaylistContainer = styled.div`
  h2 {
    font-size: 1.5rem;
    text-align: center;
  }
`;

const RemovePlaylistButtonWrapper = styled.div`
  margin-top: 20px;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(2, 300px);
  gap: 1rem;
`;

const RemovePlaylistButton = styled(CreatePlaylistButton)``;

export default RemovePlaylistComponent;
