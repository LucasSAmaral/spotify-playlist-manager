import React, { useState } from "react";
import "./Playlist.scss";
import { useParams } from "react-router-dom";
import { getPlaylistRequest } from "./Playlist.request";
import { useQuery } from "react-query";
import { PlaylistExtractor } from "./Playlist.extractor";
import TextLoading from "../../components/TextLoading/TextLoading.component";
import PlaylistItem from "./components/PlaylistItem";

const Playlist = () => {
  const { id } = useParams();
  const [PlaylistInfo, setPlaylistInfo] = useState({});
  useQuery("PLAYLIST", () => getPlaylistRequest(id), {
    onSuccess: (data) => {
      const extractedPlaylistInfo = PlaylistExtractor(data);
      setPlaylistInfo({ ...extractedPlaylistInfo });
    },
    refetchOnWindowFocus: false,
  });

  return (
    <div className="playlist">
      <h2>{PlaylistInfo?.name ?? "Loading..."}</h2>

      <div className="playlist-info">
        <figure>
          <img src={PlaylistInfo.image} alt="" />
        </figure>

        <div className="playlist-description">
          <h3>Description:</h3>
          <h4>
            {PlaylistInfo.description !== ""
              ? PlaylistInfo?.description ?? (
                  <TextLoading width="100%" height="18px" minWidth="395px" />
                )
              : "There is no description for this playlist."}
          </h4>

          <h3>Owner:</h3>
          <h4>
            {PlaylistInfo.owner?.name ?? (
              <TextLoading width="125px" height="18px" minWidth="125px" />
            )}
          </h4>
        </div>
      </div>

      <ul className="tracks-list">
        <PlaylistItem header />
        {PlaylistInfo.tracks?.map((track, index) => (
          <PlaylistItem track={track} key={index} />
        ))}
      </ul>
    </div>
  );
};

export default Playlist;
