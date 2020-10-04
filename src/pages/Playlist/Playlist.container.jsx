import React, { useState } from "react";
import "./Playlist.scss";
import { useParams } from "react-router-dom";
import { getPlaylistRequest, getTracksRequest } from "./Playlist.request";
import { useQuery, useInfiniteQuery } from "react-query";
import { PlaylistExtractor, tracksExtractor } from "./Playlist.extractor";
import TextLoading from "../../components/TextLoading/TextLoading.component";
import PlaylistItem from "./components/PlaylistItem";
import Loading from "../../components/Loading/Loading.component";

const Playlist = () => {
  const { id } = useParams();
  const [PlaylistInfo, setPlaylistInfo] = useState({});
  const [offset, setOffset] = useState(0);

  useQuery("PLAYLIST", () => getPlaylistRequest(id), {
    onSuccess: (data) => {
      const extractedPlaylistInfo = PlaylistExtractor(data);
      setPlaylistInfo({ ...extractedPlaylistInfo });
    },
    refetchOnWindowFocus: false,
  });

  const {
    data: trackData,
    isFetchingMore,
    fetchMore,
    canFetchMore,
  } = useInfiniteQuery("TRACKS", () => getTracksRequest(id, offset), {
    getFetchMore: (lastGroup) => lastGroup.next,
    onSuccess: () => {
      canFetchMore && setOffset(offset + 100);
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  const tracksInfo = tracksExtractor(trackData);

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
        {tracksInfo?.map((tracks) =>
          tracks?.map((track, index) => (
            <PlaylistItem track={track} key={index} />
          ))
        )}
      </ul>
      {canFetchMore && (
        <button className="load-more-tracks" onClick={() => fetchMore()}>
          {isFetchingMore ? <Loading /> : "LOAD MORE TRACKS"}
        </button>
      )}
    </div>
  );
};

export default Playlist;
