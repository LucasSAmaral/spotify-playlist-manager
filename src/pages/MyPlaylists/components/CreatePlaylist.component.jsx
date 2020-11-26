import React from "react";

const CreatePlaylist = ({ useCover = false, createPlaylistOnClick }) => {
  return (
    <div className="my-playlist-item create-playlist">
      +
      {useCover ? (
        <div className="my-playlist-item-cover">
          <h3 onClick={createPlaylistOnClick}>Create New Playlist</h3>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CreatePlaylist;
