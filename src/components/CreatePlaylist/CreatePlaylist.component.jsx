import React from "react";

import { useForm } from "react-hook-form";
import { queryCache, useMutation } from "react-query";
import styled from "styled-components";
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

const CreatePlaylistFormContainer = styled.div`
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

const CreatePlaylistInput = styled.input`
  margin-top: 10px;
  margin-bottom: 20px;
  padding: 20px;
  font-size: 1rem;
  background-color: #282828;
  outline: none;
  border: 2px ridge #ffffff;
  border-radius: 5px;
  font-weight: bolder;
  color: #1db954;
`;

const CreatePlaylistButton = styled.button`
  padding: 16px 20px;
  border-radius: 3px;
  border: 1px solid whitesmoke;
  background-color: #0f0f0f;
  font-weight: bold;
  color: #1db954;
  text-transform: uppercase;
  cursor: pointer;
  max-width: 300px;
  width: 100%;
  margin: 0 auto;
  margin-top: 20px;
`;

export default CreatePlaylistComponent;
