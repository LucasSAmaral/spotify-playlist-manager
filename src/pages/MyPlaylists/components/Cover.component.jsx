import React from "react";

const CoverTitle = ({
  createPlaylist,
  openPlaylistText,
  createPlaylistHandler,
  openPlaylistHandler,
  removePlaylistHandler,
}) => {
  if (createPlaylist) {
    return <h3 onClick={createPlaylistHandler}>Create New Playlist</h3>;
  }

  return (
    <>
      <h3 onClick={openPlaylistHandler}>{openPlaylistText}</h3>
      <h3 onClick={removePlaylistHandler}>Remove Playlist</h3>
    </>
  );
};

const CoverComponent = ({
  useCover = false,
  createPlaylist = false,
  ...props
}) => {
  return (
    <>
      {useCover ? (
        <div className="my-playlist-item-cover">
          <CoverTitle createPlaylist={createPlaylist} {...props} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default CoverComponent;
