import React from "react";
import styled from "styled-components";
import Cookie from "js-cookie";
import AudioPreview from "./AudioPreview.component";
import { useMutation, queryCache } from "react-query";
import { removeItemRequest } from "./RemoveItem.request";

const PlaylistItem = ({ track, ownerId }) => {
  const { playlistId } = Cookie.get();
  const { userId } = Cookie.get();
  const uri = track?.uri;
  const [mutate] = useMutation(removeItemRequest, {
    onSuccess: () => {
      queryCache.invalidateQueries("PLAYLIST");
      queryCache.invalidateQueries("TRACKS");
    },
  });
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
      {ownerId === userId && (
        <RemoveItemFromPlaylist
          onClick={() => mutate({ userId, playlistId, uri })}
        >
          Remove Item from Playlist
        </RemoveItemFromPlaylist>
      )}
    </li>
  );
};

const RemoveItemFromPlaylist = styled.div`
  text-align: end;
  cursor: pointer;
`;

export default PlaylistItem;
