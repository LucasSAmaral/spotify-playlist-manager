import React, { useState } from "react";
import "./Playlist.scss";
import { useParams } from "react-router-dom";
import { getPlaylistRequest } from "./Playlist.request";
import { useQuery } from "react-query";
import Cookie from "js-cookie";
import { PlaylistExtractor } from "./Playlist.extractor";

const Playlist = () => {
  const { id } = useParams();
  const { access_token, token_type } = Cookie.get();
  const [PlaylistInfo, setPlaylistInfo] = useState({});
  const { isFetching } = useQuery(
    "PLAYLIST",
    () => getPlaylistRequest(access_token, token_type, id),
    {
      onSuccess: (data) => {
        const extractedPlaylistInfo = PlaylistExtractor(data);
        setPlaylistInfo({ ...extractedPlaylistInfo });
      },
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div className="playlist">
      <h3>{PlaylistInfo?.name ?? "Loading"}</h3>

      <div className="playlist-info">
        <figure>
          <img src={PlaylistInfo.image} alt="" />
        </figure>
      </div>
    </div>
  );
};

export default Playlist;
