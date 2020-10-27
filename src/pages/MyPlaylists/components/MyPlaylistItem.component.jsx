import React from "react";
import { queryCache } from "react-query";
import PlaylistImagePlaceholder from "../../../components/PlaylistImagePlaceholder.component";

const MyPlaylistItem = ({
  image,
  name,
  total_tracks,
  owner,
  useCover = false,
  createPlaylistOnClick,
  openPlaylist,
  removePlaylist,
  createPlaylist = false,
}) => {
  const userInfo = queryCache.getQueryData("USER_INFO");

  if (createPlaylist) {
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
  }

  return (
    <div className="my-playlist-item">
      {image ? (
        <figure>
          <img src={image} alt="" />
        </figure>
      ) : (
        <PlaylistImagePlaceholder />
      )}

      <div className="my-playlist-info">
        <div className="my-playlist-info-text">
          <h3>{name}</h3>
          <span>{total_tracks} tracks</span>
        </div>
      </div>
      {useCover ? (
        <div className="my-playlist-item-cover">
          <h3 onClick={openPlaylist}>
            {owner.id === userInfo?.id ? "Edit Playlist" : "Show Playlist"}
          </h3>
          <h3 onClick={removePlaylist}>Remove Playlist</h3>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MyPlaylistItem;
