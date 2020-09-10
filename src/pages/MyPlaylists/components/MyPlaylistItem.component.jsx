import React, { useState } from "react";

const MyPlaylistItem = ({ image, name, total_tracks, useCover = false }) => {
  const [cover, setCover] = useState(false);
  return (
    <div
      className="my-playlist-item"
      onMouseEnter={() => setCover(true)}
      onMouseLeave={() => setCover(false)}
    >
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
        <div
          className={`my-playlist-item-cover ${!cover ? "--cover-hidden" : ""}`}
        >
          Edit Playlist
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MyPlaylistItem;
