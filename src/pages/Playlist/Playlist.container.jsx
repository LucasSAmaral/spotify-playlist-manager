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

  return (
    <div className="playlist">
      <h3>
        {PlaylistInfo?.name ?? <TextLoading width="100%" height="50px" />}
      </h3>

      <div className="playlist-info">
        <figure>
          <img src={PlaylistInfo.image} alt="" />
        </figure>
      </div>
    </div>
  );
};

export default Playlist;
