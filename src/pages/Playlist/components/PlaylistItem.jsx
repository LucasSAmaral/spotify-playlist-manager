import React from "react";
import AudioPreview from "./AudioPreview";

const PlaylistItem = ({ track, header = false }) => {
  if (header) {
    return (
      <li className="track-list-item header">
        <div className="track-list-item-title">Title</div>
        <div className="track-list-item-album">Album</div>
        <div className="track-list-item-preview">Preview</div>
        <div className="track-list-item-options">Options</div>
      </li>
    );
  }
  return (
    <li className="track-list-item">
      <div className="track-list-item-title">
        <div className="track-list-item-wrapper">
          <figure>
            <img src={track.album.image} alt="" />
          </figure>
          <div className="track-list-item-info">
            <p>
              <a
                href={track.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {track.name}
              </a>
            </p>
            <p>{track.artist}</p>
          </div>
        </div>
      </div>
      <div className="track-list-item-album">
        <a
          href={track.album.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {track.album.name}
        </a>
      </div>
      <div className="track-list-item-preview">
        {track.previewUrl && <AudioPreview previewUrl={track.previewUrl} />}
      </div>
      <div className="track-list-item-options">...</div>
    </li>
  );
};

export default PlaylistItem;
