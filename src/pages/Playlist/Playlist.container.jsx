import React, { useState } from "react";
import "./Playlist.scss";
import { useParams } from "react-router-dom";
import { getPlaylistRequest } from "./Playlist.request";
import { useQuery } from "react-query";
import { PlaylistExtractor } from "./Playlist.extractor";
import TextLoading from "../../components/TextLoading/TextLoading.component";

const Playlist = () => {
  const { id } = useParams();
  const [PlaylistInfo, setPlaylistInfo] = useState({});
  const { isFetching } = useQuery("PLAYLIST", () => getPlaylistRequest(id), {
    onSuccess: (data) => {
      const extractedPlaylistInfo = PlaylistExtractor(data);
      setPlaylistInfo({ ...extractedPlaylistInfo });
    },
    refetchOnWindowFocus: false,
  });

  console.log("tega", PlaylistInfo);

  return (
    <div className="playlist">
      <h3>{PlaylistInfo?.name ?? "Loading..."}</h3>

      <div className="playlist-info">
        <figure>
          <img src={PlaylistInfo.image} alt="" />
        </figure>

        <div className="playlist-description">
          <h2>Description:</h2>
          <h4>
            {PlaylistInfo.description !== ""
              ? PlaylistInfo?.description ?? (
                  <TextLoading width="100%" height="18px" minWidth="395px" />
                )
              : "The playlist description wasn't written."}
          </h4>
        </div>
      </div>

      <ul className="tracks-list">
        <li className="track-list-item header">
          <div className="track-list-item-title">Title</div>
          <div className="track-list-item-album">Album</div>
          <div className="track-list-item-options">Options</div>
        </li>
        {PlaylistInfo.tracks?.map((track, index) => (
          <li key={index} className="track-list-item">
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
            <div className="track-list-item-options">Options</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;
