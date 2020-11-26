import React from "react";
import { queryCache } from "react-query";
import PlaylistImagePlaceholder from "../../../components/PlaylistImagePlaceholder.component";
import CoverComponent from "./Cover.component";

const MyPlaylistItem = ({
  image,
  name,
  total_tracks,
  owner,
  useCover = false,
  openPlaylist,
  removePlaylist,
}) => {
  const userInfo = queryCache.getQueryData("USER_INFO");

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
      <CoverComponent
        useCover={useCover}
        openPlaylistText={
          owner.id === userInfo?.id ? "Edit Playlist" : "Show Playlist"
        }
        openPlaylistHandler={openPlaylist}
        removePlaylistHandler={removePlaylist}
      />
    </div>
  );
};

export default MyPlaylistItem;
