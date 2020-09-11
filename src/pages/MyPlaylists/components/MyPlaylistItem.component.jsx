import React from "react";

const MyPlaylistItem = ({
  image,
  name,
  total_tracks,
  useCover = false,
  onClick,
}) => {
  return (
    <div className="my-playlist-item" onClick={onClick}>
      <figure>
        <img src={image} alt="" />
      </figure>
      <div className="my-playlist-info">
        <div className="my-playlist-info-text">
          <h3>{name}</h3>
          <span>{total_tracks} tracks</span>
        </div>
      </div>
      {useCover ? (
        <div className="my-playlist-item-cover">
          <h3>Edit Playlist</h3>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MyPlaylistItem;
