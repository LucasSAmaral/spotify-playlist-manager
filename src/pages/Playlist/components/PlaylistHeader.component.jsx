import React from "react";
import Cookie from "js-cookie";
import { ownerPlaylistClassHelper } from "../../../helpers/ownerPlaylistClass.helper";

const { userId } = Cookie.get();

const PlaylistHeader = ({ ownerId }) => {
  const ownerPlaylistClass = ownerPlaylistClassHelper(ownerId, userId);
  return (
    <li className={`track-list-item header ${ownerPlaylistClass}`}>
      <div className="track-list-item-title">Title</div>
      <div className="track-list-item-album">Album</div>
      <div className={`track-list-item-preview ${ownerPlaylistClass}`}>
        Preview
      </div>
      {userId === ownerId && (
        <div className="track-list-item-options">Options</div>
      )}
    </li>
  );
};

export default PlaylistHeader;
