import React from "react";

const PlaylistHeader = () => {
  return (
    <li className="track-list-item header">
      <div className="track-list-item-title">Title</div>
      <div className="track-list-item-album">Album</div>
      <div className="track-list-item-preview">Preview</div>
      <div className="track-list-item-options">Options</div>
    </li>
  );
};

export default PlaylistHeader;
