import React from "react";
import AudioPreview from "./AudioPreview.component";
import { useMutation, queryCache } from "react-query";
import { removeItemRequest } from "./RemoveItem.request";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { getPlaylistId } from "../helpers/getPlaylistId";

const PlaylistItem = ({ track, header = false }) => {
  const { pathname } = useLocation();
  const playlistId = getPlaylistId(pathname);
  const userInfo = queryCache.getQueryData("USER_INFO");
  const userId = userInfo.id;
  const [mutate] = useMutation(removeItemRequest, {
    onSuccess: () => {
      queryCache.invalidateQueries("PLAYLIST");
      queryCache.invalidateQueries("TRACKS");
    },
  });
  const uri = track?.uri;
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
      <RemoveItemFromPlaylist
        onClick={() => mutate({ userId, playlistId, uri })}
      >
        Remove Item from Playlist
      </RemoveItemFromPlaylist>
    </li>
  );
};

const RemoveItemFromPlaylist = styled.div`
  text-align: end;
  cursor: pointer;
`;

export default PlaylistItem;
