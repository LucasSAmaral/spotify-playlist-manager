import React from "react";

import { useForm } from "react-hook-form";
import { queryCache, useMutation } from "react-query";
import styled from "styled-components";
import { StyledButton } from "../Button/StyledButton.component";
import { StyledInputComponent } from "../Input/StyledInput.component";
import { useModal } from "../Modal/Modal.context";
import { createPlaylistRequest } from "./CreatePlaylist.request";

const CreatePlaylistComponent = () => {
  const { register, handleSubmit } = useForm();
  const { closeModal } = useModal();
  const [mutate] = useMutation(createPlaylistRequest, {
    onSuccess: () => {
      queryCache.invalidateQueries("USER_PLAYLISTS");
      closeModal();
    },
  });

  const userInfo = queryCache.getQueryData("USER_INFO");
  const userId = userInfo.id;

  const onSubmit = async (data) => {
    const { playlistName, description } = data;
    try {
      await mutate({ userId, playlistName, description });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <CreatePlaylistFormContainer>
      <h2>Create a Playlist</h2>
      <CreatePlaylistForm onSubmit={handleSubmit(onSubmit)}>
        <p>Name*:</p>
        <CreatePlaylistInput
          type="text"
          placeholder="Playlist Name"
          name="playlistName"
          ref={register({ required: true })}
        />
        <p>Description:</p>
        <CreatePlaylistInput
          type="text"
          placeholder="Playlist Description"
          name="description"
          ref={register}
        />
        <CreatePlaylistButton>Create</CreatePlaylistButton>
      </CreatePlaylistForm>
    </CreatePlaylistFormContainer>
  );
};

export const CreatePlaylistFormContainer = styled.div`
  padding: 25px;
  h2 {
    font-size: 3rem;
  }
`;

const CreatePlaylistForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 30px;

  p {
    font-weight: bold;
  }
`;

const CreatePlaylistInput = styled(StyledInputComponent)``;

export const CreatePlaylistButton = styled(StyledButton)``;

export default CreatePlaylistComponent;
