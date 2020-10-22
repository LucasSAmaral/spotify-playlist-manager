import React from "react";
import { queryCache } from "react-query";

const MyPlaylistItem = ({
  image,
  name,
  total_tracks,
  owner,
  useCover = false,
  onClick,
  createPlaylist = false,
}) => {
  const userInfo = queryCache.getQueryData("USER_INFO");

  if (createPlaylist) {
    return (
      <div className="my-playlist-item create-playlist" onClick={onClick}>
        +
        {useCover ? (
          <div className="my-playlist-item-cover">
            <h3>Create New Playlist</h3>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }

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
          <h3>
            {owner.id === userInfo?.id ? "Edit Playlist" : "Show Playlist"}
          </h3>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MyPlaylistItem;
