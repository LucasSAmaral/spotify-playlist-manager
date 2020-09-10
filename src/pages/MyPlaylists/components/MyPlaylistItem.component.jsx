import React from "react";

const MyPlaylistItem = ({ image, name, total_tracks, useCover = false }) => {
  return (
    <div className="my-playlist-item">
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
        <div className="my-playlist-item-cover">Edit Playlist</div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MyPlaylistItem;
