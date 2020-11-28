import React from "react";
import CoverComponent from "./Cover.component";

const CreatePlaylist = ({ useCover, createPlaylistOnClick }) => {
  return (
    <div className="my-playlist-item create-playlist">
      +
      <CoverComponent
        useCover={useCover}
        createPlaylist
        createPlaylistHandler={createPlaylistOnClick}
      />
    </div>
  );
};

export default CreatePlaylist;
